# Sistema de Formularios con PHP + SMTP

Sistema completo de formularios sin dependencias externas, usando PHP y SMTP nativo.

## 📁 Estructura

```
public/
  api/
    form/
      contacto.php          # Endpoint principal
    lib/
      config.php            # Configuración
      logger.php            # Sistema de logs
      rate_limiter.php      # Control de spam por IP
      validator.php         # Validación de campos
      mailer.php            # Envío de emails
      storage.php           # Persistencia de datos

secure_storage/             # ⚠️ FUERA DE public_html en producción
  submissions/              # Envíos guardados (JSON + CSV)
  logs/                     # Logs del sistema
  .htaccess                 # Protección web
```

## 🚀 Configuración

### 1. Variables de Entorno

Crea `.env.local` (copia desde `.env.local.example`):

```bash
# SMTP (SiteGround)
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=tu-email@tudominio.com
SMTP_PASS=tu-password
SMTP_SECURE=tls

# Emails
MAIL_TO=contacto@tudominio.com
MAIL_FROM=noreply@tudominio.com
MAIL_FROM_NAME=Vision360 IA
MAIL_BCC=
```

### 2. Configuración en SiteGround

#### Opción A: Variables de Entorno (Recomendado)

1. Panel de SiteGround → **Site Tools**
2. **Dev → Environment Variables**
3. Agregar cada variable:
   - `SMTP_HOST` = `localhost`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = tu email completo
   - `SMTP_PASS` = contraseña del email
   - `MAIL_TO` = email donde recibirás formularios
   - etc.

#### Opción B: Archivo .env.local

1. Subir `.env.local` a la raíz del proyecto
2. Asegúrate de que NO esté en `public_html`

### 3. Mover `secure_storage`

⚠️ **IMPORTANTE EN PRODUCCIÓN:**

```bash
# Mover fuera de public_html
mv public_html/secure_storage ~/secure_storage

# Actualizar ruta en config.php:
define('STORAGE_PATH', '/home/usuario/secure_storage');
```

### 4. Permisos

```bash
chmod 755 public_html/api/form/contacto.php
chmod 755 public_html/api/lib/*.php
chmod 777 secure_storage/submissions/
chmod 777 secure_storage/logs/
```

## 🧪 Pruebas

### Test Manual

```bash
curl -X POST https://tudominio.com/api/form/contacto.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@test.com",
    "vehicleType": "Turismo",
    "formLoadTime": '$(date +%s)'
  }'
```

### Respuestas Esperadas

**✅ Éxito (200):**
```json
{
  "ok": true,
  "message": "Solicitud recibida correctamente..."
}
```

**❌ Validación (422):**
```json
{
  "ok": false,
  "field": "email",
  "error": "Introduce un email válido"
}
```

**⏳ Rate Limit (429):**
```json
{
  "ok": false,
  "error": "Too Many Requests",
  "message": "Has excedido el límite..."
}
```

**🔥 Error Servidor (500):**
```json
{
  "ok": false,
  "error": "Server Error",
  "message": "Ha ocurrido un error..."
}
```

## 🔒 Seguridad Implementada

✅ **Honeypot** - Campo oculto para detectar bots  
✅ **Rate Limiting** - 5 envíos/hora por IP  
✅ **Tiempo mínimo** - 3s desde carga del form  
✅ **Validación Origin** - Solo dominios permitidos  
✅ **Sanitización** - Strip HTML y caracteres peligrosos  
✅ **Tamaño POST** - Máximo 200 KB  
✅ **CORS** - Control de orígenes  

## 📊 Logs y Datos

### Logs

```
secure_storage/logs/
  info_2025-10-28.log           # Eventos normales
  error_2025-10-28.log          # Errores
  security_2025-10-28.log       # Intentos de spam/ataques
  submissions_2025-10-28.log    # Resumen de envíos
```

### Envíos Guardados

```
secure_storage/submissions/
  2025-10-28_143022_a3f9b8c1.json    # Detalle completo
  submissions_2025-10.csv              # Resumen mensual (Excel)
```

## 🛠️ Mantenimiento

### Limpieza Automática

- **Rate limit:** Archivos +24h se eliminan automáticamente
- **Envíos:** Se guardan 90 días (configurable en `Storage::cleanup()`)

### Manual

```bash
# Ver logs de hoy
tail -f secure_storage/logs/info_$(date +%Y-%m-%d).log

# Ver envíos del mes
cat secure_storage/submissions/submissions_$(date +%Y-%m).csv

# Limpiar rate limit manualmente
rm secure_storage/rate_limit_*.json
```

## 🚨 Troubleshooting

### No recibo emails

1. Verificar `MAIL_TO` en config
2. Revisar logs: `secure_storage/logs/error_*.log`
3. Verificar spam/correo no deseado
4. Test SMTP de SiteGround:
   ```bash
   php -r "mail('tu@email.com', 'Test', 'Test message');"
   ```

### Error 500

1. Ver `secure_storage/logs/error_*.log`
2. Verificar permisos de escritura
3. Comprobar sintaxis PHP:
   ```bash
   php -l public_html/api/form/contacto.php
   ```

### Rate limit muy estricto

Editar en `public/api/lib/config.php`:

```php
define('RATE_LIMIT_MAX', 10);  // Aumentar a 10
define('RATE_LIMIT_WINDOW', 7200);  // 2 horas
```

### CORS errors

Agregar tu dominio en `config.php`:

```php
define('ALLOWED_ORIGINS', [
    'https://tudominio.com',
    'https://www.tudominio.com',
]);
```

## 📝 Notas de Migración

### Eliminado de Formspree

- ✅ Desinstalada librería `@formspree/react`
- ✅ Eliminado código de integración
- ✅ Mantenidos todos los campos del formulario
- ✅ Mejorada UX con mensajes de error específicos

### Campos del Formulario

- `name` - Nombre completo (requerido, 2-100 chars)
- `email` - Email (requerido, validación estricta)
- `company` - Empresa (opcional, max 100 chars)
- `vehicleType` - Tipo vehículo (requerido, lista cerrada)
- `location` - Ubicación (opcional, max 100 chars)
- `specificConcerns` - Comentarios (opcional, max 2000 chars)

## 🎯 Mejoras Futuras

- [ ] Panel de administración para ver envíos
- [ ] Exportar datos a Google Sheets
- [ ] Notificaciones a Slack/Telegram
- [ ] Integración con CRM
- [ ] Captcha visual para casos de mucho spam
- [ ] Estadísticas de conversión

## 📞 Soporte

Si encuentras problemas:

1. Revisar logs en `secure_storage/logs/`
2. Verificar permisos de carpetas
3. Comprobar variables de entorno
4. Test con curl/Postman

---

**Sistema creado:** Octubre 2025  
**Compatibilidad:** PHP 7.4+, SiteGround, cPanel  
**Sin dependencias externas** ✨
