const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "../public/images");
const outputDir = path.join(__dirname, "../data");
const outputPath = path.join(outputDir, "products.json");

const folders = ["mens", "womens", "footwear", "home-kitchen"];

const getSubCategory = (filename) => {
  const name = filename.toLowerCase();
  if (name.includes("tshirt") || name.includes("t-shirt") || name.includes("tee")) return "T-Shirts";
  if (name.includes("shirt")) return "Shirts";
  if (name.includes("pant")) return "Pants";
  if (name.includes("kurti")) return "Kurtis";
  if (name.includes("top")) return "Tops";
  if (name.includes("shoe")) return "Shoes";
  if (name.includes("sandal")) return "Sandals";
  if (name.includes("heel")) return "Heels";
  if (name.includes("slides")) return "Slides";
  if (name.includes("pan")) return "Cookware";
  return "General";
};

const getGender = (filename, folder) => {
  if (folder === "mens") return "Men";
  if (folder === "womens") return "Women";
  if (filename.includes("men")) return "Men";
  if (filename.includes("women")) return "Women";
  return "Unisex";
};

const generateKeywords = (name) =>
  name
    .toLowerCase()
    .replace(/[-_\.]/g, " ")
    .split(" ")
    .filter((w) => w && w.length > 2);

const toTitleCase = (str) =>
  str
    .replace(/[-_\.]/g, " ")
    .split(" ")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");

const allProducts = [];

folders.forEach((folder) => {
  const dirPath = path.join(baseDir, folder);

  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️ Skipping missing folder: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

    const name = toTitleCase(file.replace(ext, ""));
    const subCategory = getSubCategory(file);
    const gender = getGender(file, folder);
    const imagePath = `/images/${folder}/${file}`;
    const price = Math.floor(Math.random() * (2999 - 499 + 1)) + 499;

    // ⭐ Only ratings from 2.5 to 5.0 (in 0.5 steps)
    const stars = (Math.floor(Math.random() * 6) + 5) / 2;

    const rating = {
      stars: stars,
      count: Math.floor(Math.random() * 100 + 20),
    };

    const keywords = generateKeywords(name);

    allProducts.push({
      name,
      image: imagePath,
      priceRupees: price,
      rating,
      mainCategory: folder === "home-kitchen" ? "Home & Kitchen" : toTitleCase(folder),
      subCategory,
      gender,
      isTrending: Math.random() < 0.4, // ~40% chance to be trending
      keywords,
    });
  });
});

// ✅ Ensure /data folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// ✅ Write products.json
fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), "utf-8");

console.log(`✅ ${allProducts.length} products written to: ${outputPath}`);
