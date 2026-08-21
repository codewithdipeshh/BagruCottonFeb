import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Better TypeScript Interface updated with missing fields
export interface QuickViewProduct {
  _id?: string;
  id?: string;
  name: string;
  price?: number;
  discountedPrice: number;
  discountPercent?: number;
  images?: string[];
  tag?: string;
  philosophy?: string;
  fabric?: string;       
  description?: string;  
}

type QuickViewModalProps = {
  product: QuickViewProduct | null;
  onClose: () => void;
};

// Safe Price Formatter
function formatPrice(price: number | undefined) {
  if (price === undefined || price === null) return '₹0';
  return `₹${price.toLocaleString('en-IN')}`;
}

export default function QuickViewModal({
  product,
  onClose,
}: QuickViewModalProps) {
  const { addToCart } = useApp();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Reset state when a new product is opened
  useEffect(() => {
    if (!product) return;
    setSelectedImage(0);
    setQuantity(1);
  }, [product]);

  // Focus Trapping and Escape Key Logic
  useEffect(() => {
    if (!product) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, product]);

  // Early return if no product
  if (!product) return null;

  // Fallback for images if product doesn't have any
  const images = product.images && product.images.length > 0 ? product.images : ['/placeholder-image.jpg'];
  
  // Safely grab thumbnails
  const thumbnails = images
    .map((image: string, index: number) => ({ image, index }))
    .filter((item) => item.index !== selectedImage)
    .slice(0, 3);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleAddToCart = () => {
    // Type assertion used to bypass strict Context types
    addToCart(product as any, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product as any, quantity);
    onClose();
    navigate('/cart');
  };

  // Safe discount calculation
  const hasDiscount = product.price && product.discountedPrice < product.price;
  const calculatedDiscount = product.price 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;
  const displayDiscount = product.discountPercent || calculatedDiscount;

  return createPortal(
    <div
      className="quick-view-backdrop fixed inset-0 z-[1200] flex items-center justify-center p-0 md:p-6 transition-opacity duration-300"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={panelRef}
        className="quick-view-panel relative flex h-full w-full flex-col overflow-y-auto bg-stone-50 shadow-2xl outline-none md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-2xl md:grid md:grid-cols-[1.05fr_0.95fr] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow-md transition-colors duration-300 hover:bg-[#080616] hover:text-white"
          aria-label="Close quick view"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Side: Images */}
        <div className="bg-stone-100 p-4 sm:p-6 md:rounded-l-2xl">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-sm">
            {images.map((image: string, index: number) => (
              <img
                key={`${product._id || product.id}-main-${index}`}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={`quick-view-image absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
                  index === selectedImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
          </div>

          {thumbnails.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {thumbnails.map((thumb) => (
                <button
                  key={`${product._id || product.id}-thumb-${thumb.index}`}
                  type="button"
                  onClick={() => setSelectedImage(thumb.index)}
                  className="aspect-[3/4] overflow-hidden rounded-lg border border-transparent bg-white shadow-sm transition-all duration-300 hover:border-[#9A7B56] hover:shadow-md focus:border-[#080616] focus:outline-none"
                  aria-label={`Show ${product.name} image ${thumb.index + 1}`}
                >
                  <img
                    src={thumb.image}
                    alt={`${product.name} thumbnail ${thumb.index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Info */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 text-left bg-white md:rounded-r-2xl">
          <div>
            <span className="inline-flex rounded-md bg-[#080616] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D3B198]">
              {product.tag || 'Premium Collection'}
            </span>
            
            <h2
              id="quick-view-title"
              className="mt-4 font-serif text-3xl font-medium leading-tight tracking-wide text-stone-900 sm:text-4xl"
            >
              {product.name}
            </h2>
            
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-bold text-stone-900">
                {formatPrice(product.discountedPrice)}
              </span>
              
              {hasDiscount && (
                <>
                  <span className="text-sm font-medium text-stone-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    Save {displayDiscount}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-sm font-medium leading-relaxed text-stone-600 border-t border-gray-100 pt-5">
              {product.philosophy || "Handcrafted with precision, representing the rich cultural heritage and premium quality of our exclusive collection."}
            </p>

            <div className="mt-8">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
                Select Quantity
              </p>
              <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-12 w-12 items-center justify-center text-stone-600 transition-colors duration-300 hover:bg-gray-50 hover:text-[#080616]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-sm font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-12 w-12 items-center justify-center text-stone-600 transition-colors duration-300 hover:bg-gray-50 hover:text-[#080616]"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full rounded-xl bg-[#080616] px-5 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#9A7B56] shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full rounded-xl border-2 border-[#080616] bg-white px-5 py-4 text-xs font-bold uppercase tracking-widest text-[#080616] transition-all duration-300 hover:bg-[#080616] hover:text-white"
            >
              Buy Now
            </button>
            <div className="pt-4 text-center">
              <Link
                to={`/products/${product._id || product.id}`}
                onClick={onClose}
                className="inline-flex text-xs font-bold uppercase tracking-widest text-[#9A7B56] transition-colors duration-300 hover:text-[#080616]"
              >
                View Full Details &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}