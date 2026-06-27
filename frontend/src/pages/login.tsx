import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Added Redux hooks
import { GoogleLogin } from '@react-oauth/google';
import { login, loginWithGoogle, getUser } from "../State/Auth/Action"; // Imported real actions
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

  // Redux state integration
  const { isLoading, error: authError, jwt } = useSelector((state: any) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Session dynamic monitor loop
  useEffect(() => {
    const token = localStorage.getItem('jwt') || jwt;
    if (token) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fixed: Linked form to actual Redux login server system
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      console.log('📝 Submitting standard login credentials...');
      const resultAction = await dispatch(login(loginData));

      if (resultAction || localStorage.getItem('jwt')) {
        const rawToken = localStorage.getItem('jwt');
        if (rawToken) await dispatch(getUser(rawToken));
      }
    } catch (error) {
      console.error('Standard authorization sequence cracked:', error);
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
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
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
                  {/* Yahan par toggle logic ko perfectly close kar diya hai */}
                  <button
                    type="button"
                    aria-label="Toggle Password Visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="rounded border-gray-300 text-[#080616] focus:ring-[#080616]"
                  />
                  Remember Me
                </label>
                <span className="text-sm text-gray-400 cursor-default" title="Coming soon">
                  Forgot Password?
                </span>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#080616] text-white rounded-2xl font-semibold hover:bg-black hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-70"
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

              {/* FIXED DYNAMIC GOOGLE COMPONENT BLOCK */}
              <div className="w-full flex justify-center relative z-20">
                <GoogleLogin
                  width="100%"
                  theme="outline"
                  size="large"
                  shape="rectangular"
                  logo_alignment="center"
                  onSuccess={async (credentialResponse) => {
                    const googleToken = credentialResponse.credential;
                    console.log('Google Security Verification Token (Login):', googleToken);

                    if (googleToken) {
                      try {
                        await dispatch(loginWithGoogle(googleToken));
                        const freshToken = localStorage.getItem('jwt');
                        if (freshToken) {
                          await dispatch(getUser(freshToken));
                        }
                      } catch (err) {
                        console.error('Google cross-routing validation collapsed:', err);
                      }
                    }
                  }}
                  onError={() => {
                    console.error('Google safe secure credential callback failed');
                  }}
                />
              </div>

            </form>

            {/* Signup Link */}
            <div className="mt-10 text-center">
              <p className="text-gray-500">
                Don’t have an account?{" "}
                <Link to="/signup" className="font-semibold text-[#080616] hover:underline">
                  Create Account
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}