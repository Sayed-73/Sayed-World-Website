import React, { useState, useEffect } from "react";
import { UserRole, User, CartItem, Product, VendorStore, Order } from "./types";
import { PRODUCTS, VENDOR_STORES, CATEGORIES } from "./data";

// Sub-component Imports
import CodeRoadmap from "./components/CodeRoadmap";
import SupportDesk from "./components/SupportDesk";
import CustomerShop from "./components/CustomerShop";
import VendorPanel from "./components/VendorPanel";
import AdminPanel from "./components/AdminPanel";
import HomePanel from "./components/HomePanel";
import AuthModal from "./components/AuthModal";
import { getSavedSession, logoutUnifiedUser } from "./firebase";

// Icon imports
import { 
  Building, ShieldCheck, ShoppingBag, MessageSquare, BookOpen, Layers,
  Compass, Coins, ShieldAlert, Cpu, Settings, Copy, Check, Menu, X, 
  Sun, Moon, Users, ShoppingCart, User as UserIcon, RefreshCw, BarChart3, HelpCircle,
  Home, LayoutGrid, ChevronRight, Shirt, Smartphone, Sparkles, Gift, Palette, Sliders, Shield, LogOut
} from "lucide-react";

const THEMES = {
  emerald: {
    id: "emerald",
    name: "Emerald Oasis 🌿",
    primary: "#10b981",
    hover: "#059669",
    light: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.25)",
    glow: "rgba(16, 185, 129, 0.05)"
  },
  cobalt: {
    id: "cobalt",
    name: "Royal Cobalt ⚡",
    primary: "#3b82f6",
    hover: "#2563eb",
    light: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.25)",
    glow: "rgba(59, 130, 246, 0.05)"
  },
  crimson: {
    id: "crimson",
    name: "Rose Crimson 🌹",
    primary: "#f43f5e",
    hover: "#e11d48",
    light: "rgba(244, 63, 94, 0.1)",
    border: "rgba(244, 63, 94, 0.25)",
    glow: "rgba(244, 63, 94, 0.05)"
  },
  amber: {
    id: "amber",
    name: "Sunset Amber 🍯",
    primary: "#f59e0b",
    hover: "#d97706",
    light: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.25)",
    glow: "rgba(245, 158, 11, 0.05)"
  },
  purple: {
    id: "purple",
    name: "Cosmic Velvet 🔮",
    primary: "#8b5cf6",
    hover: "#7c3aed",
    light: "rgba(139, 92, 246, 0.1)",
    border: "rgba(139, 92, 246, 0.25)",
    glow: "rgba(139, 92, 246, 0.05)"
  }
};

export default function App() {
  // Theme state
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [selectedTheme, setSelectedTheme] = useState<"emerald" | "cobalt" | "crimson" | "amber" | "purple">(() => {
    const saved = localStorage.getItem("sayed-world-theme-preset");
    return (saved as any) || "emerald";
  });
  const [designStyle, setDesignStyle] = useState<"glass" | "cyber" | "brutalist" | "silk">(() => {
    const saved = localStorage.getItem("sayed-world-design-style");
    return (saved as any) || "glass";
  });

  // Multi-panel focus states
  const [activeTab, setActiveTab] = useState<"home" | "shop" | "vendor" | "admin" | "chat" | "roadmap">("shop");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [showSandboxBar, setShowSandboxBar] = useState<boolean>(false);
  const [mobileCustomizerOpen, setMobileCustomizerOpen] = useState<boolean>(false);
  const [developerAccessGranted, setDeveloperAccessGranted] = useState<boolean>(() => {
    return localStorage.getItem("sayed-world-developer-access") === "true";
  });
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Core synchronized relational states
  const [currentProducts, setCurrentProducts] = useState<Product[]>(PRODUCTS);
  const [currentStores, setCurrentStores] = useState<VendorStore[]>(VENDOR_STORES);
  const [registeredOrders, setRegisteredOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Current active user model
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user-sayed-77",
    name: "Sadul Islam",
    email: "saidulislam0400@gmail.com",
    role: UserRole.CUSTOMER,
    walletBalance: 45000, // starting wallet in BDT
    loyaltyPoints: 120
  });

  // Track system date/time matching metadata coordinates
  const UTCTimeString = "2026-06-08 14:46:12 UTC";

  // Check saved credential session on component mount (supports Gmail / Google SSO)
  useEffect(() => {
    const saved = getSavedSession();
    if (saved) {
      setCurrentUser({
        id: saved.id,
        name: saved.name,
        email: saved.email,
        role: saved.role as UserRole,
        walletBalance: saved.walletBalance,
        loyaltyPoints: saved.loyaltyPoints
      });
      setCurrentUserRole(saved.role as UserRole);
      // Auto authorize sandbox access for Admin and Sellers
      if (saved.role === "Super Admin" || saved.role === "Vendor/Seller") {
        setDeveloperAccessGranted(true);
        localStorage.setItem("sayed-world-developer-access", "true");
      }
    }
  }, []);

  const handleAuthSuccess = (user: any) => {
    const matchedRole = user.role === "Super Admin" ? UserRole.SUPER_ADMIN : 
                        user.role === "Vendor/Seller" ? UserRole.VENDOR : UserRole.CUSTOMER;
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: matchedRole,
      walletBalance: user.walletBalance,
      loyaltyPoints: user.loyaltyPoints
    });
    setCurrentUserRole(matchedRole);
    setDeveloperAccessGranted(true);
    localStorage.setItem("sayed-world-developer-access", "true");
    
    if (matchedRole === UserRole.SUPER_ADMIN) {
      setActiveTab("admin");
    } else if (matchedRole === UserRole.VENDOR) {
      setActiveTab("vendor");
    } else {
      setActiveTab("shop");
    }
  };

  const handleLogout = async () => {
    await logoutUnifiedUser();
    const guestUser: User = {
      id: "user-sayed-77",
      name: "Saidul Islam",
      email: "saidulislam0400@gmail.com",
      role: UserRole.CUSTOMER,
      walletBalance: 45000,
      loyaltyPoints: 120
    };
    setCurrentUser(guestUser);
    setCurrentUserRole(UserRole.CUSTOMER);
    setDeveloperAccessGranted(false);
    localStorage.removeItem("sayed-world-developer-access");
    setActiveTab("shop");
    alert("👋 Logged out successfully! Session state cleared.");
  };

  // Bootstrap Dark/Light Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [themeMode]);

  // Bootstrap Custom color palette theme variables sync
  useEffect(() => {
    const root = window.document.documentElement;
    const theme = THEMES[selectedTheme];
    
    root.style.setProperty("--theme-primary", theme.primary);
    root.style.setProperty("--theme-hover", theme.hover);
    root.style.setProperty("--theme-light", theme.light);
    root.style.setProperty("--theme-border", theme.border);
    root.style.setProperty("--theme-glow", theme.glow);
    
    localStorage.setItem("sayed-world-theme-preset", selectedTheme);
  }, [selectedTheme]);

  // Bootstrap Custom Design Theme Style sync
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-glass", "theme-cyber", "theme-brutalist", "theme-silk");
    root.classList.add(`theme-${designStyle}`);
    localStorage.setItem("sayed-world-design-style", designStyle);
  }, [designStyle]);

  // Handle switching dynamic roles
  const handleRoleChange = (role: UserRole) => {
    setCurrentUserRole(role);
    
    // Auto coordinate tabs to avoid rendering errors
    if (role === UserRole.SUPER_ADMIN) {
      setActiveTab("admin");
      setCurrentUser(prev => ({ ...prev, role: UserRole.SUPER_ADMIN, name: "SayedAdmin73" }));
    } else if (role === UserRole.VENDOR) {
      setActiveTab("vendor");
      setCurrentUser(prev => ({ ...prev, role: UserRole.VENDOR, name: "Sayed Tech Vendor" }));
    } else {
      setActiveTab("shop");
      setCurrentUser(prev => ({ ...prev, role: UserRole.CUSTOMER, name: "Sayed Rahman" }));
    }
  };

  // Lock developer mode and restrict role profile
  const handleLockDeveloperMode = () => {
    setDeveloperAccessGranted(false);
    localStorage.removeItem("sayed-world-developer-access");
    setShowSandboxBar(false);
    handleRoleChange(UserRole.CUSTOMER);
    alert("🔒 Sandbox controls and layout preference boards locked completely!");
  };

  // Synchronized cart logic
  const handleAddToCart = (product: Product, color?: string, size?: string) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );

      if (existing) {
        return prev.map(item => 
          item.id === existing.id 
            ? { ...item, quantity: Math.min(10, item.quantity + 1) } 
            : item
        );
      }

      return [
        ...prev, 
        { 
          id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, 
          product, 
          selectedColor: color, 
          selectedSize: size, 
          quantity: 1 
        }
      ];
    });
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => setCart([]);

  // Checkout handshake syncs
  const handleOrderPlaced = (newOrder: Order) => {
    // Add to order tracking list
    setRegisteredOrders(prev => [newOrder, ...prev]);

    // Update product stock counts and sales count in main state
    setCurrentProducts(prev => {
      return prev.map(p => {
        const boughtItem = newOrder.items.find(i => i.productId === p.id);
        if (boughtItem) {
          return {
            ...p,
            stockCount: Math.max(0, p.stockCount - boughtItem.quantity),
            salesCount: p.salesCount + boughtItem.quantity
          };
        }
        return p;
      });
    });

    // Deduct total amount from wallet if paying through wallet (or increment loyalty points)
    setCurrentUser(prev => ({
      ...prev,
      walletBalance: Math.max(0, prev.walletBalance - (newOrder.paymentMethod === "COD" ? 0 : newOrder.totalAmount)),
      loyaltyPoints: prev.loyaltyPoints + Math.round(newOrder.totalAmount / 100)
    }));

    // Trigger feedback notification
    alert(`Order ${newOrder.id} successfully queued on platforms! Stock updated across stores, payouts allocated.`);
  };

  // Sychronize Inventory additions
  const handleUpdateInventory = (productId: string, updatedStock: number, updatedPrice: number) => {
    setCurrentProducts(prev => {
      return prev.map(p => p.id === productId ? { ...p, stockCount: updatedStock, price: updatedPrice } : p);
    });
    alert("Inventory stock and pricing recalculated successfully inside storefront catalog!");
  };

  // Synchronize new store registrations
  const handleNewStoreApprovedByAdmin = (mockStoreId: string, status: boolean) => {
    const newStore: VendorStore = {
      id: mockStoreId,
      vendorId: `v-${Date.now()}`,
      storeName: "Rajshahi Mango Preserve Co.",
      slug: "rajshahi-mango",
      bannerUrl: "https://images.unsplash.com/photo-1500937386664-56d15ef3f76d?w=400&auto=format&fit=crop&q=60",
      logoUrl: "https://images.unsplash.com/photo-1595981267035-7b04ec82a89d?w=100&auto=format&fit=crop&q=60",
      rating: 5.0,
      followersCount: 1,
      featured: false,
      vacationMode: false
    };

    setCurrentStores(prev => [...prev, newStore]);
  };

  return (

    // <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[#080d1a] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] text-slate-800 dark:text-slate-200 transition-colors duration-250 flex flex-col font-sans relative">
    // background color change
      <div className="min-h-screen bg-white bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[#080d1a]  text-slate-800 transition-colors duration-250 flex flex-col font-sans relative">
      {/* 📁 Global Sticky Hover Categories Floating Action Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        title="Open Catalog Categories"
        className="fixed left-0 top-[40%] -translate-y-1/2 z-40 bg-theme-primary hover:bg-theme-hover text-white py-4 px-2.5 rounded-r-xl shadow-lg shadow-theme-border/20 transition-all duration-300 group flex flex-col items-center gap-2 border-y border-r border-white/20 cursor-pointer active:scale-95"
      >
        <LayoutGrid className="w-4 h-4 animate-pulse group-hover:rotate-90 transition-transform duration-300" />
        <span className="font-sans font-bold text-[9px] tracking-widest uppercase [writing-mode:vertical-lr] select-none">
          CATEGORIES
        </span>
      </button>

      {/* 🚪 Left Custom Glassmorphic Categories Sidebar Drawer */}
      {sidebarOpen && (
        <>
          {/* Backdrop screen lock */}
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-50 transition-opacity duration-300 cursor-pointer animate-fade-in"
          />
          
          {/* Sliding drawer content panel */}
          <div className="fixed left-0 inset-y-0 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 shadow-2xl z-50 flex flex-col transition-all duration-300 animate-slide-in-left">
            
            {/* Drawer Header context */}
            <div className="p-5 border-b border-slate-200/60 dark:border-white/5 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80">
              <div className="flex items-center gap-2">
                <div className="bg-theme-light p-1.5 rounded-lg text-theme-primary">
                  <LayoutGrid className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-slate-800 dark:text-slate-200 font-display uppercase tracking-wider">Sayed-World Catalog</h3>
                  <p className="text-[9.5px] text-slate-500 font-medium">Click to navigate marketplace catalog</p>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Scrollable list content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {/* Default option: All Products */}
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setActiveTab("shop");
                  setSidebarOpen(false);
                }}
                className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between border cursor-pointer ${
                  selectedCategory === "all" && activeTab === "shop"
                    ? "bg-theme-light border-theme-border text-theme-primary font-semibold"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 w-9 h-9 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="text-xs font-semibold">All Categories Bundle</div>
                </div>
                <ChevronRight className={`w-4 h-4 opacity-70 ${selectedCategory === "all" && activeTab === "shop" ? "text-theme-primary" : "text-slate-400"}`} />
              </button>

              {/* Dynamic Categories iterator */}
              {CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.id && activeTab === "shop";
                
                // Map Lucide icon component dynamically
                let CatIconComponent = LayoutGrid;
                if (cat.id === "cat-1") CatIconComponent = Shirt;
                if (cat.id === "cat-2") CatIconComponent = Smartphone;
                if (cat.id === "cat-3") CatIconComponent = Home;
                if (cat.id === "cat-4") CatIconComponent = Sparkles;
                if (cat.id === "cat-5") CatIconComponent = ShoppingBag;
                if (cat.id === "cat-6") CatIconComponent = Gift;

                // Count active products for transparency
                const matchedProductsCount = PRODUCTS.filter(p => p.categoryId === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTab("shop");
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? "bg-theme-light border-theme-border text-theme-primary font-semibold"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg w-9 h-9 flex items-center justify-center ${
                        isSelected ? "bg-theme-primary text-white animate-pulse" : "bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-355"
                      }`}>
                        <CatIconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{cat.name}</div>
                        <div className="text-[9.5px] text-slate-400 dark:text-slate-500 font-mono">{matchedProductsCount} Verified Products</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 opacity-70 ${isSelected ? "text-theme-primary" : "text-slate-400"}`} />
                  </button>
                );
              })}
            </div>

            {/* Bangladesh Localization status footer inside Drawer */}
            <div className="p-4 border-t border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-slate-950/80">
              <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-white/5 p-3 rounded-lg space-y-1">
                <div className="text-[9px] font-bold text-slate-700 dark:text-slate-300 uppercase shrink-0 leading-tight">SSLCommerz & bKash Supported</div>
                <p className="text-[9px] text-slate-500 leading-normal">
                  Toggle other user roles on the top bar to inspect vendor/seller inventory or super admin validation routes.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Decorative Aura background blobs for high-fidelity glassmorphism effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-theme-light blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[35%] h-[35%] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-[100px]" />
      </div>

      {/* Dynamic Master Role selector rails (Collapsible for a premium clean customer view) */}
      {showSandboxBar && developerAccessGranted && (
        <div className="bg-slate-900/90 dark:bg-slate-950/80 border-b border-slate-800 dark:border-white/[0.05] backdrop-blur-md px-4 py-2 flex flex-col sm:flex-row justify-between items-center text-xs gap-3 z-50 relative">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-theme-primary animate-ping shrink-0" />
            <span className="text-slate-300 font-medium">Sayed-World Role Playground Switcher:</span>
            {Object.values(UserRole).map(role => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`px-2.5 py-1 rounded text-[10.5px] font-bold transition flex items-center gap-1 ${
                  currentUserRole === role 
                    ? "bg-theme-primary text-white shadow" 
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                }`}
              >
                {role === UserRole.SUPER_ADMIN && <ShieldCheck className="w-3.5 h-3.5" />}
                {role === UserRole.VENDOR && <Building className="w-3.5 h-3.5" />}
                {role === UserRole.CUSTOMER && <ShoppingBag className="w-3.5 h-3.5" />}
                <span>{role}</span>
              </button>
            ))}
          </div>

          {/* Local time settings coordinates matches */}
          <div className="flex flex-wrap items-center gap-4 text-slate-405 font-mono text-[10px]">
            <div>Dhaka (UTC): <span className="font-bold text-slate-200">{UTCTimeString}</span></div>
            
            {/* Design System Style Engine Switcher */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded border border-slate-700">
              <span className="text-[9px] text-slate-400 font-bold px-1 uppercase leading-none">Style:</span>
              <select
                value={designStyle}
                onChange={(e) => setDesignStyle(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded text-[9.5px] py-0.5 px-1.5 font-sans font-bold text-slate-200 focus:outline-none focus:ring-1/2 focus:ring-theme-primary cursor-pointer uppercase"
              >
                <option value="glass">🔮 Classic Glass</option>
                <option value="cyber">💻 Cyber Slate</option>
                <option value="silk">🌸 macOS Silk</option>
                <option value="brutalist">⚡ Brutalist Grid</option>
              </select>
            </div>

            {/* Theme custom picker element */}
            <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded border border-slate-700">
              <span className="text-[9px] text-slate-400 font-bold px-1 uppercase leading-none">Color:</span>
              {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((themeKey) => {
                const th = THEMES[themeKey];
                const isSelected = selectedTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => setSelectedTheme(themeKey)}
                    title={th.name}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-150 transform hover:scale-125 focus:outline-none ${
                      isSelected ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: th.primary }}
                  />
                );
              })}
            </div>

            <button
              onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
              className="p-1 px-1.5 rounded bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1"
            >
              {themeMode === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span className="text-[9px] uppercase tracking-wider font-sans font-bold">{themeMode} Toggle</span>
            </button>
          </div>
        </div>
      )}

      {/* Primary Header block */}
      <header className="glass-panel border-b border-slate-200/50 dark:border-white/15 px-6 py-4 sticky top-0 z-40 flex justify-between items-center relative">
        
        {/* Core Branding log titles */}
        <div className="flex items-center gap-3">
          <div className="bg-theme-primary p-2 rounded-xl text-white shadow-md shadow-theme-border">
            <Cpu className="w-6 h-6 hover:rotate-180 transition-all duration-700" />
          </div>
          <div>
            <h1 className="font-display font-bold text-slate-900 dark:text-slate-100 text-xl tracking-tight leading-none flex items-center gap-1.5">
              Sayed-World 
              <span className="text-[10px] bg-theme-light text-theme-primary px-2 py-0.5 rounded font-mono font-bold">
                TALL STACK COMPLIANT
              </span>
            </h1>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 leading-none font-medium">
              World-Class Multi-Vendor System Specification Suite
            </p>
          </div>
        </div>

        {/* User parameters wallet profiles information */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex flex-col text-right text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{currentUser.name}</span>
              <span className="text-[10px] text-slate-400 font-medium font-mono">{currentUser.email}</span>
            </div>
            
            {/* Unified Account Session control action */}
            {getSavedSession() ? (
              <button 
                onClick={handleLogout}
                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 p-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer text-xs font-bold"
                title="Log out of your account"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline uppercase text-[9px] tracking-wider font-extrabold">Log Out</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-theme-primary/15 hover:bg-theme-primary/25 text-theme-primary p-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer text-xs font-bold"
                title="Access Credentials Login"
              >
                <UserIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline uppercase text-[9px] tracking-wider font-extrabold">Log In</span>
              </button>
            )}
          </div>

          {/* Dynamic Developer Gateway Panel */}
          {developerAccessGranted ? (
            <div className="flex items-center gap-2">
              {/* Quick Demo Settings Toggle Button */}
              <button
                onClick={() => setShowSandboxBar(!showSandboxBar)}
                className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all text-xs font-bold font-sans ${
                  showSandboxBar 
                    ? "bg-theme-primary text-white border-transparent"
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-theme-primary/30 text-slate-700 dark:text-slate-350"
                }`}
                title="Toggle Developer & Demo Sandbox Panel"
              >
                <Settings className={`w-3.5 h-3.5 ${showSandboxBar ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Admin Switcher</span>
              </button>

              <button
                onClick={handleLockDeveloperMode}
                className="p-2 rounded-xl border border-rose-500/10 hover:border-rose-500/35 bg-rose-500/10 text-rose-500 text-xs font-bold flex items-center gap-1 active:scale-95 transition cursor-pointer"
                title="Lock & Hide Admin Settings"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock Controls</span>
              </button>
            </div>
          ) : (
            /* Subtle unlock badge that looks like a SSL / secure badge */
            <button
              onClick={() => setShowAuthModal(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 border border-slate-200/50 dark:border-white/10 cursor-pointer"
              title="Click to authenticate & unlock admin control switcher configurations"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="hidden sm:inline">Secured Gateway</span>
            </button>
          )}
        </div>
      </header>

      {/* Secondary Dynamic Tab Navigation bar */}
      <div className="bg-slate-100/50 dark:bg-slate-900/10 border-b border-slate-200/50 dark:border-white/[0.05] backdrop-blur-xs px-6 py-2 flex flex-wrap gap-2 relative z-30">
        {[
          { id: "home", label: "Home Overview & System Specs", icon: Home },
          { id: "roadmap", label: "Laravel System Architect (20 Phases)", icon: Layers, count: 20 },
          { id: "shop", label: "Sayed-World Marketplace (Customer)", icon: Compass, count: currentProducts.length },
          { id: "vendor", label: "Vendor Dashboard (Seller Panel)", icon: Building, roleLocked: UserRole.VENDOR },
          { id: "admin", label: "Super Admin Control Panel", icon: ShieldCheck, roleLocked: UserRole.SUPER_ADMIN },
          { id: "chat", label: "Live Chat Rooms & AI Copilot", icon: MessageSquare, count: 1 }
        ].filter(tab => {
          if (currentUserRole === UserRole.CUSTOMER) {
            // A regular customer only has access to customer shop and live customer support
            return tab.id === "shop" || tab.id === "chat";
          }
          if (currentUserRole === UserRole.VENDOR) {
            // A vendor can manage their inventory/store and buy/interact as a customer
            return tab.id === "shop" || tab.id === "vendor" || tab.id === "chat";
          }
          // Super admin gets deep tech access to specs, roadmaps, and global configurations
          return true;
        }).map(tab => {
          const Icon = tab.icon;
          
          // Verify role permissions dynamically to show panel badges or locks
          const isLocked = tab.roleLocked && currentUserRole !== tab.roleLocked && currentUserRole !== UserRole.SUPER_ADMIN;
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (isLocked) {
                  alert(`Access classification denied! Switch play-role to: "${tab.roleLocked}" to inspect panel operational routes.`);
                  return;
                }
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all duration-200 relative ${
                isLocked 
                  ? "opacity-30 cursor-not-allowed bg-transparent text-slate-400"
                  : activeTab === tab.id
                    ? "bg-theme-primary text-white shadow-md shadow-theme-border"
                    : "glass-card glass-card-hover text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-white/10"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] rounded px-1.5 font-mono ${
                  activeTab === tab.id 
                    ? "bg-white/20 text-white" 
                    : "bg-slate-200/70 dark:bg-white/5 text-slate-500 dark:text-slate-400"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main operational workspace */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto relative">
        
        {/* Dynamic content rendering relative to Tab selections */}
        {activeTab === "home" && (
          <HomePanel 
            products={currentProducts}
            stores={currentStores}
            orders={registeredOrders}
            currentUser={currentUser}
            designStyle={designStyle}
            onSwitchTab={(tabId) => setActiveTab(tabId)}
            onAddFunds={(amount) => {
              setCurrentUser(prev => ({
                ...prev,
                walletBalance: prev.walletBalance + amount
              }));
            }}
            onSwitchRole={(role) => handleRoleChange(role)}
            onSwitchDesignStyle={(style) => setDesignStyle(style)}
          />
        )}

        {activeTab === "roadmap" && <CodeRoadmap />}

        {activeTab === "shop" && (
          <CustomerShop 
            cart={cart}
            addToCart={handleAddToCart}
            updateCartQty={handleUpdateCartQty}
            removeFromCart={handleRemoveFromCart}
            clearCart={handleClearCart}
            onOrderPlaced={handleOrderPlaced}
            currentUser={currentUser}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            designStyle={designStyle}
            onSwitchDesignStyle={(style) => setDesignStyle(style)}
            onAddFunds={(amount) => {
              setCurrentUser(prev => ({
                ...prev,
                walletBalance: prev.walletBalance + amount
              }));
            }}
            onSwitchTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === "vendor" && (
          <VendorPanel 
            products={currentProducts}
            vendorStore={currentStores[0]}
            onUpdateInventory={handleUpdateInventory}
            currentUser={currentUser}
          />
        )}

        {activeTab === "admin" && (
          <AdminPanel 
            products={currentProducts}
            vendorStores={currentStores}
            onApproveStore={handleNewStoreApprovedByAdmin}
            orders={registeredOrders}
            designStyle={designStyle}
            onSwitchDesignStyle={(style) => setDesignStyle(style)}
            onAddFunds={(amount) => {
              setCurrentUser(prev => ({
                ...prev,
                walletBalance: prev.walletBalance + amount
              }));
            }}
            onSwitchTab={(tabId) => setActiveTab(tabId)}
            currentUser={currentUser}
            onAddCoins={(amount) => {
              setCurrentUser(prev => ({
                ...prev,
                loyaltyPoints: prev.loyaltyPoints + amount
              }));
            }}
          />
        )}

        {activeTab === "chat" && (
          <SupportDesk currentRole={currentUserRole} />
        )}
      </main>

      {/* System info bar footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-4 mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4 mb-20 md:mb-0">
        <div>
          <span>© 2026 Sayed-World E-Commerce platform structures. Built strictly on </span>
          <span className="font-semibold text-slate-600 dark:text-slate-200">Laravel 12 (Modern PHP 8.2+) + Tall stack.</span>
        </div>
        <div className="flex gap-4 items-center">
          <div>Status: <span className="text-emerald-505 font-mono font-bold text-[10px]">● SANDBOX PRODUCTION ACTIVE</span></div>
          <span className="w-1 h-3 bg-slate-300 dark:bg-slate-705 hidden sm:inline" />
          <div className="font-mono text-[10px]">Node Cluster: Port 3000 Ingress</div>
        </div>
      </footer>

      {/* 📱 MODERN MOBILE-FIRST FLOATING DOCK NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/85 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200/60 dark:border-white/10 px-4 py-2 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center pb-5">
        
        {/* Tab 1: Shop */}
        <button
          onClick={() => setActiveTab("shop")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${
            activeTab === "shop" 
              ? "text-theme-primary font-bold scale-105" 
              : "text-slate-505 dark:text-slate-400 hover:text-slate-800"
          }`}
        >
          <div className={`relative p-1.5 rounded-xl transition ${activeTab === 'shop' ? 'bg-theme-light text-theme-primary' : ''}`}>
            <Compass className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-theme-primary text-white text-[8.5px] px-1 font-mono rounded-full font-bold">
              {currentProducts.length}
            </span>
          </div>
          <span className="text-[10px] tracking-tight leading-none uppercase">Market</span>
        </button>

        {developerAccessGranted && (
          /* Tab 2: Code Roadmap */
          <button
            onClick={() => {
              if (currentUserRole !== UserRole.SUPER_ADMIN) {
                alert("Access classification restricted! Tap Color/Style Drawer below to switch your play-role to Admin to view technical specifications blueprints.");
                return;
              }
              setActiveTab("roadmap");
            }}
            className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${
              activeTab === "roadmap" 
                ? "text-theme-primary font-bold scale-105" 
                : "text-slate-505 dark:text-slate-405"
            } ${currentUserRole !== UserRole.SUPER_ADMIN ? "opacity-45" : ""}`}
          >
            <div className={`p-1.5 rounded-xl transition ${activeTab === 'roadmap' ? 'bg-theme-light text-theme-primary' : ''}`}>
              {currentUserRole !== UserRole.SUPER_ADMIN ? (
                <Shield className="w-5 h-5 text-slate-400" />
              ) : (
                <Layers className="w-5 h-5" />
              )}
            </div>
            <span className="text-[10px] tracking-tight leading-none uppercase">Laravel Specs</span>
          </button>
        )}

        {developerAccessGranted && (
          /* Dynamic Center Switch Core Theme Panel Trigger */
          <button
            onClick={() => setMobileCustomizerOpen(true)}
            className="flex flex-col items-center justify-center -mt-6 bg-theme-primary text-white w-12 h-12 rounded-full shadow-lg shadow-theme-primary/30 border-4 border-white dark:border-slate-900 active:scale-90 transition transform hover:rotate-45"
            title="Customize Theme & Smart Layouts"
          >
            <Palette className="w-5 h-5 animate-pulse" />
          </button>
        )}

        {/* Tab 3: Chat */}
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${
            activeTab === "chat" 
              ? "text-theme-primary font-bold scale-105" 
              : "text-slate-505 dark:text-slate-400"
          }`}
        >
          <div className={`relative p-1.5 rounded-xl transition ${activeTab === 'chat' ? 'bg-theme-light text-theme-primary' : ''}`}>
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8.5px] px-1 font-mono rounded-full font-bold">
              1
            </span>
          </div>
          <span className="text-[10px] tracking-tight leading-none uppercase">Live Chat</span>
        </button>

        {developerAccessGranted ? (
          /* Tab 4: Quick Dynamic Role Toggle Button */
          <button
            onClick={() => {
              const nextRole = currentUserRole === UserRole.CUSTOMER 
                ? UserRole.VENDOR 
                : currentUserRole === UserRole.VENDOR 
                  ? UserRole.SUPER_ADMIN 
                  : UserRole.CUSTOMER;
              handleRoleChange(nextRole);
              alert(`Switched Play-Role profile to: ${nextRole.toUpperCase()}`);
            }}
            className="flex flex-col items-center gap-1 flex-1 py-1 transition-all text-slate-505 dark:text-slate-400"
          >
            <div className="p-1.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl">
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
            </div>
            <span className="text-[8.5px] font-black uppercase text-amber-500 line-clamp-1 max-w-[65px]">
              {currentUserRole === UserRole.CUSTOMER ? "Customer" : currentUserRole === UserRole.VENDOR ? "Vendor" : "Admin"}
            </span>
          </button>
        ) : (
          /* Secured Badge for mobile trigger */
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex flex-col items-center gap-1 flex-1 py-1 transition-all text-slate-550 dark:text-slate-400 hover:text-amber-500 cursor-pointer"
            title="Authenticate admin locks"
          >
            <div className="p-1.5 bg-slate-100 dark:bg-white/5 text-slate-400 rounded-xl">
              <Shield className="w-4 h-4 animate-pulse text-amber-500" />
            </div>
            <span className="text-[8.5px] font-bold uppercase text-slate-500 dark:text-slate-400 leading-none">
              Secured
            </span>
          </button>
        )}

      </div>

      {/* 📱 INTERACTIVE SLIDE-UP MOBILE CUSTOMER DRAWER CONTROL CENTER */}
      {mobileCustomizerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end flex-col animate-fade-in">
          {/* Smooth glass blurred overlay */}
          <div 
            onClick={() => setMobileCustomizerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
          />

          {/* Drawer Sheet */}
          <div className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-250 dark:border-white/10 rounded-t-3xl max-h-[85vh] z-10 overflow-y-auto pb-10 shadow-2xl p-4 sm:p-6 text-slate-800 dark:text-slate-100 animate-slide-up">
            
            {/* Elegant drag handle bar */}
            <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4" />

            {/* Title / Close Section */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-200/60 dark:border-white/[0.05]">
              <div>
                <span className="text-[9px] font-bold bg-theme-light text-theme-primary px-2 py-0.5 rounded uppercase tracking-wider block w-max mb-1">
                  Design Presets
                </span>
                <h3 className="font-display font-black text-sm text-slate-950 dark:text-slate-50 flex items-center gap-2">
                  Sayed-World Customizer Hub
                </h3>
                <p className="text-[10px] text-slate-405 leading-tight">পরখ করুন দারুণ সব লেটেস্ট মোবাইল রেন্ডারিং থিম ও কালার টেমপ্লেট</p>
              </div>
              <button 
                onClick={() => setMobileCustomizerOpen(false)}
                className="p-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 hover:bg-slate-300/50 text-slate-60s hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-6">
              
              {/* Option 1: Design Layout Engine Presets */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-theme-primary" />
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Select Display Template Style
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "glass", title: "🔮 Classic Glass", desc: "Frosted translucent premium look" },
                    { id: "cyber", title: "💻 Cyber Slate", desc: "Flat tech linear clean dark" },
                    { id: "silk", title: "🌸 macOS Silk", desc: "Super soft shadows, premium colors" },
                    { id: "brutalist", title: "⚡ Brutalist Grid", desc: "Bold, high-contrast, black borders" }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => {
                        setDesignStyle(style.id as any);
                      }}
                      className={`p-3.5 rounded-2xl text-left border transition active:scale-95 flex flex-col justify-between h-20 ${
                        designStyle === style.id
                          ? "bg-theme-primary text-white border-transparent"
                          : "bg-white dark:bg-slate-900 border-slate-200/70 dark:border-white/5 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <span className="text-xs font-bold block">{style.title}</span>
                      <span className={`text-[9px] block leading-tight ${designStyle === style.id ? 'text-white/80' : 'text-slate-400'}`}>
                        {style.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Active Color Preset Palettes */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-theme-primary" />
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Store Accent Palette
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((themeKey) => {
                    const th = THEMES[themeKey];
                    const isSelected = selectedTheme === themeKey;
                    return (
                      <button
                        key={themeKey}
                        onClick={() => setSelectedTheme(themeKey)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition active:scale-95 ${
                          isSelected
                            ? "bg-white dark:bg-slate-900 shadow-sm border-theme-primary text-theme-primary"
                            : "bg-white/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-white/5 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <span 
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0" 
                          style={{ backgroundColor: th.primary }}
                        />
                        <span className="truncate">{th.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 3: Quick Play-Role Switcher */}
              <div className="p-3.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200/40 dark:border-white/[0.03] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Role Simulation System
                  </span>
                  <span className="text-[9px] text-amber-500 font-extrabold pb-0.5">Fast Testing Profile</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { role: UserRole.CUSTOMER, label: "Customer" },
                    { role: UserRole.VENDOR, label: "Seller" },
                    { role: UserRole.SUPER_ADMIN, label: "Admin" }
                  ].map((item) => (
                    <button
                      key={item.role}
                      onClick={() => {
                        handleRoleChange(item.role);
                      }}
                      className={`p-2 rounded-xl text-center text-[10px] font-bold uppercase transition active:scale-95 ${
                        currentUserRole === item.role
                          ? "bg-amber-500 text-white"
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 4: Light/Dark System Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-white/5">
                <div className="space-y-0.5">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Eye Protection Mode</h5>
                  <p className="text-[10px] text-slate-450">টগল করুন ডার্ক ও লাইট থিমের মধ্যে</p>
                </div>
                <button
                  onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
                  className="p-2.5 px-4 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-800 dark:text-slate-200 hover:dark:bg-white/10 active:scale-95 transition flex items-center gap-2 font-bold text-xs"
                >
                  {themeMode === "light" ? (
                    <>
                      <Moon className="w-4 h-4 text-theme-primary" />
                      <span>Dark Theme</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Light Theme</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Quick action button inside drawer */}
            <button
              onClick={() => setMobileCustomizerOpen(false)}
              className="w-full mt-2 py-3.5 bg-theme-primary hover:bg-theme-hover text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-transform duration-100 active:scale-95 cursor-pointer shadow-md shadow-theme-border"
            >
              Apply Theme & Return to Storefront
            </button>

          </div>
        </div>
      )}

      {/* 🔒 SECURE MULTI-PROVIDER AUTHENTICATION MODAL */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
