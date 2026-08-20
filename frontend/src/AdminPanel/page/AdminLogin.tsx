import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  Loader2,
  Sparkles
} from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      console.log("Firing master administrator credentials packet to backend node...");
      const response = await axios.post("http://localhost:5454/api/admin/auth/login", payload);
      const data = response.data;

      if (data && data.jwt) {
        console.log("Access token decrypted successfully from admin verification response!");
        localStorage.setItem("admin_jwt", data.jwt);
        localStorage.setItem("admin_user_role", data.user?.role || "ADMIN");
        
        if (data.user) {
          localStorage.setItem("admin_user", JSON.stringify(data.user));
        }
        navigate("/admin/product/add");
      } else {
        setError("Invalid signature layout received from auth gateway.");
      }
    } catch (err: any) {
      console.error("Admin Auth Sequence Broken:", err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "System registry authentication timeout. Server might be down."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2e6d0] via-[#faf8f5] to-[#f4f4f6] flex items-center justify-center px-4 py-12 relative overflow-hidden text-left font-sans text-sm">
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#d9b77e]/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#080616]/5 blur-3xl rounded-full"></div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-stone-200/60 p-8 sm:p-10 rounded-[32px] shadow-[0_20px_60px_rgba(139,94,52,0.06)] relative z-10 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-900 text-stone-100 text-[10px] font-bold uppercase tracking-widest mx-auto shadow-xs">
            <Sparkles className="w-3 h-3 text-[#d9b77e]" /> Central Core Engine
          </div>
          <h1 className="text-3xl font-serif font-light text-stone-900 tracking-wide pt-1">
            Admin Console
          </h1>
          <p className="text-xs text-stone-400">
            Authorization signature validation gateway required for premium artifact management layers.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-100 text-rose-700 text-xs font-medium flex items-start gap-2.5 shadow-2xs animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <div className="flex items-center gap-3.5 bg-[#fcf9f2] border border-[#f0e4cc] rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-stone-950 flex items-center justify-center shadow-xs flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#d9b77e]" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-stone-900">Protected Workspace</h4>
            <p className="text-[11px] text-stone-500">All transactions are tracked and encrypted inside cluster databases.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">Administrator Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@bagrucotton.com"
                className="w-full pl-10 pr-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 transition-colors placeholder:text-stone-300 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">Secure Vault Key</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 transition-colors placeholder:text-stone-300 tracking-widest font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-0.5">
            <Link 
              to="/admin/forgot-password" 
              className="text-xs font-medium text-stone-500 hover:text-stone-950 transition-colors hover:underline cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-950 hover:bg-stone-900 disabled:bg-stone-400 text-stone-100 text-xs tracking-widest uppercase py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#d9b77e]" /> 
                Verifying Security Clearances...
              </>
            ) : (
              <>
                <span>Unlock Repository Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#d9b77e]" />
              </>
            )}
          </button>

        </form>
        
        <div className="text-center pt-2">
          <p className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">
            Bagru Cotton Engine v2.0
          </p>
        </div>

      </div>
    </div>
  );
}