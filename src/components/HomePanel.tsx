import React, { useState } from "react";
import { Product, VendorStore, Order, User, UserRole } from "../types";
import { 
  Compass, ShoppingBag, Building, ShieldCheck, MessageSquare, Layers, 
  ArrowRight, Coins, Sparkles, Flame, Percent, Cpu, CheckCircle2, 
  HelpCircle, AlertCircle, TrendingUp, Users, Wallet, RefreshCw, BarChart3,
  Star, Clock, Trophy, Shield, Truck, CreditCard, Tag, Laptop, Palette, Grid
} from "lucide-react";

interface HomePanelProps {
  products: Product[];
  stores: VendorStore[];
  orders: Order[];
  currentUser: User;
  designStyle: "glass" | "cyber" | "brutalist" | "silk";
  onSwitchTab: (tabId: "shop" | "vendor" | "admin" | "chat" | "roadmap") => void;
  onAddFunds: (amount: number) => void;
  onSwitchRole: (role: UserRole) => void;
  onSwitchDesignStyle: (style: "glass" | "cyber" | "brutalist" | "silk") => void;
}

export default function HomePanel({ 
  products, 
  stores, 
  orders, 
  currentUser, 
  designStyle,
  onSwitchTab, 
  onAddFunds,
  onSwitchRole,
  onSwitchDesignStyle
}: HomePanelProps) {
  const [claimStatus, setClaimStatus] = useState<string | null>(null);
  const [quickPromoCode, setQuickPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Dynamic calculations
  const totalStockCount = products.reduce((acc, p) => acc + p.stockCount, 0);
  const bestSeller = [...products].sort((a, b) => b.salesCount - a.salesCount)[0];
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  // Dynamic collections for specialized sections
  const newArrivals = [...products].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 4);
  const trendingProducts = [...products].sort((a, b) => b.rating - a.rating || b.salesCount - a.salesCount).slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 4);

  const handleClaimReward = () => {
    onAddFunds(5000);
    setClaimStatus("🎉 অভিনন্দন! ৳৫,০০০/- গ্রাহক উপহার কোড আপনার ওয়ালেটে যুক্ত হয়েছে!");
    setTimeout(() => setClaimStatus(null), 4000);
  };

  const handleVerifyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = quickPromoCode.trim().toUpperCase();
    if (code === "SAYED77" || code === "TALL12") {
      setPromoMessage("✅ Valid Global Promo! get flat 15% discount in customer checkout.");
    } else if (code === "") {
      setPromoMessage("⚠️ Please enter a coupon code.");
    } else {
      setPromoMessage("❌ Expired or Unrecognized Promo. Try 'SAYED77' instead!");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="home-dashboard">
      
      {/* 🚀 1. Premium Customer-First Promotional Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md border border-theme-border rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl z-10">
        {/* Dynamic decorative backdrop auras */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-theme-light rounded-full blur-[80px]" />
        <div className="absolute bottom-[-50px] left-[10%] w-64 h-64 bg-indigo-550/10 rounded-full blur-[80px] opacity-40" />
        
        <div className="max-w-3xl z-10 space-y-4 relative">
          <span className="bg-theme-primary text-white font-sans font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 w-fit shadow-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-white" />
            MEGA CAMPAIGN IS LIVE • মেগা অফার চলছে
          </span>
          
          <h2 className="font-display font-bold text-2xl md:text-4xl text-slate-100 tracking-tight leading-tight">
            বাংলাদেশের সেরা মাল্টি-ভেন্ডর মার্কেটপ্লেস <br className="hidden md:inline" />
            Welcome to <span className="text-theme-primary font-extrabold drop-shadow">Sayed-World</span> Storefront
          </h2>
          
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl font-light">
            ভিন্নধর্মী দেশী-বিদেশী চমৎকার গ্যাজেটস, রকমারি পোশাক এবং প্রসাধন সামগ্রীর এক অনন্য সমাহার। 
            We connect audited top-class Bangladeshi vendor stores with authentic fast delivery, secured with bKash, Nagad, and dynamic SSLCommerz payment gateways.
          </p>
          
          {/* Quick interactive action triggers */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onSwitchTab("shop")}
              className="px-5 py-2.5 bg-theme-primary hover:bg-theme-hover text-white rounded-xl text-xs font-semibold shadow-lg shadow-theme-border/20 transition duration-155 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Shopping • কেনাকাটা করুন
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleClaimReward}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-slate-100 border border-white/10 rounded-xl text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
            >
              <Coins className="w-4 h-4 text-theme-primary animate-bounce" />
              Claim Registration Token (৳5,000 Free Wallet)
            </button>
          </div>

          {claimStatus && (
            <div className="bg-theme-light border border-theme-border text-theme-primary p-3 rounded-xl text-xs font-semibold animate-pulse mt-3 max-w-lg">
              {claimStatus}
            </div>
          )}
        </div>
      </div>

      {/* 🎨 Dynamic Interactive Website Theme & Style Selector */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-200/50 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-indigo-500/10">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white p-2 rounded-xl shadow-md">
              <Palette className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-105 flex items-center gap-1.5">
                Choose Website Theme & Design Style
                <span className="text-[9px] bg-indigo-500/15 text-indigo-550 dark:text-indigo-400 font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                  v2.0 Smart Engine
                </span>
              </h3>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">ওয়েবসাইটের সম্পূর্ণ লুক ও ডিজাইন ধরন এক ক্লিকে পরিবর্তন করুন।</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-550 dark:text-slate-400 font-medium">Current selection: <span className="text-theme-primary font-bold uppercase">{designStyle}</span></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Option 1: Frosted Glass */}
          <div 
            onClick={() => onSwitchDesignStyle("glass")}
            className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
              designStyle === "glass" 
                ? "bg-theme-light border-theme-primary ring-1 ring-theme-primary/30 shadow-md" 
                : "bg-white/15 dark:bg-slate-900/40 border-slate-200/60 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/15"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px]">🔮</span>
              {designStyle === "glass" && <span className="bg-theme-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">Active</span>}
            </div>
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">Classic Frosted Glass</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-405 mt-1 leading-normal">
              Organically blurred glass components with glowing neon background auras. Offers depth, aesthetics and premium overlay fidelity.
            </p>
          </div>

          {/* Option 2: Cyber Obsidian */}
          <div 
            onClick={() => onSwitchDesignStyle("cyber")}
            className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
              designStyle === "cyber" 
                ? "bg-theme-light border-theme-primary ring-1 ring-theme-primary/30 shadow-md" 
                : "bg-white/15 dark:bg-slate-900/40 border-slate-200/60 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/15"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px]">💻</span>
              {designStyle === "cyber" && <span className="bg-theme-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">Active</span>}
            </div>
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-105">Cyber Slate Minimalist</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-405 mt-1 leading-normal">
              Razor-thin geometric lines, solid clean dark onyx slate base panels, zero blur distraction. Tailored for speeds & SaaS simplicity.
            </p>
          </div>

          {/* Option 3: Silk macOS */}
          <div 
            onClick={() => onSwitchDesignStyle("silk")}
            className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
              designStyle === "silk" 
                ? "bg-theme-light border-theme-primary ring-1 ring-theme-primary/30 shadow-md" 
                : "bg-white/15 dark:bg-slate-900/40 border-slate-200/60 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/15"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px]">🌸</span>
              {designStyle === "silk" && <span className="bg-theme-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">Active</span>}
            </div>
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-105">macOS Silk Liquid</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-405 mt-1 leading-normal">
              Curvier macOS styling layers with larger radii, translucent saturation, softer shadows, and luxurious tactile micro-animations.
            </p>
          </div>

          {/* Option 4: Neo-Brutalist */}
          <div 
            onClick={() => onSwitchDesignStyle("brutalist")}
            className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
              designStyle === "brutalist" 
                ? "bg-theme-light border-theme-primary ring-1 ring-theme-primary/30 shadow-md" 
                : "bg-white/15 dark:bg-slate-900/40 border-slate-200/60 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/15"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px]">⚡</span>
              {designStyle === "brutalist" && <span className="bg-theme-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase">Active</span>}
            </div>
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-105">Retro Brutalist Grid</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-405 mt-1 leading-normal">
              High-impact street style with thick black outlines, real offsets, pixel retro badges, solid hard shadows & cyber terminal feelings.
            </p>
          </div>
        </div>
      </div>

      {/* 🛡️ 2. Core Operational Trust badges for Customer Segment */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel hover:border-theme-primary/40 transition-all p-4 rounded-xl flex items-center gap-3.5">
          <div className="bg-theme-light p-2.5 rounded-lg text-theme-primary shrink-0">
            <Truck className="w-5 h-5 text-theme-primary" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider leading-none">Super Fast Delivery</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              ২৪-৪৮ ঘণ্টায় ডেলিভারি
            </span>
          </div>
        </div>

        <div className="glass-panel hover:border-indigo-505/30 transition-all p-4 rounded-xl flex items-center gap-3.5">
          <div className="bg-indigo-500/10 p-2.5 rounded-lg text-indigo-500 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider leading-none">Authentic Products</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              শতভাগ জেনুইন প্রোডাক্টস
            </span>
          </div>
        </div>

        <div className="glass-panel hover:border-amber-500/30 transition-all p-4 rounded-xl flex items-center gap-3.5">
          <div className="bg-amber-500/10 p-2.5 rounded-lg text-amber-505 shrink-0">
            <CreditCard className="w-5 h-5 text-amber-505" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider leading-none">Instant bkash/Nagad</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              সহজ ও নিরাপদ পেমেন্ট
            </span>
          </div>
        </div>

        <div className="glass-panel hover:border-emerald-500/30 transition-all p-4 rounded-xl flex items-center gap-3.5">
          <div className="bg-emerald-500/10 p-2.5 rounded-lg text-emerald-500 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider leading-none">Secure Escrow Protection</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block">
              ভেন্ডর পেমেন্ট সুরক্ষা ইন্টিগ্রেশন
            </span>
          </div>
        </div>

      </div>

      {/* 🌟 3. New Arrivals, Trending & Best Selling Product Sections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-medium text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-theme-primary shrink-0" />
            Top Recommendations • সেরা অফার ও সাজেশন্স
          </h3>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 font-medium">Real-Time Sync Platform</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          
          {/* Columns 1: New Arrivals (নতুন প্রোডাক্টস) */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-200/60 dark:border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-theme-light p-1.5 rounded-lg text-theme-primary">
                  <Clock className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100">
                    New Arrival Products
                  </h3>
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 font-medium tracking-wide">নতুন আগমন ও অভিনব কালেকশন</p>
                </div>
              </div>
              <button 
                onClick={() => onSwitchTab("shop")}
                className="text-[10px] font-bold text-theme-primary hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="space-y-3.5">
              {newArrivals.map((p) => (
                <div 
                  key={`new-${p.id}`}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 transition border border-transparent hover:border-slate-100 dark:hover:border-white/5 group"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950/70 shrink-0 border border-slate-200/50 dark:border-white/5">
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute top-0 right-0 bg-theme-primary text-white text-[7.5px] font-extrabold px-1 py-0.5 rounded-bl shadow-xs">
                      NEW
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-theme-primary transition-colors">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-2.5 h-2.5 fill-amber-500" />
                        <span className="text-[9.5px] font-bold font-mono">{p.rating}</span>
                      </div>
                      <span className="text-slate-300 dark:text-slate-700 text-[10px]">•</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-550 font-mono">
                        {p.stockCount > 0 ? `${p.stockCount} in stock` : "Out of Stock"}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-900 dark:text-slate-105 font-mono mt-0.5">
                      ৳{p.price.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => onSwitchTab("shop")}
                    className="py-1 px-2.5 text-[10px] bg-slate-105 hover:bg-theme-primary dark:bg-slate-800 hover:dark:bg-theme-primary text-slate-700 hover:text-white dark:text-slate-200 hover:dark:text-white rounded-md font-bold transition duration-150 cursor-pointer active:scale-95"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Columns 2: Trending / Trading Products (ট্রেন্ডিং প্রোডাক্টস ও ডিল) */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-200/60 dark:border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-red-500/10 p-1.5 rounded-lg text-red-500">
                  <Flame className="w-4 h-4 animate-pulse text-red-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100">
                    Trending Products
                  </h3>
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 font-medium tracking-wide">ট্রেডিং ও সর্বোচ্চ ভিউ করা পণ্যসমূহ</p>
                </div>
              </div>
              <button 
                onClick={() => onSwitchTab("shop")}
                className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="space-y-3.5">
              {trendingProducts.map((p) => (
                <div 
                  key={`trend-${p.id}`}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 transition border border-transparent hover:border-slate-100 dark:hover:border-white/5 group"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950/70 shrink-0 border border-slate-200/50 dark:border-white/5">
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-bl shadow-xs flex items-center gap-0.5">
                      HOT
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-theme-primary transition-colors">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-2.5 h-2.5 fill-amber-500" />
                        <span className="text-[9.5px] font-bold font-mono">{p.rating}</span>
                      </div>
                      <span className="text-slate-300 dark:text-slate-700 text-[10px]">•</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-550 font-mono">
                        {p.salesCount} sold
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-900 dark:text-slate-105 font-mono mt-0.5">
                      ৳{p.price.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => onSwitchTab("shop")}
                    className="py-1 px-2.5 text-[10px] bg-slate-105 hover:bg-red-500 dark:bg-slate-800 hover:dark:bg-red-650 text-slate-700 hover:text-white dark:text-slate-200 hover:dark:text-white rounded-md font-bold transition duration-150 cursor-pointer active:scale-95"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Columns 3: Best Selling Products (সেরা বিক্রিত প্রোডাক্টস) */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-200/60 dark:border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-amber-500/10 p-1.5 rounded-lg text-amber-500">
                  <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100">
                    Best Selling Products
                  </h3>
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 font-medium tracking-wide">সেরা বিক্রিত ও সর্বাধিক জনপ্রিয় পণ্যসমূহ</p>
                </div>
              </div>
              <button 
                onClick={() => onSwitchTab("shop")}
                className="text-[10px] font-bold text-amber-500 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="space-y-3.5">
              {bestSellers.map((p) => (
                <div 
                  key={`bestsell-${p.id}`}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 transition border border-transparent hover:border-slate-100 dark:hover:border-white/5 group"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950/70 shrink-0 border border-slate-200/50 dark:border-white/5">
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-[7.5px] font-extrabold px-1 py-0.5 rounded-bl shadow-xs">
                      BEST
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-amber-550 transition-colors">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-2.5 h-2.5 fill-amber-500" />
                        <span className="text-[9.5px] font-bold font-mono">{p.rating}</span>
                      </div>
                      <span className="text-slate-300 dark:text-slate-700 text-[10px]">•</span>
                      <span className="text-[9.5px] text-amber-600 dark:text-amber-505 font-bold font-mono">
                        {p.salesCount} sold
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-900 dark:text-slate-105 font-mono mt-0.5">
                      ৳{p.price.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => onSwitchTab("shop")}
                    className="py-1 px-2.5 text-[10px] bg-slate-105 hover:bg-amber-550 dark:bg-slate-800 hover:dark:bg-amber-600 text-slate-700 hover:text-white dark:text-slate-200 hover:dark:text-white rounded-md font-bold transition duration-150 cursor-pointer active:scale-95"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 🔮 4. Interactive Customer-centric feature hubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Marketplace Entry bento Card */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-theme-light rounded-bl-3xl transition-colors" />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-theme-light text-theme-primary p-2 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Interactive Marketplace</h4>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-405 leading-relaxed">
              দেশি তাঁতের শাড়ি, কটন পোশাক থেকে শুরু করে অত্যাধুনিক গ্যাজেটসের বিশাল মার্কেটপ্লেস। এখনই শপিং শুরু করুন বিকাশ সুরক্ষায়।
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 rounded-xl p-3 text-[11px] font-mono space-y-1 text-slate-505">
              <div className="flex justify-between">
                <span>Total Catalog Size:</span>
                <span className="text-slate-200 font-bold">{products.length} Products</span>
              </div>
              <div className="flex justify-between">
                <span>Verified stores active:</span>
                <span className="text-theme-primary font-bold">{stores.length} Approved</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => onSwitchTab("shop")}
            className="mt-4 w-full py-2 bg-theme-primary/10 hover:bg-theme-primary/25 border border-theme-border text-theme-primary text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Shop marketplace now
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Promo and campaigns bento card */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 group-hover:bg-red-500/10 rounded-bl-3xl transition-colors" />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-red-500/10 text-red-500 p-2 rounded-lg">
                <Tag className="w-5 h-5 text-red-500" />
              </div>
              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Coupons & Campaigns</h4>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-405 leading-relaxed">
              সিলভার বা গোল্ড মেম্বারশিপের সাথে উপভোগ করুন বিশেষ ছাড়। প্রবেশ করান প্রোমো কোড এবং ইনস্ট্যান্ট টেস্ট করুন সিস্টেম রেট।
            </p>

            <form onSubmit={handleVerifyCoupon} className="space-y-2 mt-1">
              <div className="flex gap-1.5">
                <input 
                  type="text" 
                  placeholder="Promo Code: SAYED77" 
                  value={quickPromoCode}
                  onChange={(e) => setQuickPromoCode(e.target.value)}
                  className="flex-1 text-[10.5px] px-2.5 py-1.5 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/15 rounded-lg text-slate-700 dark:text-slate-200 placeholder-slate-450 focus:outline-none focus:ring-1 focus:ring-theme-primary font-mono text-center uppercase" 
                />
                <button 
                  type="submit"
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10.5px] font-bold cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className="text-[10px] font-medium leading-tight text-theme-primary">
                  {promoMessage}
                </p>
              )}
            </form>
          </div>

          <div className="text-[10px] text-slate-400 mt-3 font-mono">
            *Code SAYED77 provides flat 15% discount
          </div>
        </div>

        {/* AI copilot assistant bento card */}
        <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 group-hover:bg-blue-500/10 rounded-bl-3xl transition-colors" />
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500/10 text-blue-500 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-500" />
              </div>
              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">24/7 AI Sales assistant</h4>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-405 leading-relaxed">
              পণ্য সিলেকশন করতে সাহায্য প্রয়োজন? আমাদের কৃত্রিম বুদ্ধিমত্তাসম্পন্ন সহকারী আপনার সহায়তায় সদাপ্রস্তুত।
            </p>

            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 rounded-xl p-3 text-[11px] font-mono space-y-1 text-slate-505">
              <div className="flex justify-between">
                <span>AI Agent Mode:</span>
                <span className="text-blue-500 font-bold uppercase">Dynamic Google AI</span>
              </div>
              <div className="flex justify-between">
                <span>Response Speed:</span>
                <span className="text-slate-405">Real-Time Fluid</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onSwitchTab("chat")}
            className="mt-4 w-full py-2 bg-blue-500/10 hover:bg-blue-500/25 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Launch AI Customer Copilot
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 🏆 5. Handpicked Featured Products Carousel / Highlight Showcase */}
      <div className="glass-panel rounded-2xl p-6 relative">
        <h3 className="font-display font-semibold text-base text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          Premium Handpicked Highlights • গ্রাহকদের প্রিয় পছন্দসমূহ
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((p) => (
            <div 
              key={p.id} 
              className="bg-white/45 dark:bg-slate-900/40 rounded-xl p-4 border border-slate-200/50 dark:border-white/5 flex flex-col justify-between group hover:border-theme-primary/30 transition duration-150"
            >
              <div>
                <div className="overflow-hidden rounded-xl mb-3 h-32 relative">
                  <img 
                    src={p.images[0]} 
                    alt={p.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300" 
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-xs text-[9px] text-white font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 text-amber-405 fill-amber-400" />
                    {p.rating}
                  </div>
                </div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate group-hover:text-theme-primary transition-colors">{p.title}</h4>
                <p className="text-[10.5px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{p.description}</p>
              </div>
              
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800">
                <span className="font-mono text-theme-primary font-bold text-xs">
                  ৳{p.price.toLocaleString()}
                </span>
                <button
                  onClick={() => onSwitchTab("shop")}
                  className="text-[10.5px] font-bold text-theme-primary flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Buy Now <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📝 6. Dynamic Testing & Sandbox Informational Footer */}
      <div className="bg-theme-light border border-theme-border rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="bg-theme-primary text-white p-2.5 rounded-xl shrink-0">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200">How to test active relational state integrations?</h4>
            <p className="text-slate-450 text-[11px] leading-relaxed mt-0.5">
              Place items in your cart and check out. Switch your active design role on the top bar to inspect vendor inventory, control pending store registrations, or inspect technical blueprint codes!
            </p>
          </div>
        </div>
        <button
          onClick={() => onSwitchTab("roadmap")}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold transition shrink-0 border border-white/5 cursor-pointer"
        >
          View System Architecture Spec
        </button>
      </div>

    </div>
  );
}
