# 🚀 Guía de Deploy a Vercel - Vision360IA

## 📋 Pre-requisitos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio en GitHub conectado
- Variables de entorno preparadas

## 🔧 Paso 1: Configurar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel → **Settings** → **Environment Variables** y agrega:

### Variables SMTP (Obligatorias)

| Variable | Valor | Entornos |
|----------|-------|----------|
| `SMTP_HOST` | `mail.tudominio.com` | Production, Preview, Development |
| `SMTP_PORT` | `587` | Production, Preview, Development |
| `SMTP_SECURE` | `false` | Production, Preview, Development |
| `SMTP_USER` | `noreply@tudominio.com` | Production, Preview, Development |
| `SMTP_PASS` | `TU_CONTRASEÑA_SMTP` | Production, Preview, Development |
| `MAIL_TO` | `info@tudominio.com` | Production, Preview, Development |

### Desde CLI (alternativo):

```bash
vercel env add SMTP_HOST production
# Ingresa: mail.vision360ia.com

vercel env add SMTP_PORT production
# Ingresa: 587

vercel env add SMTP_SECURE production
# Ingresa: false

vercel env add SMTP_USER production
# Ingresa: tu usuario SMTP

vercel env add SMTP_PASS production
# Ingresa: tu contraseña SMTP

vercel env add MAIL_TO production
# Ingresa: tu email de destino
```

## 📦 Paso 2: Deploy desde GitHub

### Opción A: Automático (Recomendado)

1. Push tu código a GitHub:
   ```bash
   git add .
   git commit -m "feat: prepare for Vercel deployment"
   git push origin main
   ```

2. En Vercel:
   - **New Project** → Importar tu repositorio
   - Framework: **Next.js** (autodetectado)
   - Root Directory: `./`
   - Build Command: `npm run build` (autodetectado)
   - Click **Deploy**

### Opción B: Desde CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## ⚙️ Paso 3: Configuración Post-Deploy

### Dominio Personalizado

1. Vercel Dashboard → **Settings** → **Domains**
2. Agregar: `vision360ia.com` y `www.vision360ia.com`
3. Configurar DNS según instrucciones de Vercel

### Verificar Funcionamiento del Formulario

1. Ve a tu web desplegada
2. Abre el modal de contacto
3. Envía un formulario de prueba
4. Verifica que llegue el email a `info@vision360ia.com`

## 🐛 Troubleshooting

### Error: "SMTP Connection Failed"

**Solución**: Verifica que las variables de entorno estén configuradas correctamente en Vercel.

```bash
# Ver variables configuradas
vercel env ls
```

### Error: "Build Failed"

**Solución**: Revisa los logs de build en Vercel. Comunes:
- Errores de TypeScript → Ejecuta `npm run typecheck` localmente
- Dependencias faltantes → Ejecuta `npm install` localmente

### El formulario no envía emails

**Solución**: 
1. Revisa los logs de la función en Vercel → **Functions** → `/api/form/contacto`
2. Verifica las credenciales SMTP
3. Prueba el endpoint directamente:

```bash
curl -X POST https://tu-dominio.vercel.app/api/form/contacto \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "company": "Test Co",
    "vehicleType": "1-20",
    "specificConcerns": "Prueba de formulario",
    "formLoadTime": 1234567890,
    "pageUrl": "https://tu-dominio.vercel.app"
  }'
```

## 📊 Monitoreo

### Ver Logs en Tiempo Real

```bash
vercel logs
```

### Analytics

- Vercel Dashboard → **Analytics**
- Revisa tráfico, performance y errores

## 🔄 Actualizaciones Futuras

Cada push a `main` desplegará automáticamente a producción.

Para preview branches:
```bash
git checkout -b feature/nueva-funcionalidad
git push origin feature/nueva-funcionalidad
# Vercel creará un preview deployment automáticamente
```

## ⚠️ Notas Importantes

1. **PHP no funciona en Vercel**: Los archivos en `public/api/*.php` se ignoran. Usa el API Route de Next.js en `src/app/api/form/contacto/route.ts`

2. **Variables de entorno**: Nunca commitees `.env.local` a GitHub

3. **Límites de Vercel (Plan Free)**:
   - 100 GB bandwidth/mes
   - 100,000 invocaciones de funciones/mes
   - 10 segundos de timeout por función

## 🎉 ¡Listo!

Tu aplicación estará en:
- **Production**: `https://tu-proyecto.vercel.app`
- **Dominio custom**: `https://vision360ia.com` (cuando lo configures)

---

**Creado**: 24 de noviembre de 2025  
**Proyecto**: Vision360IA v2  
**Framework**: Next.js 15.3.3
