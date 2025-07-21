import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
    // Seed categories
    const categories = [
        { name: "Technology", slug: "technology" },
        { name: "Health", slug: "health" },
        { name: "Sports", slug: "sports" },
        { name: "Entertainment", slug: "entertainment" },
        { name: "Politics", slug: "politics" },
        { name: "Business", slug: "business" },
        { name: "Education", slug: "education" },
        { name: "Lifestyle", slug: "lifestyle" },
        { name: "Travel", slug: "travel" },
        { name: "Food", slug: "food" },
        { name: "Science", slug: "science" },
        { name: "Environment", slug: "environment" },
        { name: "Opinion", slug: "opinion" },
        { name: "Culture", slug: "culture" },
        { name: "Fashion", slug: "fashion" },
        { name: "Automotive", slug: "automotive" },
        { name: "Real Estate", slug: "real-estate" },
        { name: "Finance", slug: "finance" },
        { name: "History", slug: "history" }
    ];


    // Create categories in the database
    const createdCategories = await prisma.category.createManyAndReturn({
        data: categories,
        skipDuplicates: true, // Skip duplicates if they already exist
    });

    // Seed sources
    const sources = [
        {
            "name": "Inyarwanda",
            "url": "https://inyarwanda.com",
        },
        {
            "name": "Igihe",
            "url": "https://igihe.com",
        },
        {
            "name": "Umuseke",
            "url": "https://umuseke.rw",
        },
        {
            "name": "The New Times",
            "url": "https://newtimes.co.rw",
        },
        {
            "name": "Kigali Today",
            "url": "https://kigalitoday.com",
        },
        {
            "name": "YegoB",
            "url": "https://yegob.com"
        },
    ];

    const createdSources = await prisma.source.createManyAndReturn({
        data: sources,
        skipDuplicates: true, // Skip duplicates if they already exist
    });

    console.log(`${createdCategories.length} categories created, ${createdSources.length} sources created.`);
}

main()
    .then(() => {
        console.log("Seeding completed successfully.");
    })
    .catch((error) => {
        console.error("Error during seeding:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });