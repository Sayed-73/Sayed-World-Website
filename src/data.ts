import { Category, Brand, VendorStore, Product, DevelopmentPhase, UserRole } from "./types";

export const CATEGORIES: Category[] = [
  { id: "cat-1", name: "Fashion & Apparel", slug: "fashion-apparel", icon: "Shirt" },
  { id: "cat-2", name: "Electronics & Gadgets", slug: "electronics-gadgets", icon: "Smartphone" },
  { id: "cat-3", name: "Home & Living", slug: "home-living", icon: "Home" },
  { id: "cat-4", name: "Beauty & Personal Care", slug: "beauty-personal-care", icon: "Sparkles" },
  { id: "cat-5", name: "Groceries & Organic", slug: "groceries-organic", icon: "ShoppingBag" },
  { id: "cat-6", name: "Traditional Crafts & Gifts", slug: "handicrafts-gifts", icon: "Gift" }
];

export const BRANDS: Brand[] = [
  { id: "brand-1", name: "Apex Footwear", slug: "apex", logoUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=60" },
  { id: "brand-2", name: "Walton", slug: "walton", logoUrl: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=100&auto=format&fit=crop&q=60" },
  { id: "brand-3", name: "Aarong Artisans", slug: "aarong", logoUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100&auto=format&fit=crop&q=60" },
  { id: "brand-4", name: "Singer Bangladesh", slug: "singer", logoUrl: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=100&auto=format&fit=crop&q=60" }
];

export const VENDOR_STORES: VendorStore[] = [
  {
    id: "store-1",
    vendorId: "v-1",
    storeName: "Sayed Tech & Innovations",
    slug: "sayed-tech",
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=70",
    logoUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=200&auto=format&fit=crop&q=60",
    rating: 4.9,
    followersCount: 1420,
    featured: true,
    vacationMode: false
  },
  {
    id: "store-2",
    vendorId: "v-2",
    storeName: "Dhaka Heritage Weavers",
    slug: "dhaka-heritage",
    bannerUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&auto=format&fit=crop&q=70",
    logoUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&auto=format&fit=crop&q=60",
    rating: 4.7,
    followersCount: 890,
    featured: true,
    vacationMode: false
  },
  {
    id: "store-3",
    vendorId: "v-3",
    storeName: "Sylhet Organic Acres",
    slug: "sylhet-organic",
    bannerUrl: "https://images.unsplash.com/photo-1500937386664-56d15ef3f76d?w=1200&auto=format&fit=crop&q=70",
    logoUrl: "https://images.unsplash.com/photo-1595981267035-7b04ec82a89d?w=200&auto=format&fit=crop&q=60",
    rating: 4.5,
    followersCount: 520,
    featured: false,
    vacationMode: false
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-shirt-skybuy",
    vendorStoreId: "store-2",
    title: "Short-sleeved White Shirt Men's Summer Business Casual Non-ironing Anti-wrinkle Slim-fit Half-sleeved Blue and Black Shirt",
    slug: "summer-business-casual-shirt",
    description: "Premium cotton business casual shirt designed with state of the art non-ironing and anti-wrinkle treatment. Features lightweight breathable composition, soft feel texture, and executive slim cut styling perfect for standard office and dynamic social meetups in Bangladesh.",
    price: 566,
    oldPrice: 850,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80", // Sky Blue
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80", // Black
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80", // Pink
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80"  // Wine Red
    ],
    categoryId: "cat-1",
    brandId: "brand-1",
    rating: 4.8,
    stockCount: 150,
    salesCount: 7200,
    status: "approved",
    featured: true,
    specifications: {
      "Fabric Material": "65% Silk Modal, 35% Premium combed Cotton",
      "Treatments": "Anti-wrinkle, Easy Non-ironing wash",
      "Collar Design": "Classic Spread Executive Collar",
      "Fit Type": "Modern Slim-Fit"
    },
    variants: [
      { id: "v-shirt-s", size: "S", color: "Short Sleeve Shirt Sky Blue", stock: 30, additionalPrice: 0 },
      { id: "v-shirt-m", size: "M", color: "Short Sleeve Shirt Sky Blue", stock: 40, additionalPrice: 0 },
      { id: "v-shirt-l", size: "L", color: "Short Sleeve Shirt Sky Blue", stock: 25, additionalPrice: 0 },
      { id: "v-shirt-xl", size: "XL", color: "Short Sleeve Shirt Sky Blue", stock: 15, additionalPrice: 0 },
      { id: "v-shirt-black", size: "M", color: "Short-Sleeved Shirt Black", stock: 20, additionalPrice: 0 },
      { id: "v-shirt-pink", size: "L", color: "Short Sleeve Shirt Pink", stock: 10, additionalPrice: 0 },
      { id: "v-shirt-wine", size: "XL", color: "Short Sleeve Shirt Wine Red", stock: 10, additionalPrice: 0 }
    ]
  },
  {
    id: "prod-derby-skybuy",
    vendorStoreId: "store-2",
    title: "Black Brown Square-Toe Leather Shoes Old Money Style Unisex Niche Retro Formal Commuting Derby Shoes Direct Sale",
    slug: "retro-niche-derby-shoes",
    description: "Premium micro-leather square-toe derby dress shoes conveying the authentic elegant 'Old Money style' retro vibes. Features shock-absorbent comfort insoles, reinforced anti-slip soles, and versatile aesthetic commuting wearability.",
    price: 4417,
    oldPrice: 5800,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80", // Black
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80", // Brown
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80"  // Slipper/Niche
    ],
    categoryId: "cat-1",
    brandId: "brand-1",
    rating: 4.9,
    stockCount: 88,
    salesCount: 1400,
    status: "approved",
    featured: true,
    specifications: {
      "Vamp Outer Material": "High-Grade Vegan Leather Commute Texture",
      "Heel Height": "Increases height by up to 7cm via stealth insole",
      "Stitching": "Premium Handmade double-layer welt outline",
      "Sole Material": "Durable Anti-slip Vulcanized Rubber"
    },
    variants: [
      { id: "v-shoe-37", size: "37", color: "Black", stock: 12, additionalPrice: 0 },
      { id: "v-shoe-38", size: "38", color: "Black", stock: 15, additionalPrice: 0 },
      { id: "v-shoe-39", size: "39", color: "Black", stock: 20, additionalPrice: 0 },
      { id: "v-shoe-40", size: "40", color: "Black", stock: 11, additionalPrice: 0 },
      { id: "v-shoe-41", size: "41", color: "Black", stock: 10, additionalPrice: 0 },
      { id: "v-shoe-37b", size: "37", color: "Brown", stock: 8, additionalPrice: 0 },
      { id: "v-shoe-38b", size: "38", color: "Brown", stock: 12, additionalPrice: 0 }
    ]
  },
  {
    id: "prod-1",
    vendorStoreId: "store-1",
    title: "Sayed-Watch X Premium Smartwatch",
    slug: "sayed-watch-x-premium",
    description: "The ultimate flagship smartwatch with built-in SpO2, heart rate tracker, standalone GPS, and custom local integration for bKash balance checking and local time syncing. Includes luxurious AMOLED display and metallic strap options.",
    price: 4999,
    oldPrice: 6500,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-2",
    brandId: "brand-2",
    rating: 4.9,
    stockCount: 45,
    salesCount: 180,
    status: "approved",
    featured: true,
    specifications: {
      "Display": "1.43 inch AMOLED Always-On",
      "Battery Life": "Up to 14 Days",
      "Waterproof Rating": "IP68 & 5ATM",
      "Warranty": "1 Year Walton BD Warranty"
    },
    variants: [
      { id: "v-1-1", color: "Obsidian Black", stock: 25, additionalPrice: 0 },
      { id: "v-1-2", color: "Cosmic Silver", stock: 20, additionalPrice: 200 }
    ]
  },
  {
    id: "prod-2",
    vendorStoreId: "store-2",
    title: "Premium Jamdani Sari - Handwoven Blue",
    slug: "premium-jamdani-sari-blue",
    description: "An absolute masterpiece handwoven by veteran artisans in Narayanganj. Designed with traditional intricate zari booti work and a grand pallu. It represents the authentic cultural heritage of Bangladesh in a luxurious modern shade.",
    price: 12500,
    oldPrice: 15000,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-1",
    brandId: "brand-3",
    rating: 4.8,
    stockCount: 12,
    salesCount: 34,
    status: "approved",
    featured: true,
    specifications: {
      "Material": "Pure Quality Cotton-Silk Blend",
      "Thread Count": "84 Count Fine Craftsmanship",
      "Length": "5.5 Meters",
      "Country of Origin": "Bangladesh"
    },
    variants: [
      { id: "v-2-1", color: "Royal Blue & Gold", stock: 7, additionalPrice: 0 },
      { id: "v-2-2", color: "Crimson Red & Gold", stock: 5, additionalPrice: 500 }
    ]
  },
  {
    id: "prod-3",
    vendorStoreId: "store-3",
    title: "Sylhet Sreemangal Organic Green Tea",
    slug: "sylhet-organic-green-tea",
    description: "Grown and curated organically in the lush high hills of Sreemangal, Sylhet - the tea capital of Bangladesh. Free from artificial chemical sprays or preservatives. Rich in natural antioxidants to supercharge your daily mindfulness.",
    price: 360,
    oldPrice: 450,
    images: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564894917715-73f1d5869afe?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-5",
    rating: 4.6,
    stockCount: 220,
    salesCount: 650,
    status: "approved",
    featured: false,
    specifications: {
      "Weight": "250g Airtight Foil Pack",
      "Organic Certification": "Bangladesh Organic Standard Cert",
      "Shelf Life": "24 Months"
    }
  },
  {
    id: "prod-4",
    vendorStoreId: "store-1",
    title: "Sayed-Pro Bassbuds Wireless",
    slug: "sayed-pro-bassbuds-wireless",
    description: "Ergonomically engineered true wireless earbuds featuring Active Noise Cancellation (ANC), punchy custom 12mm drivers, ultra-low latency gaming mode, and dual microphones for crisp clear calls even on busy Dhaka streets.",
    price: 2499,
    oldPrice: 3200,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-2",
    brandId: "brand-2",
    rating: 4.7,
    stockCount: 95,
    salesCount: 420,
    status: "approved",
    featured: true,
    specifications: {
      "Noise Cancellation": "Up to 32dB Hybrid ANC",
      "Playback": "36 Hours with Charging Case",
      "Bluetooth v5.3": "Dual-channel Low Energy",
      "Warranty": "6 Months Walton BD Warranty"
    },
    variants: [
      { id: "v-4-1", color: "Matte Black", stock: 60, additionalPrice: 0 },
      { id: "v-4-2", color: "Glacier White", stock: 35, additionalPrice: 0 }
    ]
  },
  {
    id: "prod-5",
    vendorStoreId: "store-2",
    title: "Traditional Brass Water Pitcher (Kalsi)",
    slug: "traditional-brass-kalsi",
    description: "Exquisite hand-carved solid pure brass pitcher meticulously built by traditional smiths in Dhamrai. Elevate the wellness and aesthetic look of your dining experience while preserving standard water purity biologically.",
    price: 4200,
    oldPrice: 5500,
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-6",
    rating: 4.5,
    stockCount: 8,
    salesCount: 15,
    status: "approved",
    featured: false,
    specifications: {
      "Material": "100% Pure Solid Yellow Brass",
      "Capacity": "4.5 Liters",
      "Weight": "1.8kg Solid build"
    }
  },
  {
    id: "prod-6",
    vendorStoreId: "store-3",
    title: "Surf Excel Liquid Detergent (1 Litre)",
    slug: "surf-excel-liquid-1l",
    description: "Ultimate formula for washing machines and hand wash. Ensures tough stain removal inside the machine in one wash. Protects clothes from fading and keeps them fresh.",
    price: 277,
    oldPrice: 400,
    images: [
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-5",
    rating: 4.9,
    stockCount: 6,
    salesCount: 752,
    status: "approved",
    featured: true,
    specifications: {
      "Volume": "1 Litre",
      "Type": "Concentrated Laundry Liquid",
      "Packaging": "Ergonomic Spout Bottle"
    }
  },
  {
    id: "prod-7",
    vendorStoreId: "store-1",
    title: "Xiaomi Handheld Rechargeable Portable Fan",
    slug: "xiaomi-portable-fan",
    description: "Multi-speed powerful smart portable fan with digital display showing energy speeds and battery percentage. Compact, foldable design with super silent motor, perfect for the hot summer commute.",
    price: 493,
    oldPrice: 1000,
    images: [
      "https://images.unsplash.com/photo-1618944847023-38aa001235f0?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-2",
    rating: 4.8,
    stockCount: 6,
    salesCount: 540,
    status: "approved",
    featured: true,
    specifications: {
      "Speeds": "5 Gear Levels with LED Counter",
      "Battery": "3000mAh Type-C rechargeable",
      "Noise Level": "Less than 20dB"
    }
  },
  {
    id: "prod-8",
    vendorStoreId: "store-1",
    title: "Walton Direct Cool Refrigerator (220L)",
    slug: "walton-refrigerator-220l",
    description: "Ultra elegant direct cooling system with state of the art inverter technology. Saves up to 60% electricity. Stabilizer free operation with tempered glass door design.",
    price: 19990,
    oldPrice: 29990,
    images: [
      "https://images.unsplash.com/photo-1571875257727-256c3aae42af?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-2",
    rating: 4.7,
    stockCount: 3,
    salesCount: 22,
    status: "approved",
    featured: true,
    specifications: {
      "Capacity": "220 Liters",
      "Technology": "Intelligent Inverter Technology",
      "Warranty": "10 Years Compressor Warranty"
    }
  },
  {
    id: "prod-9",
    vendorStoreId: "store-2",
    title: "Elegant Kashmiri Georgette Kurti Set",
    slug: "kashmiri-georgette-kurti-set",
    description: "Featuring majestic floral embroidery, lightweight premium georgette fabric, and complete inner lining. Beautiful traditional boutique design which exhibits sheer grace and elegant comfort.",
    price: 1850,
    oldPrice: 2600,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-1",
    rating: 4.8,
    stockCount: 15,
    salesCount: 88,
    status: "approved",
    featured: true,
    specifications: {
      "Fabric": "Non-shrinkable Georgette",
      "Work": "Kashmiri Needlework embroidery",
      "Sleeve": "Three-Quarter Sleeves"
    }
  },
  {
    id: "prod-10",
    vendorStoreId: "store-3",
    title: "Simple Hydrating Moisturizing Face Wash",
    slug: "simple-moisturizing-face-wash",
    description: "100% soap-free cooling face wash packed with skin-loving pro-vitamin B5 and vitamin E. Cleanses gently without leaving the skin dehydrated or dry. Perfect for sensitive cells.",
    price: 340,
    oldPrice: 490,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-4",
    rating: 4.9,
    stockCount: 42,
    salesCount: 310,
    status: "approved",
    featured: true,
    specifications: {
      "Volume": "150ml Standard Tube",
      "Suitability": "All skin types inclusive of Sensitive skin",
      "Chemicals": "No artificial fragrance, No colorants"
    }
  },
  {
    id: "prod-11",
    vendorStoreId: "store-2",
    title: "Modern Ergonomic Royal Relax Sofa",
    slug: "royal-relax-sofa-chair",
    description: "Superior high-density reflex foam wrapped in soft textured wear-resistant upholstery. Styled with rich wooden arm accents to breathe comfortable luxury into your modern lounge setting.",
    price: 14500,
    oldPrice: 21000,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-3",
    rating: 4.6,
    stockCount: 4,
    salesCount: 12,
    status: "approved",
    featured: true,
    specifications: {
      "Frame Material": "Seasoned Solid Mahogany wood",
      "Cushioning": "Super Soft Orthopedic Grade High Resilience Sponge",
      "Dimensions": "32in H x 30in W x 34in D"
    }
  },
  {
    id: "prod-12",
    vendorStoreId: "store-1",
    title: "Sayed-Sound Premium ANC Pro Earphones",
    slug: "sayed-sound-anc-pro",
    description: "Premium sports neckband with advanced fast charge options, active noise cancellation up to 30dB, and signature extra deep bass audio output tailored precisely for local music buffs.",
    price: 1250,
    oldPrice: 2200,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
    ],
    categoryId: "cat-2",
    rating: 4.8,
    stockCount: 28,
    salesCount: 94,
    status: "approved",
    featured: true,
    specifications: {
      "Playback": "30 Hours of immersive playback",
      "Charging": "10-Min charge yields 8-Hrs playback",
      "Protection": "IPX5 Sweat & Water protection"
    }
  }
];

export const DEVELOPMENT_PHASES: DevelopmentPhase[] = [
  {
    id: 1,
    title: "Phase 1: Multi-Vendor System Init & Dhaka Localization",
    objective: "Bootstrap Laravel 12 multi-vendor project, establish Bangladesh regional localization (Asia/Dhaka timezone, BDT Default currency), and design a high-contrast Tailwind / Alpine master wireframe.",
    features: [
      "Laravel 12 Project Initialization, configuration check for PHP 8.2+",
      "Localization set to Asia/Dhaka and default currency configuration (BDT - ৳)",
      "Vite asset bundling architecture setup with custom Tailwind config",
      "Alpine.js & Livewire scaffolding for highly responsive micro-events",
      "Creating common base template layouts for guest, customers, and panels"
    ],
    databaseTables: ["personal_access_tokens", "failed_jobs", "sessions"],
    migrations: [
      "2014_10_12_000000_create_users_table.php (Base fields)",
      "2019_08_19_000000_create_failed_jobs_table.php",
      "2019_12_14_000001_create_personal_access_tokens_table.php"
    ],
    models: ["User.php"],
    controllers: ["HomeController.php", "LocalizationController.php"],
    routes: ["web.php -> '/' (Home)", "web.php -> '/locale/{lang}'"],
    bladePages: ["layouts/app.blade.php", "layouts/panel.blade.php", "home.blade.php"],
    adminFeatures: ["Configure base localization variables", "Toggle currency symbols global parameters"],
    vendorFeatures: ["Access base store landing frameworks", "Localization preference config"],
    customerFeatures: ["Explore multi-lingual frontend switches", "Observe real-time pricing in BDT"],
    validationRules: {
      "language": "required|in:en,bn",
      "timezone": "required|string|max:50"
    },
    securityConsiderations: [
      "Establish strict Session configuration secure flags",
      "Block frame execution clickjacking via proper middleware headers",
      "Enforce strictly canonical redirects on the server config"
    ],
    testingChecklist: [
      "Verify home page loading speed compiles in < 150ms",
      "Test responsive scaling from mobile viewport to 4K displays",
      "Ensure translation toggles preserve original language session keys"
    ],
    codeSnippet: {
      title: "config/app.php & Bootstrapping Localization",
      language: "php",
      code: `<?php

namespace App\\Providers;

use Illuminate\\Support\\ServiceProvider;
use Illuminate\\Support\\Facades\\Schema;
use Carbon\\Carbon;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Schema::defaultStringLength(191);
        
        // Lock system timezone to Bangladesh Local Time
        config(['app.timezone' => 'Asia/Dhaka']);
        date_default_timezone_set('Asia/Dhaka');
        Carbon::setLocale('bn'); // Carbon defaults to Bengali where requested
        
        // Inject Global Currency Symbol (BDT)
        view()->share('currencySymbol', '৳');
        view()->share('currencyCode', 'BDT');
    }
}`
    }
  },
  {
    id: 2,
    title: "Phase 2: Advanced Role-Based Entrust Auth (Role/Permission Trees)",
    objective: "Implement a highly secure custom Role-Based Access Control (RBAC) supporting Super Admin, Vendor, Customer, Delivery Manager, and Support Staff, with default admin 'SayedAdmin73'.",
    features: [
      "Breeze / Fortify backend system execution customized for multi-panel routing",
      "Roles and Permissions database seeders deployment",
      "Create default credentials (SayedAdmin73 / 123456) via automatic database seeders",
      "Custom redirect logic middleware following high-security verification check",
      "Two-Factor Authentication (2FA) scaffolding and login security blocks"
    ],
    databaseTables: ["users", "roles", "permissions", "model_has_roles", "model_has_permissions", "role_has_permissions"],
    migrations: [
      "2026_06_08_000001_create_permission_tables.php (Spatie Permission format)",
      "2026_06_08_000002_add_role_fields_to_users_table.php"
    ],
    models: ["Role.php", "Permission.php", "User.php (with HasRoles trait)"],
    controllers: ["Auth/AuthenticatedSessionController.php", "Auth/RegisteredUserController.php"],
    routes: ["/login", "/register", "/admin/dashboard", "/vendor/dashboard", "/customer/dashboard"],
    bladePages: ["auth/login.blade.php", "auth/register.blade.php", "auth/two-factor.blade.php"],
    adminFeatures: ["Supervises roles tree structure", "Force override of unauthorized sessions", "Enforce 2FA on vendors and support agents"],
    vendorFeatures: ["Custom dashboard login redirection based on role", "Session security validation checks"],
    customerFeatures: ["Fast standard client-side secure login", "Account recovery processes built with OTP"],
    validationRules: {
      "username": "required|string|alpha_dash|min:4|max:50",
      "password": "required|string|min:6"
    },
    securityConsiderations: [
      "Rate-limit login attempts (max 5 hits within 1 minute per IP)",
      "Strict verification to counter brute force using cache counts",
      "Establish Session hijack protection by fully regenerating session ID after login"
    ],
    testingChecklist: [
      "Verify Super Admin role redirect maps to Admin Dashboard",
      "Attempt cross-panel URL hijacking and assert immediate 403 Forbidden checks",
      "Verify 'SayedAdmin73' logins successfully compiles, hashing the 123456 credential"
    ],
    codeSnippet: {
      title: "Role Middleware Redirect & Verification",
      language: "php",
      code: `<?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;
use Symfony\\Component\\HttpFoundation\\Response;

class RedirectIfAuthenticatedByRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please authenticate first.');
        }

        $user = Auth::user();
        
        // Assert user possesses the defined structural role
        if (!$user->hasRole($role)) {
            abort(403, "Access Denied: Highly classification restricted to role $role");
        }

        return $next($request);
    }
}`
    }
  },
  {
    id: 3,
    title: "Phase 3: Vendor Store Registration & Verification Protocol",
    objective: "Build the automated Vendor onboarding application pipeline, complete with Super Admin shop review workflow, store banner/logo manager, and Vacation Mode flags.",
    features: [
      "Multi-step digital Vendor Registration Wizard featuring Livewire validation",
      "Stores database setup with dynamic slugs, brand names, and meta data config",
      "Admin validation approval/rejection panel with internal messaging loops",
      "Vacation Mode toggle allowing vendors to pause orders gracefully",
      "Dynamic Store Profile landing page framework featuring followers tracker"
    ],
    databaseTables: ["vendor_stores", "store_followers"],
    migrations: [
      "2026_06_08_000003_create_vendor_stores_table.php",
      "2026_06_08_000004_create_store_followers_table.php"
    ],
    models: ["VendorStore.php", "StoreFollower.php"],
    controllers: ["Vendor/StoreController.php", "Admin/VendorApprovalController.php"],
    routes: ["/shop-register", "/vendor/store/settings", "/admin/vendors/approval", "/shop/{slug}"],
    bladePages: ["vendor/store-registration.blade.php", "vendor/store-settings.blade.php", "admin/vendor-detail.blade.php"],
    adminFeatures: ["Inspects government trade license PDFs", "Approves/Rejects stores with specific reason prompts", "Sets customizable vendor-specific commissions"],
    vendorFeatures: ["Upload store logo & banners", "Trigger Vacation Mode setting during off-days", "View live store analytics charts"],
    customerFeatures: ["Browse dedicated store profiles", "Follow/unfollow favorite vendors (Livewire counter)"],
    validationRules: {
      "store_name": "required|string|unique:vendor_stores,store_name|max:100",
      "trade_license": "file|mimes:pdf,jpg,png|max:5120",
      "commission_rate": "nullable|numeric|between:0,100"
    },
    securityConsiderations: [
      "Strict sanitization of trade license file uploads (block .php/.sh files)",
      "Secure uploads by relocating files outside the public HTML server root",
      "Enforce unique slug generators strictly handling character replacement"
    ],
    testingChecklist: [
      "Verify store creation defaults to 'pending' state and blocks storefront access",
      "Test Vacation Mode successfully disables checkout buttons for that store's products",
      "Simulate double submission in Livewire and assert correct anti-concurrency filters"
    ],
    codeSnippet: {
      title: "Livewire Vendor Store Registration Form",
      language: "php",
      code: `<?php

namespace App\\Http\\Livewire\\Vendor;

use Livewire\\Component;
use Livewire\\WithFileUploads;
use App\\Models\\VendorStore;
use Illuminate\\Support\\Str;
use Illuminate\\Support\\Facades\\Auth;

class RegisterStore extends Component
{
    use WithFileUploads;

    public $store_name;
    public $trade_license;
    public $phone;

    protected $rules = [
        'store_name' => 'required|string|min:3|unique:vendor_stores,store_name',
        'trade_license' => 'required|file|mimes:pdf,jpg,png|max:4096',
        'phone' => 'required|regex:/^(?:\\+88|88)?(01[3-9]\\d{8})$/',
    ];

    public function submit()
    {
        $this->validate();

        $licensePath = $this->trade_license->store('licenses', 'private');

        $store = VendorStore::create([
            'vendor_id' => Auth::id(),
            'store_name' => $this->store_name,
            'slug' => Str::slug($this->store_name),
            'phone' => $this->phone,
            'trade_license_path' => $licensePath,
            'status' => 'pending'
        ]);

        return redirect()->route('dashboard')->with('success', 'Your store application is under review!');
    }
}`
    }
  },
  {
    id: 4,
    title: "Phase 4: Infinite Nesting Categories & Brand Engine",
    objective: "Establish highly optimized nested infinite category system, SEO slug indices, e-commerce brands, and a massive dynamic frontend Mega Menu component.",
    features: [
      "Infinite self-referencing hierarchy structure (parent_id references key)",
      "Database indexes on 'slug' and 'parent_id' for rapid queries",
      "Brands management with high-contrast logos cataloging tools",
      "Mega Menu builder component populated dynamically with cached data",
      "Responsive category grid layouts optimized for rapid mobile scrolling"
    ],
    databaseTables: ["categories", "brands"],
    migrations: [
      "2026_06_08_000005_create_categories_table.php",
      "2026_06_08_000006_create_brands_table.php"
    ],
    models: ["Category.php", "Brand.php"],
    controllers: ["Admin/CategoryController.php", "Admin/BrandController.php"],
    routes: ["/admin/categories", "/admin/brands", "/categories/{slug}"],
    bladePages: ["admin/categories/index.blade.php", "components/mega-menu.blade.php"],
    adminFeatures: ["Drag-and-arrange nested category parent trees", "Bulk-upload categories via JSON files"],
    vendorFeatures: ["Select accurately matching categories from dropdown search listings"],
    customerFeatures: ["Fast navigation across multi-layered catalog structures"],
    validationRules: {
      "name": "required|string|max:100",
      "parent_id": "nullable|integer|exists:categories,id",
      "logo": "nullable|image|max:1024"
    },
    securityConsiderations: [
      "Defend against self-referential infinite loops by verifying parent_id !== self_id",
      "Sanitize all text inputs to block cross-site scripting (XSS) on visual menus",
      "Add strict unique indexes restricting duplicating slugs on categories table"
    ],
    testingChecklist: [
      "Test hierarchy relationships up to 5 levels deep in database seeders",
      "Assert category deletions either cleanly cascade or safely nullify child links",
      "Verify Redis cache automatically invalidates upon adding list items"
    ],
    codeSnippet: {
      title: "Nested Eloquent Categories & Relationships",
      language: "php",
      code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'parent_id', 'icon', 'sort_order'];

    // Retrieve immediate nested children
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('sort_order');
    }

    // Retrieve parent category
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Recursive children to capture deep structures
    public function recursiveChildren()
    {
        return $this->children()->with('recursiveChildren');
    }
}`
    }
  },
  {
    id: 5,
    title: "Phase 5: Multi-Attribute Variation Product Manager",
    objective: "Deploy a highly flexible visual inventory/product management module supporting variations (e.g. Size, Color, Weight), multiple images, and detail specs.",
    features: [
      "Dynamic product posting form equipped with drop-and-drag multiple file upload",
      "Flexible variation matrix table with specific price adjustments and stock counts",
      "Rich specification JSON mapping table for technical product criteria",
      "Dynamic image optimization (automating resizing to standard webp parameters)",
      "SEO URL structures integration based on title"
    ],
    databaseTables: ["products", "product_variants", "product_images"],
    migrations: [
      "2026_06_08_000007_create_products_table.php",
      "2026_06_08_000008_create_product_variants_table.php",
      "2026_06_08_000009_create_product_images_table.php"
    ],
    models: ["Product.php", "ProductVariant.php", "ProductImage.php"],
    controllers: ["Vendor/ProductManagerController.php", "Admin/ProductApprovalController.php"],
    routes: ["/vendor/products", "/product/{slug}", "/admin/products/approve"],
    bladePages: ["vendor/products/create.blade.php", "product/show.blade.php"],
    adminFeatures: ["Exhaustive review screen for product approval queue", "Flag products for safety or trademark violations", "Override vendor stock counts in emergency cases"],
    vendorFeatures: ["Configure price margins per variation", "Embed YouTube walkthrough videos", "Set temporary price drops (Flash Sale ready)"],
    customerFeatures: ["Interactively toggle color/size chips to instantly recalculate prices", "View dynamic specifications table", "Enlarge product zooms seamlessly"],
    validationRules: {
      "title": "required|string|max:150",
      "price": "required|numeric|min:0",
      "variants.*.price_adjustment": "required|numeric|min:0",
      "variants.*.stock": "required|integer|min:0"
    },
    securityConsiderations: [
      "Sanitize product description inputs using robust HTML purifier utilities",
      "Ensure image uploads are verified against actual binary MIME-types",
      "Enforce store ownership checks before any product update operations"
    ],
    testingChecklist: [
      "Verify double uploads are kept unique across product variation listings",
      "Assert deleting parent product automatically cascades and deletes related product variations",
      "Ensure price calculation maintains floating precision bounds accurately"
    ],
    codeSnippet: {
      title: "Saving Variations in Database Transactions",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers\\Vendor;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Product;
use App\\Models\\ProductVariant;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Str;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:200',
            'category_id' => 'required|exists:categories,id',
            'base_price' => 'required|numeric|min:1',
            'variants' => 'array',
            'variants.*.size' => 'nullable|string',
            'variants.*.color' => 'nullable|string',
            'variants.*.sku' => 'required|unique:product_variants,sku',
            'variants.*.stock' => 'required|integer',
            'variants.*.extra_price' => 'numeric|default:0'
        ]);

        DB::beginTransaction();
        try {
            $product = Product::create([
                'vendor_store_id' => auth()->user()->vendorStore->id,
                'title' => $validated['title'],
                'slug' => Str::slug($validated['title']),
                'category_id' => $validated['category_id'],
                'price' => $validated['base_price'],
                'status' => 'pending'
            ]);

            foreach ($validated['variants'] as $v) {
                ProductVariant::create([
                    'product_id' => $product->id,
                    'sku' => $v['sku'],
                    'size' => $v['size'] ?? null,
                    'color' => $v['color'] ?? null,
                    'stock' => $v['stock'],
                    'additional_price' => $v['extra_price'] ?? 0
                ]);
            }

            DB::commit();
            return redirect()->route('products.index')->with('success', 'Product listed!');
        } catch (\\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed saving product: ' . $e->getMessage());
        }
    }
}`
    }
  },
  {
    id: 6,
    title: "Phase 6: Session-Driven Dynamic Shopping Cart Platform",
    objective: "Implement a highly interactive and state-retaining shopping cart with split merchant support, Save for Later functionalities, and Livewire sliders.",
    features: [
      "Session-based anonymous cart store that merges seamlessly upon registration",
      "Livewire real-time items calculation sidebar (recalculates sub-totals instantly)",
      "Grouping mechanism splitting cart items on a per-Vendor-store basis",
      "Save for Later system linked to database tables for authenticated profiles",
      "Dynamic alerts on stock reductions or merchant vacation changes"
    ],
    databaseTables: ["cart_items", "saved_items"],
    migrations: [
      "2026_06_08_000010_create_cart_items_table.php",
      "2026_06_08_000011_create_saved_items_table.php"
    ],
    models: ["CartItem.php", "SavedItem.php"],
    controllers: ["CartController.php", "WishlistController.php"],
    routes: ["/cart", "/cart/add", "/wishlist", "/saved-for-later"],
    bladePages: ["cart/index.blade.php", "wishlist/index.blade.php", "components/cart-drawer.blade.php"],
    adminFeatures: ["Visualize global cart abandonment counts", "Trigger micro-discount email incentives to lingering shoppers"],
    vendorFeatures: ["Observe live cart counts matching their specific store inventories"],
    customerFeatures: ["Adjust item quantities with instant UI updates", "Migrate items to saved lists with a single tap"],
    validationRules: {
      "product_id": "required|exists:products,id",
      "quantity": "required|integer|min:1|max:10",
      "variant_id": "nullable|exists:product_variants,id"
    },
    securityConsiderations: [
      "Validate product price completely server-side, never trusting hidden frontend inputs",
      "Ensure strict protection against race conditions using row locks during database modifications",
      "Enforce maximum purchase limit (e.g., 10 units) per product to block scraping bots"
    ],
    testingChecklist: [
      "Verify adding items to cart as guest retains state after completing login screens",
      "Test modifying quantities to exceed stock counts throws dynamic error highlights",
      "Assert cart split correctly distributes shipping rates per vendor item groups"
    ],
    codeSnippet: {
      title: "Split Vendor Shipping Calculation Inside Cart",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\Product;
use App\\Models\\ProductVariant;

class CartService
{
    // Group and calculate cart items
    public function getGroupedCart(array $cartData): array
    {
        $grouped = [];
        $grandTotal = 0;

        foreach ($cartData as $item) {
            $product = Product::with('vendorStore')->find($item['product_id']);
            if (!$product) continue;

            $variantPrice = 0;
            if (!empty($item['variant_id'])) {
                $variant = ProductVariant::find($item['variant_id']);
                $variantPrice = $variant ? $variant->additional_price : 0;
            }

            $currentPrice = $product->price + $variantPrice;
            $subtotal = $currentPrice * $item['quantity'];
            $grandTotal += $subtotal;

            $storeId = $product->vendorStore->id;
            $vendorName = $product->vendorStore->storeName;

            $grouped[$storeId]['store_name'] = $vendorName;
            $grouped[$storeId]['items'][] = [
                'product' => $product,
                'quantity' => $item['quantity'],
                'price' => $currentPrice,
                'subtotal' => $subtotal
            ];
        }

        return [
            'vendor_groups' => $grouped,
            'grand_total' => $grandTotal
        ];
    }
}`
    }
  },
  {
    id: 7,
    title: "Phase 7: Bangladesh District-Based Digital Logistics",
    objective: "Create comprehensive geo-shipping modules containing divisions, districts, union-upazilas mapping databases, with dynamic localized delivery rates.",
    features: [
      "Populate database division/district/upazila tree schema",
      "Develop area-specific administrative weight-based freight chargers config",
      "Structured shipping addresses profile collection system",
      "Dynamic calculation of estimated delivery dates (EDD) based on district distance criteria",
      "Free Shipping eligibility triggers based on vendor basket size metrics"
    ],
    databaseTables: ["divisions", "districts", "upazilas", "shipping_rates", "user_addresses"],
    migrations: [
      "2026_06_08_000012_create_bd_geo_tables.php",
      "2026_06_08_000013_create_shipping_rates_table.php",
      "2026_06_08_000014_create_user_addresses_table.php"
    ],
    models: ["Division.php", "District.php", "Upazila.php", "ShippingRate.php", "UserAddress.php"],
    controllers: ["ShippingController.php", "AddressBookController.php"],
    routes: ["/api/districts/{division_id}", "/api/upazilas/{district_id}", "/address/create"],
    bladePages: ["customer/addresses.blade.php", "components/shipping-selector.blade.php"],
    adminFeatures: ["Adjust shipping rates globally for specific districts", "Override holiday delivery days parameters"],
    vendorFeatures: ["Mark warehouse location (affects shipping rates calculation)"],
    customerFeatures: ["Select verified addresses effortlessly via dropdown trees"],
    validationRules: {
      "division_id": "required|exists:divisions,id",
      "district_id": "required|exists:districts,id",
      "upazila_id": "required|exists:upazilas,id",
      "phone": "required|regex:/^(?:\\+88|88)?(01[3-9]\\d{8})$/"
    },
    securityConsiderations: [
      "Validate drop locations strictly on the server-side to prevent shipping charge bypasses",
      "Anonymize physical phone strings inside logging tools and debug parameters",
      "Employ address limits to avoid memory leaks (max 5 addresses per user)"
    ],
    testingChecklist: [
      "Verify shipping charge updates correctly when switching from 'Dhaka Division' to 'Sylhet Division'",
      "Test cascade deletions on address book items",
      "Ensure geographical address queries complete in less than 50ms using indexing"
    ],
    codeSnippet: {
      title: "Geo-Shipping Address Schema & Dynamic Migration",
      language: "php",
      code: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('full_name');
            $table->string('phone_number');
            $table->foreignId('division_id');
            $table->foreignId('district_id');
            $table->foreignId('upazila_id');
            $table->string('area_details');
            $table->string('postal_code', 10)->nullable();
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};`
    }
  },
  {
    id: 8,
    title: "Phase 8: SSLCommerz & MFS Gateway Integration Suite",
    objective: "Develop full-stack integrations for SSLCommerz payment portal (Visa/Master/Amex) along with domestic Mobile Financial Services API (bKash/Nagad/Rocket).",
    features: [
      "Setup SSLCommerz payment initiation and session parameters",
      "Implement Secure Instant Payment Notification (IPN) listeners",
      "Integrate automated bKash redirection API with verified callback handlers",
      "Automatic ledger update systems marking orders as 'Paid' instantly",
      "Failed transaction recovery pipelines mapping clickbacks smoothly"
    ],
    databaseTables: ["payments", "payment_transactions", "payment_gateways_log"],
    migrations: [
      "2026_06_08_000015_create_payments_table.php",
      "2026_06_08_000016_create_payment_transactions_table.php"
    ],
    models: ["Payment.php", "PaymentTransaction.php"],
    controllers: ["Payment/SslCommerzController.php", "Payment/BkashController.php"],
    routes: ["/payment/initiate", "/payment/success", "/payment/fail", "/payment/ipn"],
    bladePages: ["payment/redirect.blade.php", "payment/failed-prompt.blade.php"],
    adminFeatures: ["View full transaction logs with gateway response payloads", "Trigger partial/full refunds securely", "Verify manual wire transfers"],
    vendorFeatures: ["Observe order payment clearance status in real-time"],
    customerFeatures: ["Pay dynamically using Visa, MasterCard, bKash, or Nagad within a single-click portal"],
    validationRules: {
      "transaction_id": "required|string|exists:payment_transactions,txn_id",
      "amount": "required|numeric|min:1"
    },
    securityConsiderations: [
      "Validate payment transaction signatures using SHA256 hashing criteria strictly",
      "Defend against double-spending vulnerabilities using database transactions",
      "Establish TLS 1.3 requirements for all external API callback handles"
    ],
    testingChecklist: [
      "Simulate Sandbox success payload and check database status transition to 'Paid'",
      "Verify tampering with the 'amount' field in callback parameters triggers fraud detection flags",
      "Test IPN execution operates as expected when customer leaves the tab mid-redirection"
    ],
    codeSnippet: {
      title: "SSLCommerz Signature Verification & IPN Controller",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers\\Payment;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
use App\\Models\\Order;
use App\\Models\\Payment;
use Illuminate\\Support\\Facades\\Log;

class SslCommerzController extends Controller
{
    public function ipn(Request $request)
    {
        $valId = $request->input('val_id');
        $storeId = config('sslcommerz.store_id');
        $storePassword = config('sslcommerz.store_password');

        // Build verification backcheck URL
        $verifyUrl = "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id={$valId}&store_id={$storeId}&store_passwd={$storePassword}&format=json";

        $response = file_get_contents($verifyUrl);
        $result = json_decode($response, true);

        if ($result && $result['status'] === 'VALIDATED') {
            $orderId = $result['tran_id'];
            $order = Order::where('id', $orderId)->first();
            
            if ($order && $order->payment_status !== 'Paid') {
                $order->update([
                    'payment_status' => 'Paid',
                    'delivery_status' => 'Processing'
                ]);
                
                Payment::create([
                    'order_id' => $order->id,
                    'transaction_id' => $result['bank_tran_id'],
                    'method' => $result['card_type'],
                    'amount' => $result['amount'],
                    'payload' => json_encode($result)
                ]);
            }
            return response()->json(['status' => 'success']);
        }

        Log::critical('Fraudulent Payment Callback Detected', $request->all());
        return response()->json(['status' => 'failed'], 400);
    }
}`
    }
  },
  {
    id: 9,
    title: "Phase 9: Multi-Vendor Split Checkout & Order Routing",
    objective: "Implement complex split order parsing architectures where parent transactions partition automatically into separate vendor purchase records.",
    features: [
      "Deconstruct unified cart checkout into Parent Order and Vendor Child Orders",
      "Separate commission split routines calculated dynamically on vendor categories",
      "Dynamic SKU availability check during transaction locks",
      "Configure default Cash on Delivery (COD) pathways containing specific processing rates",
      "Generate individual child invoice records dynamically"
    ],
    databaseTables: ["orders", "order_items", "order_vendor_splits"],
    migrations: [
      "2026_06_08_000017_create_orders_table.php",
      "2026_06_08_000018_create_order_items_table.php"
    ],
    models: ["Order.php", "OrderItem.php"],
    controllers: ["CheckoutController.php", "Vendor/OrderDashboardController.php"],
    routes: ["/checkout/initiate", "/track-order/{id}", "/vendor/orders"],
    bladePages: ["checkout/checkout.blade.php", "order/success.blade.php", "vendor/orders/index.blade.php"],
    adminFeatures: ["Supervise vendor allocations", "Resolve split commission disputes", "Edit default platform-wide dynamic commission caps"],
    vendorFeatures: ["Recieve real-time alerts only for items originating from their store", "Print customized pack slips"],
    customerFeatures: ["Complete single checkout form for items from different vendors", "Track processing updates separately per store"],
    validationRules: {
      "payment_method": "required|in:SSLCommerz,bKash,Nagad,Stripe,COD",
      "delivery_address_id": "required|exists:user_addresses,id"
    },
    securityConsiderations: [
      "Apply strict database transactions mapping parent hooks on child database tables",
      "Validate vendor balance allocations to prevent credit injection hacks",
      "Lock stock quantities on SKU tables using raw database locks ('sharedLock')"
    ],
    testingChecklist: [
      "Order custom-mix of 3 items from different stores and verify correct creation of 3 split orders",
      "Assert total BDT costs sum perfectly across parents and children calculations",
      "Verify client cannot access sister-vendor shipment details using targeted queries"
    ],
    codeSnippet: {
      title: "Splitting Orders Across Vendor Accounts",
      language: "php",
      code: `<?php

namespace App\\Services;

use App\\Models\\Order;
use App\\Models\\MerchantChildOrder;
use App\\Models\\Cart;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Str;

class OrderSplitService
{
    public function buildSplitOrders(Order $parentOrder, array $groupedCartItems): void
    {
        DB::transaction(function () use ($parentOrder, $groupedCartItems) {
            foreach ($groupedCartItems as $storeId => $vendorBasket) {
                // Determine category-based vendor commission logic
                $storeCommissionRate = DB::table('vendor_stores')
                    ->where('id', $storeId)
                    ->value('commission_rate') ?? 8.5; // Default 8.5% scale

                $subtotal = collect($vendorBasket['items'])->sum('subtotal');
                $commission = ($subtotal * $storeCommissionRate) / 100;
                $vendorEarnings = $subtotal - $commission;

                $childOrder = MerchantChildOrder::create([
                    'parent_order_id' => $parentOrder->id,
                    'vendor_store_id' => $storeId,
                    'total_amount' => $subtotal,
                    'commission_deduction' => $commission,
                    'payout_on_hold' => $vendorEarnings,
                    'delivery_status' => 'Pending',
                    'tracking_code' => 'SW-TRACK-' . strtoupper(Str::random(10))
                ]);

                foreach ($vendorBasket['items'] as $item) {
                    DB::table('order_items')->insert([
                        'merchant_child_order_id' => $childOrder->id,
                        'product_id' => $item['product']->id,
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['price'],
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }
            }
        });
    }
}`
    }
  },
  {
    id: 10,
    title: "Phase 10: Automatic DomPDF Invoicing & SMTP Mailing Engine",
    objective: "Configure dynamic PDF invoice generators, clean HTML mail alerts (via SMTP/Mailgun), and automated transaction confirmations.",
    features: [
      "Configure DomPDF package structures inside Laravel environment",
      "Establish clean typographic layouts for Bangladeshi tax receipts",
      "Implement parallel Queue mailers triggering alerts on order placements",
      "SMTP configuration settings panel and live mail diagnostic monitors",
      "Automated system tracking client email deliveries"
    ],
    databaseTables: ["mail_logs", "pdf_generation_records"],
    migrations: [
      "2026_06_08_000019_create_mail_logs_table.php"
    ],
    models: ["MailLog.php"],
    controllers: ["OrderInvoiceController.php"],
    routes: ["/order/invoice/{id}/download", "/admin/logs/mail"],
    bladePages: ["invoices/pdf-template.blade.php", "emails/order-confirmed.blade.php"],
    adminFeatures: ["Resend system invoices with customized text modifications", "Set SMTP connection parameters from the backend panel"],
    vendorFeatures: ["Download tax-receipt structures matching their vendor sub-orders"],
    customerFeatures: ["Download premium invoice PDFs directly from the customer dashboard"],
    validationRules: {
      "order_id": "required|exists:orders,id"
    },
    securityConsiderations: [
      "Strict protection on matching invoice endpoints so guests cannot fetch another user's invoice PDF",
      "Sanitize output text inside filenames to block shell injection attacks inside storage commands",
      "Use strict memory management constraints inside DomPDF configurations (prevent memory leaks)"
    ],
    testingChecklist: [
      "Generate multi-page invoice layouts and verify correct flow of footer indices",
      "Assert mail dispatch returns true and runs via background queue jobs",
      "Verify non-ASCII characters (e.g. Bengali script ৳) render perfectly in compiled PDFs"
    ],
    codeSnippet: {
      title: "Dynamic Invoice PDF Generator using DomPDF & View Shares",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Order;
use Barryvdh\\DomPDF\\Facade\\Pdf;
use Illuminate\\Support\\Facades\\Gate;

class OrderInvoiceController extends Controller
{
    public function downloadPDF(int $id)
    {
        $order = Order::with(['items.product', 'userAddress'])->findOrFail($id);

        // Security check: ensure requesting consumer owns the order record
        if (auth()->id() !== $order->user_id && !auth()->user()->hasRole('Super Admin')) {
            abort(403, 'Unauthorized access to invoice record');
        }

        $logoBase64 = base64_encode(file_get_contents(public_path('assets/images/logo-dark.png')));

        // Populate DomPDF parameters layout and output backstream file
        $pdf = Pdf::loadView('invoices.pdf-template', [
            'order' => $order,
            'logo' => "data:image/png;base64,{$logoBase64}"
        ]);

        return $pdf->download("sayed_world_invoice_{$order->id}.pdf");
    }
}`
    }
  },
  {
    id: 11,
    title: "Phase 11: Domestic Logistics Integration (SteadFast & Pathao)",
    objective: "Implement native APIs mapping order metrics smoothly to domestic Bangladesh delivery networks (SteadFast Courier and Pathao Courier APIs).",
    features: [
      "Create API connectors representing SteadFast and Pathao endpoints",
      "Automated webhook endpoints updating status tracking inside Sayed-World database on delivery handshakes",
      "One-click ticket generator producing SteadFast layout consignments within panel profiles",
      "Dynamic logistics fees verification calculations using coordinates",
      "Return status updater tracking courier handoffs"
    ],
    databaseTables: ["courier_bookings", "courier_webhooks_history"],
    migrations: [
      "2026_06_08_000020_create_courier_bookings_table.php"
    ],
    models: ["CourierBooking.php"],
    controllers: ["Courier/SteadfastController.php", "Courier/PathaoController.php"],
    routes: ["/api/courier/steadfast/webhook", "/vendor/delivery/book"],
    bladePages: ["vendor/shipments/book.blade.php", "customer/order-track-timeline.blade.php"],
    adminFeatures: ["Audit unified logistics transactions performance charts", "Reconfigure API keys globally"],
    vendorFeatures: ["Book orders with SteadFast/Pathao with a single click", "Print courier barcode stickers"],
    customerFeatures: ["Monitor standard map timelines containing courier tracking logs"],
    validationRules: {
      "courier": "required|in:steadfast,pathao",
      "weight_kg": "required|numeric|between:0.1,50"
    },
    securityConsiderations: [
      "Verify incoming logistics webhook payloads using digital signature validations",
      "Secure sensitive API keys and client secrets inside root server variables (.env)",
      "Strict data filters to protect shipping customer metrics from malicious logs"
    ],
    testingChecklist: [
      "Submit simulated SteadFast webhook tracking updating order status mapping to 'Shipped'",
      "Assert errors on third-party failure responses are handles cleanly without throwing 500 errors",
      "Verify logistics charges correspond perfectly inside overall calculation logs"
    ],
    codeSnippet: {
      title: "SteadFast Courier API Placement Call",
      language: "php",
      code: `<?php

namespace App\\Services\\Logistics;

use Illuminate\\Support\\Facades\\Http;

class SteadfastCourierService
{
    protected string $apiKey;
    protected string $secretKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = env('STEADFAST_API_KEY');
        $this->secretKey = env('STEADFAST_SECRET_KEY');
        $this->baseUrl = 'https://portal.steadfast.com.bd/api/v1';
    }

    public function createConsignment(array $orderData): array
    {
        $response = Http::withHeaders([
            'Api-Key' => $this->apiKey,
            'Secret-Key' => $this->secretKey,
            'Content-Type' => 'application/json'
        ])->post("{$this->baseUrl}/create_order", [
            'invoice' => $orderData['invoice_no'],
            'recipient_name' => $orderData['customer_name'],
            'recipient_phone' => $orderData['customer_phone'],
            'recipient_address' => $orderData['delivery_address'],
            'cod_amount' => $orderData['total_price'],
            'note' => 'Deliver with care - Sayed-World platform order.'
        ]);

        return $response->successful() ? $response->json() : ['status' => 500, 'message' => 'API Timeout'];
    }
}`
    }
  },
  {
    id: 12,
    title: "Phase 12: Vendor Withdrawal Matrix & Balance Ledgers",
    objective: "Construct secure financial bookkeeper features, supporting vendor ledger logging, platform commission tracking, and bank payout processing systems.",
    features: [
      "Wallet and Ledgers framework recording debit/credit operations accurately",
      "Interactive Withdrawal Request UI for vendors featuring security checks",
      "Automated holding queues keeping funds restricted until order return windows exit",
      "Admin bank transfer verification and bulk payout approval portals",
      "Generate real-time financial statements (downloadable CSV formats)"
    ],
    databaseTables: ["vendor_wallets", "withdrawal_requests", "merchant_ledgers"],
    migrations: [
      "2026_06_08_000021_create_vendor_wallets_table.php",
      "2026_06_08_000022_create_withdrawal_requests_table.php"
    ],
    models: ["VendorWallet.php", "WithdrawalRequest.php", "MerchantLedger.php"],
    controllers: ["Vendor/WalletController.php", "Admin/PayoutManagerController.php"],
    routes: ["/vendor/payouts", "/vendor/payouts/request", "/admin/finance/withdrawals"],
    bladePages: ["vendor/payouts-dashboard.blade.php", "admin/finance/withdrawals.blade.php"],
    adminFeatures: ["Review withdrawal logs", "Mark withdrawals as 'Transferred' by uploading bank receipt photos"],
    vendorFeatures: ["Configure payment bank details", "Observe current lock, hold, and withdrawable currency calculations"],
    customerFeatures: ["Track refunds credited to virtual wallet balances (if requested)"],
    validationRules: {
      "amount": "required|numeric|min:1000|max:500000",
      "bank_name": "required|string|max:100",
      "bank_account_no": "required|string|min:8|max:30"
    },
    securityConsiderations: [
      "Prevent race condition attacks by running ledger arithmetic using DB operations under transactional locks",
      "Strict validation filters checking auth status to confirm withdrawal amounts do not exceed current balances",
      "Encrypt sensitive merchant bank details inside DB cells using strong envelope parameters"
    ],
    testingChecklist: [
      "Verify double click protection filters on withdrawal forms blocks duplicate payouts requests",
      "Confirm ledger balance checks update matching precise monetary math specifications",
      "Assert payouts are locked if current order status is marked as 'Pending' or 'In Dispute'"
    ],
    codeSnippet: {
      title: "Locked Wallet Transaction Math on Withdrawal Request",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers\\Vendor;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
use App\\Models\\VendorWallet;
use App\\Models\\WithdrawalRequest;
use Illuminate\\Support\\Facades\\DB;

class PayoutController extends Controller
{
    public function requestWithdrawal(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:500',
            'bank_routing' => 'required|digits:9',
            'bank_account' => 'required|string|max:35'
        ]);

        return DB::transaction(function () use ($validated) {
            $wallet = VendorWallet::where('user_id', auth()->id())->lockForUpdate()->first();

            if (!$wallet || $wallet->withdrawable_balance < $validated['amount']) {
                return back()->with('error', 'Insufficient balance calculations.');
            }

            // Deduct from withdrawable balances and assign inside locking registers
            $wallet->withdrawable_balance -= $validated['amount'];
            $wallet->hold_balance += $validated['amount'];
            $wallet->save();

            WithdrawalRequest::create([
                'vendor_id' => auth()->id(),
                'amount' => $validated['amount'],
                'bank_routing_code' => $validated['bank_routing'],
                'bank_account_number' => $validated['bank_account'],
                'status' => 'Pending'
            ]);

            return back()->with('success', 'Payout request recorded, allocated pending funds!');
        });
    }
}`
    }
  },
  {
    id: 13,
    title: "Phase 13: Customer Review Moderation & UGC Platform",
    objective: "Implement a robust Product Reviews and Ratings engine with photo attachment options, moderation filters, and rating stats widgets.",
    features: [
      "Review submission widgets supporting multi-point scoring and inline product photos",
      "Dashboard tracking and moderation panel filtering bad words dynamically",
      "Calculated metrics widgets displaying breakdowns of star allocations",
      "Aarong-Artisan ratings review timeline featuring user details",
      "Email indicators triggered when administrative staff modifies review status"
    ],
    databaseTables: ["reviews", "review_photos"],
    migrations: [
      "2026_06_08_000023_create_reviews_table.php",
      "2026_06_08_000024_create_review_photos_table.php"
    ],
    models: ["Review.php", "ReviewPhoto.php"],
    controllers: ["ReviewController.php", "Admin/ReviewModerationController.php"],
    routes: ["/product/{id}/review", "/admin/reviews/moderation"],
    bladePages: ["product/reviews-widget.blade.php", "admin/reviews/index.blade.php"],
    adminFeatures: ["Approve/Reject review items from the main audit panel", "Ban repeat spammers globally"],
    vendorFeatures: ["Observe and post responses to reviews on their products and shops"],
    customerFeatures: ["Rate purchased items out of 5 stars", "Attach actual pictures of delivered products"],
    validationRules: {
      "rating": "required|integer|between:1,5",
      "comment": "required|string|min:10|max:1000",
      "photos.*": "nullable|image|max:2048"
    },
    securityConsiderations: [
      "Confirm customer has actually ordered the product before allowing reviews (Verified Purchase tracker)",
      "Strict image disinfection mechanisms ensuring uploaded photos do not carry malicious PHP EXIF parameters",
      "Set maximum character length constraints securely to block DB storage bloating attacks"
    ],
    testingChecklist: [
      "Assert un-moderated review content is hidden from product pages if default status is 'pending'",
      "Verify review calculation indexes adjust immediately upon approving feedback items",
      "Verify verified purchase tags apply correctly matching true payment status histories"
    ],
    codeSnippet: {
      title: "Dynamic Verified Purchase Check & Review Store",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\Models\\Review;
use App\\Models\\Order;
use Illuminate\\Support\\Facades\\DB;

class ReviewController extends Controller
{
    public function store(Request $request, int $productId)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:5|max:1000'
        ]);

        // Assert customer has ordered this specific merchandise in paid status
        $hasPurchased = Order::where('user_id', auth()->id())
            ->where('payment_status', 'Paid')
            ->whereHas('items', function ($query) use ($productId) {
                $query->where('product_id', $productId);
            })->exists();

        if (!$hasPurchased) {
            return back()->with('error', 'Only verified buyers can review products.');
        }

        Review::create([
            'product_id' => $productId,
            'user_id' => auth()->id(),
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'is_verified_buyer' => true,
            'status' => 'pending' // Moderated queue default setting
        ]);

        return back()->with('success', 'Thank you! Your moderated review is recorded.');
    }
}`
    }
  },
  {
    id: 14,
    title: "Phase 14: Platform Coupons & Multi-Vendor Reward Systems",
    objective: "Deploy promotional coupon and cart deduction algorithms featuring usage caps, expiration checkers, and reward systems.",
    features: [
      "Coupons database schema tracking codes, percentage/fixed rates, and minima spends",
      "Algorithms splitting merchant-funded coupons from platform-funded promos",
      "Reward points generation engine assigning coins based on BDT payments",
      "Real-time feedback inside Livewire cart checking code validity",
      "Admin configuration tracking active digital marketing campaigns"
    ],
    databaseTables: ["coupons", "coupon_usage_history", "reward_points_ledgers"],
    migrations: [
      "2026_06_08_000025_create_coupons_table.php",
      "2026_06_08_000026_create_coupon_usage_history_table.php"
    ],
    models: ["Coupon.php", "CouponUsage.php", "RewardPointsLedger.php"],
    controllers: ["CouponController.php"],
    routes: ["/api/coupons/verify", "/coupon/apply"],
    bladePages: ["components/coupon-input.blade.php", "customer/rewards.blade.php"],
    adminFeatures: ["Supervise promotional structures", "Export customer points distributions logs"],
    vendorFeatures: ["Configure store-specific coupon codes funded from their profit balances"],
    customerFeatures: ["Redeem visual promo codes on checkouts", "Apply point balances to save on purchase totals"],
    validationRules: {
      "coupon_code": "required|string|alpha_num|max:15",
      "cart_subtotal": "required|numeric|min:1"
    },
    securityConsiderations: [
      "Enforce concurrency caps strictly, protecting database rows using lockForUpdate rules on single-order clicks",
      "Confirm expiry criteria strictly against Dhaka Time coordinates to avoid invalid redemptions",
      "Block negative basket outcomes by enforcing custom floors (overall values must never go below BDT 0.00)"
    ],
    testingChecklist: [
      "Assert a coupon code rejects instantly if cart totals do not hit the minimum spending triggers",
      "Verify customer cannot exploit points to offset payments beyond maximum platform allowance",
      "Verify double submission errors are handled peacefully without executing multiple discount credits"
    ],
    codeSnippet: {
      title: "Livewire Verification Logic Checking Promo Code Validity",
      language: "php",
      code: `<?php

namespace App\\Http\\Livewire\\Cart;

use Livewire\\Component;
use App\\Models\\Coupon;
use Carbon\\Carbon;

class ApplyCoupon extends Component
{
    public $coupon_code;
    public $subtotal;
    public $discount = 0;
    public $message = '';

    public function apply()
    {
        $coupon = Coupon::where('code', strtoupper($this->coupon_code))->first();

        if (!$coupon) {
            $this->message = "Alert: coupon code invalid.";
            return;
        }

        if (Carbon::now()->gt(Carbon::parse($coupon->expiry_date))) {
            $this->message = "Coupon has expired.";
            return;
        }

        if ($this->subtotal < $coupon->min_spend) {
            $this->message = "Spend at least ৳{$coupon->min_spend} to redeem.";
            return;
        }

        $this->discount = $coupon->type === 'percentage' 
            ? ($this->subtotal * $coupon->value) / 100 
            : $coupon->value;

        // Broadcast to parenting checkout controllers
        $this->emit('couponApplied', $this->discount, $coupon->code);
        $this->message = "Successfully applied! ৳{$this->discount} saved!";
    }
}`
    }
  },
  {
    id: 15,
    title: "Phase 15: Public Interactive Q&A Portal (Customer ↔ Vendor)",
    objective: "Implement a digital public questioning board on product hubs, driving engagement and answering client product issues.",
    features: [
      "Q&A database tables recording questions, answers, and visual indicators",
      "Auto-moderation scanner checking inquiries against spam lists",
      "Email notification alerts dispatched when sellers respond",
      "Dashboard widget facilitating fast vendor answering",
      "Search filters searching FAQs database dynamically"
    ],
    databaseTables: ["product_questions", "product_answers"],
    migrations: [
      "2026_06_08_000027_create_product_qna_tables.php"
    ],
    models: ["ProductQuestion.php", "ProductAnswer.php"],
    controllers: ["ProductQnAController.php"],
    routes: ["/product/{id}/ask", "/vendor/qna/reply"],
    bladePages: ["product/qna-widget.blade.php", "vendor/qna/dashboard.blade.php"],
    adminFeatures: ["Deletes inappropriate questions", "Audits reply ratios"],
    vendorFeatures: ["Reads client questions and post verified vendor answers", "Add common prefilled replies"],
    customerFeatures: ["Read answered queries publicly", "Post new queries directly to stores"],
    validationRules: {
      "question_text": "required|string|min:10|max:500"
    },
    securityConsiderations: [
      "Strict XSS purification of question files and comments",
      "Block unauthenticated profile spamming by rate-limiting question creation calls",
      "Confirm responder holds store-ownership traits before flagging replies with 'Verified Store' status badges"
    ],
    testingChecklist: [
      "Verify answered questions appear instantly, while blank questions wait behind",
      "Assert deleting a product cleans related Q&A database cells",
      "Verify notifications reach client box upon matching response records"
    ],
    codeSnippet: {
      title: "Saving Public Product Question Controller",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\Models\\ProductQuestion;
use App\\Models\\Product;

class ProductQnAController extends Controller
{
    public function ask(Request $request, int $productId)
    {
        $validated = $request->validate([
            'question_text' => 'required|string|min:10|max:500'
        ]);

        Product::findOrFail($productId); // Confirm product exists first

        ProductQuestion::create([
            'product_id' => $productId,
            'user_id' => auth()->id(),
            'question' => purify($validated['question_text']), // strip harmful scripts
            'is_public' => true
        ]);

        return back()->with('success', 'Your question has been posted publicly to the merchant.');
    }
}`
    }
  },
  {
    id: 16,
    title: "Phase 16: Live Chat Room & Support Escalation Tickets",
    objective: "Establish modern support channels using Reverb/Pusher WebSocket connectivity, live buyer-seller channels, and ticket assignment systems.",
    features: [
      "Websocket setups configuring Laravel Reverb/Pusher endpoints",
      "Typing indicators and read receipts dynamic state events",
      "Digital ticket records allocating issue logs to support agents",
      "Dynamic in-app alerts on new help replies",
      "Detailed chats logging system"
    ],
    databaseTables: ["support_tickets", "support_ticket_messages", "private_chats", "private_chat_messages"],
    migrations: [
      "2026_06_08_000028_create_support_tickets_table.php",
      "2026_06_08_000029_create_private_chats_table.php"
    ],
    models: ["SupportTicket.php", "SupportTicketMessage.php", "PrivateChat.php", "PrivateChatMessage.php"],
    controllers: ["ChatController.php", "SupportTicketController.php"],
    routes: ["/chat/session/{receiver_type}/{receiver_id}", "/support/tickets/create"],
    bladePages: ["chat/messenger.blade.php", "customer/support-tickets.blade.php"],
    adminFeatures: ["Supervises platform-wide conversations", "Manually assigns unresolved tickets to specific agents"],
    vendorFeatures: ["Direct live-chat access with active product buyers"],
    customerFeatures: ["Initiate chat tabs with shop vendors from any product details viewport", "File structured tickets detailing problems"],
    validationRules: {
      "ticket_subject": "required|string|max:150",
      "ticket_category": "required|in:Billing,Technical,Seller Inquiry,Delivery Issue",
      "message": "required|string|max:2000"
    },
    securityConsiderations: [
      "Restrict channel broadcasting strictly within verified connection tickets",
      "Sanitize all diagnostic uploads, purging executable binaries and macro scripts",
      "Enforce maximum ticket request speed restrictions (prevent denial-of-service attempts)"
    ],
    testingChecklist: [
      "Ensure typing indicators toggle matching actual user keypress hooks",
      "Verify support team can successfully assign tickets and trace historic chat documents",
      "Verify ticket status transitions accurately from 'Open' to 'Resolved'"
    ],
    codeSnippet: {
      title: "Laravel Reverb Broadcast Event Handler",
      language: "php",
      code: `<?php

namespace App\\Events;

use Illuminate\\Broadcasting\\Channel;
use Illuminate\\Broadcasting\\InteractsWithSockets;
use Illuminate\\Broadcasting\\PrivateChannel;
use Illuminate\\Contracts\\Broadcasting\\ShouldBroadcast;
use Illuminate\\Foundation\\Events\\Dispatchable;
use Illuminate\\Queue\\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $chatRoomId;

    public function __construct($message, $chatRoomId)
    {
        $this->message = $message;
        $this->chatRoomId = $chatRoomId;
    }

    public function broadcastOn(): array
    {
        // Private websocket routing ensuring only participating accounts connect
        return [
            new PrivateChannel("chat-room.{$this->chatRoomId}")
        ];
    }
}`
    }
  },
  {
    id: 17,
    title: "Phase 17: SEO Optimization, XML Sitemaps & Micro-Schemas",
    objective: "Maximize organic search parameters by deploying Spatie-Sitemaps, canonical URLs, robot filters, and JSON-LD structured search cards.",
    features: [
      "Automate dynamic sitemap updates mapping active brand indices",
      "Micro-SEO schema (JSON-LD) injection providing item pricing parameters to crawler indices",
      "Spatie meta tags integration providing customized keywords configurations",
      "Robots.txt compilation handling secure directories blocklists",
      "Clean URL slug routers with permanent canonical tags"
    ],
    databaseTables: ["seo_metadata"],
    migrations: [
      "2026_06_08_000030_create_seo_metadata_table.php"
    ],
    models: ["SeoMetadata.php"],
    controllers: ["Admin/SeoController.php"],
    routes: ["/sitemap.xml", "/robots.txt"],
    bladePages: ["components/seo-tags.blade.php", "admin/seo-settings.blade.php"],
    adminFeatures: ["Configure index variables parameters per landing screen", "Monitor search redirect lists"],
    vendorFeatures: ["Customize SEO Meta Titles and descriptions during product creation"],
    customerFeatures: ["Observe SEO elements during metadata sharing (WhatsApp cards populates correctly)"],
    validationRules: {
      "meta_title": "required|string|max:70",
      "meta_description": "required|string|max:160"
    },
    securityConsiderations: [
      "Ensure search engines do not crawl admin controls or invoice paths using robots restrictions",
      "Verify meta parameters escape cleanly to block cross-site coding hacks",
      "Defend against parameter manipulation injection inside canonical calculations"
    ],
    testingChecklist: [
      "Inspect generated structure code and confirm valid JSON-LD structure matching official schemas",
      "Assert sitemaps return accurate content headers 'text/xml'",
      "Run crawl simulations to verify index exclusions operate precisely"
    ],
    codeSnippet: {
      title: "Structured Data Schema Generator inside Master Page",
      language: "php",
      code: `<?php

namespace App\\View\\Components;

use Illuminate\\View\\Component;
use App\\Models\\Product;

class SeoSchema extends Component
{
    public Product $product;

    public function __construct($product)
    {
        $this->product = $product;
    }

    public function render()
    {
        // Produce standardized SEO Schema layout maps inside page headers
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Product',
            'name' => $this->product->title,
            'description' => $this->product->description,
            'image' => $this->product->images->pluck('path')->toArray(),
            'offers' => [
                '@type' => 'Offer',
                'price' => $this->product->price,
                'priceCurrency' => 'BDT',
                'availability' => $this->product->stockCount > 0 
                    ? 'https://schema.org/InStock' 
                    : 'https://schema.org/OutOfStock'
            ]
        ];

        return <<<'HTML'
            <script type="application/ld+json">
                {!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
            </script>
        HTML;
    }
}`
    }
  },
  {
    id: 18,
    title: "Phase 18: Admin & Vendor Analytical Visual Dashboards",
    objective: "Develop analytical widgets showing visual stats, merchant performance tables, and revenue breakdowns.",
    features: [
      "Admin revenue analytics panel built in Tailwind and charting features",
      "Vendor store performance indicators (Total sales, refunds rates, active inventory)",
      "Daily checkout trends logs with date filters",
      "Visual grid of best-selling products matches",
      "Exportable financial accounting documents (XLSX, PDF formats)"
    ],
    databaseTables: ["sales_analytics_snapshots"],
    migrations: [
      "2026_06_08_000031_create_analytics_snapshots_table.php"
    ],
    models: ["AnalyticsSnapshot.php"],
    controllers: ["Admin/AnalyticsController.php", "Vendor/VendorAnalyticsController.php"],
    routes: ["/admin/analytics", "/vendor/analytics/data"],
    bladePages: ["admin/dashboard.blade.php", "vendor/dashboard.blade.php"],
    adminFeatures: ["Monitor cross-vendor profit streams", "Audit total refunds outstanding parameters"],
    vendorFeatures: ["Analyze custom conversions trends charts", "Refine stock levels dynamically based on metrics"],
    customerFeatures: ["No administrative tracking details shown on client storefront"],
    validationRules: {
      "time_range": "required|in:7days,30days,1year",
      "metric_type": "string|in:sales,commissions,orders"
    },
    securityConsiderations: [
      "Establish strict access controls limiting analytical routes directly to authorized profiles",
      "Ensure SQL queries remain heavily bound to verify no data-leak exposure leaks parameters",
      "Perform numerical aggregation checks using caching to lower database thread workloads"
    ],
    testingChecklist: [
      "Verify analytical queries execute efficiently with index scans",
      "Confirm numerical breakdowns equate perfectly to totals in payment tables",
      "Verify charting arrays handle empty values gracefully without displaying blank screens"
    ],
    codeSnippet: {
      title: "Query Aggregation for Analytics Boards",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Support\\Facades\\DB;
use Carbon\\Carbon;

class DashboardController extends Controller
{
    public function fetchAdminReport()
    {
        $startDate = Carbon::now()->subDays(30);

        // Produce grouped metrics for visual admin charting tools
        $salesMetrics = DB::table('orders')
            ->where('payment_status', 'Paid')
            ->where('created_at', '>=', $startDate)
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_amount) as gross_revenue'),
                DB::raw('COUNT(id) as total_orders')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $pieBreakdownCategories = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('categories.name as category_name', DB::raw('SUM(order_items.quantity) as volume'))
            ->groupBy('categories.name')
            ->get();

        return response()->json([
            'sales_growth_timeline' => $salesMetrics,
            'category_breakdowns' => $pieBreakdownCategories
        ]);
    }
}`
    }
  },
  {
    id: 19,
    title: "Phase 19: Performance Scaling with Redis Caching & Queue Workers",
    objective: "Supercharge platform execution using Redis, asynchronous email jobs, database query caching, and rate limiting security blocks.",
    features: [
      "Redis Cache driver configurations optimized for catalog displays",
      "Set up asynchronous queue workers handling bulk mail delivery alerts",
      "Platform rate-limiting policies protecting endpoint routes",
      "Dynamic background sitemap update tasks schedules",
      "Automated DB backup routines"
    ],
    databaseTables: ["jobs", "job_batches"],
    migrations: [
      "2026_06_08_000032_create_jobs_table.php"
    ],
    models: ["JobRecord.php"],
    controllers: ["Admin/PerformanceSettingsController.php"],
    routes: ["/admin/system-health"],
    bladePages: ["admin/system/performance.blade.php"],
    adminFeatures: ["Inspect Redis usage lists", "Manually trigger script invalidation sweeps", "Monitor system resources levels"],
    vendorFeatures: ["Experience low latency during product asset uploads"],
    customerFeatures: ["Extremely fast page load speeds (< 200ms on index tables)"],
    validationRules: {
      "cache_key": "string|max:50"
    },
    securityConsiderations: [
      "Configure standard Redis socket authentication passwords securely",
      "Sanitize diagnostic inputs to avoid remote command execution risk",
      "Implement strong connection boundaries to prevent brute force scraping attacks"
    ],
    testingChecklist: [
      "Verify system fallbacks successfully load raw database contents if Redis systems offline",
      "Confirm queue retry behaviors execute up to 3 runs under error scenarios",
      "Measure latency improvements from caching product directories"
    ],
    codeSnippet: {
      title: "Implementing Dynamic Redis Categories Caching",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Support\\Facades\\Cache;
use App\\Models\\Category;

class CatalogController extends Controller
{
    public function getCategories()
    {
        // Cache category structured details for 24 hours to accelerate page load
        $cachedCategories = Cache::remember('global_mega_menu_categories', 86400, function () {
            return Category::with('recursiveChildren')
                ->whereNull('parent_id')
                ->orderBy('sort_order')
                ->get();
        });

        return response()->json([
            'status' => 'success',
            'catalog' => $cachedCategories
        ]);
    }

    public function invalidateCache()
    {
        // Safe cache invalidation routines triggered following database updates
        Cache::forget('global_mega_menu_categories');
        return response()->json(['status' => 'cache cleared']);
    }
}`
    }
  },
  {
    id: 20,
    title: "Phase 20: Mobile API Core Gateways & Progressive Web App (PWA)",
    objective: "Configure comprehensive Progressive Web App capabilities, Workbox caching routines, and Sanctum token API endpoints.",
    features: [
      "Setup service worker and manifest properties containing mobile specifications",
      "Laravel Sanctum integration securing mobile access via authentication headers",
      "Develop REST endpoints generating catalogs, product inventories, and reviews maps",
      "Dynamic browser caching protocols supporting offline checkouts tracking structures",
      "Push notification systems linked to vendor updates"
    ],
    databaseTables: ["personal_access_tokens"],
    migrations: [
      "2026_06_08_000033_create_sanctum_tables.php"
    ],
    models: ["PersonalAccessToken.php"],
    controllers: ["Api/MainApiController.php", "Api/StoreApiController.php"],
    routes: ["/api/v1/authenticate", "/api/v1/products-catalog"],
    bladePages: ["components/pwa-install-banner.blade.php"],
    adminFeatures: ["Supervise token lifespans", "Revoke compromised credentials"],
    vendorFeatures: ["Control product metrics remotely using API connections"],
    customerFeatures: ["Install the web client directly as an app shortcut on mobile devices"],
    validationRules: {
      "device_name": "required|string|max:100",
      "token": "string"
    },
    securityConsiderations: [
      "Implement CORS restrictions limiting mobile headers directly to valid platforms",
      "Enforce maximum rate limiting quotas per authenticated token API key",
      "Verify TLS certificates strictly across connection networks"
    ],
    testingChecklist: [
      "Verify offline PWA states successfully render fallback error pages",
      "Assert Sanctum API authentication yields valid tokens with encrypted keys",
      "Verify push indicators load across devices perfectly"
    ],
    codeSnippet: {
      title: "Secure Sanctum API Authentication Endpoint",
      language: "php",
      code: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
use App\\Models\\User;
use Illuminate\\Support\\Facades\\Hash;
use Illuminate\\Validation\\ValidationException;

class ApiAuthController extends Controller
{
    public function generateToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
            'client_device' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // Verify credentials securely before token returns
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials do not map to records.'],
            ]);
        }

        // Generate Sanctum access token with customized abilities restrictions
        $authToken = $user->createToken($request->client_device, ['products:read', 'orders:track'])->plainTextToken;

        return response()->json([
            'status' => 'SUCCESS',
            'token' => $authToken,
            'client_user' => [
                'name' => $user->name,
                'role' => $user->getRoleNames()->first()
            ]
        ]);
    }
}`
    }
  }
];
