import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; 
import axios from "axios";
import { 
  Lock, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/admin/forgot-password");
    }
  }, [token, navigate]);

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

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5454/api/admin/auth/reset-password", {
        token: token,
        newPassword: formData.newPassword
      });
      
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f2e6d0] via-[#faf8f5] to-[#f4f4f6] flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#d9b77e]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#080616]/5 blur-3xl rounded-full"></div>

        <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-stone-200/60 p-8 sm:p-10 rounded-[32px] shadow-[0_20px_60px_rgba(139,94,52,0.06)] relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50/80 border border-emerald-100 mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-wide">
              Password Reset Successful
            </h1>
            <p className="text-xs text-stone-500">
              Your password has been successfully reset. You can now login with your new password.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/login")}
            className="w-full bg-stone-950 hover:bg-stone-900 text-stone-100 text-xs tracking-widest uppercase py-3.5 rounded-xl font-bold transition-all shadow-sm cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2e6d0] via-[#faf8f5] to-[#f4f4f6] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#d9b77e]/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#080616]/5 blur-3xl rounded-full"></div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-stone-200/60 p-8 sm:p-10 rounded-[32px] shadow-[0_20px_60px_rgba(139,94,52,0.06)] relative z-10 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-900 text-stone-100 text-[10px] font-bold uppercase tracking-widest mx-auto shadow-xs">
            <Sparkles className="w-3 h-3 text-[#d9b77e]" /> Set New Password
          </div>
          <h1 className="text-3xl font-serif font-light text-stone-900 tracking-wide pt-1">
            Reset Password
          </h1>
          <p className="text-xs text-stone-500">
            Enter your new secure password below.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-100 text-rose-700 text-xs font-medium flex items-start gap-2.5 shadow-2xs">
            <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                required
                value={formData.newPassword}
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

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-700">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-900 text-stone-800 transition-colors placeholder:text-stone-300 tracking-widest font-mono"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 transition-colors focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-950 hover:bg-stone-900 disabled:bg-stone-400 text-stone-100 text-xs tracking-widest uppercase py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#d9b77e]" /> 
                Resetting Password...
              </>
            ) : (
              <>
                <span>Reset Password</span>
              </>
            )}
          </button>

        </form>
        
        <div className="text-center pt-2">
          <button
            onClick={() => navigate("/admin/login")}
            className="flex items-center justify-center gap-2 text-xs font-medium text-stone-500 hover:text-stone-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}