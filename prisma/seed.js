// prisma/seed.js — FULLY ESM COMPATIBLE
import 'dotenv/config';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

// ESM-safe __dirname replacement:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

// Load JSON file
const jsonPath = path.join(__dirname, "../assets/final_data.json");
const rawData = fs.readFileSync(jsonPath, "utf8");

// Remove BOM if present
const cleanData = rawData.replace(/^\ufeff/, "").trim();
const data = JSON.parse(cleanData);

// Data is inside Sheet1
const rawWatchData = data.Sheet1 || data;

// Deduplication
const uniqueModelNumbers = new Set();

const deduplicatedRawData = rawWatchData.filter((w) => {
  const modelNumKey = w["SL Number"];
  if (modelNumKey && String(modelNumKey).trim() !== "") {
    const modelNumber = String(modelNumKey).trim();
    if (uniqueModelNumbers.has(modelNumber)) return false;
    uniqueModelNumbers.add(modelNumber);
    return true;
  }
  return false;
});

// Transform data for Prisma
const transformedData = deduplicatedRawData.map((w) => {
  const imagesArray =
    (w["Image Links"] || "").toString().match(/https?:\/\/\S+/g) || [];

  const cleanPrice = (priceStr) => {
    if (!priceStr) return 0.0;
    return parseFloat(String(priceStr).replace(/,/g, "").trim()) || 0.0;
  };

  return {
    name: String(w["Name"] || "").trim(),
    price: cleanPrice(w["Price"]),
    discountedPrice: cleanPrice(w["Discounted Price"]),
    brand: String(w["Brand Name"] || "").trim(),
    modelNumber: String(w["SL Number"] || "").trim(),
    category: String(w["Category"] || "").trim().toLowerCase(),
    description: String(w["Description"] || "").trim(),
    images: imagesArray,
    inStock: 10,
  };
});

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "FOUND" : "MISSING");

  console.log("Clearing existing database records...");

  await prisma.orderItem.deleteMany({});
  console.log("Cleared OrderItem records.");

  await prisma.order.deleteMany({});
  console.log("Cleared Order records.");

  await prisma.watch.deleteMany({});
  console.log("Cleared Watch records.");

  console.log(`Seeding ${transformedData.length} unique records...`);
  console.log(
    `Duplicates removed: ${rawWatchData.length - deduplicatedRawData.length}`
  );

  await prisma.$transaction(
    transformedData.map((w) => prisma.watch.create({ data: w }))
  );

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// // at very top of prisma/seed.js
// import 'dotenv/config';

// const fs = require("fs");
// const path = require("path");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const jsonPath = path.join(__dirname, "../assets/data.json");
// const rawData = fs.readFileSync(jsonPath, "utf8");

// // Ensure any leading hidden characters are removed
// const cleanData = rawData.replace(/^\ufeff/, "").trim();
// const data = JSON.parse(cleanData);

// // The core data array is nested under 'Sheet1'
// const rawWatchData = data.Sheet1 || data;

// // --- STEP 1: Deduplication Function ---
// const uniqueModelNumbers = new Set();

// const deduplicatedRawData = rawWatchData.filter((w) => {
//   // Use the correct JSON field name: "SL Number" (capitalized)
//   const modelNumKey = w["SL Number"];

//   if (modelNumKey && String(modelNumKey).trim() !== "") {
//     const modelNumber = String(modelNumKey).trim();
//     if (uniqueModelNumbers.has(modelNumber)) {
//       return false;
//     } else {
//       uniqueModelNumbers.add(modelNumber);
//       return true;
//     }
//   }
//   return false;
// });

// // --- STEP 2: Data Transformation to match the CLEANED schema ---
// const transformedData = deduplicatedRawData.map((w) => {
//   // Extract all URLs from "Image Links" field (note the capital letters)
//   const imagesArray =
//     (w["Image Links"] || "").toString().match(/https?:\/\/\S+/g) || [];

//   // Function to clean price string (removes commas and converts to float)
//   const cleanPrice = (priceStr) => {
//     if (!priceStr) return 0.0;
//     const cleaned = String(priceStr).replace(/,/g, "").trim();
//     return parseFloat(cleaned) || 0.0;
//   };

//   return {
//     // Map JSON fields (capitalized) to Prisma schema fields (camelCase)
//     name: String(w["Name"] || "").trim(),
//     price: cleanPrice(w["Price"]),
//     discountedPrice: cleanPrice(w["Discounted Price"]),
//     brand: String(w["Brand Name"] || "").trim(),
//     modelNumber: String(w["SL Number"] || "").trim(),
//     category: String(w["Category"] || "").trim().toLowerCase(),
//     description: String(w["Description"] || "").trim(),
//     images: imagesArray,
//     inStock: 10, // Default stock value
//   };
// });

// async function main() {
//   console.log("Clearing existing database records...");

//   // Delete dependent records first
//   await prisma.orderItem.deleteMany({});
//   console.log("Cleared OrderItem records.");

//   // Uncomment if you have these models:
//   // await prisma.cartItem.deleteMany({});
//   // await prisma.order.deleteMany({});

//   await prisma.watch.deleteMany({});
//   console.log("Cleared Watch records.");

//   console.log(`Start seeding ${transformedData.length} unique records...`);
//   console.log(
//     `Removed ${rawWatchData.length - deduplicatedRawData.length} duplicate records.`
//   );

//   const creations = transformedData.map((w) =>
//     prisma.watch.create({ data: w })
//   );

//   await prisma.$transaction(creations);

//   console.log(
//     `Seeding finished. Created ${transformedData.length} unique watches.`
//   );
// }

// main()
//   .catch((e) => {
//     console.error("Seeding Error:", e);

//     if (e.code === "P2002") {
//       console.error("\n--- FATAL ERROR: P2002 Persistence ---");
//       console.error("Unique constraint violation detected.");
//       console.error("--------------------------------------\n");
//     }
//     if (e.message.includes("Expected Float, provided String")) {
//       console.error("\n--- FIX HINT: Data Type Mismatch ---");
//       console.error("Check price field conversion in cleanPrice function.");
//       console.error("--------------------------------------\n");
//     }
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });