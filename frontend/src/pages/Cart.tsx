import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Luxury handloom & guarantee icons crafted as high-fidelity inline SVGs
const PremiumSealIcon = () => (
  <svg className="w-5 h-5 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4 text-stone-400 hover:text-red-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SecurityIcon = () => (
  <svg className="w-4 h-4 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const GiftIcon = () => (
  <svg className="w-5 h-5 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

// Luxury Mock Saree inventory to map dynamically to the user's cartCount context
const LUXURY_SAREES_DATABASE = [
  {
    id: 'saree-indigo-dabu',
    name: 'Ancient Indigo Dabu Handblock Saree',
    type: 'Organic Mulmul Cotton',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
    details: 'Dyed with natural vegetable indigo block stencils.'
  },
  {
    id: 'saree-chanderi-gold',
    name: 'Royal Chanderi Kora Tissue Silk Drape',
    type: 'Pure Chanderi Handloom Silk',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
    details: 'Woven with refined real gold-plated zari warps.'
  },
  {
    id: 'saree-bagru-madder',
    name: 'Heritage Bagru Syahi Madder Red Saree',
    type: 'Clay-resist Handwoven Linen',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1610189020382-668f692b5b2f?q=80&w=600&auto=format&fit=crop',
    details: 'Traditional clay mud hand-printing process.'
  },
  {
    id: 'saree-banarasi-zari',
    name: 'Atelier Banarasi Brocade Satin Masterpiece',
    type: '100% Fine Mulberry Silk',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1603251579431-8041402bdeda?q=80&w=600&auto=format&fit=crop',
    details: 'Hand-loomed in the sacred ghats of Varanasi.'
  }
];

export default function Cart() {
  const { cartCount, setCartCount } = useApp();

  // Local premium options
  const [isGiftWrapSelected, setIsGiftWrapSelected] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0% to 100%
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Dynamically map mock item objects from db according to the global cartCount
  const activeCartItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < cartCount; i++) {
      // Rotate seamlessly through mock database if count exceeds database length
      const sareeTemplate = LUXURY_SAREES_DATABASE[i % LUXURY_SAREES_DATABASE.length];
      items.push({
        ...sareeTemplate,
        cartIndex: i, // uniquely identify duplicates if they occur
        quantity: 1 // base quantity per unique line item allocation
      });
    }
    return items;
  }, [cartCount]);

  // Update local visual states while consistently mutating parent cartCount context
  const handleItemRemoval = (targetIndex: number) => {
    setCartCount((c: number) => Math.max(0, c - 1));
  };

  const handleClearCart = () => {
    setCartCount(0);
  };

  // Pricing math metrics
  const rawSubtotal = useMemo(() => {
    return activeCartItems.reduce((acc, item) => acc + item.price, 0);
  }, [activeCartItems]);

  const discountAmount = useMemo(() => {
    return Math.round(rawSubtotal * appliedDiscount);
  }, [rawSubtotal, appliedDiscount]);

  const giftWrappingCost = isGiftWrapSelected ? 1200 : 0; // High-end wooden box packaging
  const complimentaryTax = Math.round((rawSubtotal - discountAmount) * 0.05); // 5% GST
  const finalAtelierTotal = rawSubtotal - discountAmount + giftWrappingCost + complimentaryTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const formattedCode = promoCode.trim().toUpperCase();
    if (formattedCode === 'JAIPUR10' || formattedCode === 'HERITAGE10') {
      setAppliedDiscount(0.10); // 10% exclusive discount
      setPromoSuccess('10% Patron appreciation discount applied.');
    } else if (formattedCode === 'ROYALDRAFT') {
      setAppliedDiscount(0.15); // 15% VIP discount
      setPromoSuccess('15% Atelier collection discount applied.');
    } else {
      setPromoError('This invitation code is invalid or has expired.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Cart Header Banner */}
        <div className="border-b border-stone-200 pb-8 mb-12">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#A68F81] font-bold">
            Atelier Curator Collection
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-[#080616] tracking-wide">
              Your Exhibition Bag
            </h1>
            {cartCount > 0 && (
              <button 
                onClick={handleClearCart}
                className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-800 transition-colors py-1 self-start md:self-auto border-b border-transparent hover:border-stone-400"
              >
                Relinquish All Items
              </button>
            )}
          </div>
        </div>

        {cartCount === 0 ? (
          <div className="max-w-xl mx-auto py-24 text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-stone-200 flex items-center justify-center bg-white/40 shadow-inner">
              <svg className="w-8 h-8 text-[#A68F81] stroke-[1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif text-stone-900 font-light tracking-wide mb-3">Your drape archive is empty</h2>
            <p className="text-sm text-stone-500 font-sans font-light leading-relaxed mb-10 max-w-sm mx-auto">
              You have not selected any handcrafted masterpieces yet. Explore our clay-resist Bagru prints and gold-wire zari threads.
            </p>
            <Link
              to="/sarees"
              className="inline-flex items-center justify-center px-10 py-4.5 bg-[#080616] text-[#FAF8F5] text-[11px] uppercase tracking-[0.25em] font-sans font-bold hover:bg-amber-950 transition-colors shadow-2xl"
            >
              Examine Sarees Archive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: LIST OF CART ITEMS */}
            <div className="lg:col-span-8 space-y-6">
              {activeCartItems.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`} 
                  className="bg-white border border-stone-200/60 rounded-[24px] p-5 sm:p-6 flex flex-col sm:flex-row gap-6 shadow-[0_4px_25px_-5px_rgba(26,18,12,0.03)] transition-all hover:border-stone-300"
                >
                  {/* Photo Canvas */}
                  <div className="w-full sm:w-28 h-36 rounded-2xl overflow-hidden border border-stone-100 flex-shrink-0 bg-stone-50">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  {/* Metadata Stack */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-[#A68F81] font-semibold">
                            {item.type}
                          </p>
                          <h3 className="font-serif text-lg text-[#080616] font-light tracking-wide mt-1">
                            {item.name}
                          </h3>
                        </div>
                        <button 
                          onClick={() => handleItemRemoval(index)}
                          className="p-1 text-stone-400 hover:text-red-700 transition-colors"
                          title="Relinquish Item"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 font-sans font-light mt-2 italic">
                        {item.details}
                      </p>
                    </div>

                    {/* Pricing Tag and Quantity Seal */}
                    <div className="flex items-end justify-between border-t border-stone-100 pt-4 mt-4">
                      <div className="flex items-center gap-1.5 text-stone-500 text-xs font-sans">
                        <PremiumSealIcon />
                        <span>Craftsmanship Guaranteed</span>
                      </div>
                      <p className="text-lg font-serif font-light text-stone-900 tracking-wide">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Gifting Box Customizer Block */}
              <div 
                onClick={() => setIsGiftWrapSelected(!isGiftWrapSelected)}
                className={`border rounded-3xl p-6 cursor-pointer transition-all flex items-start gap-5 ${
                  isGiftWrapSelected 
                    ? 'border-amber-800 bg-[#F5ECE2]/30 shadow-md' 
                    : 'border-stone-200/80 bg-white hover:border-stone-300 shadow-[0_4px_25px_-5px_rgba(26,18,12,0.03)]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100/50 flex items-center justify-center flex-shrink-0">
                  <GiftIcon />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-base text-[#080616] tracking-wide">
                      Heritage Pinewood Box Presentation
                    </h3>
                    <span className="text-xs font-serif font-light text-amber-900">
                      + ₹1,200
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-sans font-light leading-relaxed mt-1">
                    Encased in solid, sustainably-sourced pinewood bearing direct calligraphed notes on handmade rice-parchment envelopes. Ideal for wedding heirlooms.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={isGiftWrapSelected}
                      onChange={() => {}} // handled by parent div click
                      className="accent-amber-800 rounded border-stone-300" 
                    />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#A68F81]">
                      {isGiftWrapSelected ? 'Presentation Selected' : 'Add Heritage Packaging'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LUXURY ORDER SUMMARY CARD */}
            <div className="lg:col-span-4 bg-white border border-stone-200/80 rounded-[32px] p-6 sm:p-8 shadow-[0_15px_50px_-15px_rgba(26,18,12,0.05)] sticky top-36">
              <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-stone-800 border-b border-stone-100 pb-4 mb-6">
                Investment Ledger
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm font-sans font-light text-stone-600">
                  <span>Atelier Subtotal</span>
                  <span className="font-serif">₹{rawSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-sm font-sans font-medium text-emerald-800">
                    <span>Exclusive Invitation Discount</span>
                    <span className="font-serif">- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-sans font-light text-stone-600">
                  <span>Pinewood Packaging</span>
                  <span className="font-serif">
                    {isGiftWrapSelected ? `₹${giftWrappingCost.toLocaleString('en-IN')}` : 'Complimentary Silk Sleeve'}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-sans font-light text-stone-600">
                  <span>Estimated Taxes (GST 5%)</span>
                  <span className="font-serif">₹{complimentaryTax.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-sm font-sans font-light text-stone-600">
                  <span>Insured Express Courier</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    Free
                  </span>
                </div>

                {/* Main Total */}
                <div className="border-t border-stone-100 pt-5 mt-5 flex justify-between items-baseline">
                  <span className="text-stone-900 font-serif text-lg tracking-wide">Atelier Total</span>
                  <span className="text-2xl font-serif text-[#080616] tracking-wide font-light">
                    ₹{finalAtelierTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Promo invitation code input */}
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
                    className="flex-grow bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs tracking-wider uppercase font-medium focus:outline-none focus:border-stone-900 focus:bg-white transition-all placeholder:text-stone-300"
                  />
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-colors"
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

              {/* Secure Checkout Call To Action */}
              <div className="mt-8">
                <button 
                  onClick={() => onNotify("Routing checkout sequence safely via SSL pipeline...")}
                  className="w-full py-4.5 bg-[#080616] hover:bg-amber-950 text-white text-[11px] uppercase tracking-[0.25em] font-sans font-bold shadow-2xl transition-all duration-300 hover:shadow-amber-900/10 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <SecurityIcon />
                  Proceed to Secure Checkout
                </button>
                <p className="text-[9px] text-center text-stone-400 font-sans tracking-wide mt-3 flex items-center justify-center gap-1">
                  100% Encrypted Transactions. Secure client dockets.
                </p>
              </div>

              {/* Quick helper code notifications for testing */}
              <div className="mt-6 p-4 bg-amber-50/50 border border-amber-200/40 rounded-2xl text-[10px] text-stone-500 font-sans leading-relaxed">
                <span className="font-bold text-amber-800 uppercase block mb-1">Patron Sandbox Invitation Cards</span>
                Apply <strong className="text-stone-800 font-bold">JAIPUR10</strong> for a 10% appreciation credit or <strong className="text-stone-800 font-bold">ROYALDRAFT</strong> for a 15% luxury VIP draft credit!
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}