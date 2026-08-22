import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGoogleLogin } from '@react-oauth/google'; 
import { login, loginWithGoogle, getUser, forgotPassword } from "../State/Auth/Action"; 
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  X,
  CheckCircle2,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch() as any;


  const isAdminPort = window.location.port === '4000';
  const TOKEN_KEY = isAdminPort ? "adminJwt" : "jwt";

  // Redux state integration
  const { isLoading, error: authError } = useSelector((state: any) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState(false);

  // Forgot Password Modal States
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState<{ loading: boolean; msg: string; error: boolean }>({
    loading: false,
    msg: "",
    error: false,
  });

  // Target path URL params (e.g. ?redirectTo=/cart)
  const queryParams = new URLSearchParams(location.search);
  const defaultRedirect = isAdminPort ? "/admin/dashboard" : "/";
  const redirectTo = queryParams.get("redirectTo") || defaultRedirect;

  // Auto redirect if valid token exists and user is logged in
  useEffect(() => {
    const existingToken = localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    // Only redirect if both token and user data exist
    if (existingToken && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [TOKEN_KEY, navigate, redirectTo]);

  // Check for session expiry message from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('sessionExpired') === 'true') {
      setSessionExpiredMessage(true);
      // Clear the parameter from URL
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate]);

  const googleLoginTrigger = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const googleToken = tokenResponse.access_token;

      if (googleToken) {
        try {
          await dispatch(loginWithGoogle(googleToken));
          const freshToken = localStorage.getItem(TOKEN_KEY);
          if (freshToken) {
            await dispatch(getUser(freshToken));
            navigate(redirectTo, { replace: true });
          }
        } catch (err) {
          console.error('Google authorization error:', err);
        }
      }
    },
    onError: () => {
      console.error('Google login failed');
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
      const resultAction = await dispatch(login(loginData));

      const rawToken = localStorage.getItem(TOKEN_KEY);
      if (rawToken || resultAction) {
        if (rawToken) {
          await dispatch(getUser(rawToken));
        }
        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      console.error('Standard login error:', error);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;

    setForgotStatus({ loading: true, msg: "", error: false });

    try {
      const res = await dispatch(forgotPassword(forgotEmail.trim().toLowerCase()));
      if (res?.success) {
        setForgotStatus({
          loading: false,
          msg: res.message || "Password reset instructions sent to your email!",
          error: false,
        });
      } else {
        setForgotStatus({
          loading: false,
          msg: res?.message || "Failed to send reset link. Please check your email address.",
          error: true,
        });
      }
    } catch (err: any) {
      setForgotStatus({
        loading: false,
        msg: "Something went wrong. Please try again later.",
        error: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5ead7] via-[#faf7f2] to-[#f8f8fa] flex items-center justify-center px-4 py-20 overflow-hidden relative">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#d9b77e]/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#080616]/10 blur-3xl rounded-full"></div>

      {/* Main Container */}
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/80 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)] relative z-10">

        {/* Left Side */}
        <div className="hidden lg:flex relative bg-[#080616] p-14 flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/10">
               Welcome Back
            </span>

            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Timeless Elegance
              <br />
              <span className="text-[#d9b77e]">Starts Here</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              Login to discover handcrafted Bagru sarees inspired by Rajasthan’s rich textile heritage.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <img
              src="https://cdn.phototourl.com/free/2026-07-28-d5d18527-4543-4ebf-afc5-e59fa4b87488.jpg"
              alt="Bagru Saree"
              className="w-full h-[360px] object-cover rounded-[30px] shadow-2xl hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-[30px]"></div>

            <div className="absolute bottom-6 left-6">
              <p className="text-white/70 text-sm tracking-[3px] uppercase mb-2">
                Handcrafted Collection
              </p>
              <h3 className="text-white text-2xl font-bold">
                Premium Bagru Sarees
              </h3>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-12 lg:p-16">
          <div className="max-w-md mx-auto">

            {/* Heading */}
            <div className="mb-10">
              <p className="uppercase tracking-[4px] text-sm text-[#8b5e34] mb-3">
                Account Access
              </p>
              <h2 className="text-4xl font-bold text-[#080616] mb-3">
                Login
              </h2>
              <p className="text-gray-500 leading-7">
                Enter your credentials to continue your shopping journey.
              </p>
            </div>

            {/* Server Error Alerts */}
            {authError && (
              <div className="mb-6 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Session Expiry Message */}
            {sessionExpiredMessage && (
              <div className="mb-6 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Your session has expired after 48 hours. Please login again.</span>
              </div>
            )}

            {/* Trust Box */}
            <div className="flex items-center gap-4 bg-[#f5ead7] border border-[#ead7b5] rounded-2xl p-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#080616]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#080616]">
                  Secure Login
                </h4>
                <p className="text-sm text-black/60">
                  Your personal information is fully protected.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    aria-label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-[#F8F8FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#080616]/20 focus:border-[#080616] transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    aria-label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 bg-[#F8F8FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#080616]/20 focus:border-[#080616] transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    aria-label="Toggle Password Visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="rounded border-gray-300 text-[#080616] focus:ring-[#080616]"
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(formData.email);
                    setIsForgotOpen(true);
                  }}
                  className="text-sm font-semibold text-[#8b5e34] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#080616] to-[#1a1a2e] text-white rounded-2xl font-semibold hover:from-[#9A7B56] hover:to-[#B8956E] hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging In...
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-400">OR</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => googleLoginTrigger()}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-4 border border-gray-200 rounded-2xl font-medium hover:bg-gradient-to-r hover:from-[#9A7B56] hover:to-[#B8956E] hover:text-white hover:border-[#9A7B56] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow-md"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

            </form>

            {/* Signup Link */}
            <div className="mt-10 text-center">
              <p className="text-gray-500">
                Don’t have an account?{" "}
                <Link 
                  to={redirectTo !== "/" ? `/signup?redirectTo=${encodeURIComponent(redirectTo)}` : "/signup"} 
                  className="font-semibold text-[#080616] hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-gray-100">
            <button
              onClick={() => {
                setIsForgotOpen(false);
                setForgotStatus({ loading: false, msg: "", error: false });
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#080616] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-[#080616] mb-2">Reset Password</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Enter your registered email address and we'll send you instructions to reset your password.
            </p>

            {forgotStatus.msg && (
              <div
                className={`mb-6 p-4 rounded-2xl text-sm font-medium flex items-start gap-2.5 ${
                  forgotStatus.error
                    ? "bg-red-50 text-red-600 border border-red-100"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                }`}
              >
                {forgotStatus.error ? (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
                )}
                <span>{forgotStatus.msg}</span>
              </div>
            )}

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8F8FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#080616]/20 focus:border-[#080616] transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotOpen(false);
                    setForgotStatus({ loading: false, msg: "", error: false });
                  }}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotStatus.loading}
                  className="flex-1 py-3.5 bg-[#080616] text-white rounded-2xl font-semibold hover:bg-black transition-all shadow-md disabled:opacity-50"
                >
                  {forgotStatus.loading ? "Sending..." : "Send Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}