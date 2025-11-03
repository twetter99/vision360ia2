<?php
/**
 * Storage - Persistencia de envíos
 */

class Storage {
    /**
     * Guarda el envío en formato JSON
     */
    public static function saveSubmission($data, $metadata) {
        $timestamp = time();
        $filename = date('Y-m-d_His') . '_' . substr(md5($data['email'] . $timestamp), 0, 8) . '.json';
        $filepath = SUBMISSIONS_PATH . '/' . $filename;
        
        $record = [
            'timestamp' => $timestamp,
            'datetime' => date('Y-m-d H:i:s'),
            'ip' => $metadata['ip'],
            'userAgent' => $metadata['userAgent'],
            'pageUrl' => $metadata['pageUrl'],
            'data' => $data,
            'utm' => $metadata['utm'] ?? []
        ];
        
        $success = @file_put_contents(
            $filepath,
            json_encode($record, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT),
            LOCK_EX
        );
        
        if (!$success) {
            Logger::error('Failed to save submission', ['filepath' => $filepath]);
            return false;
        }
        
        Logger::info('Submission saved', ['file' => $filename]);
        
        // También agregar a CSV para análisis fácil
        self::appendToCSV($data, $metadata);
        
        return true;
    }
    
    /**
     * Agrega el envío a un archivo CSV
     */
    private static function appendToCSV($data, $metadata) {
        $csvFile = SUBMISSIONS_PATH . '/submissions_' . date('Y-m') . '.csv';
        $isNewFile = !file_exists($csvFile);
        
        $handle = @fopen($csvFile, 'a');
        if (!$handle) return false;
        
        // Escribir encabezados si es nuevo
        if ($isNewFile) {
            fputcsv($handle, [
                'Fecha',
                'IP',
                'Nombre',
                'Email',
                'Empresa',
                'Tipo Vehículo',
                'Ubicación',
                'Preocupaciones',
                'User Agent',
                'Página'
            ]);
        }
        
        // Escribir datos
        fputcsv($handle, [
            date('Y-m-d H:i:s'),
            $metadata['ip'],
            $data['name'],
            $data['email'],
            $data['company'] ?? '',
            $data['vehicleType'],
            $data['location'] ?? '',
            substr($data['specificConcerns'] ?? '', 0, 200),
            substr($metadata['userAgent'], 0, 100),
            $metadata['pageUrl']
        ]);
        
        fclose($handle);
        return true;
    }
    
    /**
     * Limpieza de archivos antiguos (opcional)
     */
    public static function cleanup($days = 90) {
        $files = glob(SUBMISSIONS_PATH . '/*.json');
        $threshold = time() - ($days * 86400);
        $deleted = 0;
        
        foreach ($files as $file) {
            if (filemtime($file) < $threshold) {
                if (@unlink($file)) {
                    $deleted++;
                }
            }
        }
        
        if ($deleted > 0) {
            Logger::info("Cleaned up $deleted old submission files");
        }
        
        return $deleted;
    }
}
