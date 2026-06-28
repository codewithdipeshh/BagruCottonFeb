import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Lock, 
  MapPin, 
  ShoppingBag, 
  CreditCard, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { createOrder, getOrderById } from '../State/Order/Action'; // Path sahi configure kar lein
import { getCart } from '../State/Cart/Action';

function formatPrice(price: number) {
  return `₹${(price || 0).toLocaleString('en-IN')}`;
}

export default function Checkout() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // URL Queries handling (?step=2&order_id=XYZ)
  const currentStep = parseInt(searchParams.get('step') || '1');
  const orderId = searchParams.get('order_id');

  const { cart } = useSelector((state: any) => state.cart);
  const { order, loading: orderLoading } = useSelector((state: any) => state.order);

  // Address Local State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    mobile: ''
  });

  const [formErrors, setFormErrors] = useState<any>({});

  // Fetch initial data
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Agar query string mein order_id aa jaye toh order details mangao (Summary screen ke liye)
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);

  const cartItems = cart?.cartItems || [];
  
  const subtotal = useMemo(() => {
    if (currentStep >= 2 && order) return order.totalPrice || 0;
    return cartItems.reduce((acc: number, item: any) => acc + (item.product?.price || 0) * item.quantity, 0);
  }, [cartItems, order, currentStep]);

  const gstTax = Math.round(subtotal * 0.05);
  const finalTotal = currentStep >= 2 && order ? order.totalPrice : subtotal + gstTax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  // Basic validation step
  const validateForm = () => {
    const errors: any = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.streetAddress.trim()) errors.streetAddress = 'Complete dispatch route required';
    if (!formData.city.trim()) errors.city = 'City required';
    if (!formData.state.trim()) errors.state = 'State required';
    if (!/^\d{6}$/.test(formData.zipCode)) errors.zipCode = 'Enter a valid 6-digit Pincode';
    if (!/^\d{10}$/.test(formData.mobile)) errors.mobile = 'Enter a valid 10-digit mobile number';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit trigger to register Order object in MongoDB
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderData = {
      address: formData,
      navigate: navigate
    };

    dispatch(createOrder(orderData));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-12 pb-24 font-sans text-stone-900 antialiased select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Step Visualizer Header */}
        <div className="max-w-3xl mx-auto mb-16 border-b border-stone-200 pb-8">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-stone-400">
            <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-black font-bold' : 'text-emerald-700'}`}>
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${currentStep === 1 ? 'border-black bg-black text-white' : 'border-emerald-700 bg-emerald-50'}`}>
                {currentStep > 1 ? '✓' : '1'}
              </span>
              Shipping Address
            </div>
            <div className="w-12 h-[1px] bg-stone-300" />
            <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-black font-bold' : currentStep > 2 ? 'text-emerald-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${currentStep === 2 ? 'border-black bg-black text-white' : currentStep > 2 ? 'border-emerald-700 bg-emerald-50' : 'border-stone-300'}`}>
                {currentStep > 2 ? '✓' : '2'}
              </span>
              Order Summary
            </div>
            <div className="w-12 h-[1px] bg-stone-300" />
            <div className={`flex items-center gap-2 ${currentStep === 3 ? 'text-black font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${currentStep === 3 ? 'border-black bg-black text-white' : 'border-stone-300'}`}>
                3
              </span>
              Payment Dockets
            </div>
          </div>
        </div>

        {/* Core Layout Split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Dynamic Forms based on Active step */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-[32px] p-6 sm:p-10 shadow-[0_12px_32px_-18px_rgba(26,26,26,0.08)] text-left">
            
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-serif text-stone-950 tracking-wide mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#F7DA96]" /> Shipping Architecture
                </h2>
                <p className="text-xs text-stone-500 font-light mb-8">Specify the deployment coordinates for your handcrafted heirloom textiles.</p>
                
                <form onSubmit={handleAddressSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1.5">First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#F7DA96] focus:bg-white transition-all" />
                      {formErrors.firstName && <p className="text-[10px] text-red-500 mt-1">{formErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1.5">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#F7DA96] focus:bg-white transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1.5">Street Address / Route *</label>
                    <textarea rows={3} name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} placeholder="House number, apartment suite, locality details..." className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#F7DA96] focus:bg-white transition-all resize-none" />
                    {formErrors.streetAddress && <p className="text-[10px] text-red-500 mt-1">{formErrors.streetAddress}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1.5">City *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#F7DA96] focus:bg-white transition-all" />
                      {formErrors.city && <p className="text-[10px] text-red-500 mt-1">{formErrors.city}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1.5">State *</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#F7DA96] focus:bg-white transition-all" />
                      {formErrors.state && <p className="text-[10px] text-red-500 mt-1">{formErrors.state}</p>}
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1.5">Pincode *</label>
                      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="6 Digits" className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#F7DA96] focus:bg-white transition-all" />
                      {formErrors.zipCode && <p className="text-[10px] text-red-500 mt-1">{formErrors.zipCode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block mb-1.5">Mobile Contact *</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="10-digit numeric terminal" className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#F7DA96] focus:bg-white transition-all" />
                    {formErrors.mobile && <p className="text-[10px] text-red-500 mt-1">{formErrors.mobile}</p>}
                  </div>

                  <button type="submit" className="w-full mt-6 py-4 bg-neutral-950 text-white rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-[#F7DA96] hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                    Validate & Compile Order <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-serif text-stone-950 tracking-wide mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#F7DA96]" /> Escrow Gateway Integration
                </h2>
                <p className="text-xs text-stone-500 font-light mb-8">Secure encrypted payment processing terminal.</p>
                
                {orderLoading ? (
                  <p className="text-xs tracking-wider animate-pulse text-stone-400">Loading payment payload token...</p>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 border border-emerald-200 bg-emerald-50/50 rounded-2xl flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs uppercase font-bold text-emerald-950">Order Invoice Logged</h4>
                        <p className="text-[11px] text-emerald-800 font-light mt-0.5">Your dossier object has been successfully compiled into MongoDB cluster under reference payload code: <strong className="font-mono">{order?._id || orderId}</strong></p>
                      </div>
                    </div>

                    <div className="border border-stone-200 rounded-2xl p-5 space-y-4">
                      <h3 className="text-xs uppercase font-bold tracking-wider text-stone-500">Select Production Payment Node</h3>
                      <button onClick={() => alert('Razorpay / Stripe modal context loading...')} className="w-full p-4 border border-stone-200 bg-stone-50 hover:border-[#F7DA96] rounded-xl flex items-center justify-between transition-all">
                        <span className="text-xs font-semibold">Razorpay Unified Payments (UPI, Cards, NetBanking)</span>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                      </button>
                    </div>

                    <button className="w-full py-4 bg-neutral-950 text-white hover:bg-[#F7DA96] hover:text-black font-bold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all">
                      <Lock className="w-3.5 h-3.5" /> Finalize Instant Transaction ({formatPrice(finalTotal)})
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Permanent Investment Ledger / Mini Cart Summary */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-[32px] p-6 sm:p-8 shadow-[0_15px_50px_-15px_rgba(26,18,12,0.06)] sticky top-36 text-left">
            <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-stone-800 border-b border-stone-100 pb-4 mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F7DA96]" /> Complete Investment Ledger
            </h2>

            {/* Added Saree Items dynamic mapping */}
            <div className="max-h-60 overflow-y-auto space-y-4 mb-6 pr-2 border-b border-stone-100 pb-6">
              {currentStep >= 3 && order ? (
                order.orderItems?.map((item: any) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <img src={item.product?.images?.[0]} alt="" className="w-12 h-16 object-cover bg-stone-50 rounded-lg border" />
                    <div className="flex-grow">
                      <h4 className="text-xs font-medium text-stone-900 line-clamp-1">{item.product?.name}</h4>
                      <p className="text-[10px] text-stone-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-serif font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))
              ) : (
                cartItems.map((item: any) => (
                  <div key={item._id} className="flex gap-4 items-center">
                    <img src={item.product?.images?.[0]} alt="" className="w-12 h-16 object-cover bg-stone-50 rounded-lg border" />
                    <div className="flex-grow">
                      <h4 className="text-xs font-medium text-stone-900 line-clamp-1">{item.product?.name}</h4>
                      <p className="text-[10px] text-stone-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-serif font-medium">{formatPrice(item.product?.price * item.quantity)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs sm:text-sm font-light text-stone-600">
                <span>Atelier Subtotal</span>
                <span className="font-serif text-stone-900 font-medium">{formatPrice(subtotal)}</span>
              </div>
              {currentStep < 2 && (
                <div className="flex justify-between text-xs sm:text-sm font-light text-stone-600">
                  <span>Estimated Taxes (GST 5%)</span>
                  <span className="font-serif text-stone-900 font-medium">{formatPrice(gstTax)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs sm:text-sm font-light text-stone-600">
                <span>Insured Courier Node</span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-800 bg-[#F7DA96]/20 px-2 py-0.5 rounded">Free</span>
              </div>
              <div className="border-t border-stone-100 pt-5 mt-5 flex justify-between items-baseline">
                <span className="text-stone-900 font-serif text-base tracking-wide">Aggregate Total</span>
                <span className="text-xl font-serif text-stone-950 font-light tracking-wide">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 text-[10px] text-stone-400 flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 text-stone-400 stroke-[2]" /> 256-Bit SSL Secured Transaction Pipeline.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}