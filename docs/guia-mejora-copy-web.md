# Guía de copy y mejora editorial

Este documento sirve para dos cosas a la vez:

1. Tener una visión clara de todo el texto comercial ya generado en la web.
2. Tener un marco práctico para mejorarlo sin reescribir a ciegas.

No sustituye al inventario ni al CSV. Los complementa:

- `docs/inventario-textos-web.md` explica dónde vive cada bloque de copy.
- `docs/inventario-textos-web-export.csv` permite revisar, reescribir y priorizar texto por texto.

## 1. Qué copy ya existe

El reposicionamiento principal ya está presente en cuatro capas.

### Capa 1. Copy global reutilizable

Ubicación principal: `src/lib/translations.ts`

Aquí está el grueso del mensaje comercial reutilizable:

- hero de home
- secciones de producto
- FAQ
- testimonios
- contacto
- banner de idioma
- página quiénes somos

### Capa 2. Copy legal

Ubicación principal: `src/lib/legal-translations.ts`

Incluye:

- aviso legal
- privacidad
- cookies
- idiomas `es`, `ca`, `eu`

### Capa 3. Copy de navegación y UI hardcodeado

Ubicaciones principales:

- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`
- `src/components/ui/cookie-banner.tsx`

Aquí hay microcopy importante porque afecta percepción de marca, claridad y conversión.

### Capa 4. Landings SEO con copy incrustado

Ubicaciones principales:

- `src/app/page.tsx`
- `src/app/adas-autobuses/page.tsx`
- `src/app/adas-camiones/page.tsx`
- `src/app/adas-vehiculos-recogida-residuos/page.tsx`
- `src/app/anti-atropellos-peatones-ciclistas/page.tsx`
- `src/app/camaras-vision-artificial-flotas/page.tsx`
- `src/app/vision-360-vehiculos-industriales/page.tsx`

Estas páginas concentran el copy con más impacto en SEO, propuesta de valor y conversión.

## 2. Qué mensaje ya está construido

Aunque el texto esté repartido, el mensaje comercial ya tiene una dirección bastante definida.

### Posicionamiento actual

Vision360IA ya se presenta como una solución B2B para flotas profesionales, no como una tecnología genérica.

Los ejes más repetidos y, por tanto, más asentados son:

- reducción de puntos ciegos
- prevención de accidentes e incidentes en maniobra
- detección de peatones y ciclistas
- visión 360° con IA
- retrofit sobre flota existente
- cumplimiento normativo y operación urbana
- enfoque en autobuses, camiones y vehículos municipales

### Tono actual

El tono dominante ya es:

- técnico-comercial
- orientado a operación real
- B2B
- centrado en seguridad, riesgo y despliegue

### Lo que funciona ya

- El discurso está mucho más cerca de flota, operación y riesgo que de producto genérico.
- Se repiten conceptos de alto valor comercial: puntos ciegos, maniobras, peatones, cumplimiento, retrofit.
- Las landings ya están especializadas por tipo de vehículo, lo que da coherencia SEO y comercial.
- Contacto y CTA tienen un enfoque razonable: ingeniería, sesión técnica, dossier, viabilidad.

## 3. Qué conviene mejorar

El siguiente salto no es "meter más texto". Es hacer el copy más consistente, más limpio y más vendible.

### Problema 1. Fragmentos poco naturales

Hay bloques que suenan como piezas partidas en vez de como copy final.

Ejemplos del tipo de problema:

- `Con`
- `Tecnología`
- `diseñada para proteger lo que más importa:`
- `tu equipo y tus activos`

Eso puede venir bien como estructura visual en diseño, pero en un documento editorial conviene reagruparlo en mensajes completos.

### Problema 2. Repetición de ideas con sintaxis distinta

Se repite varias veces la misma promesa:

- reducir puntos ciegos
- mejorar seguridad urbana
- detectar peatones y ciclistas
- reducir incidentes

La repetición estratégica está bien, pero ahora mismo en algunos bloques no aporta matiz nuevo. Conviene decidir qué frase hace cada trabajo:

- titular
- subtitular
- beneficio
- prueba
- CTA

### Problema 3. Mezcla entre tono técnico y tono genérico

En general el tono va bien, pero todavía hay frases más abstractas de lo necesario:

- `soluciones tecnológicas de vanguardia`
- `transformar tu flota`
- `ecosistema completo`

Funcionan peor que frases concretas sobre maniobras, visibilidad, riesgos, retrofit, integración o cumplimiento.

### Problema 4. Microcopy mejorable

Hay textos pequeños que influyen mucho y todavía pueden afinarse:

- botones
- etiquetas de formulario
- banners
- títulos de menú
- helpers legales o de confianza

## 4. Criterios para mejorar el copy

Cada reescritura debería pasar este filtro.

### Claridad

La frase debe entenderse a la primera lectura.

Preguntas útiles:

- ¿dice qué hace el sistema?
- ¿dice para quién es?
- ¿dice qué problema reduce?

### Especificidad

Cuanto más concreto sea el copy, mejor.

Preferir:

- `reduce puntos ciegos en maniobras urbanas`

Antes que:

- `mejora la seguridad`

### Orientación a operación

El mejor copy de esta web no habla de innovación en abstracto. Habla de contexto real:

- autobuses
- camiones
- RSU
- maniobras
- peatones
- ciclistas
- retrofit
- cumplimiento
- operación urbana

### Coherencia B2B

Hay que priorizar lenguaje que un responsable de flota, operaciones, seguridad o integración vea como serio y útil.

Mejor:

- `sesión técnica`
- `compatibilidad con la flota`
- `reducción de incidentes`
- `implantación sobre parque existente`

Peor:

- `revoluciona`
- `transforma`
- `innovación sin límites`

### Jerarquía de mensaje

Cada bloque debe cumplir un papel distinto:

- titular: promesa principal
- subtitular: contexto y beneficio
- bullets: capacidades concretas
- prueba social: credibilidad
- CTA: siguiente paso claro

## 5. Prioridades de mejora

Si no quieres tocarlo todo a la vez, este es el orden más rentable.

### Prioridad alta

- hero de home
- CTA y bloque de contacto
- metadata SEO de home y landings
- titulares de landings de producto

Motivo: son las piezas con más impacto en captación, diferenciación y conversión.

### Prioridad media

- header y footer
- cookie banner
- bloque why-us
- nombres y subtítulos de product showcase

Motivo: afectan percepción de marca y coherencia, aunque no siempre cierran la conversión.

### Prioridad baja

- textos legales con ajustes de tono o limpieza
- microcopys secundarios en estados, toasts y ayudas

Motivo: importan, pero no deberían ir antes que el mensaje comercial principal.

## 6. Cómo usar el CSV para mejorar de verdad

El archivo `docs/inventario-textos-web-export.csv` ya tiene la estructura correcta:

- archivo
- sección
- tipo
- clave
- texto_actual
- propuesta_mejora
- objetivo_del_cambio

La forma útil de trabajarlo es esta:

1. Empezar por una sola sección, por ejemplo `hero` o `contacto`.
2. Rellenar `propuesta_mejora` solo cuando la nueva versión sea más clara o más específica.
3. Rellenar `objetivo_del_cambio` explicando por qué mejora el texto.
4. No reescribir por estilo si el texto actual ya cumple bien su función.

## 7. Plantilla de mejora por bloque

Para cada texto importante, usa esta lógica:

### Texto actual

Copiar el texto tal cual está ahora.

### Propuesta mejorada

Reescribirlo con una mejora clara en una de estas dimensiones:

- más específico
- más creíble
- más orientado a flota
- más corto
- más accionable

### Objetivo del cambio

Explicar uno de estos motivos:

- aclarar la propuesta de valor
- reducir tono genérico
- reforzar enfoque B2B
- hacer más visible el caso de uso
- mejorar el CTA
- separar mejor beneficio y capacidad

## 8. Ejemplos de mejora ya enfocados

No son cambios obligatorios. Son ejemplos del tipo de mejora que más sentido tiene en esta web.

| Texto actual | Propuesta orientativa | Objetivo |
| --- | --- | --- |
| Elimina los puntos ciegos en tu flota y reduce accidentes con visión 360° inteligente | Reduce puntos ciegos y maniobras de riesgo en tu flota con visión 360° e IA embarcada | Hacer la promesa más operativa y menos genérica |
| Reduce hasta un 40% los accidentes en maniobras urbanas con detección inteligente de riesgos | Mejora la seguridad en maniobras urbanas con detección en tiempo real de peatones, ciclistas y obstáculos | Evitar depender solo de una cifra y reforzar concreción funcional |
| Hablemos de Ingeniería, no de ventas | Revisa tu flota con un equipo técnico, no con un discurso comercial | Mantener el enfoque diferencial con una formulación más natural |
| Solución industrial para flotas | Solución embarcada para flotas urbanas y vehículos de servicio | Sustituir una etiqueta amplia por otra más concreta |
| Activa visión artificial útil para tu operación | Convierte vídeo en alertas y eventos útiles para operación y seguridad | Bajar abstracción y explicar mejor el resultado operativo |

## 9. Resultado que conviene perseguir

Si el trabajo se hace bien, el copy final debería sonar así:

- claro para un decisor B2B
- creíble para un perfil técnico
- específico para cada tipo de vehículo
- consistente entre home, landings y microcopy
- enfocado en operación, riesgo, despliegue y cumplimiento

## 10. Siguiente paso recomendado

La secuencia más útil es:

1. completar el CSV solo para `hero`, `contacto` y `landings`
2. validar tono y consistencia
3. aplicar cambios en código
4. actualizar inventario y CSV para que no se desalineen

Si más adelante quieres, este documento puede evolucionar a una versión todavía más operativa con una tabla completa de reescritura priorizada por impacto.