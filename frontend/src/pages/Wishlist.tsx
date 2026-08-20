import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface WishlistItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  imageUrl: string;
  quantity: number;
}

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { cartCount } = useApp(); // If your app context tracks cart updates

  // 1. LocalStorage se wishlist items load karna on mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('bagru_wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  // 2. Wishlist se item remove karne ka function
  const handleRemoveFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter(item => item._id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('bagru_wishlist', JSON.stringify(updatedWishlist));
  };

  // 3. Move to Cart logic (Local Storage integration or API call later)
  const handleMoveToCart = (product: WishlistItem) => {
    // Puraane cart products fetch karein
    const currentCart = JSON.parse(localStorage.getItem('bagru_cart') || '[]');
    
    // Check karein agar product pehle se cart mein h ya nahi
    const isItemInCart = currentCart.find((item: any) => item._id === product._id);
    
    if (!isItemInCart) {
      currentCart.push({ ...product, selectedQuantity: 1 });
      localStorage.setItem('bagru_cart', JSON.stringify(currentCart));
      
      window.dispatchEvent(new Event('storage')); 
    }
    
    // Cart mein bejne ke baad wishlist se saaf kar do
    handleRemoveFromWishlist(product._id);
  };

  // --- EMPTY WISHLIST STATE VIEW ---
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-32 select-none">
        <div className="w-16 h-16 rounded-full bg-stone-50 flex items-center justify-center mb-6 animate-pulse">
          <Heart className="w-7 h-7 text-stone-300 stroke-[1.5]" />
        </div>
        <h2 className="text-xl font-serif font-medium text-neutral-900 tracking-wide mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs text-stone-500 font-sans tracking-wide max-w-sm text-center mb-8 leading-relaxed">
          Save your favourite premium handcrafted heritage sarees here to inspect or purchase them later.
        </p>
        <Link 
          to="/sarees" 
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-amber-800 transition-all shadow-md active:scale-95"
        >
          <span>Explore Collections</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  // --- WISHLIST GRID VIEW ---
  return (
    <div className="min-h-screen bg-stone-50/50 px-4 sm:px-6 lg:px-8 pt-36 pb-24 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b border-stone-200 pb-5 mb-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900 tracking-wide">
              Your Wishlist
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Review and manage your curated handloom items ({wishlistItems.length} items)
            </p>
          </div>
          <Link to="/sarees" className="text-xs font-semibold text-amber-800 hover:underline tracking-wider uppercase">
            Continue Shopping →
          </Link>
        </div>

        {/* Product Cards Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-md"
            >
              {/* Image Block */}
              <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Delete Button floating over image */}
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-stone-500 hover:text-red-600 hover:bg-white active:scale-90 transition-all"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Stock Warning Layer */}
                {product.quantity <= 3 && product.quantity > 0 && (
                  <span className="absolute bottom-3 left-3 bg-amber-50/90 backdrop-blur-sm border border-amber-200 text-amber-800 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                    Only {product.quantity} left
                  </span>
                )}
              </div>

              {/* Info Content Block */}
              <div className="p-4 flex-1 flex flex-col text-left">
                <h3 className="text-sm font-serif font-medium text-neutral-900 line-clamp-1 tracking-wide">
                  {product.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed font-sans h-8">
                  {product.description}
                </p>

                {/* Pricing Area */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-base font-semibold text-neutral-900">
                    ₹{product.discountedPrice}
                  </span>
                  {product.discountPercent > 0 && (
                    <>
                      <span className="text-xs text-stone-400 line-through">
                        ₹{product.price}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold tracking-wide">
                        ({product.discountPercent}% OFF)
                      </span>
                    </>
                  )}
                </div>

                {/* Interactive Action Node */}
                <div className="mt-5 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-amber-800 active:scale-98 transition-all shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move To Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}