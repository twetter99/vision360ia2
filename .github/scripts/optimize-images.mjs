// Optimiza (redimensiona + comprime) las imágenes de noticias antes de subirlas.
// Se ejecuta sobre out/ (build), así NO modifica las originales del repo y cada
// deploy parte siempre del original (sin degradación acumulada).
//
// No bloqueante: cualquier error de una imagen se ignora; si falta sharp, sale 0.
// Uso: node .github/scripts/optimize-images.mjs out/images/noticias

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const DIR = process.argv[2] || 'out/images/noticias';
const MAX_WIDTH = 1600; // ancho máx. razonable para una foto en una noticia
const JPEG_QUALITY = 78;

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.log('sharp no disponible; se omite la optimización (no bloqueante).');
  process.exit(0);
}

async function walk(dir) {
  let out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(p));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const files = await walk(DIR);
let optimized = 0;
let savedBytes = 0;

for (const file of files) {
  try {
    const before = (await stat(file)).size;
    const input = await readFile(file);
    const img = sharp(input, { failOn: 'none' }).rotate(); // respeta orientación EXIF
    const meta = await img.metadata();
    let pipe = img;
    if (meta.width && meta.width > MAX_WIDTH) {
      pipe = pipe.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    const isPng = /\.png$/i.test(file);
    const output = isPng
      ? await pipe.png({ compressionLevel: 9 }).toBuffer()
      : await pipe.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
    if (output.length < before) {
      await writeFile(file, output);
      optimized += 1;
      savedBytes += before - output.length;
    }
  } catch (err) {
    console.error(`  omitida ${file}: ${err.message}`);
  }
}

console.log(
  `Imágenes optimizadas: ${optimized}/${files.length} · ahorrado ${(savedBytes / 1024 / 1024).toFixed(1)} MB`,
);
