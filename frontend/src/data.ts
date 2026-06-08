/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Destination, Experience, Suite, Article, UserProfile } from './types';

// Curated Unsplash images for luxury travel
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80", // Gorgeous beach sunset
  malibuThumbing: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80",
  santoriniThumbing: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=300&q=80",
  
  parisCard: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80", // Eiffel Tower
  kyotoCard: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80", // Kyoto Red Leaves temple
  whitsundayCard: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80", // Azure waters

  privateJet: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80", // Private Jet interior
  yachtCharter: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80", // Elegance Yacht
  hiddenIslands: "https://images.unsplash.com/photo-1467377229969-08ae89af0f3c?auto=format&fit=crop&w=800&q=80", // Island paradise
  concierge: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", // Luxury hotel lobby

  amalfiCoastHero: "https://images.unsplash.com/photo-1486016006115-74a41448aea2?auto=format&fit=crop&w=1920&q=80", // Amalfi mountain cliffside waterfront
  amalfiLemons: "https://images.unsplash.com/photo-1595113316349-9df4eb240176?auto=format&fit=crop&w=800&q=80", // Lemons overlooking Capri coast
  
  positano: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=850&q=80", // Positano beach houses
  ravello: "https://images.unsplash.com/photo-1524396309943-e03f5ee77974?auto=format&fit=crop&w=850&q=80", // Garden terrace arch view
  duomo: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=850&q=80", // Duomo
  furore: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=850&q=80", // Furore bridge

  rivaCharter: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=800&q=80", // Vintage speedboat Riva
  terraceGastronomy: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", // Candlelit dining
  pathOfTheGods: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", // High mountain cliffs coastline

  // Itinerary
  itineraryHero: "https://images.unsplash.com/photo-1614243685458-be6da8340d85?auto=format&fit=crop&w=1920&q=80", // Jet flight above oceans
  itinerarySorrento: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80", // Sorrento town balcony
  itineraryYacht: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80", // Riva boat front
  itineraryFood: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", // Chef gourmet plate

  // Hotel
  monolithResort: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80", // Monolith dark modern structure pool
  concreteCube: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80", // Raw loft suite orange sofa
  kineticSuite: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80", // Futuristic bedroom circular yellow bed

  // Checkout info
  securePaymentBanner: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",

  // Map stays
  villaEscale: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", // Mediterranean modern pool villa
  crystalPeak: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80", // Snowy luxury chalet
  auraSafari: "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?auto=format&fit=crop&w=800&q=80", // Serengeti camp at twilight

  // Dispatch / Blog
  dispatchHero: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80", // Diving deep water
  kotoBlog: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80", // Japanese tatami sliding doors room
  emeraldSteps: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=800&q=80", // Rice terraced hills
  desertMirage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80", // Minimalist concrete pool amidst sand dunes
  cycladicRhythms: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80", // White Greek alley staircase
  bestBars: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80", // Highball cocktail glass
  digitalDetox: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80", // Person meditating sunset
  urbanBrutalism: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80", // Monolithic facade shadows

  // About / Vanguard
  aboutHero: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1920&q=80",
  genesis: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=800&q=80", // Black and white jet front on tarmac
  expansion: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&q=80", // Modern cliff villa black and white
  future: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // Futuristic lounge corridor black and white

  // Architects
  architect1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
  architect2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
  architect3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
  architect4: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=300&q=80",
};

export const DESTINATIONS: Destination[] = [
  {
    id: "amalfi",
    name: "AMALFI COAST",
    country: "Italy",
    tagline: "Where the azure sea meets the gravity-defying architecture of Positano.",
    description: "A vertical paradise designed for those who seek the ultimate in Mediterranean elegance. The Amalfi Coast is not just a destination; it's a sensory assault of the most refined kind. Since the days of the Roman Empire, this 50-kilometer stretch of coastline has captivated the world's most discerning travelers. From the terraced lemon groves of Sorrento to the high-fashion boutiques of Capri, every corner reveals a new layer of Italian luxury.",
    heroImage: IMAGES.amalfiCoastHero,
    established: "EST. 1954",
    essentialTag: "EXCLUSIVE DESTINATION",
    tagColor: "yellow"
  },
  {
    id: "paris",
    name: "MIDNIGHT IN PARIS",
    country: "France",
    tagline: "Luxury suites overlooking the Seine, private museum tours, and clandestine gastronomy.",
    description: "Experience the City of Light with VIP access keys. Wake up in a sprawling penthouse suite overlooking the Eiffel Tower, travel via private chauffeur, and enjoy closed-door curations of the Louvre after hours.",
    heroImage: IMAGES.parisCard,
    essentialTag: "ESSENTIAL",
    tagColor: "red"
  },
  {
    id: "kyoto",
    name: "KYOTO ZEN GARDENS",
    country: "Japan",
    tagline: "Immersive ryokan stays, tea ceremonies with masters, and secret garden explorations.",
    description: "A peaceful immersion into ancestral Japan. Slumber in a premium pavilion set within historic temple grounds, participate in private incense ceremonies, and learn custom calligraphy with grand masters.",
    heroImage: IMAGES.kyotoCard,
    essentialTag: "EXCLUSIVE",
    tagColor: "blue"
  },
  {
    id: "whitsunday",
    name: "WHITSUNDAY BLUE",
    country: "Australia",
    tagline: "Private yacht charters across the coral sea with personal diving instructors.",
    description: "Command a pristine catamaran through the world's most vivid coral shelf. Swim in private blue lagoons, sleep under the stars in tailor-made luxury decks, and wake up to a secluded white-sand beach with a private gourmet brunch.",
    heroImage: IMAGES.whitsundayCard,
    essentialTag: "LIMITED",
    tagColor: "yellow"
  }
];

export const EXPERIENCES_AMALFI: Experience[] = [
  {
    id: "riva-charter",
    destinationId: "amalfi",
    title: "Private Riva Charter",
    price: 4200,
    image: IMAGES.rivaCharter,
    description: "Explore the coastline from the water with a vintage mahogany speedboat and private skipper.",
    duration: "Full Day"
  },
  {
    id: "terrace-gastro",
    destinationId: "amalfi",
    title: "Terrace Gastronomy",
    price: 1880,
    image: IMAGES.terraceGastronomy,
    description: "A 7-course Michelin-starred dinner prepared by a private chef on your villa's terrace.",
    duration: "Evening"
  },
  {
    id: "path-gods",
    destinationId: "amalfi",
    title: "Path of the Gods",
    price: 958,
    image: IMAGES.pathOfTheGods,
    description: "A guided sunrise hike through the ancient trails, including a private lunch at a shepherd's hut.",
    duration: "Half Day"
  }
];

export const AMALFI_ICONS = [
  { name: "Positano", tagline: "Vertical City", image: IMAGES.positano },
  { name: "Ravello", tagline: "Hilltop Garden", image: IMAGES.ravello },
  { name: "Duomo di Amalfi", tagline: "Historic Core", image: IMAGES.duomo },
  { name: "Furore Inlet", tagline: "Secret Fjord", image: IMAGES.furore }
];

export const ITINERARY_STEPS = [
  {
    step: "01",
    title: "ARRIVAL IN SORRENTO",
    description: "Chauffeur-driven transfer from Naples to your cliffside suite. Welcome cocktails at the Grand Hotel Excelsior Vittoria.",
    image: IMAGES.itinerarySorrento
  },
  {
    step: "02",
    title: "PRIVATE YACHT CHARTER",
    description: "A day aboard a custom Riva yacht. Circumnavigate the Li Galli islands with a private chef preparing lunch on deck.",
    image: IMAGES.itineraryYacht
  },
  {
    step: "03",
    title: "POSITANO GASTRONOMY",
    description: "Cooking masterclass with a Michelin-starred chef followed by a candlelit dinner overseeing the vertical city.",
    image: IMAGES.itineraryFood
  }
];

export const MAP_STAYS = [
  {
    id: "villa-royale",
    name: "Villa L'Escale Royale",
    location: "COTE D'AZUR",
    price: 2450,
    rating: 4.9,
    description: "Suspended over the Mediterranean, offering private boat transfers and master-crafted basalt plunge pools.",
    image: IMAGES.villaEscale,
    tag: "Available Sep",
    coordinates: { x: 45, y: 35 }
  },
  {
    id: "crystal-peak",
    name: "The Crystal Peak Chalet",
    location: "ST. MORITZ",
    price: 4100,
    rating: 5.0,
    description: "An architectural masterpiece of glass and stone, featuring a 360-degree observatory overlooking the powder valley.",
    image: IMAGES.crystalPeak,
    tag: "Limited Dates",
    coordinates: { x: 70, y: 75 }
  },
  {
    id: "aura-safari",
    name: "Aura Safari Suites",
    location: "SERENGETI",
    price: 3200,
    rating: 4.8,
    description: "Luxury redefined in the wild. Private decks, automated skylight panels for pristine star gazing.",
    image: IMAGES.auraSafari,
    tag: "Instant Book",
    coordinates: { x: 25, y: 80 }
  }
];

export const AMENITIES = [
  { id: "pool", name: "Infinity Pool", icon: "Waves" },
  { id: "spa", name: "Monolith Spa", icon: "Sparkles" },
  { id: "dining", name: "Michelin Dining", icon: "UtensilsCrossed" },
  { id: "gym", name: "Elite Gym", icon: "Dumbbell" }
];

export const HOTEL_SUITES: Suite[] = [
  {
    id: "concrete-cube",
    name: "THE CONCRETE CUBE",
    price: 850,
    image: IMAGES.concreteCube,
    description: "A minimalist sanctuary featuring raw basalt floors, 400-thread count Egyptian cotton, and a private basalt-tiled terrace.",
    size: "45 SQM / City View",
    tag: "BEST VALUE",
    tagColor: "red",
    amenities: ["45 SQM / City View", "In-suite automation"]
  },
  {
    id: "kinetic-suite",
    name: "THE KINETIC SUITE",
    price: 1450,
    image: IMAGES.kineticSuite,
    description: "Designed for the digital nomad. Ergonomic workspace, sensory light system, and a 270-degree view of the ocean.",
    size: "80 SQM / Ocean Front",
    tag: "POPULAR",
    tagColor: "cyan",
    amenities: ["80 SQM / Ocean Front", "Private infinity plunge pool"]
  }
];

export const BLOG_ARTICLES: Article[] = [
  {
    id: "beyond-amalfi",
    title: "BEYOND THE EDGE OF THE AMALFI COAST",
    category: "FEATURED STORY",
    categoryColor: "yellow",
    description: "A deep dive into the hidden architectural marvels of Southern Italy, where raw concrete meets the turquoise abyss. Discover the stories of travelers who seek the extreme over the expected.",
    image: IMAGES.amalfiCoastHero,
    date: "Sep 12, 2026",
    readTime: "12 min read",
    featured: true
  },
  {
    id: "koto-zen",
    title: "KOTO: THE SILENT REVOLUTION",
    category: "CULTURE",
    categoryColor: "red",
    description: "In the heart of Kyoto, a new generation of artisans is blending ancestral crafts with hyper-modern digital technologies.",
    image: IMAGES.kotoBlog,
    date: "Feb 12, 2026",
    readTime: "8 min read",
    author: {
      name: "MARCO VASQUEZ",
      avatar: IMAGES.architect3
    }
  },
  {
    id: "emerald-steps",
    title: "THE EMERALD STEPS OF HA GIANG",
    category: "ADVENTURE",
    categoryColor: "pink",
    description: "Motorbiking through the clouds on the edge of the world. An off-road adventure through Vietnam's terraced frontier.",
    image: IMAGES.emeraldSteps,
    date: "May 24, 2026",
    readTime: "6 min read"
  },
  {
    id: "desert-mirage",
    title: "DESERT MIRAGE: AMANGIRI REVISITED",
    category: "LUXURY",
    categoryColor: "cyan",
    description: "When architecture disappears into the ancient landscape. Redefining desert luxury in Utah's sacred canyons.",
    image: IMAGES.desertMirage,
    date: "Jan 15, 2026",
    readTime: "5 min read"
  },
  {
    id: "cycladic-rhythms",
    title: "CYCLADIC RHYTHMS: BEYOND THE BLUE",
    category: "CULTURE",
    categoryColor: "yellow",
    description: "Finding the heartbeat of the Greek islands away from the crowded sunset photo ops.",
    image: IMAGES.cycladicRhythms,
    date: "Aug 02, 2026",
    readTime: "9 min read"
  }
];

export const DISPATCH_CARDS = [
  {
    id: "best-bars",
    category: "GASTRONOMY",
    title: "THE BEST BARS YOU'VE NEVER HEARD OF",
    description: "Inside the hidden speak-easies of Tokyo and the roof-top lounges of Marrakech.",
    image: IMAGES.bestBars
  },
  {
    id: "digital-detox",
    category: "WELLNESS",
    title: "DIGITAL DETOX IN THE HIMALAYAS",
    description: "Switch off the world and reconnect with yourself in the highest sanctuary on earth.",
    image: IMAGES.digitalDetox
  },
  {
    id: "brutalism",
    category: "CULTURE",
    title: "URBAN ARCHITECTURE: THE NEW BRUTALISM",
    description: "How modern designers are redefining the cityscapes of tomorrow with hard edges.",
    image: IMAGES.urbanBrutalism
  }
];

export const VANGUARD_TIMELINE = [
  {
    year: "MCMXCVIII",
    id: "GENESIS",
    title: "THE GENESIS",
    description: "Starting with a single vintage jet and a vision for frictionless exploration, GoTrip began in a small hangar in Geneva. Our mission was simple: make the impossible reachable for those who demand the extraordinary.",
    image: IMAGES.genesis
  },
  {
    year: "MMXII",
    id: "EXPANSION",
    title: "THE EXPANSION",
    description: "As our network grew, so did our ambition. We acquired exclusive rights to secret archipelago destinations and partnered with world-renowned brutalist architects to build habitats that exist in harmony with their rugged environments.",
    image: IMAGES.expansion
  },
  {
    year: "PRESENT DAY",
    id: "FUTURE",
    title: "THE FUTURE",
    description: "Today, GoTrip stands as the global authority on elite travel. We are pioneers of sustainability in aviation and guardians of the world's most pristine cultural heritage sites, ensuring luxury lasts for generations.",
    image: IMAGES.future
  }
];

export const ARCHITECTS = [
  { name: "JULIAN VANCE", title: "Chief Curator", image: IMAGES.architect1 },
  { name: "ELARA KLINE", title: "Lead Architect", image: IMAGES.architect2 },
  { name: "MARCUS REED", title: "Fleet Commander", image: IMAGES.architect3 },
  { name: "ANIKA SEN", title: "Direct Contact", image: IMAGES.architect4 }
];

export const USER_MOCK: UserProfile = {
  name: "Julian.",
  avatar: IMAGES.architect1,
  tier: "Gold Tier",
  points: 84200,
  pointsToNextTier: 15800,
  status: "ACTIVE EXPLORER"
};
