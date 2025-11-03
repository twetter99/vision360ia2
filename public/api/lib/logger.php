<?php
/**
 * Logger del sistema
 */

class Logger {
    private static function write($type, $message, $context = []) {
        $logFile = LOGS_PATH . '/' . $type . '_' . date('Y-m-d') . '.log';
        $timestamp = date('Y-m-d H:i:s');
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'UNKNOWN';
        
        $logEntry = sprintf(
            "[%s] IP: %s | UA: %s | %s | Context: %s\n",
            $timestamp,
            $ip,
            substr($userAgent, 0, 100),
            $message,
            json_encode($context, JSON_UNESCAPED_UNICODE)
        );
        
        @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
    }
    
    public static function info($message, $context = []) {
        self::write('info', $message, $context);
    }
    
    public static function error($message, $context = []) {
        self::write('error', $message, $context);
    }
    
    public static function security($message, $context = []) {
        self::write('security', $message, $context);
    }
    
    public static function submission($data) {
        $logFile = LOGS_PATH . '/submissions_' . date('Y-m-d') . '.log';
        $timestamp = date('Y-m-d H:i:s');
        
        $logEntry = sprintf(
            "[%s] Submission: %s\n",
            $timestamp,
            json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
        );
        
        @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
    }
}
