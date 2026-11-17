
import sharp from "sharp";
import path from "node:path";
import { readdir, mkdir, stat } from "node:fs/promises";

const inputDir = path.join(
  process.cwd(),
  "src",
  "assets",
  "images"
);

const outputDir = path.join(
  process.cwd(),
  "public",
  "images",
  "intro"
);

const widths = [480, 960];

await mkdir(outputDir, { recursive: true });

const files = await readdir(inputDir);

const imageFiles = files
  .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let originalTotal = 0;
let mobileTotal = 0;
let desktopTotal = 0;

let successful = 0;
const failedFiles = [];

console.log(`Found ${imageFiles.length} images.\n`);

for (const file of imageFiles) {
  const input = path.join(inputDir, file);
  const baseName = path.parse(file).name.replace(/-min$/i, "");

  try {
    const originalStats = await stat(input);

    // Verify that Sharp can read the source image.
    const metadata = await sharp(input).metadata();

    console.log(
      `Processing: ${file} (${metadata.width}x${metadata.height})`
    );

    for (const width of widths) {
      const output = path.join(
        outputDir,
        `${baseName}-${width}.webp`
      );

      const result = await sharp(input)
        .rotate()
        .resize({
          width,
          withoutEnlargement: true,
        })
        .webp({
          quality: 80,
          effort: 5,
        })
        .toFile(output);

      if (width === 480) {
        mobileTotal += result.size;
      } else {
        desktopTotal += result.size;
      }

      console.log(
        `  ${baseName}-${width}.webp: ${(result.size / 1024).toFixed(1)} KB`
      );
    }

    originalTotal += originalStats.size;
    successful++;

  } catch (error) {
    console.error(`\nFAILED: ${file}`);
    console.error(`Reason: ${error.message}\n`);

    failedFiles.push({
      file,
      error: error.message,
    });
  }
}

console.log("\n========== OPTIMIZATION SUMMARY ==========");
console.log(`Total source images: ${imageFiles.length}`);
console.log(`Successfully processed: ${successful}`);
console.log(`Failed images: ${failedFiles.length}`);
console.log(`WebP files generated: ${successful * 2}`);
console.log(`Original size processed: ${(originalTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Mobile versions: ${(mobileTotal / 1024).toFixed(2)} KB`);
console.log(`Desktop versions: ${(desktopTotal / 1024).toFixed(2)} KB`);

if (failedFiles.length > 0) {
  console.log("\nImages requiring attention:");

  failedFiles.forEach(({ file, error }) => {
    console.log(`- ${file}: ${error}`);
  });
}

console.log("\n===========================================");
