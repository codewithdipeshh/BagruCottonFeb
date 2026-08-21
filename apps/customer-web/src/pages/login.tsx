import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from '@react-oauth/google';
import { login, loginWithGoogle } from "../State/Auth/Action";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch() as any;

  const { isLoading, error: authError, jwt, user } = useSelector((state: any) => state.auth || { jwt: null, user: null });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (jwt === "COOKIE_STORED" || (jwt && jwt !== "")) {
      const userRole = localStorage.getItem("user_role") || user?.role;
      if (userRole === "ADMIN" || userRole === "admin") {
        console.log("👑 Admin Session verified. Forwarding to console registry...");
        navigate('/admin');
      } else {
        console.log("👤 Standard patron verified. Launching storefront interface...");
        navigate('/');
      }
    }
  }, [jwt, navigate, user]);

  const googleLoginTrigger = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const googleToken = tokenResponse.access_token;
      if (googleToken) {
        await dispatch(loginWithGoogle(googleToken));
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      await dispatch(login(loginData));
    } catch (error) {
      console.error('Login process exception:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ead7] via-[#faf7f2] to-[#f8f8fa] flex items-center justify-center px-4 py-20 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#d9b77e]/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#080616]/10 blur-3xl rounded-full"></div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white/80 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)] relative z-10 text-left">

        <div className="hidden lg:flex relative bg-[#080616] p-14 flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/10">
              Welcome Back
            </span>

            <h1 className="text-5xl font-bold text-white leading-tight mb-6 font-serif">
              Timeless Elegance
              <br />
              <span className="text-[#d9b77e] font-sans">Starts Here</span>
            </h1>

            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              Login to discover handcrafted Bagru sarees inspired by Rajasthan’s rich textile heritage.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
              alt="Bagru Saree Heritage Layout"
              className="w-full h-[320px] object-cover rounded-[30px] shadow-2xl hover:scale-[1.01] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-[30px]"></div>

            <div className="absolute bottom-6 left-6">
              <p className="text-white/70 text-xs tracking-[3px] uppercase mb-2">
                Handcrafted Collection
              </p>
              <h3 className="text-white text-xl font-bold font-serif">
                Premium Bagru Sarees
              </h3>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 lg:p-16 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
              <p className="uppercase tracking-[4px] text-xs font-bold text-[#8b5e34] mb-2">
                Account Access
              </p>
              <h2 className="text-3xl font-bold text-[#080616] mb-2 font-serif">
                Login Panel
              </h2>
              <p className="text-sm text-gray-400">
                Enter your credentials to continue your shopping journey.
              </p>
            </div>

            {authError && (
              <div className="mb-6 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="flex items-center gap-4 bg-[#f5ead7]/60 border border-[#ead7b5]/50 rounded-2xl p-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#080616]" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#080616]">Secure Login</h4>
                <p className="text-xs text-black/50">Your credentials are safely fully encrypted.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    aria-label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F8F8FA] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#080616] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    aria-label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 bg-[#F8F8FA] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#080616] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="rounded border-gray-300 text-[#080616] focus:ring-0"
                  />
                  Remember Me
                </label>
                <span className="text-gray-400 cursor-help" title="Coming soon">Forgot Password?</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#080616] text-white text-xs tracking-wider uppercase rounded-xl font-bold hover:bg-black transition-all shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <><span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Verifying Profile Nodes...</>
                ) : (
                  <><span className="font-bold">Login System</span><ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-[10px] font-bold text-gray-400 uppercase"><span className="bg-white px-3">or</span></div>
              </div>

              <button
                type="button"
                onClick={() => googleLoginTrigger()}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors disabled:opacity-50"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo Mark" className="w-4 h-4" />
                Continue with Google Authenticator
              </button>
            </form>

            <div className="mt-8 text-center text-xs">
              <p className="text-gray-400 font-medium">
                Don’t have an account yet?{" "}
                <Link to="/signup" className="font-bold text-[#080616] hover:underline ml-1">Create Account</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}