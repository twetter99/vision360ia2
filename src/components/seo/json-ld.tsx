import type { ReactNode } from 'react';

/**
 * Componente server-side para inyectar uno o varios objetos JSON-LD en
 * <script type="application/ld+json">.
 *
 * Por qué server-side y no client: Google y la mayoría de motores de
 * indexación NO ejecutan JavaScript del cliente al hacer crawl (o lo
 * hacen con limitaciones). Si el JSON-LD lo inyecta React desde
 * 'use client', el motor lo ve después o no lo ve. En cambio, este
 * componente se renderiza en el HTML estático generado por Next.js
 * (`output: 'export'`) y entra en el documento que Google descarga.
 *
 * Uso:
 *   <JsonLd data={organizationSchema()} />
 *   <JsonLd data={[schemaA, schemaB]} />
 */
export function JsonLd({
  data,
}: {
  data: object | ReadonlyArray<object>;
}): ReactNode {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          // eslint-disable-next-line react/no-array-index-key -- el orden es estable, generamos en build time
          key={i}
          type="application/ld+json"
          // dangerouslySetInnerHTML para evitar que React escape los caracteres
          // de las URLs y caracteres especiales de Schema.org.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
