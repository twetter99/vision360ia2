<?php
/**
 * Rate Limiter - Control de envíos por IP
 */

class RateLimiter {
    private static function getRateLimitFile($ip) {
        return STORAGE_PATH . '/rate_limit_' . md5($ip) . '.json';
    }
    
    public static function check($ip) {
        $file = self::getRateLimitFile($ip);
        $now = time();
        
        // Leer intentos previos
        $attempts = [];
        if (file_exists($file)) {
            $content = @file_get_contents($file);
            $attempts = json_decode($content, true) ?: [];
        }
        
        // Limpiar intentos antiguos (fuera de la ventana de tiempo)
        $attempts = array_filter($attempts, function($timestamp) use ($now) {
            return ($now - $timestamp) < RATE_LIMIT_WINDOW;
        });
        
        // Verificar si excede el límite
        if (count($attempts) >= RATE_LIMIT_MAX) {
            Logger::security('Rate limit exceeded', ['ip' => $ip, 'attempts' => count($attempts)]);
            return false;
        }
        
        // Agregar nuevo intento
        $attempts[] = $now;
        @file_put_contents($file, json_encode($attempts), LOCK_EX);
        
        return true;
    }
    
    public static function cleanup() {
        // Limpiar archivos de rate limit antiguos (más de 24 horas)
        $files = glob(STORAGE_PATH . '/rate_limit_*.json');
        $now = time();
        
        foreach ($files as $file) {
            if ($now - filemtime($file) > 86400) {
                @unlink($file);
            }
        }
    }
}
