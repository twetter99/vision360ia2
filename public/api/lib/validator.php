<?php
/**
 * Validador de campos del formulario
 */

class Validator {
    private $errors = [];
    
    public function validate($data) {
        $this->errors = [];
        
        // Nombre (requerido, 2-100 caracteres)
        if (empty($data['name'])) {
            $this->addError('name', 'El nombre completo es obligatorio');
        } elseif (strlen($data['name']) < 2 || strlen($data['name']) > 100) {
            $this->addError('name', 'El nombre debe tener entre 2 y 100 caracteres');
        }
        
        // Email (requerido, válido)
        if (empty($data['email'])) {
            $this->addError('email', 'El email es obligatorio');
        } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $this->addError('email', 'Introduce un email válido');
        } elseif (strlen($data['email']) > 255) {
            $this->addError('email', 'El email es demasiado largo');
        }
        
        // Empresa (opcional, max 100 caracteres)
        if (!empty($data['company']) && strlen($data['company']) > 100) {
            $this->addError('company', 'El nombre de la empresa es demasiado largo');
        }
        
        // Tipo de vehículo (requerido, debe estar en la lista)
        if (empty($data['vehicleType'])) {
            $this->addError('vehicleType', 'Selecciona el tipo de vehículo');
        } elseif (!in_array($data['vehicleType'], VALID_VEHICLE_TYPES)) {
            $this->addError('vehicleType', 'Tipo de vehículo no válido');
        }
        
        // Ubicación (opcional, max 100 caracteres)
        if (!empty($data['location']) && strlen($data['location']) > 100) {
            $this->addError('location', 'La ubicación es demasiado larga');
        }
        
        // Preocupaciones específicas (opcional, max 2000 caracteres)
        if (!empty($data['specificConcerns']) && strlen($data['specificConcerns']) > 2000) {
            $this->addError('specificConcerns', 'El mensaje es demasiado largo (máximo 2000 caracteres)');
        }
        
        return empty($this->errors);
    }
    
    private function addError($field, $message) {
        $this->errors[] = [
            'field' => $field,
            'error' => $message
        ];
    }
    
    public function getErrors() {
        return $this->errors;
    }
    
    public function getFirstError() {
        return $this->errors[0] ?? null;
    }
    
    /**
     * Sanitiza los datos de entrada
     */
    public static function sanitize($data) {
        $sanitized = [];
        
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                // Eliminar HTML y scripts
                $value = strip_tags($value);
                // Eliminar espacios extra
                $value = trim($value);
                // Prevenir inyecciones
                $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
            }
            $sanitized[$key] = $value;
        }
        
        return $sanitized;
    }
}
