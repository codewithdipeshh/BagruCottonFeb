import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, getUser } from '../State/Auth/Action';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch() as any;
  
  const { isLoading, error: authError, jwt } = useSelector((state: any) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  useEffect(() => {
    if (jwt) {
      dispatch(getUser());
      navigate('/');
    }
  }, [jwt, dispatch, navigate]);

  // ✅ Strictly target standard input behaviors
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setValidationError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const p1 = formData.password ? formData.password.trim() : "";
    const p2 = formData.confirmPassword ? formData.confirmPassword.trim() : "";

    // 🔍 Debugging log: Apne browser console me check kijiye dono me kya value aa rahi hai
    console.log("Password 1:", `"${p1}"`, "Password 2:", `"${p2}"`);

    if (p1 !== p2) {
      setValidationError('Passwords do not match');
      return;
    }

    if (p1.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    if (!formData.agree) {
      setValidationError('Please accept Terms & Conditions');
      return;
    }

    const userData = {
      firstName: formData.name.split(' ')[0] || formData.name,
      lastName: formData.name.split(' ').slice(1).join(' ') || '',
      email: formData.email,
      password: p1,
    };

    dispatch(register(userData));
  };

  const displayError = validationError || authError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F8FA] via-[#F5EFEA] to-[#E8EDF2] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
        
        {/* Left Side */}
        <div className="hidden lg:flex relative bg-[#080616] p-14 flex-col justify-between overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D3B198]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-md mb-8">
              Premium Shopping Experience
            </span>

            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Join The World
              <br />
              Of Elegant Sarees
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed">
              Create your account and explore handcrafted Bagru sarees,
              timeless collections, exclusive offers, and luxury fashion.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-[#D3B198]" />
                <span>Premium Handcrafted Collections</span>
              </div>

              <div className="flex items-center gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-[#D3B198]" />
                <span>Exclusive Member Discounts</span>
              </div>

              <div className="flex items-center gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-[#D3B198]" />
                <span>Fast & Secure Checkout</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10">
            <img
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Signup"
              className="w-full h-[350px] object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-12 lg:p-16 flex items-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-[#080616] mb-3">
                Create Account
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Start your premium shopping journey with Bagru Cotton Feb.
              </p>
            </div>

            {displayError && (
              <div className="mb-6 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-4 bg-[#F8F8FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#080616]/10 focus:border-[#080616] transition-all duration-300"
                    required
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-[#F8F8FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#080616]/10 focus:border-[#080616] transition-all duration-300"
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
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-4 bg-[#F8F8FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#080616]/10 focus:border-[#080616] transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-4 bg-[#F8F8FA] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#080616]/10 focus:border-[#080616] transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-1 accent-[#080616]"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#080616] font-medium hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#080616] font-medium hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#080616] text-white rounded-2xl font-semibold hover:bg-black hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-70"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-400">OR</span>
                </div>
              </div>

              {/* Google */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-4 border border-gray-200 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-300"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </form>

            {/* Login */}
            <div className="mt-10 text-center">
              <p className="text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-[#080616] hover:underline">
                  Login
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}