import React, { useState } from "react";
import { Product, VendorStore, User } from "../types";
import { VENDOR_STORES, PRODUCTS } from "../data";
import { 
  BarChart3, RefreshCw, Smartphone, TrendingUp, Coins, Clock, ArrowUpRight, 
  Settings2, ShieldAlert, Check, X, AlertCircle, Sparkles, Building, Banknote
} from "lucide-react";

interface VendorPanelProps {
  products: Product[];
  vendorStore: VendorStore;
  onUpdateInventory: (productId: string, updatedStock: number, updatedPrice: number) => void;
  currentUser: User;
}

export default function VendorPanel({ products, vendorStore, onUpdateInventory, currentUser }: VendorPanelProps) {
  // Store management toggles
  const [vacationMode, setVacationMode] = useState(vendorStore.vacationMode);
  
  // Wallet states
  const [withdrawableBalance, setWithdrawableBalance] = useState(currentUser.walletBalance);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(0);
  
  // Bank Form states
  const [bankForm, setBankForm] = useState({
    amount: "15000",
    bankName: "Dutch-Bangla Bank Limited (DBBL)",
    accountNo: "123.105.908234",
    routingNo: "090270415"
  });

  const [payoutsLogs, setPayoutsLogs] = useState<any[]>([
    { id: "WDR-092", amount: 12000, bank: "DBBL", status: "Transferred", date: "2026-06-02" },
    { id: "WDR-045", amount: 8000, bank: "Brac Bank", status: "Transferred", date: "2026-05-20" }
  ]);
  
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Filter vendor's specific products
  const merchantProducts = products.filter(p => p.vendorStoreId === merchantStoreDetails.id);

  // Active inputs states for inline modifications
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState(0);
  const [editPrice, setEditPrice] = useState(0);

  function triggerEdit(product: Product) {
    setEditProductId(product.id);
    setEditStock(product.stockCount);
    setEditPrice(product.price);
  }

  function handleSaveInventory(productId: string) {
    if (editPrice < 0 || editStock < 0) {
      alert("Invalid price or stock values!");
      return;
    }
    onUpdateInventory(productId, editStock, editPrice);
    setEditProductId(null);
  }

  // Handle Withdrawal submissions
  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const amt = parseFloat(bankForm.amount);
    if (isNaN(amt) || amt <= 0) {
      setFormError("Please verify withdrawal amount format!");
      return;
    }

    if (amt < 5000) {
      setFormError("Minimum platform withdrawal cap is BDT ৳5000.00!");
      return;
    }

    if (amt > withdrawableBalance) {
      setFormError("Insufficient withdrawable balance in merchant ledger wallet!");
      return;
    }

    // Execute simulated ledger lock
    setWithdrawableBalance(prev => prev - amt);
    setPendingWithdrawal(prev => prev + amt);
    
    const newLog = {
      id: "WDR-" + Math.floor(100 + Math.random() * 900),
      amount: amt,
      bank: bankForm.bankName.split(" ")[0],
      status: "Processing",
      date: new Date().toISOString().split("T")[0]
    };

    setPayoutsLogs([newLog, ...payoutsLogs]);
    setFormSuccess(`Payout registered! ৳${amt} holds inside safety escrow pending admin verification.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Grid of stats for Vendor Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Earnings Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Withdrawable Balance</span>
              <h3 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100 font-mono">
                ৳{withdrawableBalance.toLocaleString()}
              </h3>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950 p-2.5 rounded-lg text-emerald-600 shrink-0">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-400">
            <span>Platform Hold Escrow: <span className="font-semibold font-mono text-amber-550">৳{pendingWithdrawal.toLocaleString()}</span></span>
            <div className="flex items-center text-emerald-500 font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              +12.4%
            </div>
          </div>
        </div>

        {/* Products stats */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Shop Catalog Listing</span>
              <h3 className="font-display font-bold text-xl text-slate-800 dark:text-slate-100 font-mono">
                {merchantProducts.length} Items
              </h3>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950 p-2.5 rounded-lg text-indigo-600 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
          </div>
          <div className="text-[11px] text-slate-400 flex justify-between">
            <span>Approved: {merchantProducts.filter(p => p.status === "approved").length}</span>
            <span>Un-reviewed: {merchantProducts.filter(p => p.status === "pending").length}</span>
          </div>
        </div>

        {/* Store information */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Merchant Store profile</span>
              <h3 className="font-display font-bold text-xs text-slate-800 dark:text-slate-100 truncate max-w-[200px]">
                {merchantStoreDetails.storeName}
              </h3>
            </div>
            <div className="bg-slate-100 dark:bg-slate-850 p-2.5 rounded-lg text-slate-600 shrink-0">
              <Building className="w-5 h-5" />
            </div>
          </div>
          
          {/* Vacation mode trigger toggler */}
          <div className="flex items-center justify-between">
            <span className="text-[11px]">Vacation Store-Pause:</span>
            <button
              onClick={() => {
                setVacationMode(!vacationMode);
                alert(`Store Vacation Mode ${!vacationMode ? "Activated" : "Deactivated"}! Products checkout paused gracefully override.`);
              }}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition ${
                vacationMode 
                  ? "bg-rose-50 dark:bg-rose-950/45 text-rose-600 border border-rose-200" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {vacationMode ? "ON VACATION" : "ACTIVE SHOP"}
            </button>
          </div>
        </div>
      </div>

      {/* Main operational table: Inventory manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LHS Inventory tables */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-display font-semibold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              Dynamic Catalog Stock & Price manager
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Total Listed: {merchantProducts.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-650 dark:text-slate-350">
              <thead>
                <tr className="border-b border-slate-150 dark:border-slate-800/80 font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3">Specs Product name</th>
                  <th className="py-2.5 px-3 text-right">In-Stock units</th>
                  <th className="py-2.5 px-3 text-right">Dynamic price (BDT) </th>
                  <th className="py-2.5 px-3 text-center">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {merchantProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/45 dark:hover:bg-slate-850/20 font-sans text-[11.5px]">
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800 dark:text-slate-150 truncate max-w-[200px]">{p.title}</div>
                      <span className="text-[9px] font-mono text-slate-400">ID Ref: {p.id} | Rating: {p.rating}</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-medium">
                      {editProductId === p.id ? (
                        <input
                          type="number"
                          className="w-16 bg-slate-50 border rounded p-1 text-center font-bold"
                          value={editStock}
                          onChange={e => setEditStock(parseInt(e.target.value) || 0)}
                        />
                      ) : (
                        <span>{p.stockCount} units</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-800 dark:text-slate-205">
                      {editProductId === p.id ? (
                        <input
                          type="number"
                          className="w-20 bg-slate-50 border rounded p-1 text-right font-bold"
                          value={editPrice}
                          onChange={e => setEditPrice(parseInt(e.target.value) || 0)}
                        />
                      ) : (
                        <span>৳{p.price}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {editProductId === p.id ? (
                        <div className="flex gap-1 justify-center">
                          <button
                            onClick={() => handleSaveInventory(p.id)}
                            className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditProductId(null)}
                            className="bg-slate-200 text-slate-600 p-1 rounded hover:bg-slate-350"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => triggerEdit(p)}
                          className="border border-slate-200 text-[10px] font-semibold hover:bg-slate-50 px-2 py-1 rounded"
                        >
                          Modify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RHS Bank Payout request Wizard */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <form onSubmit={handleRequestPayout} className="space-y-4">
            <div className="pb-2 border-b border-slate-150 dark:border-slate-800 flex items-center gap-1">
              <Banknote className="w-4 h-4 text-emerald-500 hover:rotate-12 transition-all" />
              <h3 className="font-display font-semibold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                Bank withdrawal payouts setup
              </h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-450 mb-1">Withdrawing Amount (৳ BDT)</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded font-mono font-bold"
                  value={bankForm.amount}
                  onChange={e => setBankForm({...bankForm, amount: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-slate-450 mb-1">Domestic Recipient Bank Name</label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded focus:outline-none font-sans"
                  value={bankForm.bankName}
                  onChange={e => setBankForm({...bankForm, bankName: e.target.value})}
                >
                  <option>Dutch-Bangla Bank Limited (DBBL)</option>
                  <option>BRAC Bank Limited (BBL)</option>
                  <option>Islami Bank Bangladesh PLC</option>
                  <option>Eastern Bank Limited (EBL)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-450 mb-1">Account reference</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded font-mono"
                    value={bankForm.accountNo}
                    onChange={e => setBankForm({...bankForm, accountNo: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-slate-450 mb-1">Bank routing digit</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-850 rounded font-mono"
                    value={bankForm.routingNo}
                    onChange={e => setBankForm({...bankForm, routingNo: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {formError && (
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded text-xs flex gap-1 items-start">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded text-xs flex gap-1 items-start">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formSuccess}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 hover:dark:bg-emerald-700 text-white font-semibold py-2 rounded text-xs"
            >
              Dispatch Bank Payout Ticket
            </button>
          </form>

          {/* Historical lists */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-450 font-semibold uppercase tracking-wider block">Historic payout transfers:</span>
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
              {payoutsLogs.map(log => (
                <div key={log.id} className="flex justify-between items-center text-[10.5px] border-b pb-1 last:border-none border-slate-100 font-mono">
                  <div className="text-slate-600">
                    <span className="font-bold block text-slate-800 dark:text-slate-200">{log.id} ({log.bank})</span>
                    <span className="text-[9px] text-slate-400">{log.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold block text-slate-700 dark:text-slate-200">৳{log.amount}</span>
                    <span className={`text-[9px] font-semibold ${
                      log.status === "Transferred" ? "text-emerald-500" : "text-amber-500 animate-pulse"
                    }`}>{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline constant lookup to fetch specific store definitions safely
const merchantStoreDetails = VENDOR_STORES[0];
