<?php
/**
 * Mailer - Envío de correos via SMTP
 */

class Mailer {
    private $smtp;
    
    public function __construct() {
        // Configuración SMTP usando PHPMailer o mail() nativo
        // Para SiteGround, usaremos mail() nativo ya que está preconfigurado
    }
    
    /**
     * Envía el correo de notificación
     */
    public function sendNotification($data, $metadata) {
        $to = MAIL_TO;
        $subject = sprintf(
            '[Vision360 IA] Nueva consultoría - %s (%s)',
            $data['name'],
            $data['vehicleType']
        );
        
        $message = $this->buildEmailBody($data, $metadata);
        
        $headers = [
            'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM . '>',
            'Reply-To: ' . $data['email'],
            'Content-Type: text/html; charset=UTF-8',
            'X-Mailer: PHP/' . phpversion()
        ];
        
        if (!empty(MAIL_BCC)) {
            $headers[] = 'Bcc: ' . MAIL_BCC;
        }
        
        $success = @mail($to, $subject, $message, implode("\r\n", $headers));
        
        if (!$success) {
            Logger::error('Failed to send email', [
                'to' => $to,
                'subject' => $subject,
                'error' => error_get_last()
            ]);
            return false;
        }
        
        Logger::info('Email sent successfully', ['to' => $to, 'subject' => $subject]);
        return true;
    }
    
    /**
     * Envía correo de auto-respuesta al usuario
     */
    public function sendAutoReply($email, $name) {
        $subject = '¡Gracias por tu consulta! - Vision360 IA';
        
        $message = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡Gracias por tu consulta!</h1>
        </div>
        <div class="content">
            <p>Hola <strong>$name</strong>,</p>
            <p>Hemos recibido tu solicitud de consultoría personalizada. Nuestro equipo de expertos la revisará y se pondrá en contacto contigo en un plazo máximo de <strong>24 horas</strong>.</p>
            <p>Mientras tanto, si tienes alguna pregunta urgente, no dudes en responder a este correo.</p>
            <p>Saludos cordiales,<br><strong>Equipo Vision360 IA</strong></p>
        </div>
        <div class="footer">
            <p>Este es un mensaje automático. Por favor, no respondas a este correo.</p>
        </div>
    </div>
</body>
</html>
HTML;
        
        $headers = [
            'From: ' . MAIL_FROM_NAME . ' <' . MAIL_FROM . '>',
            'Content-Type: text/html; charset=UTF-8',
            'X-Mailer: PHP/' . phpversion()
        ];
        
        return @mail($email, $subject, $message, implode("\r\n", $headers));
    }
    
    /**
     * Construye el cuerpo del email de notificación
     */
    private function buildEmailBody($data, $metadata) {
        $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-left: 3px solid #667eea; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-top: 5px; }
        .metadata { margin-top: 30px; padding: 15px; background: #f0f0f0; border-radius: 5px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📩 Nueva Solicitud de Consultoría</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">👤 Nombre Completo:</div>
                <div class="value">{$data['name']}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:{$data['email']}">{$data['email']}</a></div>
            </div>
            
            <div class="field">
                <div class="label">🏢 Empresa:</div>
                <div class="value">{$data['company']}</div>
            </div>
            
            <div class="field">
                <div class="label">🚗 Tipo de Vehículo:</div>
                <div class="value">{$data['vehicleType']}</div>
            </div>
            
            <div class="field">
                <div class="label">📍 Ubicación:</div>
                <div class="value">{$data['location']}</div>
            </div>
            
            <div class="field">
                <div class="label">💬 Preocupaciones Específicas:</div>
                <div class="value">{$data['specificConcerns']}</div>
            </div>
            
            <div class="metadata">
                <strong>Metadata:</strong><br>
                📅 Fecha: {$metadata['timestamp']}<br>
                🌐 IP: {$metadata['ip']}<br>
                🖥️ User Agent: {$metadata['userAgent']}<br>
                🔗 Página: {$metadata['pageUrl']}
            </div>
        </div>
    </div>
</body>
</html>
HTML;
        
        return $html;
    }
}
