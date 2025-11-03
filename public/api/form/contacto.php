<?php
/**
 * Endpoint principal del formulario de contacto
 * POST /api/form/contacto.php
 */

// Headers de seguridad
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Importar dependencias
require_once __DIR__ . '/../lib/config.php';
require_once __DIR__ . '/../lib/logger.php';
require_once __DIR__ . '/../lib/rate_limiter.php';
require_once __DIR__ . '/../lib/validator.php';
require_once __DIR__ . '/../lib/mailer.php';
require_once __DIR__ . '/../lib/storage.php';

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method Not Allowed']);
    Logger::security('Invalid request method', ['method' => $_SERVER['REQUEST_METHOD']]);
    exit;
}

// Obtener datos
$input = file_get_contents('php://input');
$contentLength = strlen($input);

// Verificar tamaño del POST
if ($contentLength > MAX_POST_SIZE) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'Payload Too Large']);
    Logger::security('POST size exceeded', ['size' => $contentLength]);
    exit;
}

// Decodificar JSON
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    Logger::error('JSON decode error', ['error' => json_last_error_msg()]);
    exit;
}

// Verificar origen (CORS y seguridad)
$origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$isValidOrigin = false;

foreach (ALLOWED_ORIGINS as $allowedOrigin) {
    if (strpos($origin, $allowedOrigin) === 0) {
        $isValidOrigin = true;
        header('Access-Control-Allow-Origin: ' . $allowedOrigin);
        break;
    }
}

if (!$isValidOrigin && !empty($origin)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Forbidden']);
    Logger::security('Invalid origin', ['origin' => $origin]);
    exit;
}

header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Obtener IP del usuario
$ip = $_SERVER['REMOTE_ADDR'];
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
}

// Rate limiting
if (!RateLimiter::check($ip)) {
    http_response_code(429);
    echo json_encode([
        'ok' => false,
        'error' => 'Too Many Requests',
        'message' => 'Has excedido el límite de envíos. Inténtalo de nuevo más tarde.'
    ]);
    exit;
}

// Verificar honeypot (campo oculto que los bots rellenan)
if (!empty($data['website']) || !empty($data['url'])) {
    // Bot detectado
    http_response_code(200); // Responder con éxito para engañar al bot
    echo json_encode(['ok' => true, 'message' => 'Solicitud recibida']);
    Logger::security('Honeypot triggered', ['ip' => $ip]);
    exit;
}

// Verificar tiempo mínimo de envío (anti-bot)
if (isset($data['formLoadTime'])) {
    $formLoadTime = intval($data['formLoadTime']);
    $currentTime = time();
    $timeDiff = $currentTime - $formLoadTime;
    
    if ($timeDiff < MIN_SUBMIT_TIME) {
        http_response_code(200); // Responder con éxito para engañar al bot
        echo json_encode(['ok' => true, 'message' => 'Solicitud recibida']);
        Logger::security('Submit too fast', ['ip' => $ip, 'time_diff' => $timeDiff]);
        exit;
    }
}

// Sanitizar datos
$sanitizedData = Validator::sanitize($data);

// Validar campos
$validator = new Validator();
if (!$validator->validate($sanitizedData)) {
    http_response_code(422);
    $firstError = $validator->getFirstError();
    echo json_encode([
        'ok' => false,
        'field' => $firstError['field'],
        'error' => $firstError['error']
    ]);
    Logger::info('Validation failed', ['errors' => $validator->getErrors()]);
    exit;
}

// Preparar metadata
$metadata = [
    'timestamp' => date('Y-m-d H:i:s'),
    'ip' => $ip,
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown',
    'pageUrl' => $data['pageUrl'] ?? 'Unknown',
    'utm' => [
        'source' => $data['utm_source'] ?? null,
        'medium' => $data['utm_medium'] ?? null,
        'campaign' => $data['utm_campaign'] ?? null,
    ]
];

// Guardar en almacenamiento
try {
    Storage::saveSubmission($sanitizedData, $metadata);
} catch (Exception $e) {
    Logger::error('Storage failed', ['error' => $e->getMessage()]);
    // No fallar si falla el storage, continuar con el envío
}

// Enviar email
try {
    $mailer = new Mailer();
    $emailSent = $mailer->sendNotification($sanitizedData, $metadata);
    
    if (!$emailSent) {
        throw new Exception('Email send failed');
    }
    
    // Enviar auto-respuesta al usuario (opcional)
    $mailer->sendAutoReply($sanitizedData['email'], $sanitizedData['name']);
    
} catch (Exception $e) {
    Logger::error('Email failed', ['error' => $e->getMessage()]);
    
    // Responder con error 500 pero sin exponer detalles
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Server Error',
        'message' => 'Ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo.'
    ]);
    exit;
}

// Log del envío exitoso
Logger::submission([
    'data' => $sanitizedData,
    'metadata' => $metadata
]);

// Respuesta exitosa
http_response_code(200);
echo json_encode([
    'ok' => true,
    'message' => 'Solicitud recibida correctamente. Te contactaremos pronto.'
]);

// Limpieza periódica (1% de probabilidad)
if (rand(1, 100) === 1) {
    RateLimiter::cleanup();
    Storage::cleanup(90);
}
