<?php
/**
 * Configuración del endpoint de contacto.
 *
 * 1. cp config.example.php config.php
 * 2. Rellenar con las credenciales SMTP reales.
 * 3. config.php está en .gitignore — NO se sube al repo.
 *
 * SMTP en SiteGround:
 *   - Crear un buzón en cPanel/Site Tools (p. ej. info@vision360ia.com).
 *   - Host SMTP autenticado de SiteGround: el panel te indica el host concreto
 *     (suele ser tu dominio o un subdominio mail.*). En la mayoría de planes
 *     vale "smtp.siteground.com" o el subdominio que muestre el panel.
 *   - Puerto 465 con SSL (recomendado) o 587 con TLS.
 */

define('SMTP_HOST',      'smtp.siteground.com');
define('SMTP_PORT',      465);
define('SMTP_SECURE',    'ssl');                       // 'ssl' (465) o 'tls' (587)
define('SMTP_USER',      'info@vision360ia.com');
define('SMTP_PASS',      'CAMBIA_ESTA_PASSWORD');

define('SMTP_FROM',      'info@vision360ia.com');
define('SMTP_FROM_NAME', 'Vision360IA');
define('MAIL_TO',        'info@vision360ia.com');

// Cloudflare Turnstile (secret key del panel de Cloudflare).
// Dejar '' para desactivar la verificación server-side (solo en desarrollo).
define('TURNSTILE_SECRET', '');
