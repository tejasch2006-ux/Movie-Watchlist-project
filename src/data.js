// product catalog data
const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    brand: "SoundCore",
    price: 149.99,
    category: "audio",
    rating: 4.7,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    description: "Premium over-ear headphones with 40h battery life and adaptive noise cancellation.",
    inStock: true,
    tags: ["wireless", "bluetooth", "noise-cancelling"]
  },
  {
    id: 2,
    name: "Mechanical Gaming Keyboard",
    brand: "KeyForge",
    price: 89.99,
    category: "peripherals",
    rating: 4.5,
    reviews: 1892,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    description: "RGB backlit mechanical keyboard with hot-swappable Cherry MX switches.",
    inStock: true,
    tags: ["mechanical", "rgb", "gaming"]
  },
  {
    id: 3,
    name: "4K Ultra HD Monitor",
    brand: "PixelPro",
    price: 449.99,
    category: "displays",
    rating: 4.8,
    reviews: 967,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
    description: "27-inch IPS display with HDR10 support and 1ms response time.",
    inStock: true,
    tags: ["4k", "hdr", "ips"]
  },
  {
    id: 4,
    name: "Ergonomic Wireless Mouse",
    brand: "GlideX",
    price: 59.99,
    category: "peripherals",
    rating: 4.3,
    reviews: 3104,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
    description: "Vertical ergonomic design with 6 programmable buttons and 16K DPI sensor.",
    inStock: false,
    tags: ["ergonomic", "wireless", "programmable"]
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    brand: "SoundCore",
    price: 79.99,
    category: "audio",
    rating: 4.6,
    reviews: 5621,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
    description: "Waterproof speaker with 360° sound and 20h playtime. Perfect for outdoors.",
    inStock: true,
    tags: ["portable", "waterproof", "bluetooth"]
  },
  {
    id: 6,
    name: "USB-C Docking Station",
    brand: "HubMax",
    price: 129.99,
    category: "accessories",
    rating: 4.4,
    reviews: 742,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236571?w=400&q=80",
    description: "12-in-1 hub with dual HDMI, ethernet, SD reader, and 100W power delivery.",
    inStock: true,
    tags: ["usb-c", "dock", "multiport"]
  },
  {
    id: 7,
    name: "Smart LED Desk Lamp",
    brand: "LumiGlow",
    price: 44.99,
    category: "accessories",
    rating: 4.2,
    reviews: 1356,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80",
    description: "Touch-controlled lamp with 5 color temps, wireless charging base, and timer.",
    inStock: true,
    tags: ["smart", "led", "wireless-charging"]
  },
  {
    id: 8,
    name: "Ultrawide Curved Monitor",
    brand: "PixelPro",
    price: 699.99,
    category: "displays",
    rating: 4.9,
    reviews: 489,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&q=80",
    description: "34-inch UWQHD curved display with 144Hz refresh rate. Immersive gaming.",
    inStock: false,
    tags: ["ultrawide", "curved", "144hz"]
  },
  {
    id: 9,
    name: "Webcam Pro 4K",
    brand: "ClearView",
    price: 119.99,
    category: "peripherals",
    rating: 4.1,
    reviews: 2087,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
    description: "4K webcam with auto-focus, built-in ring light, and noise-reducing mic.",
    inStock: true,
    tags: ["4k", "webcam", "streaming"]
  },
  {
    id: 10,
    name: "Wireless Earbuds Pro",
    brand: "SoundCore",
    price: 99.99,
    category: "audio",
    rating: 4.5,
    reviews: 8934,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80",
    description: "True wireless earbuds with ANC, transparency mode, and 32h total battery.",
    inStock: true,
    tags: ["wireless", "anc", "earbuds"]
  },
  {
    id: 11,
    name: "Gaming Mousepad XL",
    brand: "GlideX",
    price: 29.99,
    category: "accessories",
    rating: 4.6,
    reviews: 4210,
    image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400&q=80",
    description: "Extended RGB mousepad with micro-textured surface and non-slip rubber base.",
    inStock: true,
    tags: ["xl", "rgb", "gaming"]
  },
  {
    id: 12,
    name: "Portable SSD 2TB",
    brand: "DataVault",
    price: 179.99,
    category: "storage",
    rating: 4.8,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&q=80",
    description: "Compact external SSD with 1050MB/s read speed and hardware encryption.",
    inStock: true,
    tags: ["portable", "ssd", "encrypted"]
  }
];

// pull out unique categories from the data
const categories = [...new Set(products.map(p => p.category))];

export { products, categories };
