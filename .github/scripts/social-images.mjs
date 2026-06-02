// Genera una imagen social 1200x630 por noticia para que compartan bien en
// LinkedIn / WhatsApp / Facebook / X (Open Graph). Técnica "letterbox":
// fondo = la foto difuminada y oscurecida (rellena 1200x630 sin bandas vacías)
// primer plano = la foto completa centrada (no recorta el sujeto, sirva la foto
// vertical u horizontal). Resultado profesional y automático para cualquier foto.
//
// Fuente de la imagen por noticia (en este orden):
//   1) primera imagen del cuerpo (suele ser la foto principal)
//   2) portada del frontmatter (image)
//   3) primera foto de la galería
//   4) respaldo: /images/og-image.jpg (así og:image SIEMPRE resuelve)
//
// No bloqueante: si falta sharp/gray-matter o falla una, se omite y sigue.
// Uso: node .github/scripts/social-images.mjs out/images/noticias/social

import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const NOTICIAS_DIR = path.join(ROOT, 'content', 'noticias');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_DIR = path.resolve(process.argv[2] || 'out/images/noticias/social');
const W = 1200, H = 630;
const FALLBACK = path.join(PUBLIC_DIR, 'images', 'og-image.jpg');

let sharp, matter;
try {
  sharp = (await import('sharp')).default;
  matter = (await import('gray-matter')).default;
} catch (e) {
  console.log(`social-images: dependencias no disponibles (${e.message}); se omite.`);
  process.exit(0);
}

await mkdir(OUT_DIR, { recursive: true });

function firstBodyImage(body) {
  const m = /!\[[^\]]*\]\(([^)\s]+)/.exec(body || '');
  return m ? m[1] : null;
}
function toPublicPath(url) {
  if (!url || typeof url !== 'string' || !url.startsWith('/')) return null;
  return path.join(PUBLIC_DIR, url.replace(/^\//, ''));
}
async function exists(p) { try { await access(p); return true; } catch { return false; } }

async function pickSource(data, body) {
  const candidates = [
    firstBodyImage(body),
    data.image ? String(data.image) : null,
    Array.isArray(data.galeria) && data.galeria[0]?.image ? String(data.galeria[0].image) : null,
  ];
  for (const c of candidates) {
    const p = toPublicPath(c);
    if (p && (await exists(p))) return p;
  }
  return (await exists(FALLBACK)) ? FALLBACK : null;
}

let files = [];
try { files = (await readdir(NOTICIAS_DIR)).filter((f) => f.endsWith('.md')); } catch {}

let made = 0;
for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  try {
    const raw = await readFile(path.join(NOTICIAS_DIR, f), 'utf8');
    const { data, content } = matter(raw);
    if (data.draft) continue;
    const body = typeof data.body === 'string' && data.body.trim() ? data.body : content;
    const src = await pickSource(data, body);
    if (!src) { console.log(`  sin fuente: ${slug}`); continue; }

    const input = await readFile(src);
    const bg = await sharp(input, { failOn: 'none' }).rotate()
      .resize(W, H, { fit: 'cover' }).blur(24).modulate({ brightness: 0.55 }).toBuffer();
    const fg = await sharp(input, { failOn: 'none' }).rotate()
      .resize({ width: W, height: H, fit: 'inside', withoutEnlargement: false }).toBuffer();
    const out = await sharp(bg)
      .composite([{ input: fg, gravity: 'center' }])
      .jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    await writeFile(path.join(OUT_DIR, `${slug}.jpg`), out);
    made += 1;
  } catch (e) {
    console.error(`  error ${slug}: ${e.message}`);
  }
}
console.log(`Imágenes sociales 1200x630 generadas: ${made}/${files.length}`);
