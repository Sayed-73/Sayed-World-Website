import React, { useState, useEffect } from "react";
import { Product, CartItem, Coupon, Category, Brand, User } from "../types";
import { PRODUCTS, CATEGORIES, BRANDS, VENDOR_STORES } from "../data";
import { 
  ShoppingBag, Star, HelpCircle, Heart, Share2, Sparkles, Filter, 
  Search, SlidersHorizontal, ShoppingCart, Plus, Minus, Trash2, 
  X, Check, ChevronRight, Truck, CreditCard, CheckCircle2, Ticket,
  Clock, Flame, Trophy
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
}

export default function CustomerShop({ 
  cart, addToCart, updateCartQty, removeFromCart, clearCart, onOrderPlaced, currentUser,
  selectedCategory, setSelectedCategory
}: CustomerShopProps) {
  
  // Shopping logic states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  
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
  const newArrivals = [...PRODUCTS].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 4);
  const trendingProducts = [...PRODUCTS].sort((a, b) => b.rating - a.rating || b.salesCount - a.salesCount).slice(0, 4);
  const bestSellers = [...PRODUCTS].sort((a, b) => b.salesCount - a.salesCount).slice(0, 4);

  // Filter products by category and query
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === "all" || p.categoryId === selectedCategory;
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      
      {/* Search and Filters Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-450 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search Sayed-World products, spices, outfits..."
            className="w-full text-xs pl-9 pr-4 py-2 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-450"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Horizontal Category Pill Switches */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              selectedCategory === "all"
                ? "bg-emerald-650 text-white shadow-md shadow-emerald-500/20"
                : "glass-card hover:bg-white/15 text-slate-650 dark:text-slate-350"
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? "bg-emerald-650 text-white shadow-md shadow-emerald-500/20"
                  : "glass-card hover:bg-white/15 text-slate-650 dark:text-slate-350"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Banner with Live countdown */}
      <div className="bg-gradient-to-r from-emerald-950/70 to-slate-950/70 backdrop-blur-md border border-slate-200/20 dark:border-white/10 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-md flex flex-col md:flex-row justify-between items-center gap-6 z-10">
        <div className="max-w-lg z-10 space-y-3">
          <span className="bg-emerald-500 text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            Sayed-World Flash Sale
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold leading-tight">
            Authentic Bangladeshi Crafts <br className="hidden md:inline" />
            & Luxury Electronics
          </h2>
          <p className="text-slate-300 text-xs">
            Experience our premium multi-vendor collection. Free instant delivery to key Dhaka areas on transactions exceeding ৳2000!
          </p>
        </div>

        {/* Live Timer Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 text-center shrink-0 w-full sm:w-auto">
          <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-2">Deal Expires In:</div>
          <div className="flex gap-2 justify-center font-mono font-semibold text-lg">
            <div className="bg-slate-900/60 p-2.5 rounded-md min-w-[50px]">{String(expiryTime.h).padStart(2, "0")}h</div>
            <div className="p-2.5">:</div>
            <div className="bg-slate-900/60 p-2.5 rounded-md min-w-[50px]">{String(expiryTime.m).padStart(2, "0")}m</div>
            <div className="p-2.5">:</div>
            <div className="bg-slate-900/60 p-2.5 rounded-md min-w-[50px] text-emerald-400">{String(expiryTime.s).padStart(2, "0")}s</div>
          </div>
          <div className="text-[9px] text-slate-300 mt-2">Code VAL: **SAYED50** matches BDT discount</div>
        </div>
      </div>

      {/* 🌟 New Arrivals, Trending & Best Selling Product Sections */}
      {selectedCategory === "all" && searchQuery === "" && (
        <div className="space-y-4 animate-fade-in relative z-10">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/[0.05] pb-2">
            <span className="bg-theme-light text-theme-primary p-1.5 rounded-lg">
              <Sparkles className="w-4 h-4 text-theme-primary animate-pulse" />
            </span>
            <div>
              <h3 className="font-display font-medium text-sm text-slate-900 dark:text-slate-100">
                Premium Store Highlights • আমাদের সেরা কালেকশন
              </h3>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 font-medium">নতুন ডিজাইন, সেরা মানের পণ্য ও ট্রেন্ডিং অফারের সমাহার</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Columns 1: New Arrivals */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-200/60 dark:border-white/5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-theme-light p-1.5 rounded-lg text-theme-primary">
                    <Clock className="w-4 h-4 text-theme-primary animate-spin-slow" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-100">
                      New Arrival Products
                    </h4>
                    <p className="text-[9.5px] text-slate-400 dark:text-slate-500 font-medium">নতুন আগমন ও অভিনব কালেকশন</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {newArrivals.map((p) => (
                  <div 
                    key={`shop-new-${p.id}`}
                    onClick={() => setSelectedProduct(p)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 transition border border-transparent hover:border-slate-100 dark:hover:border-white/5 group cursor-pointer"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950/70 shrink-0 border border-slate-200/50 dark:border-white/5">
                      <img 
                        src={p.images[0]} 
                        alt={p.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute top-0 right-0 bg-theme-primary text-white text-[7px] font-extrabold px-1 py-0.5 rounded-bl shadow-xs">
                        NEW
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[11.5px] font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-theme-primary transition-colors">
                        {p.title}
                      </h5>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-2.5 h-2.5 fill-amber-500" />
                          <span className="text-[9px] font-bold font-mono">{p.rating}</span>
                        </div>
                        <span className="text-slate-350 dark:text-slate-700 text-[10px]">•</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">
                          {p.stockCount > 0 ? `${p.stockCount} in stock` : "Out of Stock"}
                        </span>
                      </div>
                      <div className="text-[10.5px] font-bold text-slate-900 dark:text-slate-105 font-mono mt-0.5">
                        ৳{p.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(p);
                      }}
                      className="py-1 px-2.5 text-[9.5px] bg-slate-100 hover:bg-theme-primary dark:bg-slate-800 hover:dark:bg-theme-primary text-slate-700 hover:text-white dark:text-slate-200 hover:dark:text-white rounded-md font-bold transition duration-150 cursor-pointer active:scale-95 whitespace-nowrap"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Columns 2: Trending / Trading Products */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-200/60 dark:border-white/5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-red-500/10 p-1.5 rounded-lg text-red-500">
                    <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-100">
                      Trending Products
                    </h4>
                    <p className="text-[9.5px] text-slate-400 dark:text-slate-500 font-medium">ট্রেডিং ও জনপ্রিয় প্রোডাক্টস</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {trendingProducts.map((p) => (
                  <div 
                    key={`shop-trend-${p.id}`}
                    onClick={() => setSelectedProduct(p)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 transition border border-transparent hover:border-slate-100 dark:hover:border-white/5 group cursor-pointer"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950/70 shrink-0 border border-slate-200/50 dark:border-white/5">
                      <img 
                        src={p.images[0]} 
                        alt={p.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute top-0 right-0 bg-red-550 text-white text-[7px] font-extrabold px-1 py-0.5 rounded-bl shadow-xs">
                        HOT
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[11.5px] font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-theme-primary transition-colors">
                        {p.title}
                      </h5>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-2.5 h-2.5 fill-amber-500" />
                          <span className="text-[9px] font-bold font-mono">{p.rating}</span>
                        </div>
                        <span className="text-slate-350 dark:text-slate-700 text-[10px]">•</span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">
                          {p.salesCount} sold
                        </span>
                      </div>
                      <div className="text-[10.5px] font-bold text-slate-900 dark:text-slate-105 font-mono mt-0.5">
                        ৳{p.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(p);
                      }}
                      className="py-1 px-2.5 text-[9.5px] bg-slate-100 hover:bg-red-500 dark:bg-slate-800 hover:dark:bg-red-650 text-slate-700 hover:text-white dark:text-slate-200 hover:dark:text-white rounded-md font-bold transition duration-150 cursor-pointer active:scale-95 whitespace-nowrap"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Columns 3: Best Selling Products */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-200/60 dark:border-white/5 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.05] pb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-500/10 p-1.5 rounded-lg text-amber-500">
                    <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-800 dark:text-slate-100">
                      Best Selling Products
                    </h4>
                    <p className="text-[9.5px] text-slate-400 dark:text-slate-500 font-medium">সেরা বিক্রিত ও চাহিদাপূর্ণ পণ্য</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {bestSellers.map((p) => (
                  <div 
                    key={`shop-bestsell-${p.id}`}
                    onClick={() => setSelectedProduct(p)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 transition border border-transparent hover:border-slate-100 dark:hover:border-white/5 group cursor-pointer"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-950/70 shrink-0 border border-slate-200/50 dark:border-white/5">
                      <img 
                        src={p.images[0]} 
                        alt={p.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute top-0 right-0 bg-amber-500 text-white text-[7px] font-extrabold px-1 py-0.5 rounded-bl shadow-xs">
                        BEST
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[11.5px] font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-amber-500 transition-colors">
                        {p.title}
                      </h5>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-2.5 h-2.5 fill-amber-500" />
                          <span className="text-[9px] font-bold font-mono">{p.rating}</span>
                        </div>
                        <span className="text-slate-350 dark:text-slate-700 text-[10px]">•</span>
                        <span className="text-[9px] text-amber-600 dark:text-amber-500 font-bold font-mono">
                          {p.salesCount} sold
                        </span>
                      </div>
                      <div className="text-[10.5px] font-bold text-slate-900 dark:text-slate-105 font-mono mt-0.5">
                        ৳{p.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(p);
                      }}
                      className="py-1 px-2.5 text-[9.5px] bg-slate-100 hover:bg-amber-550 dark:bg-slate-800 hover:dark:bg-amber-600 text-slate-705 hover:text-white dark:text-slate-200 hover:dark:text-white rounded-md font-bold transition duration-150 cursor-pointer active:scale-95 whitespace-nowrap"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2 pt-4 border-b border-slate-100 dark:border-white/[0.05] pb-2">
            <span className="bg-theme-light text-theme-primary p-1 rounded-lg">
              <ShoppingBag className="w-3.5 h-3.5 text-theme-primary" />
            </span>
            <h3 className="font-display font-medium text-[10.5px] text-slate-600 dark:text-slate-300 uppercase tracking-widest">
              All Catalogue Items • সকল প্রোডাক্টস
            </h3>
          </div>
        </div>
      )}

      {/* Product Catalog grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          // Find associated store details
          const store = VENDOR_STORES.find(s => s.id === product.vendorStoreId);
          return (
            <div 
              key={product.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
            >
              {/* Product Card Image Box */}
              <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-950">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                
                {/* Sale and Vendor badging */}
                <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-md">
                  ৳{product.price}
                </span>

                {store && (
                  <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                    Store: {store.storeName}
                  </span>
                )}
              </div>

              {/* Card Meta Content section */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xs tracking-tight line-clamp-1 truncate flex-1 leading-no">
                      {product.title}
                    </h3>
                    <div className="flex items-center text-amber-500 shrink-0 text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-current mr-0.5" />
                      {product.rating}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 h-8 leading-snug">
                    {product.description}
                  </p>
                </div>

                {/* Pricing and Action click buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-mono">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">৳{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-[10px] text-slate-400 line-through ml-1.5">৳{product.oldPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-sm hover:shadow-md transition-all uppercase tracking-normal"
                  >
                    View Details
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white text-xs font-semibold py-2.5 rounded-lg text-center"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main product presentation details modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/55 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 z-10 bg-slate-50 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* LHS product images gallery */}
              <div className="space-y-4">
                <div className="aspect-square bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-850">
                  <img 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {selectedProduct.images.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="aspect-square rounded-lg object-cover border border-slate-150 cursor-pointer" 
                    />
                  ))}
                </div>
              </div>

              {/* RHS buy and attributes details parameters */}
              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
                    {selectedProduct.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{selectedProduct.rating} score</span>
                    <span className="text-slate-400 font-mono text-[10px]">(UGC Verified reviews)</span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Variants Selection elements if any */}
                {selectedProduct.variants && (
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="font-semibold text-slate-500 block mb-1">Color Variant Selection:</span>
                      <div className="flex gap-2">
                        {selectedProduct.variants.filter(v => v.color).map(v => (
                          <button
                            key={v.id}
                            onClick={() => setChosenColor(v.color || "")}
                            className={`px-2.5 py-1 rounded border text-[10px] font-medium transition ${
                              chosenColor === v.color
                                ? "bg-slate-950 text-white border-slate-950"
                                : "bg-white dark:bg-slate-900 text-slate-600 border-slate-205 dark:border-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {v.color}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Core specifications chart */}
                <div>
                  <span className="font-semibold text-slate-500 block mb-1.5">Official Product Specifications:</span>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                    {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                      <div key={key} className="bg-slate-50 dark:bg-slate-950/50 p-2 rounded border border-slate-100 dark:border-slate-900">
                        <span className="text-slate-450 block truncate uppercase">{key}</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-350">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-mono">
                    <span className="text-lg font-bold text-slate-800 dark:text-slate-100">৳{selectedProduct.price}</span>
                    {selectedProduct.oldPrice && (
                      <span className="text-xs text-slate-400 line-through ml-1.5">৳{selectedProduct.oldPrice}</span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct, chosenColor, chosenSize);
                      setSelectedProduct(null);
                      setCartOpen(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-1 hover:shadow-md transition"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart Basket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded border border-slate-100 dark:border-slate-900 border-dashed space-y-1">
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
    </div>
  );
}
