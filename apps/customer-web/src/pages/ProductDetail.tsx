import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Ruler,
  Scissors,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { findProductById } from '../State/Product/Action';
import { useApp } from '../context/AppContext';

// High-end premium fallback luxury image for broken Cloudinary instances
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop";

function formatPrice(price: number) {
  return `₹${(price || 0).toLocaleString('en-IN')}`;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { addToCart } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'care'>('description');

  const { product, loading } = useSelector((state: any) => state.product);
  
  useEffect(() => {
    if (id) {
      dispatch(findProductById({ productId: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

  // ✅ FIX: useMemo ko conditional early returns se upar rakha hai
  // Isse har render mein hooks ka index aur execution order constant rahega
  const images = useMemo(() => {
    if (!product) return [FALLBACK_IMAGE];
    if (product.images && product.images.length > 0) {
      return product.images.map((img: string) => img || FALLBACK_IMAGE);
    }
    if (product.imageUrl) {
      return [product.imageUrl];
    }
    return [FALLBACK_IMAGE];
  }, [product]);

  // --- EARLY RENDER RETURNS (Hamesha saare Hooks ke niche hone chahiye) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 px-6 text-center flex flex-col items-center justify-center select-none font-sans">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-6">
          <Scissors className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-3xl text-stone-900 font-light tracking-wide mb-3">Masterpiece Not Found</h1>
        <p className="text-sm text-stone-500 max-w-sm mb-8 leading-relaxed">
          The requested drape is currently unavailable or has been acquired by a private collector.
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)} // Safe native back parameter layout navigation
          className="inline-flex rounded-xl bg-stone-950 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#F7DA96] hover:text-black transition-all duration-300"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-8 pb-20 select-none font-sans">
      {/* Breadcrumb Navigation Block */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-6">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className="hover:text-stone-900 transition-colors uppercase tracking-widest text-[10px] font-semibold"
          >
            Collection
          </button>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className="text-stone-600 truncate max-w-[150px] sm:max-w-none">{product.title || product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Layout Column: Gallery Panel */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm group">
              <div className="absolute inset-3 border border-[#F7DA96]/15 rounded-xl pointer-events-none z-10" />
              <img
                key={`${product._id || product.id}-${selectedImage}`}
                src={images[selectedImage]}
                alt={`${product.title || product.name} active preview`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className="h-full w-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#F7DA96]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F7DA96]" />
                <span className="text-[9px] uppercase tracking-widest text-[#F7DA96] font-semibold">
                  {product.tag || 'Certified Handloom'}
                </span>
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image: string, index: number) => (
                  <button
                    key={`${product._id || product.id}-detail-thumb-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-[3/4] overflow-hidden rounded-xl bg-white transition-all duration-300 relative ${index === selectedImage
                        ? 'border-2 border-[#F7DA96] scale-102 ring-2 ring-[#F7DA96]/10'
                        : 'border border-stone-200 opacity-60 hover:opacity-100'
                      }`}
                    aria-label={`Switch to gallery image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt=""
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="h-full w-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Layout Column: Data Information Panel */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
            <div className="space-y-3">
              <span className="inline-flex rounded-md bg-stone-900 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F7DA96] border border-[#F7DA96]/10">
                {product.category && typeof product.category === 'object'
                  ? product.category.name || 'Premium Handloom'
                  : (product.category || 'Premium Handloom').replace('_', ' ')}
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-stone-900 uppercase">
                {product.title || product.name}
              </h1>

              <div className="flex flex-wrap items-baseline gap-3 pt-1">
                <span className="text-2xl font-medium text-stone-900">
                  {formatPrice(product.discountedPrice)}
                </span>
                {product.price && product.discountedPrice < product.price && (
                  <>
                    <span className="text-sm font-light text-stone-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2.5 py-0.5 rounded-md">
                      Save {product.discountPercent || Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="border-b border-stone-200 flex gap-6 text-xs uppercase tracking-wider font-semibold text-stone-400 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('description')}
                className={`pb-2 transition-colors relative ${activeTab === 'description' ? 'text-stone-950 font-bold' : 'hover:text-stone-700'}`}
              >
                Philosophy
                {activeTab === 'description' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F7DA96]" />}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specifications')}
                className={`pb-2 transition-colors relative ${activeTab === 'specifications' ? 'text-stone-950 font-bold' : 'hover:text-stone-700'}`}
              >
                Specifications
                {activeTab === 'specifications' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F7DA96]" />}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('care')}
                className={`pb-2 transition-colors relative ${activeTab === 'care' ? 'text-stone-950 font-bold' : 'hover:text-stone-700'}`}
              >
                Wash & Care
                {activeTab === 'care' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F7DA96]" />}
              </button>
            </div>

            <div className="min-h-[100px] py-1">
              {activeTab === 'description' && (
                <p className="text-sm font-light leading-relaxed text-stone-600">
                  {product.description || product.philosophy || 'This beautiful drape represents centuries of ancestral heritage.'}
                </p>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-2 gap-4 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#F7DA96] flex-shrink-0" />
                    <span>{product.specifications || 'Material: Pure Cotton | Weave: Handloom'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F7DA96] flex-shrink-0" />
                    <span><strong>Stock Left:</strong> {product.quantity ?? 0} items</span>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <p className="text-sm font-light leading-relaxed text-stone-600">
                  {product.washCare || 'Gentle wash separately via organic metrics.'}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-left text-[10px] font-bold uppercase tracking-widest text-[#F7DA96] mb-2">
                  Select Quantity
                </p>
                <div className="inline-flex items-center rounded-xl border border-stone-200 bg-stone-50">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    className="flex h-10 w-10 items-center justify-center text-stone-600 hover:bg-stone-200 rounded-l-xl transition-colors active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5" />
                  </button>
                  <span className="min-w-[2.5rem] text-center text-xs font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    className="flex h-10 w-10 items-center justify-center text-stone-600 hover:bg-stone-200 rounded-r-xl transition-colors active:scale-95"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-widest text-[#F7DA96] font-bold">Atelier Direct</span>
                <span className="text-xs text-stone-500 font-light mt-0.5">Jaipur Print Trails</span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button
                type="button"
                onClick={() => addToCart(product, quantity)}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-neutral-950 px-5 py-4 text-xs font-bold uppercase tracking-wider text-white hover:text-black hover:bg-[#F7DA96] transition-all duration-300 shadow-md active:scale-98"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => {
                  addToCart(product, quantity);
                  navigate('/cart');
                }}
                className="w-full rounded-xl border border-stone-900 bg-white px-5 py-4 text-xs font-bold uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 active:scale-98"
              >
                Buy Now
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)} // ✅ Dynamic custom routing parameter match back behavior
                  className="inline-flex text-[10px] font-bold uppercase tracking-widest text-[#F7DA96] hover:text-black transition-colors"
                >
                  &larr; Back to Collection
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}