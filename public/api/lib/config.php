<?php
/**
 * Configuración del sistema de formularios
 * Variables de entorno desde SiteGround
 */

// Cargar variables de entorno (compatibilidad con .env local y servidor)
function loadEnv() {
    $envFile = __DIR__ . '/../../../.env.local';
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
}

loadEnv();

// Configuración SMTP
define('SMTP_HOST', getenv('SMTP_HOST') ?: $_ENV['SMTP_HOST'] ?? 'localhost');
define('SMTP_PORT', getenv('SMTP_PORT') ?: $_ENV['SMTP_PORT'] ?? 587);
define('SMTP_USER', getenv('SMTP_USER') ?: $_ENV['SMTP_USER'] ?? '');
define('SMTP_PASS', getenv('SMTP_PASS') ?: $_ENV['SMTP_PASS'] ?? '');
define('SMTP_SECURE', getenv('SMTP_SECURE') ?: $_ENV['SMTP_SECURE'] ?? 'tls'); // tls o ssl

// Configuración de correo
define('MAIL_TO', getenv('MAIL_TO') ?: $_ENV['MAIL_TO'] ?? 'contacto@tudominio.com');
define('MAIL_FROM', getenv('MAIL_FROM') ?: $_ENV['MAIL_FROM'] ?? 'noreply@tudominio.com');
define('MAIL_FROM_NAME', getenv('MAIL_FROM_NAME') ?: $_ENV['MAIL_FROM_NAME'] ?? 'Vision360 IA');
define('MAIL_BCC', getenv('MAIL_BCC') ?: $_ENV['MAIL_BCC'] ?? '');

// Rutas de almacenamiento (fuera de public_html en producción)
define('STORAGE_PATH', __DIR__ . '/../../../secure_storage');
define('SUBMISSIONS_PATH', STORAGE_PATH . '/submissions');
define('LOGS_PATH', STORAGE_PATH . '/logs');

// Seguridad
define('MAX_POST_SIZE', 200 * 1024); // 200 KB
define('RATE_LIMIT_MAX', 5); // Máximo de envíos por hora
define('RATE_LIMIT_WINDOW', 3600); // 1 hora en segundos
define('MIN_SUBMIT_TIME', 3); // Mínimo 3 segundos desde que se carga el form
define('ALLOWED_ORIGINS', [
    'http://localhost:9002',
    'http://localhost:3000',
    'https://tudominio.com',
    'https://www.tudominio.com'
]);

// Campos válidos del formulario
define('VALID_VEHICLE_TYPES', [
    'Turismo',
    'SUV/4x4',
    'Furgoneta',
    'Camión',
    'Autobús',
    'Maquinaria Industrial',
    'Motocicleta',
    'Otro'
]);

// Timezone
date_default_timezone_set('Europe/Madrid');
