import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
import { getProductById } from '../data/products';
import { useApp } from '../context/AppContext';

function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'care'>('description');

  const product = getProductById(id ?? '');

  // Reset selected image when changing product
  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

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
        <Link
          to="/sarees"
          className="inline-flex rounded-xl bg-stone-950 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#F7DA96] hover:text-black transition-all duration-300"
        >
          Browse Heritage Collection
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [''];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-8 pb-20 select-none font-sans">
      
      {/* Editorial Breadcrumbs path */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-6">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <Link to="/sarees" className="hover:text-stone-900 transition-colors">Vault</Link>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className="text-stone-600 truncate">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {}
          {/* LEFT SIDE: MULTI-IMAGE VIEW STAGE */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm group">
              
              {/* Inner accent borderline to echo museum frames */}
              <div className="absolute inset-3 border border-[#F7DA96]/15 rounded-xl pointer-events-none z-10" />
              
              <img
                key={`${product.id}-${selectedImage}`}
                src={images[selectedImage]}
                alt={`${product.name} active preview`}
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-103"
              />
              
              {/* Subtle Ambient Shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Saree Craft Certification Stamp Overlay */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#F7DA96]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F7DA96]" />
                <span className="text-[9px] uppercase tracking-widest text-[#F7DA96] font-semibold">
                  Certified Handloom
                </span>
              </div>
            </div>

            {/* Premium Thumbnail Strip highlighting active indexes */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <button
                    key={`${product.id}-detail-thumb-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-[3/4] overflow-hidden rounded-xl bg-white transition-all duration-300 relative ${
                      index === selectedImage 
                        ? 'border-2 border-[#F7DA96] scale-102 ring-2 ring-[#F7DA96]/10' 
                        : 'border border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Switch to gallery image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {}
          {/* RIGHT SIDE: METADATA & PURCHASE ACTION RACK */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
            
            <div className="space-y-3">
              <span className="inline-flex rounded-md bg-stone-900 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#F7DA96] border border-[#F7DA96]/10">
                {product.fabric || 'Premium Handloom'}
              </span>
              
              <h1 className="font-serif text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-stone-900 uppercase">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-baseline gap-3 pt-1">
                <span className="text-2xl font-medium text-stone-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-light text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                
                {product.originalPrice && product.price < product.originalPrice && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2.5 py-0.5 rounded-md">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {}
            {/* TAB OPTIONS: Editorial Info layout switcher */}
            <div className="border-b border-stone-200 flex gap-6 text-xs uppercase tracking-wider font-semibold text-stone-400 pt-2">
              <button 
                onClick={() => setActiveTab('description')}
                className={`pb-2 transition-colors relative ${activeTab === 'description' ? 'text-stone-950 font-bold' : 'hover:text-stone-700'}`}
              >
                Philosophy
                {activeTab === 'description' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F7DA96]" />}
              </button>
              <button 
                onClick={() => setActiveTab('specifications')}
                className={`pb-2 transition-colors relative ${activeTab === 'specifications' ? 'text-stone-950 font-bold' : 'hover:text-stone-700'}`}
              >
                Specifications
                {activeTab === 'specifications' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F7DA96]" />}
              </button>
              <button 
                onClick={() => setActiveTab('care')}
                className={`pb-2 transition-colors relative ${activeTab === 'care' ? 'text-stone-950 font-bold' : 'hover:text-stone-700'}`}
              >
                Wash & Care
                {activeTab === 'care' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F7DA96]" />}
              </button>
            </div>

            {/* Dynamic tabs display block */}
            <div className="min-h-[100px] py-1">
              {activeTab === 'description' && (
                <p className="text-sm font-light leading-relaxed text-stone-600">
                  {product.description || 'This beautiful drape represents centuries of ancestral heritage, using block prints and organic dyes sourced locally from our master weaving clusters.'}
                </p>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-2 gap-4 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#F7DA96] flex-shrink-0" />
                    <span><strong>Length:</strong> 6.5 Meters (incl blouse)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F7DA96] flex-shrink-0" />
                    <span><strong>Weave:</strong> Authentic Handloom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-[#F7DA96] flex-shrink-0" />
                    <span><strong>Width:</strong> Standard 44 Inches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F7DA96] flex-shrink-0" />
                    <span><strong>Dyes:</strong> 100% Organic Herbal</span>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <p className="text-sm font-light leading-relaxed text-stone-600">
                  Dry Clean recommended for the first wash to preserve original zari threads and herbal resist dyes. Subsequently, hand wash separately in cold water with mild liquid detergents.
                </p>
              )}
            </div>

            {}
            {/* Quantity selection block */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#F7DA96] mb-2">
                  Select Quantity
                </p>
                <div className="inline-flex items-center rounded-xl border border-stone-200 bg-stone-50">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    className="flex h-10 w-10 items-center justify-center text-stone-600 hover:bg-stone-200 rounded-l-xl transition-colors active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 " />
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
                    <Plus className="h-3.5 " />
                  </button>
                </div>
              </div>

              {/* Handcrafted Guarantee Seal */}
              <div className="text-right flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-widest text-[#F7DA96] font-bold">Atelier Direct</span>
                <span className="text-xs text-stone-500 font-light mt-0.5">Jaipur Print Trails</span>
              </div>
            </div>

            {/* Double Solid CTAs */}
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
                <Link
                  to="/sarees"
                  className="inline-flex text-[10px] font-bold uppercase tracking-widest text-[#F7DA96] hover:text-black transition-colors"
                >
                  ← Back to Masterpieces
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
