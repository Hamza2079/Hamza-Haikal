import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeFavicon() {
  const faviconPath = path.join(__dirname, "public", "favicon.png");
  const outputPath = path.join(__dirname, "public", "favicon-optimized.png");

  console.log("Optimizing favicon with Sharp...");

  try {
    const originalSize = fs.statSync(faviconPath).size;

    // Optimize PNG with Sharp
    await sharp(faviconPath)
      .png({
        compressionLevel: 9, // Maximum compression
        quality: 85, // Good quality
        effort: 10, // Maximum effort
      })
      .toFile(outputPath);

    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(2);

    console.log(`✅ Favicon optimized!`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`   Optimized: ${(optimizedSize / 1024).toFixed(2)} KB`);
    console.log(`   Savings: ${savings}%`);

    // Replace original with optimized
    fs.unlinkSync(faviconPath);
    fs.renameSync(outputPath, faviconPath);

    console.log(`✅ Replaced original favicon with optimized version`);
  } catch (error) {
    console.error("❌ Error optimizing favicon:", error);
  }
}

optimizeFavicon();
