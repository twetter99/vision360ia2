# Deploy a SiteGround

Esta guía cubre cómo desplegar la web estática (Next.js `output: 'export'`) y
el endpoint PHP del formulario de contacto en SiteGround.

> Reemplaza a `DEPLOY_VERCEL.md`. Ya no usamos Vercel.

---

## 1. Visión rápida

- **Web**: `npm run build` → carpeta `out/` con HTML/CSS/JS puro.
- **Formulario**: PHP en `public/api/form/` (PHPMailer + SMTP autenticado, honeypot, Turnstile).
- **Hosting**: cualquier plan SiteGround con PHP 8.1+ y SSL gratis.

```
out/
├── .htaccess              ← cabeceras CSP/HSTS, redirección HTTPS+www, cache
├── index.html
├── adas-*.html, ...       ← una página por ruta
├── _next/                 ← chunks JS/CSS de Next con hash inmutable
└── api/form/
    ├── .htaccess          ← bloquea config.php, vendor, composer
    ├── contacto.php       ← endpoint del formulario
    ├── composer.json
    └── config.example.php
```

Lo que se sube al `public_html/` de SiteGround:

- **Todo el contenido de `out/`** (no la carpeta, el contenido).
- Además, **en `public_html/api/form/`** hay que crear el `config.php` real y
  ejecutar `composer install` (ver pasos 3 y 4).

---

## 2. Primer deploy

### 2.1 Build local

```bash
npm install
npm run build
```

Esto genera `out/` con todas las páginas y assets.

### 2.2 Subir a SiteGround

Dos opciones equivalentes; elige una.

**Opción A — FTP/SFTP (rápida, sin Git):**

1. Abrir Site Tools → *FTP Accounts* y obtener credenciales SFTP.
2. Con FileZilla / Cyberduck / Transmit, conectar al servidor.
3. Subir **el contenido** de `out/` (no la carpeta) a `/public_html/`.
4. Confirmar que los ficheros `.htaccess` también se han subido (algunos
   clientes los ocultan; activa *Mostrar archivos ocultos*).

**Opción B — Git (recomendada cuando hagas cambios frecuentes):**

1. Site Tools → *Git* → crear repositorio en `/public_html/`.
2. Añadir como remote el repo de SiteGround y pushear la carpeta `out/`.
   (Lo más práctico: tener un branch `deploy` que solo contenga `out/`).

> **Atajo**: crear un script `scripts/deploy.sh` que haga `npm run build` y
> `rsync out/ user@server:public_html/`. SiteGround te da las credenciales SSH
> en Site Tools → *SSH Keys Manager*.

---

## 3. Configurar el formulario (primera vez)

### 3.1 Crear el buzón de correo

1. Site Tools → *Email* → *Accounts*.
2. Crear `info@vision360ia.com` con una contraseña fuerte.

### 3.2 Crear `config.php` en el servidor

Conectado por SFTP/SSH, ir a `public_html/api/form/` y:

```bash
cp config.example.php config.php
nano config.php   # o editar por SFTP
```

Rellenar:

```php
define('SMTP_HOST',      'smtp.siteground.com');     // el que indique SiteGround para tu plan
define('SMTP_PORT',      465);
define('SMTP_SECURE',    'ssl');                     // 465 = ssl, 587 = tls
define('SMTP_USER',      'info@vision360ia.com');
define('SMTP_PASS',      'CONTRASEÑA_DEL_BUZÓN');
define('SMTP_FROM',      'info@vision360ia.com');
define('SMTP_FROM_NAME', 'Vision360IA');
define('MAIL_TO',        'info@vision360ia.com');
define('TURNSTILE_SECRET', 'TU_SECRET_DE_CLOUDFLARE');
```

> **Importante**: `config.php` **no se sube al repo** (está en `.gitignore`).
> Vive solo en el servidor.

> **Atajo SMTP host**: si el panel de SiteGround indica otro host (a veces
> `mail.tudominio.com` o un subdominio del propio dominio), úsalo en lugar de
> `smtp.siteground.com`.

### 3.3 Instalar PHPMailer (composer)

Por SSH (Site Tools → *Devs* → *SSH Keys Manager*):

```bash
cd public_html/api/form
composer install --no-dev --optimize-autoloader
```

Esto crea `vendor/` con PHPMailer. Si no tienes SSH y solo FTP:

1. Localmente: `cd public/api/form && composer install --no-dev --optimize-autoloader`
2. Subir la carpeta `vendor/` resultante por FTP a `public_html/api/form/vendor/`.

### 3.4 Conseguir el secret de Turnstile

1. https://dash.cloudflare.com/?to=/:account/turnstile
2. Crear un widget para `vision360ia.com` y `www.vision360ia.com`.
3. Copiar **Site Key** → variable de entorno de build `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   (en `.env.local` o como variable en tu proceso de build).
4. Copiar **Secret Key** → `config.php` → `TURNSTILE_SECRET`.

### 3.5 PHP version

Site Tools → *Devs* → *PHP Manager*: asegurarse de PHP **8.1 o superior** activo.

---

## 4. Verificación post-deploy

Probar manualmente en orden:

1. **Home carga**: https://www.vision360ia.com
2. **Una landing carga**: https://www.vision360ia.com/adas-camiones
3. **Cabeceras correctas** (DevTools → Network → cualquier HTML):
   - `strict-transport-security`
   - `content-security-policy`
   - `x-frame-options: DENY`
4. **Redirección HTTPS+www**: visitar `http://vision360ia.com/` debe acabar en
   `https://www.vision360ia.com/`.
5. **Formulario** (slide-over):
   - Abrirlo desde cualquier CTA.
   - Aparece el widget Turnstile.
   - Enviar con datos reales → debe llegar **email al equipo** y **email de
     confirmación al usuario**.
6. **Endpoint protegido**:
   - `curl https://www.vision360ia.com/api/form/config.php` → 403.
   - `curl https://www.vision360ia.com/api/form/composer.json` → 403.
   - `curl https://www.vision360ia.com/api/form/vendor/autoload.php` → 403.

Si algo falla, mirar los logs:

- Errores PHP: Site Tools → *Statistics* → *Error Log*.
- Logs `error_log()` del endpoint salen ahí (todas las trazas de
  `[contacto.php]` están etiquetadas).

---

## 5. Deploys siguientes (workflow normal)

```bash
# 1. Cambios en código
git pull
npm install            # solo si cambió package.json
npm run build

# 2. Subir el delta
rsync -avz --delete \
  --exclude='api/form/config.php' \
  --exclude='api/form/vendor/' \
  out/ user@server:public_html/
```

`--exclude` protege los ficheros del servidor que NO están en el build (las
credenciales y el `vendor/` de composer).

---

## 6. Rollback

SiteGround mantiene backups automáticos:

- Site Tools → *Security* → *Backups* → *Restore*.
- Permite restaurar `public_html/` a un punto anterior con un clic.

Para un rollback rápido sin tocar SiteGround: mantener `out/` de la versión
anterior en local; volver a hacer `rsync` desde ahí.

---

## 7. Variables de entorno necesarias para el build local

`.env.local` (no se commitea):

```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...   # site key de Cloudflare Turnstile
```

Si la variable está vacía, el widget de Turnstile no se monta pero el
formulario sigue enviando (útil en desarrollo).

---

## 8. Checklist final del primer deploy

- [ ] `npm run build` genera `out/` sin errores
- [ ] Contenido de `out/` subido a `public_html/`
- [ ] `public_html/.htaccess` presente
- [ ] `public_html/api/form/.htaccess` presente
- [ ] `public_html/api/form/config.php` creado y relleno (NO en repo)
- [ ] `public_html/api/form/vendor/` instalado vía `composer install`
- [ ] Turnstile site key configurada en build, secret en `config.php`
- [ ] PHP 8.1+ activo en SiteGround
- [ ] SSL activo y forzado (Let's Encrypt en Site Tools → *Security* → *SSL*)
- [ ] Formulario enviado de prueba → 2 emails recibidos
- [ ] Cabeceras HSTS + CSP visibles en respuesta
- [ ] Rutas protegidas devuelven 403 (config.php, vendor, composer.json)
