const data = {
  phone: [
    "phones",
    "phone",
    "mobiles",
    "iphones",
    "smartphones",
    "android",
    "cellphones",
    "feature phones",
    "mobile devices",
    "cellular phones",
    "smart cellphones",
    "touchscreen phones",
    "5G phones",
    "foldable phones",
    "dual SIM phones",
    "basic phones",
  ],
  accessories: [
    "accessories",
    "accessory",
    "keychains",
    "cables",
    "chargers",
    "headphones",
    "earbuds",
    "screen protectors",
    "phone cases",
  ],
  home: [
    "all",
    "home decor",
    "furniture",
    "home appliances",
    "interior design",
    "kitchenware",
    "lighting",
    "bedding",
  ],
  watch: [
    "watch",
    "watches",
    "iwatches",
    "digital watches",
    "analog watches",
    "smartwatch",
    "fitness tracker",
  ],
  laptop: [
    "laptops",
    "laptop",
    "imac",
    "asus",
    "hp",
    "dell",
    "notebook",
    "ultrabook",
    "gaming laptop",
    "chromebook",
    "2-in-1 laptops",
    "business laptops",
    "macbook",
    "windows laptops",
    "lightweight laptops",
    "high-performance laptops",
  ],
  tv: [
    "tv",
    "television",
    "televisions",
    "smart tv",
    "oled",
    "led tv",
    "4k tv",
    "hdr tv",
  ],
  chair: [
    "chairs",
    "chair",
    "stool",
    "stools",
    "office chair",
    "recliner",
    "gaming chair",
    "bar stool",
  ],
  sofa: [
    "sofas",
    "sofa",
    "couch",
    "sectional sofa",
    "loveseat",
    "futon",
    "ottoman",
  ],
  garden: [
    "garden",
    "gardens",
    "garden products",
    "plant",
    "outdoor furniture",
    "patio",
    "flower pots",
    "landscaping",
  ],
  oven: [
    "oven",
    "ovens",
    "microwave oven",
    "microwave",
    "microwaves",
    "toaster",
    "convection oven",
    "air fryer",
  ],
  fridge: [
    "fridge",
    "refridgerator",
    "refrigerators",
    "fridges",
    "cooler",
    "mini fridge",
    "wine cooler",
  ],
  men: [
    "men",
    "mens",
    "men products",
    "men clothes",
    "shirts",
    "shirt",
    "pant",
    "pants",
    "jackets",
    "jeans",
    "suits",
    "t-shirts",
    "shorts",
  ],
  women: [
    "women",
    "womens",
    "women products",
    "women clothes",
    "frocks",
    "tops",
    "leggings",
    "dresses",
    "skirts",
    "blouses",
    "activewear",
    "jumpsuits",
  ],
  shoes: [
    "shoes",
    "footwear",
    "sneakers",
    "sandals",
    "boots",
    "loafers",
    "flats",
    "heels",
    "slippers",
  ],
  beauty: [
    "beauty",
    "cosmetics",
    "makeup",
    "skincare",
    "haircare",
    "perfume",
    "fragrance",
    "nail polish",
  ],
  electronics: [
    "electronics",
    "gadgets",
    "devices",
    "accessories",
    "audio",
    "smart home devices",
    "wearables",
    "cameras",
  ],
  toys: [
    "toys",
    "games",
    "action figures",
    "dolls",
    "puzzles",
    "educational toys",
    "stuffed animals",
    "board games",
  ],
  sports: [
    "sports",
    "fitness",
    "exercise equipment",
    "outdoor sports",
    "indoor games",
    "yoga",
    "running gear",
    "sportswear",
  ],
  petSupplies: [
    "pet supplies",
    "pets",
    "dog food",
    "cat food",
    "pet toys",
    "pet grooming",
    "aquarium supplies",
    "bird cages",
  ],
  books: [
    "books",
    "novels",
    "textbooks",
    "ebooks",
    "audiobooks",
    "children's books",
    "non-fiction",
    "self-help",
  ],
  kitchen: [
    "kitchen",
    "cookware",
    "utensils",
    "kitchen gadgets",
    "small appliances",
    "dinnerware",
    "glassware",
    "cutlery",
  ],
  health: [
    "health",
    "wellness",
    "supplements",
    "vitamins",
    "personal care",
    "medical supplies",
    "fitness trackers",
  ],
  automotive: [
    "automotive",
    "car accessories",
    "car care",
    "tires",
    "tools",
    "motor oil",
    "bike accessories",
  ],
  stationery: [
    "stationery",
    "office supplies",
    "notebooks",
    "pens",
    "paper",
    "staplers",
    "art supplies",
    "craft materials",
  ],
  blazers: [
    "blazers",
    "suit jackets",
    "sports coats",
    "formal jackets",
    "tailored jackets",
    "women's blazers",
    "men's blazers",
    "casual blazers",
    "dress blazers",
    "blazer outfits",
  ],
};

export function findCategory(word) {
  for (const category in data) {
    if (data[category].includes(word)) {
      return category;
    }
  }
  return "Category not found";
}
