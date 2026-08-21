import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { 
  Mail, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Sparkles
} from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: "",
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

    try {
      const response = await axios.post("http://localhost:5454/api/admin/auth/forgot-password", formData);
      const data = response.data;

      if (data.resetToken) {
        setResetToken(data.resetToken);
        setSuccess(true);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success && resetToken) {
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
              Reset Link Sent
            </h1>
            <p className="text-xs text-stone-500">
              We've sent a password reset link to your email address.
            </p>
          </div>

          <div className="bg-stone-50/50 border border-stone-200 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-stone-700">Reset Token (for testing):</p>
            <code className="text-xs text-stone-600 break-all">{resetToken}</code>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(`/admin/reset-password?token=${resetToken}`)}
              className="w-full bg-stone-950 hover:bg-stone-900 text-stone-100 text-xs tracking-widest uppercase py-3.5 rounded-xl font-bold transition-all shadow-sm cursor-pointer"
            >
              Reset Password Now
            </button>
            <button
              onClick={() => navigate("/admin/login")}
              className="w-full flex items-center justify-center gap-2 text-xs font-medium text-stone-500 hover:text-stone-950 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
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
            <Sparkles className="w-3 h-3 text-[#d9b77e]" /> Password Recovery
          </div>
          <h1 className="text-3xl font-serif font-light text-stone-900 tracking-wide pt-1">
            Forgot Password
          </h1>
          <p className="text-xs text-stone-500">
            Enter your admin email to receive a password reset link.
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-950 hover:bg-stone-900 disabled:bg-stone-400 text-stone-100 text-xs tracking-widest uppercase py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#d9b77e]" /> 
                Sending Reset Link...
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
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