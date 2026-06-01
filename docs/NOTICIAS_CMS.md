# Gestor de noticias (CMS headless) — Vision360IA

Sistema de noticias/blog para publicar "tipo WordPress" **sin WordPress**, sobre
la web estática (Next.js `output: export`). Editor visual (Sveltia CMS) que
escribe Markdown en el repo; al publicar, GitHub reconstruye la web y la sube a
SiteGround. Las noticias quedan como **páginas estáticas rápidas y con SEO** en
`www.vision360ia.com/noticias`.

**Estado: EN PRODUCCIÓN.** Consolidado en `main`. Publicar desde
`https://www.vision360ia.com/admin/` dispara build + deploy automático.

---

## Arquitectura

- **Contenido:** `content/noticias/<slug>.md` (frontmatter + cuerpo Markdown).
- **Lectura:** `src/lib/noticias.ts` (gray-matter + markdown-it), en tiempo de build.
- **Páginas Next:**
  - `src/app/noticias/page.tsx` → índice `/noticias`.
  - `src/app/noticias/[slug]/page.tsx` → detalle `/noticias/<slug>` (NewsArticle, OG, breadcrumb).
- **Sitemap:** `src/app/sitemap.ts` añade `/noticias` + cada noticia automáticamente.
- **CMS:** `public/admin/` (`index.html` + `config.yml`) → editor en `/admin`.
- **Imágenes del editor:** `public/images/noticias/` (referenciadas como `/images/noticias/...`).

## Estado por fases — TODAS HECHAS ✅

- **Fase 1 (HECHA):** sección de noticias en Next + 1 noticia de ejemplo +
  `/admin` con Sveltia configurado.
- **Fase 2 (HECHA):** login del CMS funcionando en producción.
- **Fase 3 (HECHA):** auto-publicación (GitHub Actions → FTP a SiteGround),
  CSP propia para `/admin`, enlace "Noticias" en el footer. Consolidado en `main`.

---

## Fase 2 — Login del CMS (cómo quedó)

El plan inicial era OAuth con un proxy (Cloudflare Worker `sveltia-cms-auth`),
pero **el Worker valida por el header `Referer`** y los popups del navegador
(Safari/privado) no siempre lo envían → `Forbidden` recurrente. **Se abandonó
OAuth** y se usa **login por Personal Access Token (PAT) de GitHub**, que sí
funciona de forma fiable.

**Cómo entrar al CMS:**

1. Ir a `https://www.vision360ia.com/admin/`.
2. Sveltia ofrece "Sign in with GitHub" y, debajo, la opción de **token**.
3. Pegar un **fine-grained PAT** con permisos sobre `twetter99/vision360ia2`:
   *Contents: Read and write* (Metadata se añade solo). Recomendado crearlo
   **sin caducidad** ("No expiration") para no tener que renovarlo cada año.

**Detalles técnicos que hubo que resolver (host SiteGround = nginx + Apache):**

- **Bundle auto-alojado:** `public/admin/sveltia-cms.js` (no CDN) para cumplir la
  CSP (`script-src 'self'`).
- **Config como `.txt`, no `.yml`:** nginx de SiteGround devuelve **403 en `.yml`**.
  Se sirve la config como `public/admin/config.txt` y se enlaza desde
  `index.html` con `<link rel="cms-config-url" type="text/yaml" href="config.txt">`.
- **CSP propia de `/admin`:** `public/admin/.htaccess` relaja la CSP global solo
  en esa carpeta (permite GitHub API, fonts del editor) y marca `noindex`.

## Fase 3 — Auto-publicación (cómo quedó)

Workflow `.github/workflows/deploy.yml`: al hacer **push a `main`** (lo que hace
el CMS al publicar) construye el sitio y lo sube por FTP a SiteGround.

**Secrets del repo** (ya creados, Settings → Secrets and variables → Actions):
`FTP_HOST`, `FTP_USER`, `FTP_PASS`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.

**Pasos del workflow:** `npm ci` → `npm run build` →
`cp -R .next/static/. out/_next/static/` (arregla chunks del export) →
`cp out/noticias.html out/noticias/index.html` + `rm out/noticias.html` →
`rm -f out/api/form/config.php` → subir `out/` por FTP con
`.github/scripts/ftp_upload.py` a `/vision360ia.com/public_html`.

> **`/noticias` y nginx:** nginx sirve el *directorio* `/noticias/` antes de que
> Apache aplique reescrituras, así que un `noticias.html` suelto da 403. La
> solución es poner el índice como `noticias/index.html` (lo hace el workflow).

### ⚠️ Restricciones de deploy (CRÍTICAS, no romper)

- **Solo sube, nunca borra.** `ftp_upload.py` hace únicamente `STOR` (0 borrados,
  verificado). No hay "clean slate". Sube solo archivos nuevos o de distinto
  tamaño (salta los iguales).
- **`public_html/api/form/config.php`** (SMTP) queda **intacto**: el workflow lo
  elimina del `out/` antes de subir y el uploader nunca borra del servidor.
  Verificado tras el primer deploy (responde 403 = presente y protegido, no 404).
- **`public_html/api/form/vendor/`** (PHPMailer) tampoco se toca.
- La web sigue **estática, rápida y orientada a SEO**.

### Mantenimiento

- **PAT del CMS:** si se creó con caducidad, regenerarlo como "No expiration" para
  no perder el acceso. Es lo único que caduca en todo el sistema.
- **Aviso de GitHub Actions:** `actions/checkout@v4` y `setup-node@v4` corren en
  Node 20, que GitHub deprecará (jun/sep 2026). Subir a `@v5` cuando convenga; no
  es urgente.
- Los cambios solo en `docs/**` **no** disparan deploy (`paths-ignore`).

---

## Cómo publicar una noticia (a partir de Fase 3)

1. Entra en `https://www.vision360ia.com/admin` y haz login con GitHub.
2. "Noticias" → "Nueva" → título, fecha, descripción (resumen SEO), imagen,
   contenido. Publicar.
3. En ~2-3 min (build + deploy automático) aparece en `/noticias`.

## Buenas prácticas SEO por noticia

- **Título** claro con la keyword de la noticia.
- **Descripción** ~150 caracteres (es el resumen en Google).
- **Imagen** de portada real (no la genérica) cuando se pueda.
- Enlazar dentro del texto a las landings relevantes (`/precio-sistema-adas-flotas`,
  `/adas-autobuses`, etc.) → reparte autoridad interna.
