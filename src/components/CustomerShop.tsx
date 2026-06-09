import React, { useState, useEffect } from "react";
import { Product, CartItem, Coupon, Category, Brand, User } from "../types";
import { PRODUCTS, CATEGORIES, BRANDS, VENDOR_STORES } from "../data";
import { 
  ShoppingBag, Star, HelpCircle, Heart, Share2, Sparkles, Filter, 
  Search, SlidersHorizontal, ShoppingCart, Plus, Minus, Trash2, 
  X, Check, ChevronRight, Truck, CreditCard, CheckCircle2, Ticket,
  Clock, Flame, Trophy, Coins, Palette, ArrowRight, Shield, Wallet, Percent, Tag, MessageSquare,
  Shirt, Smartphone, Home, Gift
} from "lucide-react";

interface CustomerShopProps {
  cart: CartItem[];
  addToCart: (p: Product, color?: string, size?: string) => void;
  updateCartQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  onOrderPlaced: (orderData: any) => void;
  currentUser: User;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  designStyle: "glass" | "cyber" | "brutalist" | "silk";
  onSwitchDesignStyle: (style: "glass" | "cyber" | "brutalist" | "silk") => void;
  onAddFunds: (amount: number) => void;
  onSwitchTab: (tabId: "shop" | "vendor" | "admin" | "chat" | "roadmap") => void;
}

const CATEGORY_IMAGES_MAP: { [key: string]: string[] } = {
  "all": [
    "https://images.unsplash.com/photo-1472851294608-062f824d296e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&auto=format&fit=crop&q=80"
  ],
  "cat-1": [ // Fashion & Apparel
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=150&auto=format&fit=crop&q=80"
  ],
  "cat-2": [ // Electronics & Gadgets
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=80"
  ],
  "cat-3": [ // Home & Living
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=150&auto=format&fit=crop&q=80"
  ],
  "cat-4": [ // Beauty & Personal Care
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=150&auto=format&fit=crop&q=80"
  ],
  "cat-5": [ // Groceries & Organic
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506617498719-38f4d345d222?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=150&auto=format&fit=crop&q=80"
  ],
  "cat-6": [ // Traditional Crafts & Gifts
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=150&auto=format&fit=crop&q=80"
  ]
};

interface LiveCategoryCircleProps {
  key?: string;
  catId: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
}

function LiveCategoryCircle({ catId, name, isActive, onClick }: LiveCategoryCircleProps) {
  const images = CATEGORY_IMAGES_MAP[catId] || CATEGORY_IMAGES_MAP["all"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cycles images automatically to give the "live active feed" e-commerce vibe requested!
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500 + Math.random() * 800);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 focus:outline-none group cursor-pointer transition-transform duration-300 active:scale-95 shrink-0"
    >
      <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${
        isActive
          ? "ring-4 ring-emerald-500 scale-105 shadow-md shadow-emerald-500/30 border-2 border-white dark:border-slate-900"
          : "ring-2 ring-slate-100 dark:ring-white/10 hover:ring-emerald-300 border-2 border-transparent"
      }`}>
        <img
          src={images[currentIndex]}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        {isActive && (
          <div className="absolute inset-0 bg-emerald-600/10 mix-blend-multiply" />
        )}
      </div>
      <span className={`text-[10px] sm:text-[11px] font-extrabold tracking-tight leading-tight transition duration-200 line-clamp-1 max-w-[76px] text-center uppercase ${
        isActive ? "text-emerald-600 dark:text-emerald-400 font-extrabold" : "text-slate-600 dark:text-slate-350 group-hover:text-emerald-500"
      }`}>
        {name === "Groceries & Organic" ? "Groceries" : name === "Traditional Crafts & Gifts" ? "Crafts & Gifts" : name === "Beauty & Personal Care" ? "Beauty" : name === "Electronics & Gadgets" ? "Gadgets" : name === "Fashion & Apparel" ? "Fashion" : name}
      </span>
    </button>
  );
}

const PRICE_RANGES = [
  { id: "0-500", label: "৳0 - ৳500", min: 0, max: 500 },
  { id: "500-1000", label: "৳500 - ৳1000", min: 500, max: 1000 },
  { id: "1000-1500", label: "৳1000 - ৳1500", min: 1000, max: 1500 },
  { id: "1500-2000", label: "৳1500 - ৳2000", min: 1500, max: 2000 },
  { id: "2000-5000", label: "৳2000 - ৳5000", min: 2000, max: 5000 },
  { id: "5000-10000", label: "৳5000 - ৳10000", min: 5000, max: 10000 },
];

export default function CustomerShop({ 
  cart, addToCart, updateCartQty, removeFromCart, clearCart, onOrderPlaced, currentUser,
  selectedCategory, setSelectedCategory, designStyle, onSwitchDesignStyle, onAddFunds, onSwitchTab
}: CustomerShopProps) {
  
  // Shopping logic states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  
  // Custom Filter & AI Suggest States (Video 1 & Video 2)
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedPriceRangeId, setSelectedPriceRangeId] = useState("");
  const [shippingPreference, setShippingPreference] = useState<"air" | "sea">("air");
  const [selectedZoomImage, setSelectedZoomImage] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Direct Variant/Size shopping sheet state: maintains quantities of S, M, L, XL added in details panel
  const [variantQuantities, setVariantQuantities] = useState<Record<string, number>>({});
  
  // Variation toggles inside details modal
  const [chosenColor, setChosenColor] = useState("");
  const [chosenSize, setChosenSize] = useState("");

  // Countdown clock state
  const [expiryTime, setExpiryTime] = useState({ h: 3, m: 45, s: 12 });

  // Coupon promo code calculations
  const [promoCode, setPromoCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Checkout flows
  const [checkoutStep, setCheckoutStep] = useState<"none" | "shipping" | "gateway" | "receipt">("none");
  const [shippingForm, setShippingForm] = useState({
    name: currentUser.name,
    phone: "01720485930",
    division: "Dhaka Division",
    district: "Dhaka District",
    upazila: "Tejgaon",
    fullAddress: "86 Broad Street Path, Tejgaon Industrial Area",
    method: "bKash" as "SSLCommerz" | "bKash" | "COD"
  });

  const [bookingResponse, setBookingResponse] = useState<any>(null);

  // Home-migrated Claim Reward and Promo verifying states
  const [claimStatus, setClaimStatus] = useState<string | null>(null);
  const [quickPromoCode, setQuickPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const handleClaimReward = () => {
    onAddFunds(5000);
    setClaimStatus("🎉 অভিনন্দন! ৳৫,০০০/- গ্রাহক উপহার কোড আপনার ওয়ালেটে যুক্ত হয়েছে!");
    setTimeout(() => setClaimStatus(null), 4000);
  };

  const handleVerifyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = quickPromoCode.trim().toUpperCase();
    if (code === "SAYED77" || code === "TALL12") {
      setPromoMessage("✅ Valid Global Promo! Get flat 15% discount in customer checkout.");
    } else if (code === "") {
      setPromoMessage("⚠️ Please enter a coupon code.");
    } else {
      setPromoMessage("❌ Expired or Unrecognized Promo. Try 'SAYED77' instead!");
    }
  };

  // Live timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setExpiryTime(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        clearInterval(interval);
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pre-fill fields on modal select
  useEffect(() => {
    if (selectedProduct) {
      setChosenColor(selectedProduct.variants?.[0]?.color || "");
      setChosenSize(selectedProduct.variants?.[0]?.size || "");
    }
  }, [selectedProduct]);

  // Pricing math
  const cartSubtotal = cart.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);

  const shippingCharge = cart.length > 0 ? (shippingForm.division === "Dhaka Division" ? 60 : 120) : 0;
  const grandTotal = Math.max(0, cartSubtotal + shippingCharge - discountValue);

  // Validate Promo coupon
  const handleApplyPromo = () => {
    setPromoError(null);
    const code = promoCode.toUpperCase().trim();
    if (code === "WELCOME100") {
      if (cartSubtotal < 1000) {
        setPromoError("Minimum BDT ৳1000 spend required for WELCOME100!");
        return;
      }
      setDiscountValue(100);
      setCouponApplied("WELCOME100 (৳100 platform discount)");
    } else if (code === "SAYED50") {
      setDiscountValue(50);
      setCouponApplied("SAYED50 (৳50 shop voucher)");
    } else {
      setPromoError("Invalid promo code! Try WELCOME100 or SAYED50");
    }
  };

  // Run place order API simulation
  const handleCheckoutSubmit = async () => {
    setCheckoutStep("gateway");
  };

  // Process gateway loading and success
  const handleCompletePayment = async () => {
    try {
      // Direct full-stack courier API trigger simulation
      const courierOption = "SteadFast";
      const paymentResponse = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          phone: shippingForm.phone,
          name: shippingForm.name,
          paymentMethod: shippingForm.method
        })
      });

      const responseJSON = await paymentResponse.json();

      const courierRes = await fetch("/api/shipping/book-courier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: responseJSON.transactionId,
          courier: "SteadFast"
        })
      });

      const courierJSON = await courierRes.json();

      const newOrder = {
        id: responseJSON.transactionId,
        customerId: currentUser.id,
        customerName: shippingForm.name,
        items: cart.map(item => ({
          id: item.id,
          productId: item.product.id,
          productTitle: item.product.title,
          productPrice: item.product.price,
          quantity: item.quantity,
          vendorStoreId: item.product.vendorStoreId
        })),
        totalAmount: grandTotal,
        shippingCharge,
        discountAmount: discountValue,
        paymentMethod: shippingForm.method,
        paymentStatus: shippingForm.method === "COD" ? "Pending" : "Paid",
        shippingAddress: {
          division: shippingForm.division,
          district: shippingForm.district,
          upazila: shippingForm.upazila,
          area: shippingForm.fullAddress,
          phone: shippingForm.phone
        },
        deliveryStatus: "Processing",
        trackingNumber: courierJSON.consignmentId,
        courierName: "SteadFast",
        createdAt: new Date().toISOString()
      };

      setBookingResponse(newOrder);
      setCheckoutStep("receipt");
      
      // Update inventory, parent stats, and logs inside applet
      onOrderPlaced(newOrder);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Error initiating payment checkout.");
    }
  };

  // Dynamic collections for specialized customer sections
  const newArrivals = [...PRODUCTS].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5);
  const trendingProducts = [...PRODUCTS].sort((a, b) => b.rating - a.rating || b.salesCount - a.salesCount).slice(0, 5);
  const bestSellers = [...PRODUCTS].sort((a, b) => b.salesCount - a.salesCount).slice(0, 5);

  // Filter products by category, query, and prices (Video 1 Price Filter Setup)
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === "all" || p.categoryId === selectedCategory;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const minVal = minPrice ? parseFloat(minPrice) : 0;
    const maxVal = maxPrice ? parseFloat(maxPrice) : Infinity;
    const matchesPrice = p.price >= minVal && p.price <= maxVal;
    
    return matchesCat && matchesQuery && matchesPrice;
  });

  // Find matching suggest items based on active category (Video 1 Setup)
  const activeSuggestProducts = (() => {
    const list = PRODUCTS.filter(p => selectedCategory === "all" || p.categoryId === selectedCategory);
    if (!list.length) return [];
    
    // Sort to find Best Selling (highest salesCount)
    const bestSellingProduct = [...list].sort((a, b) => b.salesCount - a.salesCount)[0];
    
    // Sort to find Lowest Price (cheapest price)
    const lowestPriceProduct = [...list].sort((a, b) => a.price - b.price)[0];
    
    // We can also have a premium third option: Best Value (highest rating)
    const bestValueProduct = [...list].sort((a, b) => b.rating - a.rating)[0];
    
    const results = [];
    if (bestSellingProduct) {
      results.push({
        type: "Best Selling",
        bgClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/10",
        p: bestSellingProduct
      });
    }
    if (lowestPriceProduct && lowestPriceProduct.id !== bestSellingProduct?.id) {
      results.push({
        type: "Lowest Price",
        bgClass: "bg-indigo-500/10 text-indigo-650 border-indigo-500/10",
        p: lowestPriceProduct
      });
    } else if (bestValueProduct && bestValueProduct.id !== bestSellingProduct?.id) {
       results.push({
        type: "Best Value",
        bgClass: "bg-amber-500/10 text-amber-655 border-amber-500/10",
        p: bestValueProduct
      });
    }
    return results;
  })();

  return (
    <div className="space-y-4">
      
      {/* 🤝 Top Daraz-Style Trust Header Ticker Line */}
      <div className="bg-slate-950 dark:bg-black text-slate-100 text-[10px] sm:text-xs py-2 px-3 sm:px-4 rounded-xl flex justify-between items-center font-bold tracking-tight shadow-md hover:scale-101 transition-transform relative z-20">
        <span className="flex items-center gap-1">🤝 Safe Payment</span>
        <span className="text-slate-800">|</span>
        <span className="flex items-center gap-1">⚡ Fast Delivery</span>
        <span className="text-slate-800">|</span>
        <span className="flex items-center gap-1">🔄 14-Day Free Return</span>
      </div>

      {/* 🔍 Search and Filters Bar with High Accessibility & Image Search Lens icon */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/[0.05] rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-center justify-between relative z-10 shadow-xs">
        <div className="relative w-full flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-500 animate-pulse" />
            <input
              type="text"
              placeholder="Search Sayed-World products, spices, high outfits..."
              className="w-full text-xs pl-9 pr-12 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200/50 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-950 transition-all font-semibold"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {/* Camera Lens Indicator just like Daraz screenshot */}
            <button 
              onClick={() => alert("📸 Snap & Search activated! Capture your item style to scan in our database.")}
              className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-emerald-500 text-[13px] transition cursor-pointer"
              title="Snap Search by Image"
            >
              📷
            </button>
          </div>
          <button 
            onClick={() => alert(`Showing search filters for "${searchQuery || "All"}"`)}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {/* 🏷️ Top-Tier Circular Custom Category Grid (Stacked Layout: Icon on Top, Name Below) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/[0.05] rounded-2xl p-4 shadow-sm relative z-10">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-500" />
            Browse Premium Categories • ক্যাটাগরি সমূহ
          </h3>
          <span className="text-[10px] text-slate-400 font-medium font-mono">
            {CATEGORIES.length + 1} Channels Active
          </span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-500/10 scrollbar-track-transparent snap-x md:grid md:grid-cols-7 md:gap-3 justify-items-center">
          
          {/* Option 1: All Products */}
          <LiveCategoryCircle
            catId="all"
            name="All Products"
            isActive={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          />

          {/* Dynamic Channels map */}
          {CATEGORIES.map(cat => (
            <LiveCategoryCircle
              key={cat.id}
              catId={cat.id}
              name={cat.name}
              isActive={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* 🚀 1. Sayed-World Bangladesh Campaign Hub */}
      {selectedCategory === "all" && searchQuery === "" && (
        <div className="space-y-4 animate-fade-in relative z-10">

          {/* ⚡ Fire Red Countdown Flash Sale Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/[0.04] p-3.5 rounded-2xl relative overflow-hidden shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-1">
                  ⚡ Flash Sale
                </span>
                
                {/* Fire Red Countdown design from Daraz screenshot */}
                <div className="flex gap-1 items-center font-mono font-black text-xs">
                  <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded text-[10px]">{String(expiryTime.h).padStart(2, "0")}</span>
                  <span className="text-rose-600 font-sans">:</span>
                  <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded text-[10px]">{String(expiryTime.m).padStart(2, "0")}</span>
                  <span className="text-rose-600 font-sans">:</span>
                  <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded text-[10px]">{String(expiryTime.s).padStart(2, "0")}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("clothing");
                  alert("Filtering to high-conversion clothing and outfits Flash category.");
                }}
                className="text-[11px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                Shop More • আরও দেখুন →
              </button>
            </div>
            
            <div className="bg-rose-500/10 border border-rose-500/15 p-2 rounded-xl text-[10.5px] text-rose-600 dark:text-rose-400 font-bold leading-normal">
              ⚡ Global Voucher code applied automatically on orders. Click "Collect Vouchers" above to grab flat reductions!
            </div>
          </div>

          {/* 📱 2. Daraz/Amazon style circles/quick channels layout */}
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 pt-1">
            
            {/* Quick Button 1: Gifts */}
            <div 
              onClick={() => {
                alert("🎁 Congratulations! You opened the Surprising Gifts Box and unlocked Coupon Code 'WELCOME100' or 'SAYED50'!");
              }}
              className="cursor-pointer flex flex-col items-center text-center space-y-1.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/20 transition group"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-550 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-lg">
                🎁
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">Win Free Gifts</span>
            </div>

            {/* Quick Button 2: Use Copilot */}
            <div 
              onClick={() => onSwitchTab("chat")}
              className="cursor-pointer flex flex-col items-center text-center space-y-1.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/20 transition group"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-lg">
                💬
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">Live Support</span>
            </div>

            {/* Quick Button 3: Vouchers Checker */}
            <div 
              onClick={() => {
                const inputEl = document.getElementById("shop-coupon-input-field");
                if (inputEl) inputEl.focus();
                alert("Apply coupons during checkout in the bag drawer!");
              }}
              className="cursor-pointer flex flex-col items-center text-center space-y-1.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/20 transition group"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-lg">
                🎟️
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">Vouchers</span>
            </div>

            {/* Quick Button 4: Low Price bargains */}
            <div 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("spices");
                alert("🌶️ Budget Spices / bargains matching categories selected!");
              }}
              className="cursor-pointer flex flex-col items-center text-center space-y-1.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/20 transition group"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform text-lg">
                🏷️
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">Low Price</span>
            </div>

          </div>

          {/* 📬 3. Quick Promo Coupon Verification Bar */}
          <div className="glass-panel rounded-xl p-3 border border-slate-200/50 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-rose-500/10 text-rose-500 rounded">
                <Tag className="w-4 h-4 text-rose-500" />
              </span>
              <div>
                <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">Verify Active Global Coupons • কুপন চেক করুন</span>
                <span className="hidden sm:block text-[9.5px] text-slate-400 dark:text-slate-500 leading-none">Type SAYED77 or WELCOME100 in cashier for absolute reduction</span>
              </div>
            </div>
            
            <form onSubmit={handleVerifyCoupon} className="flex gap-2 w-full sm:w-auto">
              <input 
                id="shop-promo-code-input"
                type="text" 
                placeholder="PROMO CODE (SAYED77)" 
                className="bg-white/65 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg px-2.5 py-1 text-xs uppercase tracking-wider font-bold w-full sm:w-44 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 dark:text-slate-250"
                value={quickPromoCode}
                onChange={e => setQuickPromoCode(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1 px-3.5 rounded-lg shrink-0 transition cursor-pointer"
              >
                Validate
              </button>
            </form>
          </div>
          {promoMessage && (
            <div className="text-[10.5px] font-bold p-2 bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-white/5 rounded-lg text-slate-705 dark:text-slate-300 animate-fade-in">
              {promoMessage}
            </div>
          )}

          {/* 🛡️ 5. Market Trust Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/40 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-200/40 dark:border-white/5">
            <div className="flex items-center gap-2.5 p-1 rounded-xl">
              <span className="p-2 rounded-lg bg-emerald-500/15 text-emerald-500">
                <Truck className="w-4 h-4 text-emerald-500" />
              </span>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block leading-none">SHIPPING</span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">২৪-৪৮ ঘণ্টার ডেলিভারি</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-1 rounded-xl">
              <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Shield className="w-4 h-4 text-indigo-550" />
              </span>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block leading-none">QUALITY</span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">শতভাগ জেনুইন প্রোডাক্টস</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-1 rounded-xl">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <CreditCard className="w-4 h-4 text-amber-550" />
              </span>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block leading-none">PAYMENT</span>
                <span className="text-[11px] font-bold text-slate-705 dark:text-slate-300">বিকাশ ও রকেট সুরক্ষা</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-1 rounded-xl">
              <span className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <Trophy className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block leading-none">SECURITY</span>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">পেমেন্ট এসক্রো প্রটেকশন</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 🌟 6. New Arrivals, Trending & Best Selling Product Sections */}
      {selectedCategory === "all" && searchQuery === "" && (
        <div className="space-y-6 animate-fade-in relative z-10">
          
          {/* Section 1: New Arrivals Track */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/[0.04] p-4 rounded-2xl relative overflow-hidden shadow-xs space-y-3.5">
            <div className="flex justify-between items-center pb-1 border-b border-slate-100 dark:border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="p-1 px-2 text-[10px] bg-emerald-500/10 text-emerald-500 rounded-md font-black uppercase tracking-wider animate-pulse">
                  NEW
                </span>
                <h4 className="font-display font-black text-xs sm:text-sm text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  New Arrival Products • নতুন আগমন
                </h4>
              </div>
              <button
                onClick={() => alert("Redirecting to all New Arrivals catalog!")}
                className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:opacity-85 flex items-center gap-1 transition cursor-pointer"
              >
                View More <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-1.5 scrollbar-thin snap-x lg:grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
              {newArrivals.map((p) => {
                const pct = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 25;
                return (
                  <div
                    key={`shop-new-carousel-${p.id}`}
                    onClick={() => setSelectedProduct(p)}
                    className="w-40 sm:w-44 lg:w-full shrink-0 snap-center bg-slate-50/50 dark:bg-slate-950/30 border border-slate-100 dark:border-white/[0.03] hover:border-emerald-300 dark:hover:border-emerald-500/30 rounded-xl p-2 cursor-pointer transition-all duration-350 hover:shadow-sm hover:scale-101 group"
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white dark:bg-slate-950 flex items-center justify-center">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xs py-1 text-center font-display font-bold text-[9px] text-white tracking-wide">
                        Only {p.stockCount > 0 ? (p.stockCount > 10 ? p.stockCount - 3 : p.stockCount) : 4} left
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <h5 className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-emerald-505 leading-tight">
                        {p.title}
                      </h5>
                      <div className="flex items-center justify-between text-[9px] text-slate-450 dark:text-slate-550">
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          ★ <span className="font-mono">{p.rating}</span>
                        </span>
                        <span>{p.salesCount || 12} sold</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[13px] sm:text-[14.5px] font-black text-[#f85606] font-mono leading-none">
                          ৳{p.price.toLocaleString()}
                        </span>
                        <span className="bg-[#ff4757]/10 text-[#ff4757] dark:bg-[#ff4757]/20 text-[8.5px] font-black px-1.5 py-0.5 rounded-sm shrink-0">
                          -{pct}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Trending Collection Track */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/[0.04] p-4 rounded-2xl relative overflow-hidden shadow-xs space-y-3.5">
            <div className="flex justify-between items-center pb-1 border-b border-slate-100 dark:border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="p-1 px-2 text-[10px] bg-red-500/10 text-red-500 rounded-md font-black uppercase tracking-wider animate-pulse">
                  HOT
                </span>
                <h4 className="font-display font-black text-xs sm:text-sm text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                  Trending Products • জনপ্রিয় পণ্য
                </h4>
              </div>
              <button
                onClick={() => alert("Redirecting to all Trending Products catalog!")}
                className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:opacity-85 flex items-center gap-1 transition cursor-pointer"
              >
                View More <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-1.5 scrollbar-thin snap-x lg:grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
              {trendingProducts.map((p) => {
                const pct = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 30;
                return (
                  <div
                    key={`shop-trend-carousel-${p.id}`}
                    onClick={() => setSelectedProduct(p)}
                    className="w-40 sm:w-44 lg:w-full shrink-0 snap-center bg-slate-50/50 dark:bg-slate-950/30 border border-slate-100 dark:border-white/[0.03] hover:border-emerald-300 dark:hover:border-emerald-500/30 rounded-xl p-2 cursor-pointer transition-all duration-350 hover:shadow-sm hover:scale-101 group"
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white dark:bg-slate-950 flex items-center justify-center">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xs py-1 text-center font-display font-bold text-[9px] text-white tracking-wide">
                        Only {p.stockCount > 0 ? (p.stockCount > 8 ? p.stockCount - 3 : p.stockCount) : 3} left
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <h5 className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-emerald-605 leading-tight">
                        {p.title}
                      </h5>
                      <div className="flex items-center justify-between text-[9px] text-slate-450 dark:text-slate-550">
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          ★ <span className="font-mono">{p.rating}</span>
                        </span>
                        <span>{p.salesCount || 105} sold</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[13px] sm:text-[14.5px] font-black text-[#f85606] font-mono leading-none">
                          ৳{p.price.toLocaleString()}
                        </span>
                        <span className="bg-[#ff4757]/10 text-[#ff4757] dark:bg-[#ff4757]/20 text-[8.5px] font-black px-1.5 py-0.5 rounded-sm shrink-0">
                          -{pct}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Best Sellers Track */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/[0.04] p-4 rounded-2xl relative overflow-hidden shadow-xs space-y-3.5">
            <div className="flex justify-between items-center pb-1 border-b border-slate-100 dark:border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="p-1 px-2 text-[10px] bg-amber-550/10 text-amber-500 rounded-md font-black uppercase tracking-wider animate-pulse">
                  BEST
                </span>
                <h4 className="font-display font-black text-xs sm:text-sm text-slate-800 dark:text-slate-100 uppercase tracking-tight flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Best Selling Products • সেরা বিক্রীত পণ্য
                </h4>
              </div>
              <button
                onClick={() => alert("Redirecting to all Best Sellers catalog!")}
                className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:opacity-85 flex items-center gap-1 transition cursor-pointer"
              >
                View More <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex gap-3.5 overflow-x-auto pb-1.5 scrollbar-thin snap-x lg:grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
              {bestSellers.map((p) => {
                const pct = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 31;
                return (
                  <div
                    key={`shop-bestsell-carousel-${p.id}`}
                    onClick={() => setSelectedProduct(p)}
                    className="w-40 sm:w-44 lg:w-full shrink-0 snap-center bg-slate-50/50 dark:bg-slate-950/30 border border-slate-100 dark:border-white/[0.03] hover:border-emerald-300 dark:hover:border-emerald-500/30 rounded-xl p-2 cursor-pointer transition-all duration-350 hover:shadow-sm hover:scale-101 group"
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-white dark:bg-slate-950 flex items-center justify-center">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xs py-1 text-center font-display font-bold text-[9px] text-white tracking-wide">
                        Only {p.stockCount > 0 ? (p.stockCount > 5 ? p.stockCount - 2 : p.stockCount) : 2} left
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <h5 className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-emerald-605 leading-tight">
                        {p.title}
                      </h5>
                      <div className="flex items-center justify-between text-[9px] text-slate-450 dark:text-slate-550">
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          ★ <span className="font-mono">{p.rating}</span>
                        </span>
                        <span>{p.salesCount || 184} sold</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[13px] sm:text-[14.5px] font-black text-[#f85606] font-mono leading-none">
                          ৳{p.price.toLocaleString()}
                        </span>
                        <span className="bg-[#ff4757]/10 text-[#ff4757] dark:bg-[#ff4757]/20 text-[8.5px] font-black px-1.5 py-0.5 rounded-sm shrink-0">
                          -{pct}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-5 border-b border-slate-150 dark:border-white/[0.05] pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/10 text-emerald-600 p-1.5 rounded-xl">
            <ShoppingBag className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-display font-extrabold text-[12px] text-slate-800 dark:text-white uppercase tracking-tight">
              {(() => {
                if (searchQuery) return `Search Results for "${searchQuery}"`;
                if (selectedCategory === "all") return "All Catalogue Items • সকল প্রোডাক্টস";
                const catObj = CATEGORIES.find(c => c.id === selectedCategory);
                return catObj ? `${catObj.name} Channel` : "Selected Channel";
              })()}
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold font-mono">
              {filteredProducts.length} Premium items matched
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          {/* Active Price Bounds Indicator badge */}
          {(minPrice || maxPrice) && (
            <button
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setSelectedPriceRangeId("");
              }}
              className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition-all"
              title="Click to reset price filter"
            >
              <span>৳{minPrice || "0"} - ৳{maxPrice || "Max"}</span>
              <X className="w-2.5 h-2.5 stroke-[3px]" />
            </button>
          )}

          {/* 🎯 Video 1 Filters Button */}
          <button
            onClick={() => setShowFiltersDrawer(true)}
            className="bg-emerald-605/10 hover:bg-emerald-600 dark:bg-emerald-500/10 hover:text-white text-emerald-600 dark:text-emerald-400 text-xs font-bold py-1.5 px-3.5 rounded-xl flex items-center gap-2 border border-emerald-500/20 transition cursor-pointer active:scale-95 shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* 🤖 ✨ AI SUGGESTION CODES ROW (Video 1 Setup) */}
      {activeSuggestProducts.length > 0 && (
        <div className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-150/60 dark:border-white/[0.04] p-4 rounded-2xl shadow-xs space-y-3 relative z-10 transition-all">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-205/50 dark:border-white/[0.05]">
            <div className="flex items-center gap-2">
              <span className="p-1 px-2 text-[9px] bg-emerald-500/10 text-emerald-600 rounded-lg font-black tracking-wider flex items-center gap-1 uppercase">
                <Sparkles className="w-2.5 h-2.5 text-emerald-500 animate-pulse" />
                AI Suggest • এআই সাজেশন
              </span>
              <p className="text-[10px] text-slate-400 font-semibold hidden sm:inline-block">Special top-selling or budget-friendly picks in this pool</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {activeSuggestProducts.map((suggest) => {
              const p = suggest.p;
              const formattedSales = p.salesCount >= 1000 ? `${(p.salesCount / 1000).toFixed(1)}K` : p.salesCount;
              return (
                <div
                  key={`ai-suggest-card-${suggest.type}-${p.id}`}
                  onClick={() => setSelectedProduct(p)}
                  className="bg-white dark:bg-slate-900 hover:border-emerald-505/30 border border-slate-200/50 dark:border-white/[0.03] p-3 rounded-2xl cursor-pointer transition flex gap-3.5 items-center relative group overflow-hidden shadow-2xs hover:shadow-xs"
                >
                  {/* Category Type Badge */}
                  <span className={`absolute top-2 right-2 text-[8.5px] font-black px-2 py-0.5 rounded-full uppercase border ${suggest.bgClass}`}>
                    {suggest.type}
                  </span>

                  {/* Left Side: Thumbnail with animation */}
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950/70 rounded-xl overflow-hidden border border-slate-100 dark:border-white/[0.05] shrink-0 flex items-center justify-center relative">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Right Side: Title + Price + Sales */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h5 className="text-[11px] sm:text-[11.5px] font-extrabold text-slate-800 dark:text-slate-150 line-clamp-1 group-hover:text-emerald-500 transition-colors leading-tight">
                      {p.title}
                    </h5>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-[#f85606] font-mono leading-none">
                        ৳{p.price.toLocaleString()}
                      </span>
                      {p.oldPrice && (
                        <span className="text-[9.5px] text-slate-400 line-through font-mono">
                          ৳{p.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[9.5px] font-bold font-sans text-slate-400 dark:text-slate-500">
                        {formattedSales} Sold
                      </span>
                      {/* Styled Progress meter representing stock or popularity as in screenshot */}
                      <div className="w-24 bg-slate-200 dark:bg-slate-805 h-1.5 rounded-full overflow-hidden shrink-0 hidden sm:block">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: p.price < 1000 ? "85%" : "45%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Catalog Grid with a gorgeous responsive Amazon/Daraz 2-column mobile layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {filteredProducts.map(product => {
          // Find associated store details
          const store = VENDOR_STORES.find(s => s.id === product.vendorStoreId);
          const percentDiscount = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
            : null;

          return (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative"
            >
              {/* Product Card Image Box */}
              <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-950/45">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition duration-300"
                />
                
                {/* Percent Discount Badge */}
                {percentDiscount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white font-sans text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md shadow-sm">
                    {percentDiscount}% OFF
                  </span>
                )}

                {/* Free Shipping Tag simulation like Daraz */}
                {product.price > 1200 && (
                  <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md tracking-wider flex items-center gap-0.5 shadow-sm">
                    FREE
                  </span>
                )}

                {store && (
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[8.5px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                    🏬 {store.storeName.replace(" Store", "")}
                  </span>
                )}
              </div>

              {/* Card Meta Content section - optimized dense margins */}
              <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-150 text-[11.5px] sm:text-xs leading-tight tracking-tight line-clamp-2 h-8 sm:h-9 text-ellipsis overflow-hidden group-hover:text-emerald-650 transition-colors">
                      {product.title}
                    </h3>
                  </div>
                  
                  {/* Rating + Sold info bar */}
                  <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] text-slate-455 dark:text-slate-500 font-medium">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-current mr-0.5" />
                      <span className="font-bold">{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{product.salesCount} sold</span>
                  </div>
                </div>

                {/* Pricing and Action click buttons */}
                <div className="flex items-end justify-between pt-1.5 border-t border-slate-100 dark:border-white/[0.04]">
                  <div>
                    {product.oldPrice && (
                      <span className="text-[10px] text-slate-400 line-through block leading-none mb-0.5">৳{product.oldPrice}</span>
                    )}
                    <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">৳{product.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[10.5px] font-bold py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-lg shadow-xs hover:shadow-md transition-all whitespace-nowrap cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 text-sm">
            No products match selected search or category filters.
          </div>
        )}
      </div>

      {/* Multi-Vendor Cart side drawer */}
      {cartOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full flex flex-col justify-between shadow-2xl relative">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                Shopping Checkout Cart
              </h3>
              <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart body lists grouped on Merchant store values */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Your cart is currently empty. Shop items to populate details.
                </div>
              ) : (
                Object.entries(
                  cart.reduce((groups, item) => {
                    const storeId = item.product.vendorStoreId;
                    const name = VENDOR_STORES.find(s => s.id === storeId)?.storeName || "Global Merchant";
                    if (!groups[name]) groups[name] = [];
                    groups[name].push(item);
                    return groups;
                  }, {} as Record<string, CartItem[]>)
                ).map(([storeName, items]) => (
                  <div key={storeName} className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 space-y-3 bg-slate-50/50 dark:bg-slate-950/20">
                    <div className="font-display font-semibold text-[11px] text-slate-500 uppercase tracking-wider pb-1.5 border-b border-slate-200/55 dark:border-slate-800/55">
                      Store Group: <span className="text-emerald-600 dark:text-emerald-400">{storeName}</span>
                    </div>

                    {items.map(item => (
                      <div key={item.id} className="flex gap-3 text-xs items-center justify-between">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.title} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 dark:text-slate-200 truncate pr-2">{item.product.title}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ৳{item.product.price} {item.selectedColor ? `| ${item.selectedColor}` : ""}
                          </span>
                        </div>

                        {/* Qty increment counters */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button 
                            onClick={() => updateCartQty(item.id, Math.max(1, item.quantity - 1))}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQty(item.id, Math.min(10, item.quantity + 1))}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 flex items-center justify-center text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-rose-500 hover:text-rose-700 ml-1 shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Cart footer calculations and checkout activations */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3.5">
              
              {/* Promo input field */}
              {cartSubtotal > 0 && (
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (SAYED50 / WELCOME100)"
                      className="flex-1 py-1.5 px-3 bg-white dark:bg-slate-800 text-[11px] uppercase border border-slate-200 dark:border-slate-700 rounded focus:outline-none"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-slate-800 text-white font-semibold text-[10px] px-3 py-1.5 rounded"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && <span className="text-[10px] text-emerald-500 font-semibold">{couponApplied} applied!</span>}
                  {promoError && <span className="text-[10px] text-rose-500 font-medium">{promoError}</span>}
                </div>
              )}

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-mono">৳{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Calculated Shipping</span>
                  <span className="font-mono">৳{shippingCharge}</span>
                </div>
                {discountValue > 0 && (
                  <div className="flex justify-between text-emerald-550">
                    <span>Discount Deduction</span>
                    <span className="font-mono">-৳{discountValue}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold text-slate-800 dark:text-slate-150 pt-2 border-t border-slate-250 dark:border-slate-800 ">
                  <span>Grand total (BDT)</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">৳{grandTotal}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => setCheckoutStep("shipping")}
                className="w-full bg-emerald-600 hover:bg-emerald-705 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white text-xs font-semibold py-2.5 rounded-lg text-center font-sans tracking-wide cursor-pointer active:scale-95 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main product presentation details modal (Fulfilling Video 2 & Video 3 specifications) */}
      {selectedProduct && (() => {
        // Local state or calculation for active image swapping
        const availableColors = selectedProduct.variants 
          ? Array.from(new Set(selectedProduct.variants.filter(v => v.color).map(v => v.color))) 
          : [];
        
        // Find which image index maps to selected variant color
        let activeImgIndex = 0;
        if (chosenColor) {
          if (chosenColor.toLowerCase().includes("black") && selectedProduct.images[1]) {
            activeImgIndex = 1;
          } else if (chosenColor.toLowerCase().includes("pink") && selectedProduct.images[2]) {
            activeImgIndex = 2;
          } else if (chosenColor.toLowerCase().includes("wine") && selectedProduct.images[3]) {
            activeImgIndex = 3;
          } else if (chosenColor.toLowerCase().includes("brown") && selectedProduct.images[1]) {
            activeImgIndex = 1;
          } else if (chosenColor.toLowerCase().includes("slipper") && selectedProduct.images[2]) {
            activeImgIndex = 2;
          }
        }
        
        const activeMainImage = selectedProduct.images[activeImgIndex] || selectedProduct.images[0];
        
        // Count total item units and cost in the interactive sizes table
        const totalVariantQtySelected = Object.values(variantQuantities).reduce((a, b) => a + b, 0);
        const calculatedVariantsPriceVal = selectedProduct.price * Math.max(1, totalVariantQtySelected);

        const handleShareLink = () => {
          const fakeUrl = `https://sayed.world/product/${selectedProduct.id}`;
          navigator.clipboard.writeText(fakeUrl);
          alert(`🔗 Product link copied to clipboard!\nShare: ${fakeUrl}`);
        };

        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-205 dark:border-white/10 relative max-h-[92vh] flex flex-col animate-fade-in">
              {/* Close Button */}
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setVariantQuantities({});
                }} 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 dark:hover:text-white z-50 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 p-2 rounded-full border border-slate-200 dark:border-white/5 transition"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 p-6 sm:p-8">
                  
                  {/* LHS: Enhanced Image Gallery with Video play Thumbnail and zoom lightbox triggers */}
                  <div className="space-y-4">
                    
                    {/* Active Hero Image with Tap to Zoom Icon badge */}
                    <div className="relative aspect-square bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/5 group">
                      <img 
                        src={activeMainImage} 
                        alt={selectedProduct.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-101 transition duration-500 cursor-zoom-in" 
                        onClick={() => setSelectedZoomImage(activeMainImage)}
                        title="Click to zoom in full screen"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md rounded-lg py-1 px-2.5 text-[9px] text-white font-extrabold flex items-center gap-1">
                        🔍 Tap to Zoom
                      </div>
                      
                      {/* Interactive countdown label */}
                      <div className="absolute bottom-0 left-0 right-0 bg-rose-600/90 py-1.5 text-center font-display font-black text-[10px] text-white tracking-widest uppercase flex items-center justify-center gap-2">
                        <Flame className="w-3.5 h-3.5 fill-white" />
                        FLASH DEAL OFFER CLOSING SOON!
                      </div>
                    </div>

                    {/* Gallery Carousel & First Video play button overlay */}
                    <div className="grid grid-cols-4 gap-2.5">
                      {selectedProduct.images.map((img, idx) => {
                        const isVideoThumbnail = idx === 0;
                        return (
                          <div 
                            key={`thumb-${idx}`}
                            className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 cursor-pointer group"
                            onClick={() => {
                              if (isVideoThumbnail && selectedProduct.id.includes("shirt")) {
                                setVideoModalOpen(true);
                              } else {
                                // Simulate switching
                                setChosenColor("");
                              }
                            }}
                          >
                            <img 
                              src={img} 
                              alt="thumbnail" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:brightness-90 transition" 
                            />
                            {isVideoThumbnail && (
                              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white font-black text-[9px] gap-1">
                                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs animate-bounce">
                                  ▶
                                </div>
                                <span className="uppercase text-[8px] tracking-wide">Play Video</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Interactive Social Media Share options */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Share with friends:</span>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={handleShareLink}
                          className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 text-slate-600 dark:text-slate-350 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border border-slate-200 dark:border-white/5"
                        >
                          <Share2 className="w-3 h-3" /> Copy Link
                        </button>
                        <button 
                          onClick={() => alert(`Redirecting simulation to Facebook share for: ${selectedProduct.title}`)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5"
                        >
                          Facebook
                        </button>
                        <button 
                          onClick={() => alert(`Opening WhatsApp group messaging to share deal!`)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5"
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RHS Details inputs & Interactive Sizes list table & Shipping preference */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <h3 className="font-display font-black text-base text-slate-800 dark:text-slate-100 tracking-tight leading-snug">
                        {selectedProduct.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="bg-amber-500/10 text-amber-550 dark:text-amber-400 py-1 px-2 rounded-lg font-extrabold text-[10px] flex items-center gap-1">
                          ★ <span className="font-mono">{selectedProduct.rating} Score</span>
                        </span>
                        <span className="bg-emerald-500/10 text-emerald-600 py-1 px-2 rounded-lg font-extrabold text-[10px]">
                          {(selectedProduct.salesCount || 154).toLocaleString()} SOLD
                        </span>
                        <span className="bg-rose-500/10 text-rose-605 py-1 px-2 rounded-lg font-extrabold text-[10px] uppercase">
                          ● {selectedProduct.stockCount > 0 ? "In Stock" : "Limited"}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                      {selectedProduct.description}
                    </p>

                    {/* 🎨 Interactive Color selection - swaps active image */}
                    {availableColors.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                          Color Options • কালার নির্বাচন করুন:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {availableColors.map((color, index) => (
                            <button
                              key={`swatch-${color}`}
                              onClick={() => setChosenColor(color)}
                              className={`px-3 py-1.5 rounded-xl text-[10.5px] font-extrabold transition border ${
                                chosenColor === color || (index === 0 && !chosenColor)
                                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                  : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/20 text-slate-655 dark:text-slate-350 border-transparent hover:border-slate-200 dark:hover:border-white/5"
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 📏 Video 2 00:21 style: Tabular Interactive Sizes with Direct Qty Increments */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                          Select Sizes & Quantities • সাইজ নির্বাচন করুন:
                        </span>
                        <span className="text-[9px] text-emerald-500 font-bold">(Choose multiples directly)</span>
                      </div>
                      
                      <div className="border border-slate-150 dark:border-white/10 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-white/5">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-950/40 p-2.5 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                          <span>Size Specification</span>
                          <span className="text-center">Bangladesh Price</span>
                          <span className="text-right">Selected Quantity</span>
                        </div>

                        {/* Iterate sizes */}
                        {(selectedProduct.id.includes("shirt") ? ["S", "M", "L", "XL"] : selectedProduct.id.includes("derby") ? ["39", "40", "41", "42"] : ["Standard Size"]).map((size) => {
                          const currentQty = variantQuantities[size] || 0;
                          return (
                            <div 
                              key={`size-row-${size}`}
                              className="grid grid-cols-3 p-2.5 items-center bg-white dark:bg-slate-900 group hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition"
                            >
                              <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300">
                                Size {size}
                              </span>
                              
                              <span className="text-center font-bold text-slate-800 dark:text-slate-205 font-mono">
                                ৳{selectedProduct.price}
                              </span>

                              <div className="flex justify-end">
                                {currentQty > 0 ? (
                                  <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 rounded-lg p-1 border border-emerald-500/10">
                                    <button
                                      onClick={() => setVariantQuantities({
                                        ...variantQuantities,
                                        [size]: Math.max(0, currentQty - 1)
                                      })}
                                      className="w-5 h-5 flex items-center justify-center font-bold hover:bg-emerald-500/20 rounded cursor-pointer"
                                    >
                                      -
                                    </button>
                                    <span className="font-bold text-xs font-mono min-w-4 text-center">
                                      {currentQty}
                                    </span>
                                    <button
                                      onClick={() => setVariantQuantities({
                                        ...variantQuantities,
                                        [size]: currentQty + 1
                                      })}
                                      className="w-5 h-5 flex items-center justify-center font-bold hover:bg-emerald-500/20 rounded cursor-pointer"
                                    >
                                      +
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setVariantQuantities({
                                        ...variantQuantities,
                                        [size]: 1
                                      });
                                      setChosenSize(size);
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold py-1 px-3.5 rounded-lg text-[10px] uppercase transition cursor-pointer"
                                  >
                                    + ADD
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 🚢 Video 3 style: Priority Shipping Logistics Options */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                        Import/Shipping Mode Preference • শিপিং মাধ্যম:
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          onClick={() => setShippingPreference("air")}
                          className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-2.5 ${
                            shippingPreference === "air"
                              ? "bg-emerald-500/5 text-emerald-600 border-emerald-500"
                              : "bg-slate-50 dark:bg-slate-950/20 text-slate-650 dark:text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-white/5"
                          }`}
                        >
                          <div className="text-lg">✈️</div>
                          <div className="min-w-0">
                            <h6 className="font-extrabold text-[11px] leading-tight">Priority Air Cargo</h6>
                            <span className="text-[9px] text-slate-400 font-bold block mt-0.5">3-5 days • Rec. ৳750/Kg</span>
                          </div>
                        </div>

                        <div
                          onClick={() => setShippingPreference("sea")}
                          className={`p-3 rounded-2xl border cursor-pointer transition flex items-start gap-2.5 ${
                            shippingPreference === "sea"
                              ? "bg-emerald-500/5 text-emerald-600 border-emerald-500"
                              : "bg-slate-50 dark:bg-slate-950/20 text-slate-650 dark:text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-white/5"
                          }`}
                        >
                          <div className="text-lg">🚢</div>
                          <div className="min-w-0">
                            <h6 className="font-extrabold text-[11px] leading-tight">Sea Bulk Saver</h6>
                            <span className="text-[9px] text-slate-400 font-bold block mt-0.5">14-20 days • Rec. ৳170/Kg</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specifications Section */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Specifications:</span>
                      <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                        {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                          <div key={key} className="bg-slate-50 dark:bg-slate-950/50 p-2 rounded-xl border border-slate-200/50 dark:border-white/5">
                            <span className="text-slate-400 block uppercase font-bold">{key}</span>
                            <span className="font-extrabold text-slate-700 dark:text-slate-300 block mt-0.5">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Actions Bar */}
                    <div className="flex items-center justify-between pt-5 border-t border-slate-155 dark:border-white/10 shrink-0">
                      <div className="font-mono">
                        <span className="text-[9px] font-extrabold text-slate-400 block uppercase leading-none mb-1">Total Payable:</span>
                        <span className="text-lg font-black text-[#f85606]">
                          ৳{calculatedVariantsPriceVal.toLocaleString()}
                        </span>
                        {selectedProduct.oldPrice && (
                          <span className="text-[10px] text-slate-450 line-through ml-2 font-bold">
                            ৳{(selectedProduct.oldPrice * Math.max(1, totalVariantQtySelected)).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          const itemsConfigured = Object.entries(variantQuantities).filter(([_, qty]) => qty > 0);
                          const activeColorName = chosenColor || (selectedProduct.variants?.[0]?.color) || "Standard Style";

                          if (itemsConfigured.length > 0) {
                            // Add each specific size with their quantity
                            itemsConfigured.forEach(([sz, qty]) => {
                              for (let i = 0; i < qty; i++) {
                                addToCart(selectedProduct, activeColorName, sz);
                              }
                            });
                            alert(`🎉 Added ${totalVariantQtySelected} size variant(s) of "${selectedProduct.title}" to card basket!`);
                          } else {
                            // Fallback default add
                            const activeSizeName = chosenSize || "M";
                            addToCart(selectedProduct, activeColorName, activeSizeName);
                            alert(`🎉 Added default size "${activeSizeName}" of "${selectedProduct.title}" to card basket!`);
                          }

                          setSelectedProduct(null);
                          setVariantQuantities({});
                          setCartOpen(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-6 rounded-2xl flex items-center gap-2 hover:shadow-lg transition cursor-pointer active:scale-95 text-xs uppercase shadow-md"
                      >
                        <ShoppingBag className="w-4 h-4" /> 
                        <span>Add To Basket Basket</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            
            {/* 🍿 Simulated Interactive Video Player Modal popup (Video 2 Setup) */}
            {videoModalOpen && (
              <div className="fixed inset-0 bg-black/90 z-60 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                  <button 
                    onClick={() => setVideoModalOpen(false)}
                    className="absolute top-3 right-3 bg-black/60 text-white hover:text-rose-500 p-2 rounded-full cursor-pointer z-10 font-black"
                  >
                    ✕ CLOSE
                  </button>
                  
                  <div className="aspect-video bg-black flex flex-col items-center justify-center relative">
                    {/* Simulated live video stream UI */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-rose-650 text-white font-bold text-[9px] px-2 py-0.5 rounded-full animate-pulse uppercase">
                      ● Stream Live Outfits
                    </div>
                    <div className="text-center space-y-3 p-6 text-slate-300">
                      <div className="w-16 h-16 rounded-full bg-emerald-605/10 border-2 border-emerald-500 text-emerald-500 text-xl flex items-center justify-center mx-auto animate-ping">
                        👔
                      </div>
                      <h4 className="font-extrabold text-sm text-white">Outfit Presentation: Smart Anti-wrinkle Custom Fabric Test</h4>
                      <p className="text-[10.5px] max-w-xs mx-auto text-slate-400">Authentic materials showcase demonstrating resilience to folding, color brilliance under sunlight, and premium custom stitches.</p>
                      
                      {/* Video Progress Bar Controls */}
                      <div className="w-72 bg-slate-700 h-1 rounded-full overflow-hidden mx-auto pt-0.5">
                        <div className="bg-emerald-500 h-full w-2/3" />
                      </div>
                      <span className="text-[9px] text-slate-500 block font-mono">0:21 / 0:45 • High Quality stream (1080p)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 🔍 Zoom Lightbox Image detail overlay (Video 2 Setup) */}
            {selectedZoomImage && (
              <div className="fixed inset-0 bg-black/95 z-60 flex flex-col items-center justify-center p-4">
                <button 
                  onClick={() => setSelectedZoomImage(null)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full cursor-pointer z-10 font-bold"
                >
                  ✕ Close Zoom
                </button>
                <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-3xl bg-slate-900">
                  <img 
                    src={selectedZoomImage} 
                    alt="Lightbox zoom detail" 
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[85vh] object-contain cursor-zoom-out"
                    onClick={() => setSelectedZoomImage(null)}
                  />
                </div>
                <p className="text-white/40 text-[10px] tracking-widest uppercase mt-4">Extreme High Resolution Zoom View • Tap outer container to exit</p>
              </div>
            )}

          </div>
        );
      })()}

      {/* Dynamic Checkout Dialog wrapper */}
      {checkoutStep !== "none" && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-55 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                {checkoutStep === "shipping" && "Step 1: Local Shipping Address Information"}
                {checkoutStep === "gateway" && "Step 2: Automated payment verification Portal"}
                {checkoutStep === "receipt" && "Order Booked & Logged Successfully!"}
              </h3>
              {checkoutStep !== "receipt" && (
                <button onClick={() => setCheckoutStep("none")} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* STEP 1: District geo form inputs */}
            {checkoutStep === "shipping" && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-450 mb-1">FullName</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded"
                      value={shippingForm.name}
                      onChange={e => setShippingForm({...shippingForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-450 mb-1">Phone String</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded"
                      value={shippingForm.phone}
                      onChange={e => setShippingForm({...shippingForm, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 font-mono text-[10px]">
                  <div>
                    <label className="block text-slate-450 mb-1">Division</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded focus:outline-none"
                      value={shippingForm.division}
                      onChange={e => setShippingForm({...shippingForm, division: e.target.value})}
                    >
                      <option>Dhaka Division</option>
                      <option>Sylhet Division</option>
                      <option>Chittagong Division</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-450 mb-1">District</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded focus:outline-none"
                      value={shippingForm.district}
                      onChange={e => setShippingForm({...shippingForm, district: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-450 mb-1">Upazila-Area</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded focus:outline-none"
                      value={shippingForm.upazila}
                      onChange={e => setShippingForm({...shippingForm, upazila: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-450 mb-1">Detailed physical home address</label>
                  <textarea 
                    rows={2}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded"
                    value={shippingForm.fullAddress}
                    onChange={e => setShippingForm({...shippingForm, fullAddress: e.target.value})}
                  />
                </div>

                <div>
                  <span className="block text-slate-450 mb-2">Checkout Method</span>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold">
                    {[
                      { id: "bKash", label: "bKash REDIRECT (MFS APIS)" },
                      { id: "SSLCommerz", label: "SSLCommerz secure gateway" },
                      { id: "COD", label: "Cash On Delivery (COD)" }
                    ].map(x => (
                      <button
                        type="button"
                        key={x.id}
                        onClick={() => setShippingForm({...shippingForm, method: x.id as any})}
                        className={`p-2.5 rounded border transition-all ${
                          shippingForm.method === x.id 
                            ? "bg-emerald-600 text-white border-emerald-600" 
                            : "bg-slate-50 dark:bg-slate-950 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {x.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded border border-slate-150 dark:border-slate-900 border-dashed space-y-1.5">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span>Item Value:</span>
                    <span>৳{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px]">
                    <span>Regional Freight Cost ({shippingForm.division}):</span>
                    <span>৳{shippingCharge}</span>
                  </div>
                  <div className="flex justify-between font-mono font-bold text-xs text-slate-800 dark:text-slate-200 pt-1 border-t border-slate-200">
                    <span>Platform Payable Amount:</span>
                    <span className="text-emerald-600">৳{grandTotal}</span>
                  </div>
                  <div className="flex justify-between font-medium text-[10px] text-indigo-650 dark:text-indigo-400 pt-1.5 border-t border-slate-200/50">
                    <span className="flex items-center gap-1">💳 Simulated Account Balance:</span>
                    <span className="font-bold">৳{currentUser?.walletBalance?.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckoutSubmit}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-center"
                >
                  Initiate Secure API Payment Session
                </button>
              </div>
            )}

            {/* STEP 2: Simulated portal load */}
            {checkoutStep === "gateway" && (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto animate-pulse">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-display font-semibold text-slate-850 dark:text-slate-100">Simulating payment gateway endpoints...</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Sayed-World would now handshake client requests with {shippingForm.method === "bKash" ? "bKash pay-partner servers" : "SSLCommerz Sandbox API clusters"}.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-4 border rounded-xl max-w-xs mx-auto text-left space-y-1 font-mono text-[11px] text-slate-500">
                  <div>• TRANSACTION: SECURE_SIGN_RSA_256</div>
                  <div>• PAYABLE TOTAL: ৳{grandTotal} BDT</div>
                  <div>• REDIRECT PORT: sandbox-sslcommerz.com.bd</div>
                  <div>• MERCH ID: SAYED_WORLD_API_603</div>
                </div>

                <div className="flex gap-2 justify-center pt-2 max-w-xs mx-auto">
                  <button
                    onClick={() => setCheckoutStep("shipping")}
                    className="flex-1 py-2 rounded bg-slate-100 text-slate-600 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCompletePayment}
                    className="flex-1 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow"
                  >
                    Approve Payment (Simulated)
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Order completed & invoice printable template */}
            {checkoutStep === "receipt" && bookingResponse && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="font-display font-bold text-slate-800 dark:text-slate-100">Checkout Complete! Order Recorded.</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Gateway Transaction: {bookingResponse.id}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 border border-dashed rounded-xl p-4 text-xs space-y-2.5">
                  <div className="flex justify-between border-b pb-1.5 border-dashed font-mono">
                    <span className="text-slate-450 uppercase text-[10px]">Courier Booker Status</span>
                    <span className="text-emerald-600 font-bold uppercase">{bookingResponse.deliveryStatus}</span>
                  </div>

                  <div className="font-mono text-[10px] space-y-1 text-slate-650">
                    <div className="flex justify-between">
                      <span>Logistics Shipper:</span>
                      <span className="font-semibold">{bookingResponse.courierName} Service</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consignment ID:</span>
                      <span className="font-semibold text-slate-900 dark:text-white underline">{bookingResponse.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery estimation:</span>
                      <span className="font-semibold text-emerald-500">3-4 business days (Dhaka local)</span>
                    </div>
                  </div>

                  <div className="border-t pt-2 space-y-1">
                    <span className="font-semibold block text-[10px] text-slate-400 uppercase">Shipping Recipient Address:</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-450 font-mono leading-snug">
                      {bookingResponse.shippingAddress.phone} | {bookingResponse.customerName} <br />
                      {bookingResponse.shippingAddress.area}, {bookingResponse.shippingAddress.upazila}, {bookingResponse.shippingAddress.district}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Trigger mock printable window
                      alert(`Mocking invoice print PDF generation triggers! File: sayed_world_invoice_${bookingResponse.id}.pdf`);
                    }}
                    className="flex-1 border text-slate-600 hover:bg-slate-50 font-semibold py-2 rounded text-xs"
                  >
                    Download PDF Receipt
                  </button>
                  <button
                    onClick={() => setCheckoutStep("none")}
                    className="flex-1 bg-slate-900 text-white font-semibold py-2 rounded-lg text-center text-xs"
                  >
                    Back to Marketplace
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔮 FILTER SIDEWAY DRAWER (Video 1 Setup) */}
      {showFiltersDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop screen overlay */}
          <div 
            onClick={() => setShowFiltersDrawer(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
          />
          
          {/* Slider content body */}
          <div className="w-80 max-w-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-white/10 h-full flex flex-col justify-between shadow-2xl relative z-50 p-5 space-y-6 animate-fade-in">
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/10 pb-3 mb-4">
                <h3 className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                  Filter Options • ফিল্টার সমূহ
                </h3>
                <button 
                  onClick={() => setShowFiltersDrawer(false)}
                  className="text-slate-400 hover:text-slate-650 dark:hover:text-white cursor-pointer p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Custom Min / Max Price inputs */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Custom price range (৳)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-bold">Min</label>
                      <input
                        type="number"
                        placeholder="e.g. 50"
                        value={minPrice}
                        onChange={(e) => {
                          setMinPrice(e.target.value);
                          setSelectedPriceRangeId(""); // reset range selection if custom typed
                        }}
                        className="w-full text-xs font-semibold p-2.5 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 rounded-xl text-slate-805 dark:text-slate-100 focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-bold">Max</label>
                      <input
                        type="number"
                        placeholder="e.g. 5000"
                        value={maxPrice}
                        onChange={(e) => {
                          setMaxPrice(e.target.value);
                          setSelectedPriceRangeId(""); // reset range selection if custom typed
                        }}
                        className="w-full text-xs font-semibold p-2.5 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 rounded-xl text-slate-805 dark:text-slate-100 focus:outline-none focus:ring-1.5 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Presets Price range checklist with TAKA logo */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Recommended Ranges</span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {PRICE_RANGES.map((range) => {
                      const isSelected = selectedPriceRangeId === range.id;
                      return (
                        <button
                          key={range.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedPriceRangeId("");
                              setMinPrice("");
                              setMaxPrice("");
                            } else {
                              setSelectedPriceRangeId(range.id);
                              setMinPrice(String(range.min));
                              setMaxPrice(String(range.max));
                            }
                          }}
                          className={`w-full text-left text-[11px] font-extrabold p-3 border rounded-xl flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-405 border-emerald-500"
                              : "bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-950/20 text-slate-650 dark:text-slate-350 border-transparent hover:border-slate-200 dark:hover:border-white/5"
                          }`}
                        >
                          <span className="font-mono">{range.label}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 dark:border-slate-705 bg-white dark:bg-slate-900"
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[4px]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action bottoms to reset filters */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex gap-2 shrink-0">
              <button
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  setSelectedPriceRangeId("");
                  setShowFiltersDrawer(false);
                }}
                className="w-full text-xs font-bold font-sans py-2.5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-305 transition cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFiltersDrawer(false)}
                className="w-full text-xs font-extrabold font-sans py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
