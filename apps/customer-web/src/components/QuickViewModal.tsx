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

type QuickViewModalProps = {
  product: any;
  onClose: () => void;
};

function formatPrice(price: number) {
  return `₹${(price || 0).toLocaleString('en-IN')}`;
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

  useEffect(() => {
    if (!product) return;
    setSelectedImage(0);
    setQuantity(1);
  }, [product]);

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

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [''];
  const thumbnails = images
    .map((image: string, index: number) => ({ image, index }))
    .filter((item: any) => item.index !== selectedImage)
    .slice(0, 3);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    navigate('/cart');
  };

  return createPortal(
    <div
      className="quick-view-backdrop fixed inset-0 z-[1200] flex items-center justify-center p-0 md:p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={panelRef}
        className="quick-view-panel relative flex h-full w-full flex-col overflow-y-auto bg-stone-50 shadow-2xl outline-none md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-lg md:grid md:grid-cols-[1.05fr_0.95fr]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow-md transition-colors duration-300 hover:bg-stone-900 hover:text-white"
          aria-label="Close quick view"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-stone-100 p-4 sm:p-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded bg-white">
            {images.map((image: string, index: number) => (
              <img
                key={`${product._id || product.id}-main-${index}`}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={`quick-view-image absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  index === selectedImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {thumbnails.map((thumb: any) => (
              <button
                key={`${product._id || product.id}-thumb-${thumb.index}`}
                type="button"
                onClick={() => setSelectedImage(thumb.index)}
                className="aspect-[3/4] overflow-hidden rounded border border-stone-200 bg-white transition-all duration-300 hover:border-stone-900"
                aria-label={`Show ${product.name} image ${thumb.index + 1}`}
              >
                <img
                  src={thumb.image}
                  alt={`${product.name} thumbnail ${thumb.index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 text-left bg-white">
          <div>
            <span className="inline-flex rounded bg-stone-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F7DA96]">
              {product.tag || 'Certified Handloom'}
            </span>
            <h2
              id="quick-view-title"
              className="mt-4 font-serif text-3xl font-medium leading-tight tracking-wide text-stone-900 sm:text-4xl uppercase"
            >
              {product.name}
            </h2>
            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-semibold text-stone-900">
                {formatPrice(product.discountedPrice)}
              </span>
              {product.price && product.discountedPrice < product.price && (
                <>
                  <span className="text-sm font-light text-stone-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                    Save {product.discountPercent || Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-sm font-light leading-7 text-stone-600">
              {product.philosophy}
            </p>

            <div className="mt-7">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#F7DA96]">
                Quantity
              </p>
              <div className="inline-flex items-center rounded border border-stone-200 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-11 w-11 items-center justify-center text-stone-900 transition-colors duration-300 hover:bg-stone-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-sm font-semibold text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-11 w-11 items-center justify-center text-stone-900 transition-colors duration-300 hover:bg-stone-100"
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
              className="w-full rounded-xl bg-stone-950 px-5 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#F7DA96] hover:text-black shadow-md"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full rounded-xl border border-stone-900 bg-white px-5 py-4 text-xs font-bold uppercase tracking-widest text-stone-900 transition-colors duration-300 hover:bg-stone-900 hover:text-white"
            >
              Buy Now
            </button>
            <div className="pt-2">
              <Link
                to={`/products/${product._id || product.id}`}
                onClick={onClose}
                className="inline-flex text-xs font-semibold uppercase tracking-widest text-[#F7DA96] transition-colors duration-300 hover:text-black"
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