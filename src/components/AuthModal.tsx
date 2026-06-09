import React, { useState } from "react";
import { 
  X, Mail, Lock, User as UserIcon, LogIn, UserPlus, ShieldAlert, Check,
  Sparkles, RefreshCw, Smartphone, CheckCircle, ArrowRight, ShieldCheck, Cpu
} from "lucide-react";
import { 
  registerWithEmail, 
  loginWithEmail, 
  loginWithGoogle, 
  isFirebaseConfigured, 
  UnifiedUser 
} from "../firebase";

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: (user: UnifiedUser) => void;
}

export default function AuthModal({ onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Customer");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const user = await loginWithGoogle();
      setSuccessMsg(`✨ Successful Google Login! Welcome, ${user.name}`);
      setTimeout(() => {
        onAuthSuccess(user);
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Google Authentication flow was interrupted.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validation
    if (!email || !password) {
      setErrorMsg("Please fill in all required credentials.");
      setIsLoading(false);
      return;
    }

    try {
      if (activeTab === "signup") {
        if (!name) {
          setErrorMsg("Full name is required for registration.");
          setIsLoading(false);
          return;
        }
        const user = await registerWithEmail(email, password, name, role);
        setSuccessMsg("🎉 Account registered successfully. Auto-logging into Sayed-World!");
        setTimeout(() => {
          onAuthSuccess(user);
          onClose();
        }, 1500);
      } else {
        const user = await loginWithEmail(email, password);
        setSuccessMsg(`👋 Welcome back, ${user.name}! Enjoy shopping.`);
        setTimeout(() => {
          onAuthSuccess(user);
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Authentication process suffered a logic failure.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-60 flex items-center justify-center p-4">
      {/* Container Frame with decorative glowing outline */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 relative flex flex-col max-h-[92vh] animate-fade-in animate-duration-300">
        
        {/* Colorful visual status cap indicating mode */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
              isFirebaseConfigured ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
            }`}>
              <span className="text-[7px] text-white font-extrabold">✓</span>
            </div>
            <div>
              <div className="text-[10px] font-black tracking-widest uppercase text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <span>GATEWAY CONFIGURED</span>
                {isFirebaseConfigured ? (
                  <span className="text-[9px] text-emerald-500 font-bold uppercase">(FIREBASE REAL)</span>
                ) : (
                  <span className="text-[9px] text-amber-500 font-bold uppercase">(SANDBOX PREVIEW)</span>
                )}
              </div>
              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-350">
                {isFirebaseConfigured 
                  ? "Direct secure sync with Firebase Auth" 
                  : "Using fast local persistence sandbox"}
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white tracking-tight">
              {activeTab === "login" ? "Welcome back • স্বাগতম" : "Create Account • রেজিস্ট্রেশন"}
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {activeTab === "login" 
                ? "Gain access to support, custom themes, and sandbox multi-vendor parameters" 
                : "Register as a Customer or Seller to manage items instantly in Bangladesh"}
            </p>
          </div>

          {/* Social Sign-In (Direct Google Login) */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-805 dark:text-white font-black py-3 px-4 rounded-xl border border-slate-200/60 dark:border-white/10 transition cursor-pointer disabled:opacity-50 text-xs uppercase tracking-wider"
          >
            {/* Minimalist Google 'G' icon built with SVG tags */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Continue with Google Account</span>
          </button>

          {/* HR separator */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/[0.08]" />
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Or credentials</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/[0.08]" />
          </div>

          {/* Main login / signup inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* If tab is signup, show Name input */}
            {activeTab === "signup" && (
              <div className="space-y-1.5 animate-slide-down">
                <label className="text-[10px] font-black uppercase text-slate-405 tracking-wider block">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name (e.g. Sayed Rahman)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-1/2 focus:ring-theme-primary transition text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Email input field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-405 tracking-wider block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-1/2 focus:ring-theme-primary transition text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Password input field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-405 tracking-wider block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-1/2 focus:ring-theme-primary transition text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Role select input (only for signup flow) */}
            {activeTab === "signup" && (
              <div className="space-y-1.5 animate-slide-down">
                <label className="text-[10px] font-black uppercase text-slate-405 tracking-wider block">Register Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1/2 focus:ring-theme-primary transition cursor-pointer"
                >
                  <option value="Customer">🛒 Register as Marketplace Customer</option>
                  <option value="Vendor/Seller">🏪 Register as Store Vendor/Seller</option>
                  <option value="Super Admin">🛡️ Register as System Admin</option>
                </select>
              </div>
            )}

            {/* Status feedbacks */}
            {errorMsg && (
              <div className="bg-rose-500/10 border border-rose-550/20 text-rose-500 p-3 rounded-xl flex items-start gap-2 text-[11px] leading-tight font-semibold">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-550/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl flex items-start gap-2 text-[11px] leading-tight font-semibold animate-pulse">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-theme-primary hover:bg-theme-hover active:scale-98 text-white font-black py-3 rounded-xl transition cursor-pointer uppercase text-xs tracking-wider shadow-lg flex items-center justify-center gap-2 "
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Gateway Authenticator...</span>
                </>
              ) : activeTab === "signup" ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account • রেজিস্ট্রেশন সম্পন্ন করুন</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Log In • একাউন্ট লগইন</span>
                </>
              )}
            </button>
          </form>

          {/* Auth Tab switcher links */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab(activeTab === "login" ? "signup" : "login");
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-theme-primary transition font-bold"
            >
              {activeTab === "login" 
                ? "Don't have an account? Sign Up • রেজিস্ট্রেশন করতে এখানে ক্লিক করুন" 
                : "Already have an account? Sign In • এখানে লগইন করুন"}
            </button>
          </div>
        </div>

        {/* Footer info lock details */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 text-[9px] text-slate-450 text-center font-bold">
          🔓 SSL & secure hashing enabled. Registered users gain dedicated balance & dashboard privileges.
        </div>
      </div>
    </div>
  );
}
