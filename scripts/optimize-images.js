/**
 * Optimización one-shot de imágenes locales.
 *
 * Redimensiona a un ancho máximo de 1200px y recomprime EN EL MISMO archivo
 * y formato (no cambia extensiones, así no hay que tocar imports).
 * Solo reemplaza el archivo si el resultado es más chico que el original.
 *
 * Uso:  node scripts/optimize-images.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const TARGETS = [
  path.join(__dirname, "..", "src", "assets", "images"),
  path.join(__dirname, "..", "public"),
];
const MAX_WIDTH = 1200;
const MIN_SIZE_BYTES = 150 * 1024; // no tocar archivos menores a 150 KB
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [full] : [];
  });

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

(async () => {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const target of TARGETS) {
    if (!fs.existsSync(target)) continue;

    for (const file of walk(target)) {
      const before = fs.statSync(file).size;
      if (before < MIN_SIZE_BYTES) continue;

      const ext = path.extname(file).toLowerCase();
      const tmp = `${file}.tmp`;

      let pipeline = sharp(file).resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
      });
      pipeline =
        ext === ".png"
          ? pipeline.png({ quality: 80, palette: true, compressionLevel: 9 })
          : pipeline.jpeg({ quality: 75, mozjpeg: true });

      await pipeline.toFile(tmp);

      const after = fs.statSync(tmp).size;
      if (after < before) {
        fs.renameSync(tmp, file);
        totalBefore += before;
        totalAfter += after;
        console.log(
          `✓ ${path.relative(process.cwd(), file)}  ${kb(before)} → ${kb(after)}`
        );
      } else {
        fs.unlinkSync(tmp);
        console.log(`- ${path.relative(process.cwd(), file)}  ya estaba óptimo`);
      }
    }
  }

  console.log(
    `\nTotal: ${kb(totalBefore)} → ${kb(totalAfter)}  (ahorro ${kb(
      totalBefore - totalAfter
    )})`
  );
})();
