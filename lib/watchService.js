import { prisma } from './prisma'; // Assuming your Prisma Client instance is exported from here

/**
 * Fetches the most recently added watches.
 * @returns {Promise<Array>} A list of watch objects ready for the client.
 */
export async function getPopularWatches() {
    try {
        const watches = await prisma.watch.findMany({
            take: 8,
            orderBy: {
                createdAt: 'desc', // Orders by newest first
            },
            // CRITICAL FIX: Changed 'imageUrl' to 'images' based on your Prisma schema error.
            select: {
                id: true,
                name: true,
                price: true,
                brand: true,
                images: true, // Assuming this is the field containing the image URLs (array of strings)
                modelNumber: true,
                discountedPrice: true,
            }
        });

        // Ensure prices are numeric for the client and set originalPrice for consistency
        return watches.map(watch => ({
            ...watch,
            price: parseFloat(watch.price) || 0,
            // Use discountedPrice if available, otherwise use a default higher price for showing discount
            originalPrice: parseFloat(watch.discountedPrice) || (parseFloat(watch.price) * 1.5).toFixed(2), 
            // Ensure images is an array, even if it might be null or a string in some schema setups
            images: Array.isArray(watch.images) ? watch.images : [watch.images].filter(Boolean),
        }));
    } catch (error) {
        console.error("Database error in getPopularWatches:", error);
        // Throw a new error to be caught by the API Route handler
        throw new Error('Failed to fetch watches from the database.');
    }
}
