# Gestor de noticias (CMS headless) — Vision360IA

Sistema de noticias/blog para publicar "tipo WordPress" **sin WordPress**, sobre
la web estática (Next.js `output: export`). Editor visual (Sveltia CMS) que
escribe Markdown en el repo; al publicar, GitHub reconstruye la web y la sube a
SiteGround. Las noticias quedan como **páginas estáticas rápidas y con SEO** en
`www.vision360ia.com/noticias`.

Rama de desarrollo: `feature/noticias-cms` (NO fusionar a `main` hasta cerrar Fase 3).

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

## Estado por fases

- **Fase 1 (HECHA, en esta rama):** sección de noticias en Next + 1 noticia de
  ejemplo + `/admin` con Sveltia configurado. Funciona en local. **Sin tocar
  producción ni deploy automático.**
- **Fase 2 (pendiente, requiere tu acción):** login del CMS con GitHub.
- **Fase 3 (pendiente):** auto-publicación (GitHub Actions → FTP a SiteGround) +
  excepción de CSP para `/admin` + enlace "Noticias" en menú/footer.

---

## Fase 2 — Login del CMS con GitHub (OAuth)

Sveltia/Decap necesitan un proxy OAuth para autenticar con GitHub (el host es
SiteGround, no Netlify). Pasos:

1. **Crear una GitHub OAuth App**: GitHub → Settings → Developer settings →
   OAuth Apps → New. Homepage: `https://www.vision360ia.com`. Authorization
   callback URL: la del proxy OAuth (paso 2).
2. **Desplegar un proxy OAuth** (gratis): el worker de Cloudflare recomendado por
   Sveltia (`sveltia-cms-auth`) o un OAuth client equivalente. Configurar
   CLIENT_ID y CLIENT_SECRET de la OAuth App.
3. En `public/admin/config.yml`, descomentar y poner:
   ```yaml
   backend:
     name: github
     repo: twetter99/vision360ia2
     branch: main
     base_url: https://<tu-proxy-oauth>
   ```
4. **CSP para /admin:** `/admin` carga Sveltia desde un CDN y llama a la API de
   GitHub. La CSP estricta del sitio lo bloquea. Añadir en `public/.htaccess` una
   excepción solo para `/admin` (no tocar la CSP del resto), permitiendo:
   `script-src` unpkg.com/jsdelivr; `connect-src` api.github.com + el proxy;
   `frame-src`/`form-action` el proxy. Ejemplo (ajustar):
   ```apache
   <If "%{REQUEST_URI} =~ m#^/admin#">
     Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.github.com https://<tu-proxy-oauth>; frame-src https://<tu-proxy-oauth>; form-action 'self' https://github.com;"
   </If>
   ```

## Fase 3 — Auto-publicación (GitHub Actions → FTP)

Workflow que, al hacer push a `main` (o al cambiar `content/noticias/**`),
construye el sitio y lo sube por FTP a SiteGround.

**Secrets a crear en el repo** (Settings → Secrets and variables → Actions):
`FTP_HOST`, `FTP_USER`, `FTP_PASS`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.

**Pasos del workflow:** `npm ci` → `npm run build` →
`cp -R .next/static/. out/_next/static/` → `rm -f out/api/form/config.php` →
subir `out/` por FTP a `/vision360ia.com/public_html`.

### ⚠️ Restricciones de deploy (CRÍTICAS, no romper)

- **NUNCA "clean slate"** en el FTP: el deploy debe **solo subir/actualizar**,
  jamás borrar archivos del servidor. (En SamKirkland/FTP-Deploy-Action:
  `dangerous-clean-slate: false`, que es el valor por defecto — confirmarlo.)
- **NO tocar ni borrar** `public_html/api/form/config.php` (credenciales SMTP del
  formulario; vive solo en el servidor, está en `.gitignore`). Como `out/` no lo
  contiene y no hacemos clean-slate, queda intacto. Verificarlo tras el primer
  deploy automático.
- **NO borrar** `public_html/api/form/vendor/` (PHPMailer).
- Mantener la web **estática, rápida y orientada a SEO**.

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
