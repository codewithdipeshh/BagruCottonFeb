import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google'; 
import { register, loginWithGoogle, getUser } from '../State/Auth/Action';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Check,
  MailCheck,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agree?: string;
}

interface TouchedFields {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  agree?: boolean;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch() as any;

  const isAdminPort = window.location.port === '4000';
  const TOKEN_KEY = isAdminPort ? "adminJwt" : "jwt";

  const { isLoading, error: authError } = useSelector((state: any) => state.auth);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const defaultRedirect = isAdminPort ? "/admin/dashboard" : "/";
  const redirectTo = queryParams.get("redirectTo") || defaultRedirect;

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  useEffect(() => {
    const existingToken = localStorage.getItem(TOKEN_KEY);
    if (existingToken) {
      navigate(redirectTo, { replace: true });
    }
  }, [TOKEN_KEY, navigate, redirectTo]);

  const googleLoginTrigger = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const googleToken = tokenResponse.access_token;
      
      if (googleToken) {
        setIsSubmitting(true);
        try {
          await dispatch(loginWithGoogle(googleToken));
          
          const freshToken = localStorage.getItem(TOKEN_KEY);
          if (freshToken) {
            // Error fixed here: Removed freshToken argument
            await dispatch(getUser()); 
            navigate(redirectTo, { replace: true });
          }
        } catch (err) {
          console.error('Google custom layout routing failed:', err);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    onError: () => {
      console.error('Google secure verification failed');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name as keyof FormData]);
  };

  const validateField = (fieldName: string, value: any): string | undefined => {
    switch (fieldName) {
      case 'name':
        if (!value?.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name is too long';
        return undefined;

      case 'email':
        if (!value?.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid and active email address';
        return undefined;

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return undefined;

      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return undefined;

      case 'agree':
        if (!value) return 'You must accept Terms & Conditions';
        return undefined;

      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);
    newErrors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
    newErrors.agree = validateField('agree', formData.agree);

    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key as keyof FormErrors] === undefined) {
        delete newErrors[key as keyof FormErrors];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      agree: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);

    try {
      const userData = {
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        email: formData.email.trim().toLowerCase(),
        password: formData.password.trim(),
      };

      const resultAction = await dispatch(register(userData));

      if (resultAction?.success) {
        setSuccessMessage(resultAction.message || "Registration successful! Please check your email to verify your account.");
      } else if (resultAction?.message && resultAction.message.includes('already registered')) {
        setErrors({
          email: 'This email is already registered. Please use a different email or login with your existing account.'
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F8FA] via-[#F5EFEA] to-[#E8EDF2] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
      
        {/* Left Layout Branding panel */}
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
              Create your account and explore handcrafted Bagru sarees, timeless collections, exclusive offers, and luxury fashion.
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
              src="https://cdn.phototourl.com/free/2026-07-23-7664407b-fd47-494b-9384-038f529733c5.jpg"
              alt="Elegant Sarees"
              className="w-full h-[350px] object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 sm:p-12 lg:p-16 flex items-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-[#080616] mb-3">Create Account</h2>
              <p className="text-gray-500 leading-relaxed">Start your premium shopping journey with Bagru Cotton.</p>
            </div>

            {authError && (
              <div className="mb-6 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {successMessage ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4 shadow-sm">
                <MailCheck className="w-14 h-14 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-emerald-900">Verify Your Email</h3>
                <p className="text-emerald-700 text-sm leading-relaxed">{successMessage}</p>
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="inline-block w-full py-3.5 bg-[#080616] text-white rounded-2xl font-semibold text-sm hover:bg-[#9A7B56] transition-colors no-underline"
                  >
                    Proceed to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-4 bg-[#F8F8FA] border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        touched.name && errors.name
                          ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
                          : 'border-gray-200 focus:ring-[#080616]/10 focus:border-[#080616]'
                      }`}
                      required
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your email"
                      className={`w-full pl-12 pr-4 py-4 bg-[#F8F8FA] border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        touched.email && errors.email
                          ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
                          : 'border-gray-200 focus:ring-[#080616]/10 focus:border-[#080616]'
                      }`}
                      required
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Create password"
                      autoComplete="new-password"
                      className={`w-full pl-12 pr-12 py-4 bg-[#F8F8FA] border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        touched.password && errors.password
                          ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
                          : 'border-gray-200 focus:ring-[#080616]/10 focus:border-[#080616]'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      className={`w-full pl-12 pr-12 py-4 bg-[#F8F8FA] border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        touched.confirmPassword && errors.confirmPassword
                          ? 'border-red-400 focus:ring-red-300 focus:border-red-400'
                          : formData.confirmPassword && passwordsMatch
                            ? 'border-green-400 focus:ring-green-300 focus:border-green-400'
                            : 'border-gray-200 focus:ring-[#080616]/10 focus:border-[#080616]'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616] transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                    </p>
                  )}
                  {formData.confirmPassword && passwordsMatch && (
                    <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Passwords match
                    </p>
                  )}
                </div>

                {/* Terms & Conditions */}
                <label htmlFor="agree" className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer group">
                  <input
                    id="agree"
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 accent-[#080616] cursor-pointer"
                  />
                  <span className="group-hover:text-gray-700 transition-colors">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#080616] font-medium hover:underline">Terms & Conditions</Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-[#080616] font-medium hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {touched.agree && errors.agree && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.agree}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#080616] to-[#1a1a2e] text-white rounded-2xl font-semibold hover:from-[#9A7B56] hover:to-[#B8956E] hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading || isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
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

                {/* Google Login */}
                <button
                  type="button"
                  onClick={() => googleLoginTrigger()}
                  disabled={isLoading || isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 border border-gray-200 rounded-2xl font-medium hover:bg-gradient-to-r hover:from-[#9A7B56] hover:to-[#B8956E] hover:text-white hover:border-[#9A7B56] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>
              </form>
            )}

            {/* Login Link */}
            <div className="mt-10 text-center">
              <p className="text-gray-500">
                Already have an account?{' '}
                <Link to={redirectTo !== "/" ? `/login?redirectTo=${encodeURIComponent(redirectTo)}` : "/login"} className="font-semibold text-[#080616] hover:underline">Login</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}