import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public');

const jobs = [
  { dir: path.join(root, 'assets', 'Projects'), maxWidth: 1600 },
  { dir: path.join(root, 'assets', 'Certificates'), maxWidth: 800 },
];

async function convertPng(filePath, maxWidth) {
  const webpPath = filePath.replace(/\.png$/i, '.webp');
  await sharp(filePath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webpPath);
  await fs.unlink(filePath);
  const before = (await fs.stat(webpPath)).size;
  console.log(`converted ${path.relative(root, filePath)} -> ${path.relative(root, webpPath)} (${before} bytes)`);
}

async function main() {
  for (const job of jobs) {
    const entries = await fs.readdir(job.dir);
    for (const name of entries) {
      if (!name.toLowerCase().endsWith('.png')) continue;
      await convertPng(path.join(job.dir, name), job.maxWidth);
    }
  }

  const avatar = path.join(root, 'chan-avatar.png');
  try {
    await fs.access(avatar);
    await convertPng(avatar, 256);
  } catch {
    // already converted
  }

  const proAvatar = path.join(root, 'chan-avatar-pro.png');
  try {
    await fs.access(proAvatar);
    await convertPng(proAvatar, 256);
  } catch {
    // already converted
  }

  const unused = path.join(root, 'assets', 'HeroCard.webp');
  try {
    await fs.access(unused);
    await fs.unlink(unused);
    console.log('deleted unused assets/HeroCard.webp');
  } catch {
    // already gone
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
