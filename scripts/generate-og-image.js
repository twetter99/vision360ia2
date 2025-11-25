/**
 * Script para generar imagen Open Graph optimizada para SEO
 * Ejecutar: node scripts/generate-og-image.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT_IMAGE = path.join(__dirname, '../public/images/header.jpg');
const OUTPUT_IMAGE = path.join(__dirname, '../public/images/og-image.jpg');

// Dimensiones estándar para Open Graph (Facebook, LinkedIn, etc.)
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOGImage() {
  console.log('🖼️  Generando imagen Open Graph...');
  
  // Verificar que existe la imagen de entrada
  if (!fs.existsSync(INPUT_IMAGE)) {
    console.error('❌ No se encontró la imagen de entrada:', INPUT_IMAGE);
    process.exit(1);
  }

  try {
    // Crear overlay con el logo y texto
    const svgOverlay = `
      <svg width="${OG_WIDTH}" height="${OG_HEIGHT}">
        <!-- Gradiente oscuro para mejor contraste del texto -->
        <defs>
          <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(0,0,0,0.5)"/>
            <stop offset="50%" style="stop-color:rgba(0,0,0,0.3)"/>
            <stop offset="100%" style="stop-color:rgba(0,0,0,0.7)"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#overlay)"/>
        
        <!-- Logo / Marca -->
        <text x="60" y="80" 
              font-family="Arial, sans-serif" 
              font-size="28" 
              font-weight="bold" 
              fill="white">
          Vision360IA
        </text>
        
        <!-- Título principal -->
        <text x="60" y="${OG_HEIGHT/2 - 40}" 
              font-family="Arial, sans-serif" 
              font-size="52" 
              font-weight="bold" 
              fill="white">
          Sistema ADAS con IA
        </text>
        <text x="60" y="${OG_HEIGHT/2 + 20}" 
              font-family="Arial, sans-serif" 
              font-size="52" 
              font-weight="bold" 
              fill="white">
          para Flotas
        </text>
        
        <!-- Subtítulo -->
        <text x="60" y="${OG_HEIGHT/2 + 90}" 
              font-family="Arial, sans-serif" 
              font-size="28" 
              fill="#fbbf24">
          -40% de accidentes en 6 meses
        </text>
        
        <!-- Badge inferior -->
        <rect x="60" y="${OG_HEIGHT - 100}" width="280" height="40" rx="20" fill="#fbbf24"/>
        <text x="200" y="${OG_HEIGHT - 73}" 
              font-family="Arial, sans-serif" 
              font-size="18" 
              font-weight="bold"
              text-anchor="middle"
              fill="#1e293b">
          +2.000 vehículos equipados
        </text>
        
        <!-- URL -->
        <text x="${OG_WIDTH - 60}" y="${OG_HEIGHT - 30}" 
              font-family="Arial, sans-serif" 
              font-size="20" 
              text-anchor="end"
              fill="rgba(255,255,255,0.8)">
          vision360ia.com
        </text>
      </svg>
    `;

    await sharp(INPUT_IMAGE)
      .resize(OG_WIDTH, OG_HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .composite([
        {
          input: Buffer.from(svgOverlay),
          top: 0,
          left: 0,
        }
      ])
      .jpeg({ quality: 90 })
      .toFile(OUTPUT_IMAGE);

    console.log('✅ Imagen OG generada correctamente:', OUTPUT_IMAGE);
    console.log(`   Dimensiones: ${OG_WIDTH}x${OG_HEIGHT}px`);
    
    // Mostrar tamaño del archivo
    const stats = fs.statSync(OUTPUT_IMAGE);
    console.log(`   Tamaño: ${(stats.size / 1024).toFixed(1)} KB`);
    
  } catch (error) {
    console.error('❌ Error generando imagen:', error.message);
    process.exit(1);
  }
}

generateOGImage();
