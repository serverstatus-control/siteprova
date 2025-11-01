// Import schema con path assoluto per evitare problemi di risoluzione
import { StatusType, categories, services, type InsertCategory, type InsertService } from "../shared/schema";
import { storage } from "./storage";
import { db } from "./db";
import { inArray } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  if (!db) {
    console.log("⚠️  Database non disponibile - seed saltato");
    return;
  }

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
      { name: 'Various', icon: 'fa-ellipsis-h', slug: 'various' },
      { name: 'Cloud', icon: 'fa-cloud', slug: 'cloud' },
      { name: 'Betting', icon: 'fa-dice', slug: 'betting' },
      { name: 'Music', icon: 'fa-music', slug: 'music' }
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
      { name: 'Mojang', logo: 'fas fa-cube', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 125, slug: 'mojang' },
      { name: 'Xbox', logo: 'fab fa-xbox', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 104, slug: 'xbox' },
      { name: 'PlayStation', logo: 'fab fa-playstation', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 112, slug: 'playstation' },
      { name: 'Aternos', logo: 'fas fa-server', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 200, slug: 'aternos' },
      { name: 'EA Sports', logo: 'fas fa-futbol', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 180, slug: 'easports' },
      { name: 'Nintendo', logo: 'fas fa-gamepad', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 160, slug: 'nintendo' },
      { name: 'Supercell', logo: 'fas fa-mobile-alt', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 170, slug: 'supercell' },
      { name: 'Valorant', logo: 'fas fa-crosshairs', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 150, slug: 'valorant' },
      { name: 'Among Us', logo: 'fas fa-user-astronaut', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 140, slug: 'among-us' },
      { name: 'Gran Turismo', logo: 'fas fa-flag-checkered', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 130, slug: 'gran-turismo' },
      
      // Browser & AI
      { name: 'Google', logo: 'fab fa-google', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 56, slug: 'google' },
      { name: 'Open AI', logo: 'fas fa-robot', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 487, slug: 'openai' },
      { name: 'Microsoft', logo: 'fab fa-microsoft', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 78, slug: 'microsoft' },
      { name: 'Chrome', logo: 'fab fa-chrome', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 64, slug: 'chrome' },
  { name: 'Firefox', logo: 'fab fa-firefox', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 70, slug: 'firefox' },
  { name: 'Edge', logo: 'fab fa-edge', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 68, slug: 'edge' },
  { name: 'Opera', logo: 'fab fa-opera', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 75, slug: 'opera' },
  { name: 'DuckDuckGo', logo: 'fab fa-duckduckgo', categoryId: categoryMap.get('browser-ai') || 2, status: StatusType.UP, responseTime: 66, slug: 'duckduckgo' },
      
      // Social
      { name: 'Twitter (X)', logo: 'fab fa-twitter', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 124, slug: 'twitter' },
      { name: 'Meta', logo: 'fab fa-facebook', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 143, slug: 'meta' },
      { name: 'TikTok', logo: 'fab fa-tiktok', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 165, slug: 'tiktok' },
  { name: 'Discord', logo: 'fab fa-discord', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 222, slug: 'discord' },
  { name: 'Instagram', logo: 'fab fa-instagram', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 120, slug: 'instagram' },
  { name: 'WhatsApp', logo: 'fab fa-whatsapp', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 110, slug: 'whatsapp' },
  { name: 'Telegram', logo: 'fab fa-telegram', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 130, slug: 'telegram' },
  { name: 'Reddit', logo: 'fab fa-reddit', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 140, slug: 'reddit' },
  { name: 'Tinder', logo: 'fab fa-tinder', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 150, slug: 'tinder' },
      
      // Connection
      { name: 'Vodafone', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 76, slug: 'vodafone' },
      { name: 'TIM', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 82, slug: 'tim' },
  { name: 'Iliad', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 100, slug: 'iliad' },
  { name: 'WindTre', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 100, slug: 'windtre' },
  { name: 'Fastweb', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 100, slug: 'fastweb' },
  { name: 'Sky Wifi', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 110, slug: 'sky-wifi' },
  { name: 'Linkem', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 120, slug: 'linkem' },
  { name: 'Very Mobile', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 110, slug: 'verymobile' },
  { name: 'ho. Mobile', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 110, slug: 'ho-mobile' },
  { name: 'EOLO', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 110, slug: 'eolo' },
  { name: 'Tiscali', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 115, slug: 'tiscali' },
  { name: 'Kena Mobile', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 115, slug: 'kena' },
  { name: 'PosteMobile', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 115, slug: 'postemobile' },
  { name: 'CoopVoce', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 115, slug: 'coopvoce' },
      
      // Streaming
  { name: 'Prime Video', logo: 'fab fa-amazon', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 97, slug: 'prime-video' },
  { name: 'Netflix', logo: 'fas fa-film', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 97, slug: 'netflix' },
      { name: 'YouTube', logo: 'fab fa-youtube', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 88, slug: 'youtube' },
  { name: 'Twitch', logo: 'fab fa-twitch', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 105, slug: 'twitch' },
  { name: 'Disney+', logo: 'fas fa-film', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 110, slug: 'disney-plus' },
  { name: 'DAZN', logo: 'fas fa-football-ball', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 120, slug: 'dazn' },
  { name: 'NOW', logo: 'fas fa-tv', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 115, slug: 'now' },
  { name: 'Mediaset Infinity', logo: 'fas fa-film', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 130, slug: 'mediaset-infinity' },
  { name: 'RaiPlay', logo: 'fas fa-film', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 125, slug: 'raiplay' },
  { name: 'Paramount+', logo: 'fas fa-film', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 120, slug: 'paramount-plus' },
  { name: 'Apple TV+', logo: 'fab fa-apple', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 100, slug: 'apple-tv-plus' },
  { name: 'Sky Go', logo: 'fas fa-satellite-dish', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 135, slug: 'sky-go' },
  { name: 'Crunchyroll', logo: 'fas fa-film', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 120, slug: 'crunchyroll' },
  { name: 'Sky', logo: 'fas fa-tv', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 120, slug: 'sky' },
  { name: 'Discovery+', logo: 'fas fa-film', categoryId: categoryMap.get('streaming') || 6, status: StatusType.UP, responseTime: 120, slug: 'discovery-plus' },
      
      // Bank
  { name: 'Banca Monte dei Paschi di Siena', logo: 'fas fa-university', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 120, slug: 'mps' },
      { name: 'Mediolanum', logo: 'fas fa-university', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 110, slug: 'mediolanum' },
    { name: 'PayPal', logo: 'fab fa-paypal', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 100, slug: 'paypal' },
  { name: 'Poste Italiane', logo: 'fas fa-university', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 120, slug: 'poste-italiane' },
  { name: 'PostePay', logo: 'fas fa-credit-card', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 120, slug: 'postepay' },
  { name: 'N26', logo: 'fas fa-university', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 120, slug: 'n26' },
  { name: 'ING', logo: 'fas fa-university', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 120, slug: 'ing' },
  { name: 'Satispay', logo: 'fas fa-mobile-alt', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 120, slug: 'satispay' },
  { name: 'Stripe', logo: 'fas fa-credit-card', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 120, slug: 'stripe' },
  { name: 'Credit Agricole', logo: 'fas fa-university', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 110, slug: 'credit-agricole' },
  { name: 'American Express', logo: 'fab fa-cc-amex', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 110, slug: 'american-express' },
  { name: 'Hype', logo: 'fas fa-university', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 110, slug: 'hype' },
  { name: 'BPER', logo: 'fas fa-university', categoryId: categoryMap.get('bank') || 1, status: StatusType.UP, responseTime: 110, slug: 'bper' },
      
      // Health
  { name: 'Fascicolo Sanitario', logo: 'fas fa-notes-medical', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 150, slug: 'fascicolo-sanitario' }
    ];

    // Mail
    servicesData.push(
      { name: 'Gmail', logo: 'fas fa-envelope', categoryId: categoryMap.get('mail') || 7, status: StatusType.UP, responseTime: 80, slug: 'gmail' },
      { name: 'Outlook', logo: 'fas fa-envelope', categoryId: categoryMap.get('mail') || 7, status: StatusType.UP, responseTime: 90, slug: 'outlook' },
      { name: 'Yahoo Mail', logo: 'fas fa-envelope', categoryId: categoryMap.get('mail') || 7, status: StatusType.UP, responseTime: 100, slug: 'yahoo' },
      { name: 'Proton Mail', logo: 'fas fa-envelope', categoryId: categoryMap.get('mail') || 7, status: StatusType.UP, responseTime: 95, slug: 'proton' },
      { name: 'iCloud Mail', logo: 'fas fa-envelope', categoryId: categoryMap.get('mail') || 7, status: StatusType.UP, responseTime: 95, slug: 'icloud' },
      { name: 'Virgilio Mail', logo: 'fas fa-envelope', categoryId: categoryMap.get('mail') || 7, status: StatusType.UP, responseTime: 95, slug: 'virgilio' },
      { name: 'Libero Mail', logo: 'fas fa-envelope', categoryId: categoryMap.get('mail') || 7, status: StatusType.UP, responseTime: 95, slug: 'libero' },
      { name: 'Tiscali Mail', logo: 'fas fa-envelope', categoryId: categoryMap.get('mail') || 7, status: StatusType.UP, responseTime: 95, slug: 'tiscali-mail' },
    );

    // Shopping
    servicesData.push(
      { name: 'Amazon', logo: 'fab fa-amazon', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 90, slug: 'amazon' },
      { name: 'eBay', logo: 'fab fa-ebay', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 110, slug: 'ebay' },
      { name: 'AliExpress', logo: 'fas fa-shopping-bag', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 130, slug: 'aliexpress' },
      { name: 'Shein', logo: 'fas fa-tshirt', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 130, slug: 'shein' },
      { name: 'Zalando', logo: 'fas fa-shoe-prints', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 120, slug: 'zalando' },
      { name: 'Poste Italiane (Shop)', logo: 'fas fa-shopping-cart', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 120, slug: 'poste-italiane-shop' },
      { name: 'Temu', logo: 'fas fa-shopping-bag', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 130, slug: 'temu' },
      { name: 'Esselunga', logo: 'fas fa-shopping-basket', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 120, slug: 'esselunga' },
      { name: 'Coop', logo: 'fas fa-shopping-basket', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 120, slug: 'coop' },
      { name: 'Conad', logo: 'fas fa-shopping-basket', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 120, slug: 'conad' },
      { name: 'Carrefour', logo: 'fas fa-shopping-basket', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 120, slug: 'carrefour' },
      { name: 'Vinted', logo: 'fas fa-tshirt', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 120, slug: 'vinted' },
      { name: 'IKEA', logo: 'fas fa-couch', categoryId: categoryMap.get('shopping') || 8, status: StatusType.UP, responseTime: 120, slug: 'ikea' },
    );

    // Social extra
    servicesData.push(
      { name: 'Snapchat', logo: 'fab fa-snapchat', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 120, slug: 'snapchat' },
      { name: 'Pinterest', logo: 'fab fa-pinterest', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 120, slug: 'pinterest' },
      { name: 'LinkedIn', logo: 'fab fa-linkedin', categoryId: categoryMap.get('social') || 3, status: StatusType.UP, responseTime: 120, slug: 'linkedin' },
    );

    // ISP Italia
    servicesData.push(
      { name: 'Iliad', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 100, slug: 'iliad' },
      { name: 'WindTre', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 100, slug: 'windtre' },
      { name: 'Fastweb', logo: 'fas fa-wifi', categoryId: categoryMap.get('connection') || 4, status: StatusType.UP, responseTime: 100, slug: 'fastweb' },
    );

    // Cloud
    servicesData.push(
      { name: 'GitHub', logo: 'fab fa-github', categoryId: categoryMap.get('cloud') || 10, status: StatusType.UP, responseTime: 100, slug: 'github' },
      { name: 'GitLab', logo: 'fab fa-gitlab', categoryId: categoryMap.get('cloud') || 10, status: StatusType.UP, responseTime: 110, slug: 'gitlab' },
      { name: 'Cloudflare', logo: 'fas fa-cloud', categoryId: categoryMap.get('cloud') || 10, status: StatusType.UP, responseTime: 80, slug: 'cloudflare' },
      { name: 'AWS', logo: 'fab fa-aws', categoryId: categoryMap.get('cloud') || 10, status: StatusType.UP, responseTime: 120, slug: 'aws' },
      { name: 'Azure', logo: 'fab fa-microsoft', categoryId: categoryMap.get('cloud') || 10, status: StatusType.UP, responseTime: 120, slug: 'azure' },
      { name: 'Google Cloud', logo: 'fab fa-google', categoryId: categoryMap.get('cloud') || 10, status: StatusType.UP, responseTime: 120, slug: 'google-cloud' },
      { name: 'DigitalOcean', logo: 'fas fa-water', categoryId: categoryMap.get('cloud') || 10, status: StatusType.UP, responseTime: 120, slug: 'digitalocean' },
      { name: 'OVH', logo: 'fas fa-server', categoryId: categoryMap.get('cloud') || 10, status: StatusType.UP, responseTime: 120, slug: 'ovh' },
      { name: 'Aruba', logo: 'fas fa-cloud', categoryId: categoryMap.get('cloud') || 10, status: StatusType.UP, responseTime: 120, slug: 'aruba' },
    );

    // Music
    servicesData.push(
      { name: 'Spotify', logo: 'fab fa-spotify', categoryId: categoryMap.get('music') || 12, status: StatusType.UP, responseTime: 95, slug: 'spotify' },
      { name: 'Apple Music', logo: 'fab fa-apple', categoryId: categoryMap.get('music') || 12, status: StatusType.UP, responseTime: 100, slug: 'apple-music' },
      { name: 'YouTube Music', logo: 'fab fa-youtube', categoryId: categoryMap.get('music') || 12, status: StatusType.UP, responseTime: 100, slug: 'youtube-music' },
      { name: 'Amazon Music', logo: 'fab fa-amazon', categoryId: categoryMap.get('music') || 12, status: StatusType.UP, responseTime: 100, slug: 'amazon-music' },
      { name: 'Deezer', logo: 'fas fa-music', categoryId: categoryMap.get('music') || 12, status: StatusType.UP, responseTime: 100, slug: 'deezer' },
      { name: 'SoundCloud', logo: 'fab fa-soundcloud', categoryId: categoryMap.get('music') || 12, status: StatusType.UP, responseTime: 100, slug: 'soundcloud' },
      { name: 'TIDAL', logo: 'fas fa-music', categoryId: categoryMap.get('music') || 12, status: StatusType.UP, responseTime: 100, slug: 'tidal' },
      { name: 'Shazam', logo: 'fas fa-music', categoryId: categoryMap.get('music') || 12, status: StatusType.UP, responseTime: 100, slug: 'shazam' },
      { name: 'Bandcamp', logo: 'fas fa-music', categoryId: categoryMap.get('music') || 12, status: StatusType.UP, responseTime: 100, slug: 'bandcamp' },
    );

    // Giochi aggiuntivi (senza GOG e itch.io)
    servicesData.push(
      { name: 'Battle.net', logo: 'fas fa-gamepad', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 120, slug: 'battle-net' },
      { name: 'Ubisoft', logo: 'fas fa-gamepad', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 120, slug: 'ubisoft' },
      { name: 'Riot Games', logo: 'fas fa-gamepad', categoryId: categoryMap.get('games') || 1, status: StatusType.UP, responseTime: 120, slug: 'riot-games' },
    );

    // Betting
    servicesData.push(
      { name: 'Sisal', logo: 'fas fa-dice', categoryId: categoryMap.get('betting') || 11, status: StatusType.UP, responseTime: 120, slug: 'sisal' },
      { name: 'bet365', logo: 'fas fa-dice', categoryId: categoryMap.get('betting') || 11, status: StatusType.UP, responseTime: 120, slug: 'bet365' },
      { name: 'Betfair', logo: 'fas fa-dice', categoryId: categoryMap.get('betting') || 11, status: StatusType.UP, responseTime: 120, slug: 'betfair' },
      { name: 'William Hill', logo: 'fas fa-dice', categoryId: categoryMap.get('betting') || 11, status: StatusType.UP, responseTime: 120, slug: 'william-hill' },
      { name: 'bwin', logo: 'fas fa-dice', categoryId: categoryMap.get('betting') || 11, status: StatusType.UP, responseTime: 120, slug: 'bwin' },
      { name: 'Lottomatica', logo: 'fas fa-dice', categoryId: categoryMap.get('betting') || 11, status: StatusType.UP, responseTime: 120, slug: 'lottomatica' },
      { name: 'SNAI', logo: 'fas fa-dice', categoryId: categoryMap.get('betting') || 11, status: StatusType.UP, responseTime: 120, slug: 'snai' },
    );

    // Various extras (richiesti)
    servicesData.push(
      { name: 'Binance', logo: 'fas fa-coins', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 140, slug: 'binance' },
      { name: 'Siri', logo: 'fas fa-microphone', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 120, slug: 'siri' },
      { name: 'Ryanair', logo: 'fas fa-plane', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 150, slug: 'ryanair' },
      { name: 'Turkish Airlines', logo: 'fas fa-plane', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 150, slug: 'turkish-airlines' },
      { name: 'Trustpilot', logo: 'fas fa-star', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 120, slug: 'trustpilot' },
      { name: 'Allianz', logo: 'fas fa-shield-alt', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 120, slug: 'allianz' },
      { name: 'Wikipedia', logo: 'fab fa-wikipedia-w', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 100, slug: 'wikipedia' },
      { name: 'Booking', logo: 'fas fa-bed', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 120, slug: 'booking' },
      { name: 'WeTransfer', logo: 'fas fa-paper-plane', categoryId: categoryMap.get('various') || 9, status: StatusType.UP, responseTime: 120, slug: 'wetransfer' },
    );

  console.log("Deleting existing services with same slugs (if any)...");
  const slugs = servicesData.map(s => s.slug);
  await db.delete(services).where(inArray(services.slug, slugs));

  console.log("Inserting services...");
  await db.insert(services).values(servicesData).onConflictDoNothing();

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    const msg = (error as any)?.message || String(error);
    if ((error as any)?.code === 'XX000' || msg.includes('exceeded the compute time quota')) {
      console.warn('⚠️  Neon: quota computazionale esaurita — seed saltato (i dati rimarranno quelli esistenti).');
      return;
    }
    console.error("Error seeding database:", error);
  }
}

seed();