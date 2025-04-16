import { StatusType, categories, services, type InsertCategory, type InsertService } from "@shared/schema";
import { db } from "./db";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Initialize categories
    const categoriesData: InsertCategory[] = [
      { name: 'Games', icon: 'fa-gamepad', slug: 'games' },
      { name: 'Browser & AI', icon: 'fa-globe', slug: 'browser-ai' },
      { name: 'Social', icon: 'fa-users', slug: 'social' },
      { name: 'Connection', icon: 'fa-wifi', slug: 'connection' },
      { name: 'Bank', icon: 'fa-landmark', slug: 'bank' },
      { name: 'Streaming', icon: 'fa-play', slug: 'streaming' },
      { name: 'Mail', icon: 'fa-envelope', slug: 'mail' },
      { name: 'Shopping', icon: 'fa-shopping-cart', slug: 'shopping' },
      { name: 'Various', icon: 'fa-ellipsis-h', slug: 'various' }
    ];

    console.log("Inserting categories...");
    await db.insert(categories).values(categoriesData).onConflictDoNothing();
    
    // Fetch inserted categories to get IDs
    const insertedCategories = await db.select().from(categories);
    const categoryMap = new Map(
      insertedCategories.map(cat => [cat.slug, cat.id])
    );

    // Initialize services
    const servicesData: InsertService[] = [
      // Games
      { name: 'Steam', logo: 'fab fa-steam', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 118, slug: 'steam' },
      { name: 'Roblox', logo: 'fas fa-cube', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 342, slug: 'roblox' },
      { name: 'Epic Games', logo: 'fas fa-gamepad', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 98, slug: 'epic-games' },
      { name: 'Rockstar', logo: 'fas fa-star', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 125, slug: 'rockstar' },
      { name: 'Mojang', logo: 'fas fa-cube', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 125, slug: 'mojang' },
      { name: 'Xbox', logo: 'fab fa-xbox', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 104, slug: 'xbox' },
      { name: 'PlayStation', logo: 'fab fa-playstation', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 112, slug: 'playstation' },
      
      // Browser & AI
      { name: 'Google', logo: 'fab fa-google', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 56, slug: 'google' },
      { name: 'Open AI', logo: 'fas fa-robot', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 487, slug: 'openai' },
      { name: 'Microsoft', logo: 'fab fa-microsoft', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 78, slug: 'microsoft' },
      { name: 'Chrome', logo: 'fab fa-chrome', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 64, slug: 'chrome' },
      
      // Social
      { name: 'Twitter (X)', logo: 'fab fa-twitter', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 124, slug: 'twitter' },
      { name: 'Meta', logo: 'fab fa-facebook', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 143, slug: 'meta' },
      { name: 'TikTok', logo: 'fab fa-tiktok', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 165, slug: 'tiktok' },
      { name: 'Discord', logo: 'fab fa-discord', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 222, slug: 'discord' },
      
      // Connection
      { name: 'Vodafone', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 76, slug: 'vodafone' },
      { name: 'TIM', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 82, slug: 'tim' },
      
      // Streaming
      { name: 'Netflix', logo: 'fas fa-film', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 97, slug: 'netflix' },
      { name: 'YouTube', logo: 'fab fa-youtube', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 88, slug: 'youtube' },
      { name: 'Twitch', logo: 'fab fa-twitch', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 105, slug: 'twitch' }
    ];

    console.log("Inserting services...");
    await db.insert(services).values(servicesData).onConflictDoNothing();

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();