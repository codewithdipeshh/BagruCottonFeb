import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../State/Auth/Action';
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch() as any;

  const { isLoading, error: authError, jwt } = useSelector((state: any) => state.auth);


  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if passwords match
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  
  useEffect(() => {
    const token = localStorage.getItem('jwt') || jwt;
    if (token) {
      navigate('/');
    }
  }, [jwt, navigate]);

  
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
        if (!validateEmail(value)) return 'Please enter a valid email';
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

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);
    newErrors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
    newErrors.agree = validateField('agree', formData.agree);

    // Remove undefined errors
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key as keyof FormErrors] === undefined) {
        delete newErrors[key as keyof FormErrors];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      agree: true,
    });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        email: formData.email.trim().toLowerCase(),
        password: formData.password.trim(),
      };

      console.log('📝 Submitting signup:', userData);

      // Dispatch register action and wait for it
      const resultAction = await dispatch(register(userData));

      // Check if registration was successful
      if (resultAction?.type?.includes('SUCCESS') || localStorage.getItem('jwt')) {
        console.log('Registration successful!');
        // Navigation will happen automatically via useEffect watching jwt
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F8FA] via-[#F5EFEA] to-[#E8EDF2] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
      
        <div className="hidden lg:flex relative bg-[#080616] p-14 flex-col justify-between overflow-hidden">
          {/* Background blur effects */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D3B198]/20 rounded-full blur-3xl" />

          {/* Content */}
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
              src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Elegant Sarees"
              className="w-full h-[350px] object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>

     
        <div className="p-8 sm:p-12 lg:p-16 flex items-center">
          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-[#080616] mb-3">Create Account</h2>
              <p className="text-gray-500 leading-relaxed">Start your premium shopping journey with Bagru Cotton.</p>
            </div>

            {/* Server Error Alert */}
            {authError && (
              <div className="mb-6 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
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
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                  />
                </div>
                {touched.name && errors.name && (
                  <p id="name-error" className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
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
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  />
                </div>
                {touched.email && errors.email && (
                  <p id="email-error" className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
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
                    aria-invalid={touched.password && !!errors.password}
                    aria-describedby={touched.password && errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Error message */}
                {touched.password && errors.password && (
                  <p id="password-error" className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
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
                    aria-invalid={touched.confirmPassword && !!errors.confirmPassword}
                    aria-describedby={touched.confirmPassword && errors.confirmPassword ? 'confirm-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616] transition-colors"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Error or success message */}
                {touched.confirmPassword && errors.confirmPassword && (
                  <p id="confirm-error" className="text-xs text-red-500 mt-2 flex items-center gap-1">
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
                  aria-invalid={touched.agree && !!errors.agree}
                />
                <span className="group-hover:text-gray-700 transition-colors">
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
              {touched.agree && errors.agree && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.agree}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#080616] text-white rounded-2xl font-semibold hover:bg-black hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading || isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
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
                className="w-full flex items-center justify-center gap-3 py-4 border border-gray-200 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-300"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </form>

            {/* Login Link */}
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