import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const publicDir = './public';

async function optimizeImage(filePath) {
  const stats = await stat(filePath);
  const sizeInKB = stats.size / 1024;

  console.log(`Processing: ${filePath} (${sizeInKB.toFixed(2)} KB)`);

  // PNG 파일을 WebP로 변환
  if (filePath.endsWith('.png')) {
    const webpPath = filePath.replace('.png', '.webp');

    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(webpPath);

    const webpStats = await stat(webpPath);
    const webpSizeInKB = webpStats.size / 1024;

    console.log(`  ✓ Created ${webpPath} (${webpSizeInKB.toFixed(2)} KB) - ${((1 - webpSizeInKB / sizeInKB) * 100).toFixed(1)}% reduction`);

    // 원본 PNG도 최적화
    const optimizedPath = filePath.replace('.png', '.opt.png');
    await sharp(filePath)
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(optimizedPath);

    const optStats = await stat(optimizedPath);
    const optSizeInKB = optStats.size / 1024;
    console.log(`  ✓ Optimized PNG: ${optimizedPath} (${optSizeInKB.toFixed(2)} KB)`);
  }
}

async function processDirectory(dirPath) {
  const files = await readdir(dirPath);

  for (const file of files) {
    const filePath = join(dirPath, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      await processDirectory(filePath);
    } else if (file.endsWith('.png')) {
      await optimizeImage(filePath);
    }
  }
}

console.log('Starting image optimization...\n');
await processDirectory(publicDir);
console.log('\n✓ Image optimization complete!');
