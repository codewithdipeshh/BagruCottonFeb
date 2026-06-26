import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Minus, 
  Plus, 
  Trash2, 
  Gift, 
  Lock, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShoppingBag,
  Percent
} from 'lucide-react';
import { useApp } from '../context/AppContext';

function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`;
}

export default function Cart() {
  const {
    cartItems,
    cartCount,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useApp();

  const [isGiftWrapSelected, setIsGiftWrapSelected] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [checkoutNotice, setCheckoutNotice] = useState('');

  const rawSubtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const discountAmount = useMemo(
    () => Math.round(rawSubtotal * appliedDiscount),
    [rawSubtotal, appliedDiscount]
  );

  const giftWrappingCost = isGiftWrapSelected ? 1200 : 0;
  const complimentaryTax = Math.round((rawSubtotal - discountAmount) * 0.05);
  const finalAtelierTotal =
    rawSubtotal - discountAmount + giftWrappingCost + complimentaryTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const formattedCode = promoCode.trim().toUpperCase();
    if (formattedCode === 'JAIPUR10' || formattedCode === 'HERITAGE10') {
      setAppliedDiscount(0.1);
      setPromoSuccess('10% Patron appreciation discount applied.');
    } else if (formattedCode === 'ROYALDRAFT') {
      setAppliedDiscount(0.15);
      setPromoSuccess('15% Atelier collection discount applied.');
    } else {
      setPromoError('This invitation code is invalid or has expired.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-12 pb-24 select-none font-sans text-stone-900 antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Header */}
        <div className="border-b border-stone-200 pb-8 mb-12 text-left">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#F7DA96] font-bold block mb-2.5">
            Atelier Curator Collection
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-950 tracking-wide">
              Your Exhibition Bag
            </h1>
            {cartCount > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-[#F7DA96] transition-colors py-1 self-start md:self-auto border-b border-transparent hover:border-[#F7DA96]"
              >
                Relinquish All Items
              </button>
            )}
          </div>
        </div>

        {cartCount === 0 ? (
          /* Elegant Empty State */
          <div className="max-w-xl mx-auto py-20 text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-stone-200/80 flex items-center justify-center bg-white shadow-sm">
              <ShoppingBag className="w-7 h-7 text-stone-400 stroke-[1]" />
            </div>
            <h2 className="text-2xl font-serif text-stone-900 font-light tracking-wide mb-3">
              Your drape archive is empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed mb-10 max-w-sm mx-auto">
              You have not selected any handcrafted masterpieces yet. Explore our clay-resist Bagru prints and gold-wire zari threads to begin your collection.
            </p>
            <Link
              to="/sarees"
              className="inline-flex items-center justify-center px-10 py-4 bg-neutral-950 text-white text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#F7DA96] hover:text-black transition-all duration-300 rounded-xl shadow-md"
            >
              Examine Sarees Archive
            </Link>
          </div>
        ) : (
          /* Multi-column Exhibition Bag Ledger */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Items & Packaging details */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row gap-6 shadow-[0_12px_32px_-18px_rgba(26,26,26,0.08)] hover:shadow-[0_20px_40px_-15px_rgba(247,218,150,0.12)] transition-all duration-500 hover:border-[#F7DA96]/30 text-left"
                >
                  {/* Item Image Stage */}
                  <div className="w-full sm:w-28 h-36 rounded-2xl overflow-hidden border border-stone-100 flex-shrink-0 bg-stone-50 relative">
                    <div className="absolute inset-1.5 border border-[#F7DA96]/10 rounded-xl pointer-events-none z-10" />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#F7DA96] font-bold">
                            {item.fabric ?? 'Handloom Heritage'}
                          </span>
                          <h3 className="font-serif text-lg text-stone-900 font-light tracking-wide mt-1">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
                          title="Relinquish Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.description && (
                        <p className="text-xs text-stone-500 font-sans font-light mt-2 italic line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-end justify-between border-t border-stone-100 pt-4 mt-4 gap-4">
                      {/* Interactive Quantity Counter */}
                      <div className="inline-flex items-center rounded-xl border border-stone-200 bg-stone-50 p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-stone-500 hover:text-black hover:bg-stone-200 rounded-lg transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2.5rem] text-center text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-stone-500 hover:text-black hover:bg-stone-200 rounded-lg transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      
                      {/* Item Total Price */}
                      <p className="text-lg font-serif font-light text-stone-900 tracking-wide">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pinewood Gift Wrap Option */}
              <div
                onClick={() => setIsGiftWrapSelected(!isGiftWrapSelected)}
                className={`border rounded-3xl p-6 cursor-pointer transition-all duration-500 flex items-start gap-5 text-left ${
                  isGiftWrapSelected
                    ? 'border-[#F7DA96] bg-[#FAF9F6] shadow-md'
                    : 'border-stone-200 bg-white hover:border-[#F7DA96]/50 shadow-[0_12px_32px_-18px_rgba(26,26,26,0.08)]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F7DA96]/10 flex items-center justify-center flex-shrink-0 text-[#F7DA96]">
                  <Gift className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-base text-stone-950 tracking-wide">
                      Heritage Pinewood Box Presentation
                    </h3>
                    <span className="text-xs font-serif font-medium text-stone-900">
                      + ₹1,200
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-light leading-relaxed mt-1">
                    Encased in solid, sustainably-sourced pinewood bearing direct calligraphed notes on handmade rice-parchment envelopes.
                  </p>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                      isGiftWrapSelected ? 'bg-[#F7DA96] border-[#F7DA96]' : 'border-stone-300'
                    }`}>
                      {isGiftWrapSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500">
                      {isGiftWrapSelected ? 'Presentation Selected' : 'Add Heritage Packaging'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Price Ledger Panel */}
            <div className="lg:col-span-4 bg-white border border-stone-200 rounded-[32px] p-6 sm:p-8 shadow-[0_15px_50px_-15px_rgba(26,18,12,0.06)] sticky top-36 text-left">
              <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-stone-800 border-b border-stone-100 pb-4 mb-6 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F7DA96]" />
                Investment Ledger
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-xs sm:text-sm font-light text-stone-600">
                  <span>Atelier Subtotal</span>
                  <span className="font-serif text-stone-900 font-medium">{formatPrice(rawSubtotal)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm font-medium text-emerald-800">
                    <span className="flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5" />
                      Invitation Code
                    </span>
                    <span className="font-serif">- {formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs sm:text-sm font-light text-stone-600">
                  <span>Pinewood Packaging</span>
                  <span className="font-serif text-stone-900 font-medium">
                    {isGiftWrapSelected ? formatPrice(giftWrappingCost) : 'Complimentary Silk Sleeve'}
                  </span>
                </div>

                <div className="flex justify-between text-xs sm:text-sm font-light text-stone-600">
                  <span>Estimated Taxes (GST 5%)</span>
                  <span className="font-serif text-stone-900 font-medium">{formatPrice(complimentaryTax)}</span>
                </div>

                <div className="flex justify-between text-xs sm:text-sm font-light text-stone-600">
                  <span>Insured Express Courier</span>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-stone-800 bg-[#F7DA96]/20 px-2 py-0.5 rounded">
                    Free
                  </span>
                </div>

                <div className="border-t border-stone-100 pt-5 mt-5 flex justify-between items-baseline">
                  <span className="text-stone-900 font-serif text-lg tracking-wide">Atelier Total</span>
                  <span className="text-2xl font-serif text-stone-950 tracking-wide font-light">
                    {formatPrice(finalAtelierTotal)}
                  </span>
                </div>
              </div>

              {/* Promo Code Entry Form */}
              <form onSubmit={handleApplyPromo} className="mt-8 border-t border-stone-100 pt-6">
                <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block mb-3">
                  Promo / Invitation Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Invitation Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs tracking-wider uppercase font-medium focus:outline-none focus:border-[#F7DA96] focus:bg-white transition-all placeholder:text-stone-300"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-neutral-950 hover:bg-[#F7DA96] hover:text-black text-white rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-red-600 font-medium font-sans mt-2">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-xs text-emerald-800 font-bold font-sans mt-2">✓ {promoSuccess}</p>
                )}
              </form>

              {/* Secure Checkout Action */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutNotice('Routing checkout sequence safely via SSL pipeline...');
                    window.setTimeout(() => setCheckoutNotice(''), 3000);
                  }}
                  className="w-full py-4 bg-neutral-950 hover:bg-[#F7DA96] text-white hover:text-black text-[11px] uppercase tracking-[0.25em] font-bold shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 rounded-xl"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[2]" />
                  Secure Checkout
                </button>
                {checkoutNotice && (
                  <p className="text-[10px] text-center text-emerald-700 font-sans mt-3">
                    {checkoutNotice}
                  </p>
                )}
                <p className="text-[9px] text-center text-stone-400 font-sans tracking-wide mt-3 flex items-center justify-center gap-1">
                  100% Encrypted Transactions. Secure client dockets.
                </p>
              </div>

              {/* Sandbox Coupon Helper info badge */}
              <div className="mt-6 p-4 bg-[#F7DA96]/10 border border-[#F7DA96]/20 rounded-2xl text-[10px] text-stone-600 font-sans leading-relaxed">
                <span className="font-bold text-stone-900 uppercase block mb-1">Patron Sandbox Invitation Cards</span>
                Apply <strong className="text-stone-950 font-bold">JAIPUR10</strong> for a 10% appreciation credit or <strong className="text-stone-950 font-bold">ROYALDRAFT</strong> for a 15% luxury VIP draft credit!
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}