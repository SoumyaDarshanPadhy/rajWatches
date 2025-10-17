const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jsonPath = path.join(__dirname, '../assets/final_data.json');
const rawData = fs.readFileSync(jsonPath, 'utf8');

// Ensure any leading hidden characters are removed
const cleanData = rawData.replace(/^\ufeff/, '').trim(); 
const data = JSON.parse(cleanData);

// The core data array is nested under 'Sheet1'
const rawWatchData = data.Sheet1 || data;

// --- STEP 1: Deduplication Function ---
const uniqueModelNumbers = new Set();

const deduplicatedRawData = rawWatchData.filter(w => {
    // We use the raw 'SL Number' or 'modelNumber' field to check for uniqueness
    const modelNumKey = w["SL Number"] || w.modelNumber;
    
    // Ensure the key exists and has a value
    if (modelNumKey && modelNumKey.trim() !== '') {
        const modelNumber = modelNumKey.trim();
        if (uniqueModelNumbers.has(modelNumber)) {
            // Duplicate found, filter it out
            return false;
        } else {
            // New record, keep it and add it to the Set
            uniqueModelNumbers.add(modelNumber);
            return true;
        }
    }
    // Filter out records with no model number (which would violate the non-optional constraint)
    return false;
});

// --- STEP 2: Data Transformation to match the CLEANED schema ---
const transformedData = deduplicatedRawData.map(w => {
    const imagesArray = w.images ? w.images.split('\r\n').filter(link => link.trim()) : [];
    
    // --- PRICE CLEANING AND CONVERSION (The Fix) ---
    // Function to clean price string (removes commas and converts to float)
    const cleanPrice = (priceStr) => {
        if (!priceStr) return 0.0;
        // Remove commas, trim whitespace, and parse as a Float
        const cleaned = String(priceStr).replace(/,/g, '').trim();
        // Return the parsed float, or 0 if parsing fails (for safety)
        return parseFloat(cleaned) || 0.0;
    };
    // ----------------------------------------------------

    return {
        // Use the key with the space and trim the value.
        name: String((w["name "] || '').trim() ?? ''), 
        
        // **FIXED:** Convert price fields to Float
        price: cleanPrice(w.price), 
        discountedPrice: cleanPrice(w.discountedPrice), 
        
        // Ensure other required fields are safely coerced to strings
        brand: String(w.brand ?? ''),
        modelNumber: String((w["SL Number"] || w.modelNumber || '').trim() ?? ''), 
        category: String(w.category ?? ''), 
        description: String(w.description ?? ''),
        
        images: imagesArray, 
        // Ensure inStock is an integer
        inStock: parseInt(w.inStock) || 10,
    };
});

async function main() {
    console.log('Clearing existing database records...');
    await prisma.watch.deleteMany({}); 

    console.log(`Start seeding ${transformedData.length} unique records...`);
    // Note: The denominator for removed records should be the deduplicated count to be accurate
    console.log(`Removed ${rawWatchData.length - deduplicatedRawData.length} initial duplicate records.`);
    
    const creations = transformedData.map(w =>
        // The transformation (Step 2) ensures 'w' now has the correct data types
        prisma.watch.create({ data: w })
    );

    await prisma.$transaction(creations);

    console.log(`Seeding finished. Created ${transformedData.length} unique watches.`);
}

main()
  .catch((e) => {
    console.error("Seeding Error:", e);
    
    if (e.code === 'P2002') {
        console.error("\n--- FATAL ERROR: P2002 Persistence ---");
        console.error("The unique constraint failed even after programmatic deduplication and clearing the DB. This is highly unexpected.");
        console.error("--------------------------------------\n");
    }
    // Added a check for the common price error to give a better hint
    if (e.message.includes('Expected Float, provided String')) {
        console.error("\n--- FIX HINT: Data Type Mismatch ---");
        console.error("The error is still related to the 'price' or 'discountedPrice' being passed as a string.");
        console.error("Ensure the 'cleanPrice' function above correctly handles ALL your price data formats.");
        console.error("--------------------------------------\n");
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); 
  });