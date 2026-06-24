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
import type { SareeProduct } from '../types/product';

type QuickViewModalProps = {
  product: SareeProduct | null;
  onClose: () => void;
};

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString('en-IN')}`;
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

  const images = product.images.length > 0 ? product.images : [''];
  const thumbnails = images
    .map((image, index) => ({ image, index }))
    .filter((item) => item.index !== selectedImage)
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
        className="quick-view-panel relative flex h-full w-full flex-col overflow-y-auto bg-luxury-ivory shadow-2xl outline-none md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-lg md:grid md:grid-cols-[1.05fr_0.95fr]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-luxury-black shadow-md transition-colors duration-300 hover:bg-luxury-black hover:text-white"
          aria-label="Close quick view"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-luxury-cream p-4 sm:p-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded bg-white">
            {images.map((image, index) => (
              <img
                key={`${product.id}-main-${index}`}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={`quick-view-image absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  index === selectedImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {thumbnails.map((thumb) => (
              <button
                key={`${product.id}-thumb-${thumb.index}`}
                type="button"
                onClick={() => setSelectedImage(thumb.index)}
                className="aspect-[3/4] overflow-hidden rounded border border-luxury-gold/25 bg-white transition-all duration-300 hover:border-luxury-black"
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

        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <span className="inline-flex rounded bg-luxury-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-luxury text-luxury-clay">
              {product.fabric}
            </span>
            <h2
              id="quick-view-title"
              className="mt-4 font-serif text-3xl font-medium leading-tight tracking-wide text-luxury-black sm:text-4xl"
            >
              {product.name}
            </h2>
            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-semibold text-luxury-black">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-light text-luxury-charcoal/45 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="mt-5 text-sm font-light leading-7 text-luxury-charcoal">
              {product.description}
            </p>

            <div className="mt-7">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-epic text-luxury-gold">
                Quantity
              </p>
              <div className="inline-flex items-center rounded border border-luxury-gold/30 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-11 w-11 items-center justify-center text-luxury-black transition-colors duration-300 hover:bg-luxury-cream"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-sm font-semibold text-luxury-black">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-11 w-11 items-center justify-center text-luxury-black transition-colors duration-300 hover:bg-luxury-cream"
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
              className="w-full rounded bg-luxury-black px-5 py-3.5 text-xs font-bold uppercase tracking-luxury text-luxury-ivory transition-colors duration-300 hover:bg-luxury-clay"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full rounded border border-luxury-black px-5 py-3.5 text-xs font-bold uppercase tracking-luxury text-luxury-black transition-colors duration-300 hover:bg-luxury-black hover:text-luxury-ivory"
            >
              Buy Now
            </button>
            <Link
              to={`/products/${product.id}`}
              onClick={onClose}
              className="inline-flex text-xs font-semibold uppercase tracking-luxury text-luxury-clay transition-colors duration-300 hover:text-luxury-black"
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
