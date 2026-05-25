import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Login() {

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    // Fake Delay
    setTimeout(() => {

      console.log(formData);

      setLoading(false);

    }, 2000);

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

          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

          {/* Blur */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          {/* Top Content */}
          <div className="relative z-10">

            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/10">

              ✨ Welcome Back

            </span>

            <h1 className="text-5xl font-bold text-white leading-tight mb-6">

              Timeless Elegance
              <br />

              <span className="text-[#d9b77e]">
                Starts Here
              </span>

            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-md">

              Login to discover handcrafted
              Bagru sarees inspired by
              Rajasthan’s rich textile heritage.

            </p>

          </div>

          {/* Image */}
          <div className="relative z-10 mt-10">

            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
              alt="Bagru Saree"
              className="w-full h-[360px] object-cover rounded-[30px] shadow-2xl hover:scale-[1.02] transition-transform duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-[30px]"></div>

            {/* Bottom Text */}
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
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

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
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    aria-label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-4 bg-[#F8F8FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#080616]/20 focus:border-[#080616] transition-all duration-300"
                    required
                  />

                  {/* Toggle */}
                  <button
                    type="button"
                    aria-label="Toggle Password Visibility"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616] transition-colors"
                  >

                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}

                  </button>

                </div>

              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() =>
                      setRememberMe(!rememberMe)
                    }
                    className="rounded border-gray-300 text-[#080616] focus:ring-[#080616]"
                  />

                  Remember Me

                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#080616] hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#080616] text-white rounded-2xl font-semibold hover:bg-black hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-70"
              >

                {loading ? (
                  "Logging In..."
                ) : (
                  <>
                    Login
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

                  <span className="bg-white px-4 text-sm text-gray-400">
                    OR
                  </span>

                </div>

              </div>

              {/* Google Login */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-4 border border-gray-200 rounded-2xl font-medium hover:bg-gray-50 hover:scale-[1.01] transition-all duration-300"
              >

                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />

                Continue with Google

              </button>

            </form>

            {/* Signup */}
            <div className="mt-10 text-center">

              <p className="text-gray-500">

                Don’t have an account?{" "}

                <Link
                  to="/signup"
                  className="font-semibold text-[#080616] hover:underline"
                >
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