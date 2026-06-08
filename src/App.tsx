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

// Icon imports
import { 
  Building, ShieldCheck, ShoppingBag, MessageSquare, BookOpen, Layers,
  Compass, Coins, ShieldAlert, Cpu, Settings, Copy, Check, Menu, X, 
  Sun, Moon, Users, ShoppingCart, User as UserIcon, RefreshCw, BarChart3, HelpCircle,
  Home, LayoutGrid, ChevronRight, Shirt, Smartphone, Sparkles, Gift
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
  const [activeTab, setActiveTab] = useState<"home" | "shop" | "vendor" | "admin" | "chat" | "roadmap">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.CUSTOMER);

  // Core synchronized relational states
  const [currentProducts, setCurrentProducts] = useState<Product[]>(PRODUCTS);
  const [currentStores, setCurrentStores] = useState<VendorStore[]>(VENDOR_STORES);
  const [registeredOrders, setRegisteredOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Current active user model
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user-sayed-77",
    name: "Sayed Rahman",
    email: "saidulislam0400@gmail.com",
    role: UserRole.CUSTOMER,
    walletBalance: 45000, // starting wallet in BDT
    loyaltyPoints: 120
  });

  // Track system date/time matching metadata coordinates
  const UTCTimeString = "2026-06-08 14:46:12 UTC";

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#080d1a] text-slate-800 dark:text-slate-200 transition-colors duration-250 flex flex-col font-sans relative">
      
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

      {/* Dynamic Master Role selector rails */}
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
          <div className="hidden md:flex flex-col text-right text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{currentUser.name}</span>
            <span className="text-[10px] text-slate-400 font-medium font-mono">{currentUser.email}</span>
          </div>

          <div className="glass-card p-2 rounded-xl border border-slate-203 dark:border-white/10 flex items-center gap-4 text-xs">
            <div className="font-mono text-center px-1">
              <span className="text-[9px] block text-slate-400 dark:text-slate-500 font-semibold tracking-wider font-sans leading-none pb-0.5">Wallet</span>
              <span className="font-bold text-theme-primary">৳{currentUser.walletBalance.toLocaleString()}</span>
            </div>
            <div className="w-px bg-slate-200 dark:bg-white/10 h-8" />
            <div className="font-mono text-center px-1">
              <span className="text-[9px] block text-slate-400 dark:text-slate-500 font-semibold tracking-wider font-sans leading-none pb-0.5">Coins</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{currentUser.loyaltyPoints} PTS</span>
            </div>
          </div>
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
        ].map(tab => {
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
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto relative z-10">
        
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
          />
        )}

        {activeTab === "chat" && (
          <SupportDesk currentRole={currentUserRole} />
        )}
      </main>

      {/* System info bar footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-4 mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
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
    </div>
  );
}
