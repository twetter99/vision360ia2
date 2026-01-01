/**
 * Script para generar todos los iconos desde icono_v360.png
 * Ejecutar: node scripts/generate-favicon.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE = path.join(__dirname, '../public/icono_v360.png');
const PUBLIC = path.join(__dirname, '../public');

async function generateIcons() {
  console.log('🎨 Generando iconos desde icono_v360.png...\n');

  // Verificar que existe el archivo fuente
  if (!fs.existsSync(SOURCE)) {
    console.error('❌ No se encontró el archivo fuente:', SOURCE);
    process.exit(1);
  }

  try {
    // 1. favicon.ico (32x32 - browsers modernos solo necesitan esto)
    await sharp(SOURCE)
      .resize(32, 32)
      .toFile(path.join(PUBLIC, 'favicon.ico'));
    console.log('✅ favicon.ico (32x32)');

    // 2. icon-192.png para PWA
    await sharp(SOURCE)
      .resize(192, 192)
      .png()
      .toFile(path.join(PUBLIC, 'icon-192.png'));
    console.log('✅ icon-192.png (192x192)');

    // 3. icon-512.png para PWA
    await sharp(SOURCE)
      .resize(512, 512)
      .png()
      .toFile(path.join(PUBLIC, 'icon-512.png'));
    console.log('✅ icon-512.png (512x512)');

    // 4. apple-touch-icon.png (180x180)
    await sharp(SOURCE)
      .resize(180, 180)
      .png()
      .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png (180x180)');

    // 5. Crear también un favicon-16.png y favicon-32.png por si acaso
    await sharp(SOURCE)
      .resize(16, 16)
      .png()
      .toFile(path.join(PUBLIC, 'favicon-16x16.png'));
    console.log('✅ favicon-16x16.png');

    await sharp(SOURCE)
      .resize(32, 32)
      .png()
      .toFile(path.join(PUBLIC, 'favicon-32x32.png'));
    console.log('✅ favicon-32x32.png');

    console.log('\n🎉 ¡Todos los iconos generados correctamente!');
    console.log('📁 Ubicación: /public/');

  } catch (error) {
    console.error('❌ Error generando iconos:', error);
    process.exit(1);
  }
}

generateIcons();
