import React, { useState } from "react";
import { Product, VendorStore, User } from "../types";
import { VENDOR_STORES } from "../data";
import { 
  ShieldCheck, RefreshCw, Star, Users, ArrowUpRight, TrendingUp, DollarSign, 
  Settings2, Activity, Check, X, AlertCircle, Building, Sliders, MessageSquare,
  Coins, Palette, Gift, Sparkles, Wallet
} from "lucide-react";

interface AdminPanelProps {
  products: Product[];
  vendorStores: VendorStore[];
  onApproveStore: (storeId: string, status: boolean) => void;
  orders: any[];
  onApproveReview?: (reviewId: string, approved: boolean) => void;
  designStyle?: "glass" | "cyber" | "brutalist" | "silk";
  onSwitchDesignStyle?: (style: "glass" | "cyber" | "brutalist" | "silk") => void;
  onAddFunds?: (amount: number) => void;
  onSwitchTab?: (tabId: "shop" | "vendor" | "admin" | "chat" | "roadmap") => void;
  currentUser?: User;
  onAddCoins?: (amount: number) => void;
}

export default function AdminPanel({ 
  products, vendorStores, onApproveStore, orders,
  designStyle, onSwitchDesignStyle, onAddFunds, onSwitchTab,
  currentUser, onAddCoins
}: AdminPanelProps) {
  // Onboarding queue log
  const [storesQueue, setStoresQueue] = useState<any[]>([
    { id: "store-q-1", name: "Chittagong Sail Exporters", owner: "Kazi Kamal", category: "Marine & Cargo Handcrafts", status: "Pending" },
    { id: "store-q-2", name: "Rajshahi Mango Preserve Co.", owner: "Mst. Sufia", category: "Organic Fruits & Snacks", status: "Pending" }
  ]);

  // Platforms default parameters
  const [platformCommission, setPlatformCommission] = useState(8.5);

  // Moderate reviews logs
  const [unmoderatedReviews, setUnmoderatedReviews] = useState<any[]>([
    { id: "rev-201", product: "Jamdani Blue Sari", user: "Sadia_N", rating: 5, text: "Absolutely stunning! The texture matches native fabric quality.", status: "Pending" },
    { id: "rev-202", product: "Sayed Tech Smartwatch", user: "Kabir_99", rating: 2, text: "Takes very long to sync bKash balance. Strap feels a bit tight.", status: "Pending" }
  ]);

  // Aggregate stats math
  const grossSalesTotal = orders.reduce((acc, cur) => acc + cur.totalAmount, 0) + 185002; // Initial seed offset mapping platform baseline
  const platformRevenueShare = Math.round((grossSalesTotal * platformCommission) / 100);

  // Form toggles
  const handleApproveStoreAction = (queueId: string, name: string) => {
    setStoresQueue(prev => prev.filter(s => s.id !== queueId));
    alert(`Successfully approved the registration of vendor store: "${name}". Notification dispatch triggered!`);
    
    // Call generic callback adding store list registers
    const matchingDataId = "store-mapped-" + Date.now();
    onApproveStore(matchingDataId, true);
  };

  const handleRejectStoreAction = (queueId: string, name: string) => {
    setStoresQueue(prev => prev.filter(s => s.id !== queueId));
    alert(`Rejected the registration application of store: "${name}". Reasoning prompt filed.`);
  };

  const handleModerateReview = (reviewId: string, approve: boolean) => {
    setUnmoderatedReviews(prev => prev.filter(r => r.id !== reviewId));
    alert(`Review marked as ${approve ? "Approved & Publicly Visible" : "Rejected & Deleted"}.`);
  };

  const [claimStatus, setClaimStatus] = useState<string | null>(null);
  const handleClaimFunds = () => {
    if (onAddFunds) {
      onAddFunds(5000);
      setClaimStatus("🎉 Success! Dispatched ৳5,000 to customer wallet.");
      setTimeout(() => setClaimStatus(null), 3000);
    } else {
      alert("Error: Funds dispatcher interface was bound to a stale context.");
    }
  };

  const handleClaimCoinsLocal = () => {
    if (onAddCoins) {
      onAddCoins(1000);
      setClaimStatus("🌟 Success! Dispatched 1,000 Loyalty Coins.");
      setTimeout(() => setClaimStatus(null), 3000);
    } else {
      alert("Loyalty subsystem is loading, please try again.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 🔮 Super Admin Sandbox Control (Migrated Developer Controls) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/90 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 text-white space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </span>
            <div>
              <h3 className="font-display font-medium text-sm text-slate-100 flex items-center gap-2">
                Sayed-World Developer & Theme Sandbox Control
                <span className="text-[10px] bg-theme-primary text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Admin Active
                </span>
              </h3>
              <p className="text-[10px] text-slate-400 leading-none">Manage platform styles, test wallet credits, and launch fast vendor gateways.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5 shadow-inner">
            <div className="text-center">
              <span className="text-[8px] block text-slate-400 font-semibold tracking-wider font-sans leading-none pb-0.5">CURRENT WALLET</span>
              <span className="font-bold text-emerald-400 text-xs">৳{currentUser?.walletBalance?.toLocaleString() || "0"}</span>
            </div>
            <div className="w-px bg-white/10 h-6" />
            <div className="text-center">
              <span className="text-[8px] block text-slate-400 font-semibold tracking-wider font-sans leading-none pb-0.5">LOYALTY COINS</span>
              <span className="font-bold text-amber-400 text-xs">{currentUser?.loyaltyPoints || "0"} PTS</span>
            </div>
          </div>
        </div>

        {claimStatus && (
          <div className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 p-2.5 rounded-xl text-xs font-bold text-center animate-pulse">
            {claimStatus}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Theme custom styles selection widgets */}
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <h4 className="text-xs font-bold font-sans text-slate-200 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-indigo-400" />
              Design System Style Customizer
            </h4>
            <p className="text-[10px] text-slate-400 leading-tight">Apply organic styles instantly to see how customer storefront visuals transform.</p>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "glass", emoji: "🔮", label: "Classic Glass" },
                { id: "cyber", emoji: "💻", label: "Cyber Slate" },
                { id: "silk", emoji: "🌸", label: "macOS Silk" },
                { id: "brutalist", emoji: "⚡", label: "Brutalist Grid" }
              ].map(opt => {
                const isActive = designStyle === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onSwitchDesignStyle && onSwitchDesignStyle(opt.id as any)}
                    className={`p-2 rounded-lg text-left border text-[11px] font-bold transition-all ${
                      isActive 
                        ? "bg-indigo-500/20 border-indigo-400 text-white" 
                        : "bg-black/25 border-white/5 hover:border-white/10 text-slate-350"
                    }`}
                  >
                    <span>{opt.emoji} {opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 🎟️ Admin Vouchers Workbench Section */}
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-2">
            <h4 className="text-xs font-bold font-sans text-slate-200 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-400 animate-pulse" />
              Campaign Voucher Workbench
            </h4>
            <p className="text-[10px] text-slate-400 leading-tight">Emit, collect, or test coupons on behalf of the customer simulated context.</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (onAddFunds) onAddFunds(100);
                  alert("🎉 Voucher WELCOME100 simulated! Added ৳100 discount equivalent value straight to user wallet.");
                }}
                className="p-1.5 text-left rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition text-[10px] font-bold text-rose-300 flex flex-col"
              >
                <span>🎟️ WELCOME100 Promo</span>
                <span className="text-[8px] text-slate-400 font-semibold leading-none mt-0.5">Claims ৳100 Reduction</span>
              </button>

              <button
                onClick={() => {
                  if (onAddFunds) onAddFunds(50);
                  alert("🎉 Coupon SAYED50 simulated! Added BDT ৳50 flat savings code equivalent straight to user wallet.");
                }}
                className="p-1.5 text-left rounded-lg bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 transition text-[10px] font-bold text-teal-300 flex flex-col"
              >
                <span>🎟️ SAYED50 Coupon</span>
                <span className="text-[8px] text-slate-400 font-semibold leading-none mt-0.5">Claims ৳50 Reduction</span>
              </button>
            </div>
          </div>

          {/* Quick Hub Gateways Shortcuts */}
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 space-y-2">
            <h4 className="text-xs font-bold font-sans text-slate-200 flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-indigo-400" />
              Funds Dispatcher Controls
            </h4>
            <p className="text-[10px] text-slate-400 leading-tight">Inject demo balances instantly into the simulated client wallet database to test checkout.</p>
            
            <div className="flex gap-2">
              <button
                onClick={handleClaimFunds}
                className="flex-1 p-2 rounded-lg text-center bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-[10.5px] font-bold shadow transition flex items-center justify-center gap-1"
              >
                <Coins className="w-3.5 h-3.5" />
                +৳5,000 Wallet
              </button>
              <button
                onClick={handleClaimCoinsLocal}
                className="flex-1 p-2 rounded-lg text-center bg-indigo-650 hover:bg-indigo-600 active:scale-95 text-white text-[10.5px] font-bold shadow transition flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                +1,000 Coins
              </button>
            </div>
          </div>

        </div>

        {/* Short-circuit global tab shortcuts line for quick navigation testing */}
        <div className="pt-2 border-t border-white/5 flex flex-wrap justify-between items-center gap-2">
          <span className="text-[9.5px] text-slate-400 font-medium">Verify customer storefronts and inventory instantly:</span>
          <div className="flex gap-2">
            <button
              onClick={() => onSwitchTab && onSwitchTab("shop")}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-300 border border-white/5 transition"
            >
              🛒 Go to Customer Shop
            </button>
            <button
              onClick={() => onSwitchTab && onSwitchTab("vendor")}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-300 border border-white/5 transition"
            >
              🏬 Go to Vendor Hub
            </button>
          </div>
        </div>
      </div>
      
      {/* Platform financial metrics charts indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric Gross platform sales */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Global Gross Sales</span>
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100 font-mono mt-1">
                ৳{grossSalesTotal.toLocaleString()}
              </h3>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950 p-2 rounded text-emerald-600 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-none">
            Calculated over <span className="font-semibold text-slate-700 dark:text-slate-200">{orders.length + 42} checkout channels</span>
          </p>
        </div>

        {/* Metric Platform commissions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Admin commission share</span>
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100 font-mono mt-1">
                ৳{platformRevenueShare.toLocaleString()}
              </h3>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950 p-2 rounded text-indigo-600 shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-none">
            Platform commissions default check <span className="font-semibold text-slate-700 dark:text-slate-200">{platformCommission}%</span>
          </p>
        </div>

        {/* Total vendors */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Registered Vendor Stores</span>
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100 font-mono mt-1">
                {vendorStores.length} Stores
              </h3>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded text-slate-600 shrink-0">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-none">
            Pending digital reviews: <span className="font-semibold text-amber-550">{storesQueue.length} applicants</span>
          </p>
        </div>

        {/* Global Catalog Count */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Global Platform Items</span>
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100 font-mono mt-1">
                {products.length} Products
              </h3>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950 p-2 rounded text-amber-500 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-none">
            Approved listings: <span className="font-semibold text-slate-705 dark:text-slate-200 font-mono">{products.filter(p => p.status === "approved").length}</span>
          </p>
        </div>
      </div>

      {/* Main settings and operational queues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LHS queue registers */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Onboarding approvals queue box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-4">
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-slate-850 dark:text-slate-100 flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Building className="w-4 h-4 text-emerald-500 animate-pulse" />
              Sellers Store Onboarding Approval pipeline
            </h4>

            {storesQueue.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                No active vendor store requests waiting inside registration queues!
              </div>
            ) : (
              <div className="space-y-3">
                {storesQueue.map(store => (
                  <div key={store.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950/40 border rounded-lg text-xs gap-3">
                    <div className="space-y-1">
                      <span className="font-display font-bold text-slate-800 dark:text-slate-200">{store.name}</span>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Proprietor: {store.owner} | Sector: {store.category}
                      </div>
                    </div>
                    {/* Interaction approvals */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleRejectStoreAction(store.id, store.name)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-2.5 py-1 rounded border hover:border-rose-400 transition"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleApproveStoreAction(store.id, store.name)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1 rounded shadow"
                      >
                        Approve Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Review moderation card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-4">
            <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-slate-850 dark:text-slate-100 flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              Customer Reviews (UGC) Moderation queue
            </h4>

            {unmoderatedReviews.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                No customer reviews outstanding moderation reviews.
              </div>
            ) : (
              <div className="space-y-3.5">
                {unmoderatedReviews.map(rev => (
                  <div key={rev.id} className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-900 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {rev.user} on <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{rev.product}</span>
                      </span>
                      <div className="flex items-center text-amber-500 font-mono text-[10px]">
                        <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                        {rev.rating} score
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 italic">
                      "{rev.text}"
                    </p>
                    <div className="flex gap-2 justify-end pt-1">
                      <button
                        onClick={() => handleModerateReview(rev.id, false)}
                        className="text-rose-500 border border-rose-100 px-2 py-0.5 rounded text-[10px]"
                      >
                        Delete Feed
                      </button>
                      <button
                        onClick={() => handleModerateReview(rev.id, true)}
                        className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded text-[10px] font-semibold"
                      >
                        Approve UGC
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RHS platforms parameters setups */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-150 dark:border-slate-800 flex items-center gap-1.5">
            <Settings2 className="w-4 h-4 text-emerald-500 animate-spin" />
            <h3 className="font-display font-semibold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-widest">
              Platform Configurations
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Commissions slider */}
            <div>
              <div className="flex justify-between font-mono text-[10px] mb-1">
                <span>Platform Commission Rate</span>
                <span className="font-semibold text-emerald-600">{platformCommission}%</span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                step="0.5"
                className="w-full text-emerald-600"
                value={platformCommission}
                onChange={e => setPlatformCommission(parseFloat(e.target.value))}
              />
            </div>

            {/* Simulated log gateways SMS */}
            <div className="space-y-1 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-900">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Domestic Gateways Hooked:</span>
              
              <div className="space-y-1 text-[10.5px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>SSLCommerz Port:</span>
                  <span className="text-emerald-500">CONNECTED</span>
                </div>
                <div className="flex justify-between">
                  <span>bKash MFS:</span>
                  <span className="text-emerald-500">CONNECTED</span>
                </div>
                <div className="flex justify-between">
                  <span>BulkSMSBD Service:</span>
                  <span className="text-emerald-505">CONNECTED</span>
                </div>
                <div className="flex justify-between">
                  <span>SteadFast Courier API:</span>
                  <span className="text-emerald-505">CONNECTED</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 p-3 rounded-lg flex items-start gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Production check:</span>
                Changes operate in local sandbox mode. Database triggers recalculations within active runtime tables instantly.
              </div>
            </div>

            <button
              onClick={() => alert("Platform systems synchronized successfully!")}
              className="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-2 rounded text-xs text-center"
            >
              Sync Configurations Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
