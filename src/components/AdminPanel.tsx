import React, { useState } from "react";
import { Product, VendorStore, User } from "../types";
import { VENDOR_STORES } from "../data";
import { 
  ShieldCheck, RefreshCw, Star, Users, ArrowUpRight, TrendingUp, DollarSign, 
  Settings2, Activity, Check, X, AlertCircle, Building, Sliders, MessageSquare
} from "lucide-react";

interface AdminPanelProps {
  products: Product[];
  vendorStores: VendorStore[];
  onApproveStore: (storeId: string, status: boolean) => void;
  orders: any[];
  onApproveReview?: (reviewId: string, approved: boolean) => void;
}

export default function AdminPanel({ products, vendorStores, onApproveStore, orders }: AdminPanelProps) {
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

  return (
    <div className="space-y-6">
      
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
