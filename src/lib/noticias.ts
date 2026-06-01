import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

/**
 * Lectura de noticias en Markdown (gestor de noticias headless).
 *
 * Cada noticia es un fichero `content/noticias/<slug>.md` con frontmatter
 * (lo escribe el CMS en /admin) + cuerpo Markdown. Se leen en tiempo de BUILD
 * (Node) y se generan páginas estáticas → web rápida y bien indexable.
 *
 * El CMS (Sveltia) escribe el cuerpo en la clave `body` del frontmatter cuando
 * se usa `format: frontmatter`; por eso, si existe `data.body`, lo preferimos
 * como contenido.
 */

const NOTICIAS_DIR = path.join(process.cwd(), 'content', 'noticias');

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

export type Noticia = {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  dateModified?: string;
  description: string;
  image?: string; // /images/noticias/...
  author: string;
  tags?: string[];
  draft: boolean;
};

export type NoticiaFull = Noticia & { contentHtml: string };

function toISODate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v ?? '').slice(0, 10);
}

type RawPost = { slug: string; data: Record<string, unknown>; body: string };

function readAll(): RawPost[] {
  if (!fs.existsSync(NOTICIAS_DIR)) return [];
  return fs
    .readdirSync(NOTICIAS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(NOTICIAS_DIR, f), 'utf8');
      const { data, content } = matter(raw);
      const d = data as Record<string, unknown>;
      // Con format: frontmatter, el CMS guarda el cuerpo en `body`.
      const body = typeof d.body === 'string' && d.body.trim() ? (d.body as string) : content;
      return { slug: f.replace(/\.md$/, ''), data: d, body };
    });
}

function toNoticia(slug: string, d: Record<string, unknown>): Noticia {
  return {
    slug,
    title: String(d.title ?? slug),
    date: toISODate(d.date),
    dateModified: d.dateModified ? toISODate(d.dateModified) : undefined,
    description: String(d.description ?? ''),
    image: d.image ? String(d.image) : undefined,
    author: d.author ? String(d.author) : 'WINFIN',
    tags: Array.isArray(d.tags) ? (d.tags as unknown[]).map(String) : undefined,
    draft: Boolean(d.draft),
  };
}

/** Lista de noticias publicadas (sin borradores), de más nueva a más antigua. */
export function getNoticias(): Noticia[] {
  return readAll()
    .map(({ slug, data }) => toNoticia(slug, data))
    .filter((n) => !n.draft && n.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNoticiaSlugs(): string[] {
  return getNoticias().map((n) => n.slug);
}

/** Una noticia con su HTML renderizado. Devuelve null si no existe o es borrador. */
export function getNoticia(slug: string): NoticiaFull | null {
  const post = readAll().find((p) => p.slug === slug);
  if (!post) return null;
  const meta = toNoticia(slug, post.data);
  if (meta.draft) return null;
  return { ...meta, contentHtml: md.render(post.body) };
}
