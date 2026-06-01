#!/usr/bin/env python3
"""
Upload paralelo por FTP de un árbol local a un directorio remoto.
Pensado para mover `out/` (build de Next.js) a `public_html/` en SiteGround.

Credenciales por env vars (no por argv) para no exponerlas en `ps`.

Uso:
    FTP_USER=... FTP_PASS=... FTP_HOST=... \\
        python3 ftp_upload.py LOCAL_DIR REMOTE_DIR [--workers 6]

Características:
- Sube en paralelo con N workers (cada uno mantiene su conexión FTP).
- Crea directorios automáticamente.
- Salta archivos que ya existen con el mismo tamaño (resumable).
- Soporta dotfiles (.htaccess, etc.).
- Imprime progreso y resumen final.
"""
import argparse
import concurrent.futures
import os
import sys
import threading
import time
from ftplib import FTP, error_perm
from pathlib import Path


def env(k: str) -> str:
    v = os.environ.get(k)
    if not v:
        sys.exit(f"Missing env var: {k}")
    return v


def connect(host: str, user: str, password: str) -> FTP:
    ftp = FTP(host, timeout=60)
    ftp.login(user, password)
    ftp.set_pasv(True)
    return ftp


def remote_mkdirs(ftp: FTP, path: str) -> None:
    """mkdir -p equivalente. path estilo POSIX, sin slash inicial obligatorio."""
    parts = [p for p in path.split("/") if p]
    cur = ""
    for p in parts:
        cur = cur + "/" + p
        try:
            ftp.mkd(cur)
        except error_perm:
            # Ya existe o no permitido (lo segundo dará error luego, lo dejamos pasar)
            pass


def remote_size(ftp: FTP, path: str) -> int | None:
    try:
        return ftp.size(path)
    except error_perm:
        return None


class Worker:
    """Cada worker mantiene su conexión FTP viva."""

    def __init__(self, host: str, user: str, password: str):
        self.host = host
        self.user = user
        self.password = password
        self.ftp: FTP | None = None
        self.lock = threading.Lock()

    def _ensure(self) -> FTP:
        if self.ftp is None:
            self.ftp = connect(self.host, self.user, self.password)
        return self.ftp

    def upload(self, local: Path, remote: str) -> tuple[str, str]:
        """Devuelve ('uploaded'|'skipped'|'error', detail)."""
        with self.lock:
            try:
                ftp = self._ensure()
                local_size = local.stat().st_size
                rs = remote_size(ftp, remote)
                if rs is not None and rs == local_size:
                    return ("skipped", f"{remote} ({local_size}b)")
                # Crear dir si hace falta
                remote_dir = os.path.dirname(remote)
                if remote_dir:
                    remote_mkdirs(ftp, remote_dir)
                with local.open("rb") as f:
                    ftp.storbinary(f"STOR {remote}", f)
                return ("uploaded", f"{remote} ({local_size}b)")
            except Exception as e:
                # Si la conexión murió, reset para el siguiente intento del pool
                try:
                    if self.ftp:
                        self.ftp.close()
                except Exception:
                    pass
                self.ftp = None
                return ("error", f"{remote}: {e}")

    def close(self) -> None:
        with self.lock:
            try:
                if self.ftp:
                    self.ftp.quit()
            except Exception:
                pass
            self.ftp = None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("local_dir", help="Carpeta local origen (ej: out)")
    ap.add_argument("remote_dir", help="Carpeta remota destino (ej: /vision360ia.com/public_html)")
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--retry-errors", type=int, default=1)
    args = ap.parse_args()

    host = env("FTP_HOST")
    user = env("FTP_USER")
    password = env("FTP_PASS")

    local_root = Path(args.local_dir).resolve()
    if not local_root.is_dir():
        sys.exit(f"Local dir not found: {local_root}")

    remote_root = args.remote_dir.rstrip("/")
    if not remote_root.startswith("/"):
        remote_root = "/" + remote_root

    # Crear remote root de antemano
    bootstrap = connect(host, user, password)
    remote_mkdirs(bootstrap, remote_root)
    bootstrap.quit()

    # Recoger lista de ficheros y dirs a crear
    files: list[tuple[Path, str]] = []
    for path in local_root.rglob("*"):
        if path.is_file():
            rel = path.relative_to(local_root).as_posix()
            files.append((path, f"{remote_root}/{rel}"))

    total_bytes = sum(p.stat().st_size for p, _ in files)
    print(f"Local : {local_root}")
    print(f"Remote: {remote_root}")
    print(f"Files : {len(files)} ({total_bytes / 1024 / 1024:.1f} MB)")
    print(f"Workers: {args.workers}")
    print("---")

    # Pool de workers reutilizables
    workers = [Worker(host, user, password) for _ in range(args.workers)]
    counter_lock = threading.Lock()
    state = {"uploaded": 0, "skipped": 0, "error": 0, "bytes": 0}
    errors: list[str] = []
    t0 = time.time()

    def task(idx_local_remote):
        idx, (local, remote) = idx_local_remote
        w = workers[idx % args.workers]
        status, detail = w.upload(local, remote)
        with counter_lock:
            state[status] += 1
            if status == "uploaded":
                state["bytes"] += local.stat().st_size
            done = state["uploaded"] + state["skipped"] + state["error"]
            pct = done * 100 // len(files)
            print(f"[{pct:3d}%] {status:8s} {detail}")
            if status == "error":
                errors.append(detail)

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
        list(ex.map(task, enumerate(files)))

    # Retry errors
    for attempt in range(args.retry_errors):
        if not errors:
            break
        print(f"\n--- retry {attempt + 1} ({len(errors)} errors) ---")
        to_retry = list(errors)
        errors.clear()
        retry_state = {"uploaded": 0, "skipped": 0, "error": 0}

        def retry_task(idx_remote):
            idx, remote = idx_remote
            # localizar fichero local correspondiente
            rel = remote[len(remote_root) + 1:]
            local = local_root / rel
            w = workers[idx % args.workers]
            status, detail = w.upload(local, remote)
            with counter_lock:
                retry_state[status] += 1
                print(f"[retry] {status:8s} {detail}")
                if status == "error":
                    errors.append(detail)

        # Necesitamos extraer solo los paths de los errors (formato "path: msg")
        retry_paths = [e.split(":", 1)[0] for e in to_retry]
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
            list(ex.map(retry_task, enumerate(retry_paths)))
        state["uploaded"] += retry_state["uploaded"]
        state["skipped"] += retry_state["skipped"]
        state["error"] = retry_state["error"]

    elapsed = time.time() - t0
    for w in workers:
        w.close()

    print("\n=== SUMMARY ===")
    print(f"Uploaded: {state['uploaded']}")
    print(f"Skipped : {state['skipped']}")
    print(f"Errors  : {state['error']}")
    print(f"Bytes   : {state['bytes'] / 1024 / 1024:.1f} MB")
    print(f"Time    : {elapsed:.1f}s")
    if state["bytes"] > 0:
        print(f"Speed   : {state['bytes'] / 1024 / 1024 / elapsed:.2f} MB/s")
    if errors:
        print("\nERRORS:")
        for e in errors:
            print(f"  - {e}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
