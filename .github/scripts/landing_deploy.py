#!/usr/bin/env python3
"""Publish only /evaluacion-flota over verified FTPS, with a restorable snapshot."""
import argparse
import hashlib
import io
import json
import os
import re
from pathlib import Path
from ftplib import error_perm
from urllib.parse import unquote

from ftp_upload import connect, env, remote_mkdirs

ENTRIES = ("evaluacion-flota.txt", "evaluacion-flota.html")


class EntryPublicationError(RuntimeError):
    pass


def digest(data):
    return hashlib.sha256(data).hexdigest()


def retrieve(ftp, path):
    data = io.BytesIO()
    ftp.retrbinary("RETR " + path, data.write)
    return data.getvalue()


def atomic_put(ftp, path, data, token):
    temporary = path + ".upload-" + token
    remote_mkdirs(ftp, path.rsplit("/", 1)[0])
    ftp.storbinary("STOR " + temporary, io.BytesIO(data))
    if digest(retrieve(ftp, temporary)) != digest(data):
        raise RuntimeError("Remote verification failed for " + path)
    # Never delete an existing resource: RNTO replaces the entry atomically.
    ftp.rename(temporary, path)
    if digest(retrieve(ftp, path)) != digest(data):
        raise RuntimeError("Published verification failed for " + path)


def snapshot(ftp, root, directory):
    directory.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for name in ENTRIES:
        data = retrieve(ftp, root + "/" + name)
        if not data:
            raise RuntimeError("Refusing an empty backup for " + name)
        (directory / name).write_bytes(data)
        manifest[name] = digest(data)
    (directory / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print("Snapshot verified: both landing entry points; no backend or credentials.")


def read_snapshot(directory):
    manifest = json.loads((directory / "manifest.json").read_text())
    if set(manifest) != set(ENTRIES):
        raise RuntimeError("Invalid landing snapshot manifest")
    result = {}
    for name in ENTRIES:
        data = (directory / name).read_bytes()
        if not data or digest(data) != manifest[name]:
            raise RuntimeError("Invalid snapshot checksum for " + name)
        result[name] = data
    return result


def restore(ftp, root, data, token):
    for name in ENTRIES:
        atomic_put(ftp, root + "/" + name, data[name], token)
    print("Rollback complete: both entry points restored and read-back verified.")


def assets(output):
    # Static chunks can load additional chunks dynamically. Retain all old
    # resources and publish this build's complete, versioned static directory.
    result = {p.relative_to(output).as_posix(): p for p in (output / "_next/static").rglob("*") if p.is_file()}
    if not result:
        raise RuntimeError("Missing Next.js static assets")
    html = (output / "evaluacion-flota.html").read_text()
    for path in re.findall(r"/(?:images|fonts)/[^\s\"'<>?,]+", html):
        rel = unquote(path.lstrip("/"))
        if ".." in Path(rel).parts or not rel.startswith(("images/", "fonts/")):
            raise RuntimeError("Unsafe asset path")
        candidate = output / rel
        if not candidate.resolve().is_relative_to(output.resolve()):
            raise RuntimeError("Asset escapes output directory")
        if candidate.is_file():
            result[rel] = candidate
    return result


def publish(ftp, root, output, previous, token):
    entries = {name: (output / name).read_bytes() for name in ENTRIES}
    if any(not data for data in entries.values()):
        raise RuntimeError("Empty landing entry point")
    for rel, local in sorted(assets(output).items()):
        data = local.read_bytes()
        try:
            existing = retrieve(ftp, root + "/" + rel)
        except error_perm as exc:
            if not str(exc).startswith("550"):
                raise
            existing = None
        if existing is not None:
            if digest(existing) != digest(data):
                raise RuntimeError("Refusing to overwrite a different shared asset: " + rel)
            continue
        atomic_put(ftp, root + "/" + rel, data, token)
    print("All landing assets published and verified before changing entry points.")
    for name in ENTRIES:
        if digest(retrieve(ftp, root + "/" + name)) != digest(previous[name]):
            raise RuntimeError("Landing changed since backup; refusing to overwrite it.")
    try:
        for name in ENTRIES:
            atomic_put(ftp, root + "/" + name, entries[name], token)
    except Exception as exc:
        raise EntryPublicationError("Entry-point publication failed") from exc
    print("Landing deployed: HTML and RSC verified. Backend and other pages untouched.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("operation", choices=("backup", "deploy", "rollback"))
    parser.add_argument("remote_dir")
    parser.add_argument("--output", type=Path, default=Path("out"))
    parser.add_argument("--backup-dir", type=Path, required=True)
    args = parser.parse_args()
    token = re.sub(r"[^A-Za-z0-9_-]", "", os.environ.get("GITHUB_RUN_ID", "local"))
    root = args.remote_dir.rstrip("/")
    ftp = connect(env("FTP_HOST"), env("FTP_USER"), env("FTP_PASS"))
    try:
        ftp.cwd(root)
        if args.operation == "backup":
            snapshot(ftp, root, args.backup_dir)
        else:
            previous = read_snapshot(args.backup_dir)
            if args.operation == "rollback":
                restore(ftp, root, previous, token)
            else:
                try:
                    publish(ftp, root, args.output, previous, token)
                except EntryPublicationError:
                    print("Entry-point publication failed; reconnecting to restore the snapshot.")
                    ftp.close()
                    ftp = connect(env("FTP_HOST"), env("FTP_USER"), env("FTP_PASS"))
                    restore(ftp, root, previous, token + "-rollback")
                    raise
    finally:
        try:
            ftp.quit()
        except Exception:
            ftp.close()


if __name__ == "__main__":
    main()
