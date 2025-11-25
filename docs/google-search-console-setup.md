# Verificación de Google Search Console

## Pasos para verificar tu sitio en Google Search Console:

### 1. Accede a Google Search Console
   - Ve a: https://search.google.com/search-console/
   - Inicia sesión con tu cuenta de Google

### 2. Añade tu propiedad
   - Haz clic en "Añadir propiedad"
   - Selecciona "Prefijo de URL"
   - Introduce: `https://vision360ia.com`

### 3. Método de verificación recomendado: Etiqueta HTML
   - Selecciona "Etiqueta HTML"
   - Google te dará un código como este:
     ```html
     <meta name="google-site-verification" content="XXXXXXXXXX" />
     ```
   - Copia el valor de `content` (el código XXXXXXXXXX)

### 4. Añade el código a tu web
   - Abre el archivo `src/app/layout.tsx`
   - Busca la línea que dice:
     ```
     {/* Google Search Console - REEMPLAZAR CON TU CÓDIGO */}
     ```
   - Descomenta la línea y reemplaza `TU_CODIGO_DE_VERIFICACION_AQUI` con tu código real

### 5. Despliega y verifica
   - Haz commit y push de los cambios
   - Espera a que Vercel despliegue
   - Vuelve a Google Search Console y haz clic en "Verificar"

### 6. Envía el sitemap
   Una vez verificado:
   - Ve a "Sitemaps" en el menú lateral
   - Añade: `sitemap.xml`
   - Google empezará a indexar tu sitio

---

## Archivo de verificación alternativo

Si prefieres el método de archivo HTML, ya tienes preparado:
`public/google-site-verification.html`

Solo necesitas reemplazar el contenido con el que te proporcione Google.
