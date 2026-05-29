<?php
declare(strict_types=1);

/**
 * Vision360IA - endpoint de formulario de contacto.
 *
 * Recibe JSON desde src/components/ui/contact-slideover.tsx, valida
 * (honeypot, time-trap, Turnstile, campos), envía email al equipo y
 * un email de confirmación al usuario con PHPMailer + SMTP autenticado.
 *
 * Setup:
 *   1. cp config.example.php config.php  (rellenar credenciales)
 *   2. composer install   (descarga PHPMailer en ./vendor/)
 *   3. subir esta carpeta entera (excepto composer.lock / vendor/ si ya están en servidor)
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$configPath = __DIR__ . '/config.php';
$autoloadPath = __DIR__ . '/vendor/autoload.php';

if (!is_file($configPath)) {
    http_response_code(500);
    error_log('[contacto.php] Falta config.php junto al endpoint');
    echo json_encode(['error' => 'Configuración del servidor incompleta']);
    exit;
}
if (!is_file($autoloadPath)) {
    http_response_code(500);
    error_log('[contacto.php] Falta vendor/autoload.php; ejecuta composer install');
    echo json_encode(['error' => 'Dependencias del servidor sin instalar']);
    exit;
}

require $configPath;
require $autoloadPath;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$raw = file_get_contents('php://input');
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Cuerpo de la petición inválido']);
    exit;
}

// Honeypots: si alguno trae valor, devolvemos 200 silencioso (no damos pistas al bot).
foreach (['website', 'address', 'url'] as $hp) {
    if (!empty($data[$hp])) {
        error_log('[contacto.php] honeypot disparado: ' . $hp);
        echo json_encode(['ok' => true]);
        exit;
    }
}

// Time-trap: rechazar si el formulario se envió en menos de 3s (bot).
$loadTime = isset($data['formLoadTime']) ? (int) $data['formLoadTime'] : 0;
if ($loadTime > 0 && (time() - $loadTime) < 3) {
    error_log('[contacto.php] time-trap disparado');
    echo json_encode(['ok' => true]);
    exit;
}

// Cloudflare Turnstile (solo si está configurada).
$turnstileSecret = defined('TURNSTILE_SECRET') ? TURNSTILE_SECRET : '';
$token = (string) ($data['token'] ?? '');
if ($turnstileSecret !== '') {
    if ($token === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Falta la verificación anti-spam']);
        exit;
    }
    $verify = postForm('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
        'secret'   => $turnstileSecret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);
    if (!is_array($verify) || empty($verify['success'])) {
        http_response_code(400);
        error_log('[contacto.php] turnstile fail: ' . json_encode($verify));
        echo json_encode(['error' => 'No hemos podido validar la verificación anti-spam']);
        exit;
    }
}

$name    = trim((string) ($data['name'] ?? ''));
$email   = trim((string) ($data['email'] ?? ''));
$company = trim((string) ($data['company'] ?? ''));
$phone   = trim((string) ($data['phone'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$privacy = !empty($data['privacyAccepted']);
$pageUrl = trim((string) ($data['pageUrl'] ?? ''));

if (strlen($name) < 2 || strlen($name) > 120) {
    http_response_code(400);
    echo json_encode(['error' => 'Nombre inválido']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 200) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}
if (strlen($message) < 10 || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['error' => 'Mensaje inválido']);
    exit;
}
if (!$privacy) {
    http_response_code(400);
    echo json_encode(['error' => 'Debes aceptar la política de privacidad']);
    exit;
}
if (preg_match_all('#https?://#i', $message) > 2) {
    error_log('[contacto.php] demasiados enlaces en el mensaje');
    http_response_code(400);
    echo json_encode(['error' => 'No se permiten varios enlaces en el mensaje']);
    exit;
}

try {
    // 1) Email al equipo
    $teamMail = buildMailer();
    $teamMail->addAddress(MAIL_TO);
    $teamMail->addReplyTo($email, $name);
    $teamMail->Subject = '[Vision360IA] Nuevo lead: ' . $name . ($company !== '' ? ' (' . $company . ')' : '');
    $teamMail->isHTML(true);
    $teamMail->Body    = renderTeamEmail($name, $email, $phone, $company, $message, $pageUrl);
    $teamMail->AltBody = renderTeamEmailPlain($name, $email, $phone, $company, $message, $pageUrl);
    $teamMail->send();

    // 2) Email de confirmación al usuario
    $userMail = buildMailer();
    $userMail->addAddress($email, $name);
    $userMail->Subject = 'Hemos recibido tu solicitud — Vision360IA';
    $userMail->isHTML(true);
    $userMail->Body    = renderUserConfirmation($name);
    $userMail->AltBody = renderUserConfirmationPlain($name);
    $userMail->send();

    echo json_encode(['ok' => true, 'message' => 'Hemos recibido tu solicitud']);
} catch (Exception $e) {
    http_response_code(502);
    error_log('[contacto.php] error SMTP: ' . $e->getMessage());
    echo json_encode(['error' => 'No hemos podido enviar el mensaje. Inténtalo más tarde o escribe a info@vision360ia.com']);
}

// ---------- helpers ----------

function buildMailer(): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->Port       = SMTP_PORT;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->CharSet    = 'UTF-8';
    $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
    return $mail;
}

function postForm(string $url, array $payload): mixed
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
    ]);
    $resp = curl_exec($ch);
    curl_close($ch);
    return $resp === false ? null : json_decode((string) $resp, true);
}

function esc(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

function renderTeamEmail(string $n, string $e, string $p, string $c, string $m, string $u): string
{
    $rows  = '<tr><td><b>Nombre</b></td><td>' . esc($n) . '</td></tr>';
    $rows .= '<tr><td><b>Email</b></td><td><a href="mailto:' . esc($e) . '">' . esc($e) . '</a></td></tr>';
    if ($p !== '') $rows .= '<tr><td><b>Teléfono</b></td><td>' . esc($p) . '</td></tr>';
    if ($c !== '') $rows .= '<tr><td><b>Empresa</b></td><td>' . esc($c) . '</td></tr>';
    if ($u !== '') $rows .= '<tr><td><b>Página</b></td><td>' . esc($u) . '</td></tr>';
    $msg = nl2br(esc($m));
    return <<<HTML
<!doctype html>
<html><body style="font-family:Arial,sans-serif;color:#1f2937">
  <h2 style="color:#0f172a">Nuevo lead en Vision360IA</h2>
  <table cellpadding="6" style="border-collapse:collapse">$rows</table>
  <h3>Mensaje</h3>
  <p style="background:#f1f5f9;padding:12px;border-radius:6px">$msg</p>
</body></html>
HTML;
}

function renderTeamEmailPlain(string $n, string $e, string $p, string $c, string $m, string $u): string
{
    $lines = ['Nuevo lead en Vision360IA', '', "Nombre: $n", "Email: $e"];
    if ($p !== '') $lines[] = "Teléfono: $p";
    if ($c !== '') $lines[] = "Empresa: $c";
    if ($u !== '') $lines[] = "Página: $u";
    $lines[] = '';
    $lines[] = 'Mensaje:';
    $lines[] = $m;
    return implode("\n", $lines);
}

function renderUserConfirmation(string $n): string
{
    $name = esc($n);
    return <<<HTML
<!doctype html>
<html><body style="font-family:Arial,sans-serif;color:#1f2937;max-width:560px">
  <h2 style="color:#0f172a">Hola $name,</h2>
  <p>Gracias por contactar con <b>Vision360IA</b>. Hemos recibido tu solicitud y un miembro de nuestro equipo te responderá en las próximas horas con la información técnica que pediste.</p>
  <p>Si lo prefieres, puedes responder directamente a este correo o escribirnos a <a href="mailto:info@vision360ia.com">info@vision360ia.com</a>.</p>
  <p style="margin-top:24px;color:#475569;font-size:13px">— El equipo de Vision360IA</p>
</body></html>
HTML;
}

function renderUserConfirmationPlain(string $n): string
{
    return "Hola $n,\n\nGracias por contactar con Vision360IA. Hemos recibido tu solicitud y un miembro de nuestro equipo te responderá en las próximas horas con la información técnica que pediste.\n\nSi lo prefieres, puedes responder directamente a este correo o escribirnos a info@vision360ia.com.\n\n— El equipo de Vision360IA";
}
