import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingBag, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { getWishlist, removeWishlistItem } from '../State/Wishlist/Action';
import { addItemToCart } from '../State/Cart/Action';

interface WishlistItem {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  discountPercent?: number;
  imageUrl?: string;
  image?: string;
  images?: string[];
  quantity?: number;
  philosophy?: string;
}

export default function Wishlist() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  
  // FIX: Clean and optimized Redux selectors to prevent selector re-render warnings
  const wishlistState = useSelector((state: any) => state.wishlist || {});
  const wishlistItems = wishlistState?.wishlistItems || [];
  const loading = wishlistState?.loading || false;

  const authState = useSelector((state: any) => state.auth || {});
  const jwt = authState?.jwt || localStorage.getItem('jwt');

  useEffect(() => {
    if (jwt) {
      dispatch(getWishlist());
    }
  }, [dispatch, jwt]);

  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeWishlistItem(id));
    // Auto-sync wishlist state after removal
    setTimeout(() => {
      dispatch(getWishlist());
    }, 400);
  };

  const handleMoveToCart = (product: WishlistItem) => {
    const productId = product._id || product.id;
    if (productId) {
      dispatch(addItemToCart({ productId, quantity: 1 }));
      dispatch(removeWishlistItem(productId));
      
      // Auto-sync state
      setTimeout(() => {
        dispatch(getWishlist());
      }, 400);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const getImageUrl = (item: WishlistItem) => {
    if (item.imageUrl) return item.imageUrl;
    if (item.image) return item.image;
    if (item.images && item.images.length > 0) return item.images[0];
    return 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop';
  };

  const formatPrice = (price: number) => {
    return `₹${(price || 0).toLocaleString('en-IN')}`;
  };

  if (!jwt) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center pt-36">
        <Heart className="w-16 h-16 mx-auto text-stone-300 mb-4" />
        <h2 className="text-2xl font-semibold text-stone-900 mb-2">Please Login to View Wishlist</h2>
        <p className="text-stone-600 mb-6">You need to be logged in to view your wishlist items.</p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 bg-[#F7DA96] text-stone-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#E5C488] transition-colors no-underline"
        >
          Login to Continue
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (loading && wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#F7DA96]" />
      </div>
    );
  }

  const safeWishlistItems = Array.isArray(wishlistItems) ? wishlistItems : [];

  // --- EMPTY WISHLIST STATE VIEW ---
  if (safeWishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-36 select-none">
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
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-amber-800 transition-all shadow-md active:scale-95 no-underline"
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
              Review and manage your curated handloom items ({safeWishlistItems.length} items)
            </p>
          </div>
          <Link to="/sarees" className="text-xs font-semibold text-amber-800 hover:underline tracking-wider uppercase no-underline">
            Continue Shopping →
          </Link>
        </div>

        {/* Product Cards Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {safeWishlistItems.map((product: any) => {
            if (!product) return null;
            const productData = product._id ? product : product;
            const productId = productData._id || productData.id;
            const imageUrl = getImageUrl(productData);
            const title = productData.title || productData.name || 'Heritage Saree';
            const price = productData.price || 0;
            const discountedPrice = productData.discountedPrice || price;
            const discountPercent = productData.discountPercent || (price > 0 ? Math.round(((price - discountedPrice) / price) * 100) : 0);

            return (
              <div 
                key={productId} 
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-md"
              >
                {/* Image Block */}
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => handleProductClick(productId)}>
                  <img 
                    src={imageUrl} 
                    alt={title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Delete Button floating over image */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWishlist(productId);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-stone-500 hover:text-red-600 hover:bg-white active:scale-90 transition-all border-none cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Stock Warning Layer */}
                  {productData.quantity <= 3 && productData.quantity > 0 && (
                    <span className="absolute bottom-3 left-3 bg-amber-50/90 backdrop-blur-sm border border-amber-200 text-amber-800 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                      Only {productData.quantity} left
                    </span>
                  )}
                </div>

                {/* Info Content Block */}
                <div className="p-4 flex-1 flex flex-col text-left">
                  <h3 
                    className="text-sm font-serif font-medium text-neutral-900 line-clamp-1 tracking-wide cursor-pointer hover:text-amber-800 m-0"
                    onClick={() => handleProductClick(productId)}
                  >
                    {title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed font-sans h-8 m-0">
                    {productData.description || productData.philosophy || 'Premium handcrafted heritage saree'}
                  </p>

                  {/* Pricing Area */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-base font-semibold text-neutral-900">
                      {formatPrice(discountedPrice)}
                    </span>
                    {discountPercent > 0 && (
                      <>
                        <span className="text-xs text-stone-400 line-through">
                          {formatPrice(price)}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold tracking-wide">
                          ({discountPercent}% OFF)
                        </span>
                      </>
                    )}
                  </div>

                  {/* Interactive Action Node */}
                  <div className="mt-5 pt-3 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => handleMoveToCart(productData)}
                      className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-amber-800 active:scale-98 transition-all shadow-sm cursor-pointer border-none outline-none"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move To Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}