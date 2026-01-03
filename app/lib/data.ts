export interface Product {
  id: string;
  slug: string; // New field for URL
  name: string;
  tagline: string;
  description: string; // New field for long text
  price: number;
  category: "Single Origin" | "Blend" | "Equipment" | "Merch";
  image: string;
  tastingNotes: string[];
  roastLevel: "Light" | "Medium" | "Dark" | "Espresso";
  isLimited?: boolean;
  specs?: { [key: string]: string }; // Optional specs for gear/coffee
}

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Subscription", href: "/subscription" },
  { label: "Methodology", href: "/methodology" },
  { label: "Locations", href: "/locations" },
];

export const products: Product[] = [
  {
    id: "bean-001",
    slug: "ethiopian-yirgacheffe-g1",
    name: "Ethiopian Yirgacheffe G1",
    tagline: "Floral alchemy with notes of bergamot.",
    description: "Grown at 2,200 meters above sea level in the Gedeo Zone, this coffee defines the 'floral' category. It is washed and sun-dried on African raised beds for 21 days, resulting in a cup clarity that rivals fine tea. The roast profile is halted precisely at the end of the first crack to preserve the delicate jasmine aromatics.",
    price: 24,
    category: "Single Origin",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=1000",
    tastingNotes: ["Jasmine", "Bergamot", "Lemon Zest"],
    roastLevel: "Light",
    isLimited: true,
    specs: {
      Origin: "Gedeo Zone, Ethiopia",
      Process: "Washed",
      Altitude: "2200m",
      Varietal: "Heirloom"
    }
  },
  {
    id: "bean-002",
    slug: "voidwalker-espresso",
    name: "Voidwalker Espresso",
    tagline: "Our signature house blend. Deep and viscous.",
    description: "Engineered for milk-based drinks but complex enough to stand alone as a shot. Voidwalker combines the heavy body of a Brazilian natural with the fruit-forward punch of an Ethiopian natural. It is roasted to the very edge of the second crack, creating a syrup-like mouthfeel with zero bitterness.",
    price: 19,
    category: "Blend",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000",
    tastingNotes: ["Dark Chocolate", "Molasses", "Dried Fig"],
    roastLevel: "Espresso",
    specs: {
      Composition: "60% Brazil / 40% Ethiopia",
      Process: "Natural / Natural",
      Profile: "Low Acidity, High Body",
    }
  },
  {
    id: "gear-001",
    slug: "aether-precision-scale",
    name: "Aether Precision Scale",
    tagline: "Measure time and weight to the decigram.",
    description: "Consistency is impossible without measurement. The Aether Scale features a response time of 20ms and an accuracy of 0.1g. The hidden LED display remains invisible until touched. The silicone heat pad protects the sensors from thermal drift during brewing.",
    price: 145,
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1521495084171-3ad639e3d525?auto=format&fit=crop&q=80&w=1000",
    tastingNotes: ["0.1g Accuracy", "Auto-Timer", "Bluetooth"],
    roastLevel: "Medium", 
    specs: {
      MaxWeight: "2000g",
      Battery: "Type-C Rechargeable",
      Material: "Matte Polycarbonate"
    }
  },
  {
    id: "bean-003",
    slug: "colombia-pink-bourbon",
    name: "Colombia Pink Bourbon",
    tagline: "Rare varietal. Exceedingly sweet.",
    description: "A genetic mutation of the Red and Yellow Bourbon varieties, Pink Bourbon is famous for its high glucose content. We source this from a single farm in Huila. The cup is incredibly sweet, resembling tropical fruit juice rather than traditional coffee.",
    price: 32,
    category: "Single Origin",
    image: "https://images.unsplash.com/photo-1592966991098-d057fe53ef01?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvZmZlZSUyMHBpbmt8ZW58MHx8MHx8fDA%3D",
    tastingNotes: ["Pink Grapefruit", "Honey", "Papaya"],
    roastLevel: "Light",
    isLimited: true,
    specs: {
      Origin: "Huila, Colombia",
      Process: "Double Anaerobic",
      Altitude: "1800m",
      Varietal: "Pink Bourbon"
    }
  },
  {
    id: "gear-002",
    slug: "v60-copper-dripper",
    name: "V60 Copper Dripper",
    tagline: "Thermal conductivity meets aesthetic brilliance.",
    description: "Copper has the highest thermal conductivity of any safe metal. This V60 ensures that your slurry temperature remains stable throughout the drawdown, resulting in higher extraction yields. Plus, the patina it develops over time tells the story of your brewing journey.",
    price: 65,
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=1000",
    tastingNotes: ["Solid Copper", "Spiral Ribs", "Size 02"],
    roastLevel: "Medium",
    specs: {
      Material: "Antimicrobial Copper",
      Capacity: "1-4 Cups",
      Weight: "400g"
    }
  }
];

export const FEATURED_PRODUCTS = products;