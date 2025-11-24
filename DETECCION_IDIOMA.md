# Sistema de Detección Automática de Idioma por Geolocalización

## 📋 Resumen

El sistema detecta automáticamente el idioma preferido del usuario basándose en su ubicación geográfica (IP) y establece el idioma de la interfaz sin intervención del usuario.

## 🔄 Flujo Completo

```
Usuario visita la web
        ↓
Middleware intercepta la petición
        ↓
Detecta región desde request.geo (Vercel Edge)
        ↓
Aplica lógica de detección:
  - Euskadi (BI, SS, VI, PV) → "eu"
  - Cataluña/Baleares/Valencia (CT, IB, VC, etc.) → "ca"
  - Resto del mundo → "es"
        ↓
Establece cookie 'lang' con el idioma detectado
        ↓
LanguageProvider lee la cookie en el cliente
        ↓
Interfaz se renderiza en el idioma correcto desde el primer momento
```

## 🛠️ Archivos Modificados

### 1. `middleware.ts` (NUEVO)

**Ubicación:** Raíz del proyecto (`c:\Dev\vision360ia2\middleware.ts`)

**Función:** Intercepta todas las peticiones HTTP antes de que lleguen a los componentes de React.

**Lógica de detección:**

```typescript
- request.geo.country !== "es" → "es" (español)
- request.geo.region in ["BI", "SS", "VI", "PV", "EUS", "ES-PV"] → "eu" (euskera)
- request.geo.region in ["CT", "CAT", "B", "GI", "L", "T", "IB", "PM", "VC", "V", "CV"] → "ca" (catalán)
- Resto → "es" (español)
```

**Rutas excluidas** (no se procesa middleware):
- `/_next/*` (archivos estáticos de Next.js)
- `/api/*` (endpoints de API)
- `/favicon.ico`, `/robots.txt`, `/sitemap.xml`
- `/images/*`, `/fonts/*`

**Cookie establecida:**
- Nombre: `lang`
- Valores posibles: `es`, `ca`, `eu`
- Duración: 1 año
- Path: `/`
- SameSite: `lax`

**Comportamiento:**
- Si la cookie `lang` YA existe → No hace nada (respeta la preferencia del usuario)
- Si NO existe cookie → Detecta el idioma y la establece

---

### 2. `src/context/language-provider.tsx` (MODIFICADO)

**Cambios realizados:**

Se modificó el `useEffect` de inicialización para seguir esta jerarquía de prioridades:

1. **localStorage** (`language` key) → Preferencia explícita del usuario
2. **Cookie `lang`** → Idioma detectado por geolocalización (middleware)
3. **navigator.language** → Idioma del navegador (fallback)

**Código añadido:**

```typescript
// Leer cookie 'lang' establecida por el middleware
const cookieLang = document.cookie
  .split('; ')
  .find(row => row.startsWith('lang='))
  ?.split('=')[1] as Language | undefined;

if (cookieLang && ['es', 'ca', 'eu'].includes(cookieLang)) {
  setLanguageState(cookieLang);
  localStorage.setItem('language', cookieLang);
  setIsInitialized(true);
  return;
}
```

**Ventaja:**
- Si el usuario cambia manualmente el idioma (mediante el selector), esto se guarda en localStorage y tiene prioridad sobre la cookie en futuras visitas.

---

## 🌍 Códigos de Región Soportados

### Euskadi (Idioma: `eu`)
- `BI` → Bizkaia
- `SS` → Gipuzkoa
- `VI` → Araba/Álava
- `PV` → País Vasco (genérico)
- `EUS` → Euskadi (alternativo)
- `ES-PV` → País Vasco (formato ISO)

### Cataluña (Idioma: `ca`)
- `CT`, `CAT`, `ES-CT` → Cataluña (genérico)
- `B` → Barcelona
- `GI` → Girona
- `L` → Lleida
- `T` → Tarragona

### Baleares (Idioma: `ca`)
- `IB`, `BAL`, `ES-IB` → Islas Baleares (genérico)
- `PM` → Palma de Mallorca

### Valencia (Idioma: `ca`)
- `VC`, `V`, `ES-VC`, `ES-V` → Valencia (genérico)
- `CV` → Comunidad Valenciana

### Resto del mundo
- Cualquier otro país o región → `es` (español)

---

## 🧪 Testing

### En desarrollo (localhost)

Vercel Edge no está disponible en desarrollo local, por lo que `request.geo` será `undefined`.

**Resultado:** Todos los usuarios verán español (`es`) por defecto en localhost.

**Para probar la detección:**
1. Desplegar en Vercel
2. Usar una VPN para simular diferentes ubicaciones
3. Borrar cookies antes de cada prueba: `document.cookie = "lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"`

### En producción (Vercel)

Vercel Edge proporciona automáticamente `request.geo` con:
- `geo.country` (código ISO del país, ej: "ES", "FR", "US")
- `geo.region` (código de región/provincia, ej: "CT", "BI", "IB")
- `geo.city` (ciudad, opcional)

**Prueba práctica:**
```bash
# Ver información geo en consola del navegador
console.log(document.cookie); // Debería mostrar "lang=eu" (si estás en Euskadi)
```

---

## 🔧 Configuración de Vercel

No se requiere configuración adicional en Vercel. El objeto `request.geo` está disponible automáticamente en todos los planes (Free, Pro, Enterprise).

**Documentación oficial:**
- [Vercel Edge Network Geolocation](https://vercel.com/docs/concepts/edge-network/geolocation)

---

## 🚀 Ventajas del Sistema

1. **Automático:** El usuario ve su idioma regional desde el primer momento, sin interacción.
2. **Respeta preferencias:** Si el usuario cambia el idioma manualmente, su elección se respeta.
3. **Performance:** La detección ocurre en el Edge (Vercel), sin latencia adicional.
4. **Fallback robusto:** Si falla la geolocalización, el sistema cae a español o al idioma del navegador.
5. **SEO-friendly:** No se usan redirecciones `/es`, `/ca`, `/eu` que compliquen el SEO. Todo se maneja con cookies y SSR.

---

## 📝 Notas Adicionales

### ¿Por qué no usar prefijos en URL (`/es`, `/ca`, `/eu`)?

**Ventajas de usar cookies en lugar de prefijos:**
- ✅ Menos complejidad de enrutamiento en Next.js
- ✅ No duplica contenido (mejor para SEO)
- ✅ Más fácil de mantener
- ✅ La detección es transparente para el usuario

**Si en el futuro quisieras implementar prefijos:**
- Modificar `middleware.ts` para hacer `NextResponse.redirect()` a la ruta con prefijo
- Adaptar `app/layout.tsx` para leer el idioma desde `params.lang`
- Crear estructura de carpetas: `app/[lang]/page.tsx`

### ¿Qué pasa si un usuario de Euskadi prefiere español?

El banner de sugerencia de idioma (ya implementado en `LanguageBanner.tsx`) detectará la discrepancia y ofrecerá cambiar. El usuario puede:
1. Aceptar el cambio → Se guarda en localStorage
2. Rechazarlo → Se mantiene el idioma actual

---

## 🐛 Debugging

Para verificar el comportamiento del middleware en producción:

```typescript
// Añadir logs temporales en middleware.ts
console.log('Geo info:', {
  country: request.geo?.country,
  region: request.geo?.region,
  city: request.geo?.city,
});
console.log('Detected language:', detectedLanguage);
```

Ver logs en:
- Vercel Dashboard → Deployments → [tu deployment] → Functions → Logs

---

## 📚 Referencias

- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Vercel Edge Geolocation](https://vercel.com/docs/concepts/edge-network/geolocation)
- [HTTP Cookies - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
