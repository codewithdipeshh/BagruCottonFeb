import { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Minus, 
  Plus, 
  Trash2, 
  Gift, 
  Lock, 
  Check, 
  Sparkles, 
  ShoppingBag
} from 'lucide-react';

import { getCart, removeCartItem, updateCartItem } from '../State/Cart/Action'; 

function formatPrice(price: number) {
  return `₹${(price || 0).toLocaleString('en-IN')}`;
}

export default function Cart() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  
  const { cart, loading } = useSelector((state: any) => state.cart);

  const [isGiftWrapSelected, setIsGiftWrapSelected] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState('');

  const imageCacheRef = useRef<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const cartItems = useMemo(() => {
    return cart?.cartItems || [];
  }, [cart]);

  const rawSubtotal = useMemo(() => {
    return cartItems.reduce((acc: number, item: any) => {
      const price = item.product?.discountedPrice || item.product?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const giftWrappingCost = isGiftWrapSelected ? 1200 : 0;
  const complimentaryTax = Math.round(rawSubtotal * 0.05);
  
  const finalAtelierTotal = rawSubtotal + giftWrappingCost + complimentaryTax;

  const handleUpdateQuantity = (cartItemId: string, currentQuantity: number, step: number) => {
    const newQuantity = currentQuantity + step;
    if (newQuantity >= 1) {
      dispatch(updateCartItem({
        cartItemId,
        data: { quantity: newQuantity }
      }));
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    dispatch(removeCartItem(cartItemId));
  };

  const handleCheckoutNavigation = () => {
    setCheckoutNotice('Routing checkout sequence safely via SSL pipeline...');
    window.setTimeout(() => {
      setCheckoutNotice('');
      navigate('/checkout');
    }, 1000);
  };

  const getItemCachedImage = (item: any) => {
    const itemId = item?._id || item?.id;
    const product = item?.product;

    if (product && typeof product === 'object') {
      let foundUrl = '';
      if (product.imageUrls && Array.isArray(product.imageUrls) && product.imageUrls.length > 0 && product.imageUrls[0]) {
        foundUrl = product.imageUrls[0];
      } else if (product.images && Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
        foundUrl = product.images[0];
      } else if (product.imageUrl || product.image) {
        foundUrl = product.imageUrl || product.image;
      }

      if (foundUrl && itemId) {
        imageCacheRef.current[itemId] = foundUrl;
        return foundUrl;
      }
    }

    if (itemId && imageCacheRef.current[itemId]) {
      return imageCacheRef.current[itemId];
    }

    return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23cccccc" stroke-width="1"><rect width="24" height="24" rx="2" fill="%23f5f5f5"/></svg>';
  };

  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center font-serif text-stone-600">
        <div className="text-center space-y-3">
          <Sparkles className="w-6 h-6 animate-spin text-[#F7DA96] mx-auto" />
          <p className="text-xs uppercase tracking-[0.2em]">Curating Your Drape Archive...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-12 pb-24 select-none font-sans text-stone-900 antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="border-b border-stone-200 pb-8 mb-12 text-left">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#F7DA96] font-bold block mb-2.5">
            Atelier Curator Collection
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-stone-950 tracking-wide">
              Your Exhibition Bag
            </h1>
          </div>
        </div>

        {cartItems.length === 0 && !loading ? (
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
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-neutral-950 to-neutral-800 text-white text-[11px] uppercase tracking-[0.25em] font-bold hover:from-[#9A7B56] hover:to-[#B8956E] hover:text-black transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl no-underline"
            >
              Examine Sarees Archive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item: any) => {
                if (!item) return null;
                const itemId = item._id || item.id;
                const itemTitle = item.product?.title || item.product?.name || 'Handloom Masterpiece';
                const itemFabric = item.product?.fabric || (typeof item.product?.category === 'object' ? item.product?.category?.name : item.product?.category) || 'Handloom Heritage';
                const itemPrice = item.product?.discountedPrice || item.product?.price || 0;
                const itemDescription = item.product?.description || item.product?.philosophy || '';

                return (
                  <div
                    key={itemId}
                    className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row gap-6 shadow-[0_12px_32px_-18px_rgba(26,26,26,0.08)] hover:shadow-[0_20px_40px_-15px_rgba(247,218,150,0.12)] transition-all duration-500 hover:border-[#F7DA96]/30 text-left relative"
                  >
                    <div className="w-full sm:w-28 h-36 rounded-2xl overflow-hidden border border-stone-100 flex-shrink-0 bg-stone-50 relative">
                      <div className="absolute inset-1.5 border border-[#F7DA96]/10 rounded-xl pointer-events-none z-10" />
                      <img
                        src={getItemCachedImage(item)}
                        alt={itemTitle}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="flex-grow flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-[#F7DA96] font-bold">
                              {itemFabric}
                            </span>
                            <h3 className="font-serif text-lg text-stone-900 font-light tracking-wide mt-1 m-0">
                              {itemTitle}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(itemId)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300 border-none bg-transparent cursor-pointer outline-none"
                            title="Relinquish Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {itemDescription && (
                          <p className="text-xs text-stone-500 font-sans font-light mt-2 italic line-clamp-2 m-0">
                            {itemDescription}
                          </p>
                        )}
                      </div>

                      <div className="flex items-end justify-between border-t border-stone-100 pt-4 mt-auto gap-4">
                        <div className="inline-flex items-center rounded-xl border border-stone-200 bg-stone-50 p-1">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(itemId, item.quantity, -1)}
                            className="flex h-8 w-8 items-center justify-center text-stone-500 hover:text-black hover:bg-stone-200 rounded-lg transition-all border-none bg-transparent cursor-pointer outline-none"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[2.5rem] text-center text-xs font-semibold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(itemId, item.quantity, 1)}
                            className="flex h-8 w-8 items-center justify-center text-stone-500 hover:text-black hover:bg-stone-200 rounded-lg transition-all border-none bg-transparent cursor-pointer outline-none"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        
                        <p className="text-lg font-serif font-light text-stone-900 tracking-wide m-0">
                          {formatPrice(itemPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div
                onClick={() => setIsGiftWrapSelected(!isGiftWrapSelected)}
                className={`border rounded-3xl p-6 cursor-pointer transition-all duration-500 flex items-start gap-5 text-left ${
                  isGiftWrapSelected
                    ? 'border-[#F7DA96] bg-gradient-to-r from-[#FAF9F6] to-[#F5F3EF] shadow-lg shadow-[#F7DA96]/20'
                    : 'border-stone-200 bg-white hover:border-[#F7DA96]/70 hover:shadow-md shadow-[0_12px_32px_-18px_rgba(26,26,26,0.08)]'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isGiftWrapSelected 
                    ? 'bg-gradient-to-br from-[#F7DA96] to-[#B8956E] text-white shadow-lg' 
                    : 'bg-[#F7DA96]/10 text-[#F7DA96]'
                }`}>
                  <Gift className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-base text-stone-950 tracking-wide m-0">
                      Heritage Pinewood Box Presentation
                    </h3>
                    <span className="text-xs font-serif font-medium text-stone-900">
                      + ₹1,200
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-light leading-relaxed mt-1 m-0">
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

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleCheckoutNavigation}
                  className="w-full py-4 bg-gradient-to-r from-neutral-950 to-neutral-800 hover:from-[#9A7B56] hover:to-[#B8956E] text-white hover:text-black text-[11px] uppercase tracking-[0.25em] font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 rounded-xl border-none outline-none cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[2]" />
                  Secure Checkout
                </button>
                {checkoutNotice && (
                  <p className="text-sm text-center text-emerald-700 font-sans mt-3 m-0">
                    {checkoutNotice}
                  </p>
                )}
                <p className="text-[9px] text-center text-stone-400 font-sans tracking-wide mt-3 flex items-center justify-center gap-1 m-0">
                  100% Encrypted Transactions. Secure client dockets.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}