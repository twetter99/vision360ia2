/**
 * Script para generar todos los iconos del sitio
 * Ejecutar: node scripts/generate-icons.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '../public');

// SVG del logo Vision360IA
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="45" fill="url(#grad)" />
  <circle cx="50" cy="50" r="35" fill="none" stroke="white" stroke-width="3" opacity="0.3"/>
  <ellipse cx="50" cy="50" rx="22" ry="15" fill="white"/>
  <circle cx="50" cy="50" r="10" fill="#1d4ed8"/>
  <circle cx="53" cy="47" r="3" fill="white"/>
  <circle cx="50" cy="12" r="4" fill="#fbbf24"/>
  <circle cx="88" cy="50" r="4" fill="#fbbf24"/>
  <circle cx="50" cy="88" r="4" fill="#fbbf24"/>
  <circle cx="12" cy="50" r="4" fill="#fbbf24"/>
</svg>`;

async function generateIcons() {
  console.log('🎨 Generando iconos del sitio...\n');
  
  const buffer = Buffer.from(svgContent);
  
  try {
    // favicon.ico (32x32)
    await sharp(buffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
    console.log('✅ favicon.ico (32x32)');
    
    // apple-touch-icon.png (180x180)
    await sharp(buffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png (180x180)');
    
    // logo.png (512x512) para Schema.org
    await sharp(buffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'logo.png'));
    console.log('✅ logo.png (512x512)');
    
    // icon-192.png para PWA
    await sharp(buffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'icon-192.png'));
    console.log('✅ icon-192.png (192x192)');
    
    // icon-512.png para PWA
    await sharp(buffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'icon-512.png'));
    console.log('✅ icon-512.png (512x512)');
    
    console.log('\n🎉 Todos los iconos generados correctamente!');
    
  } catch (error) {
    console.error('❌ Error generando iconos:', error.message);
    process.exit(1);
  }
}

generateIcons();
