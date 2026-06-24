import { useEffect, useMemo, useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { SareeProduct } from '../types/product';

type ProductCardProps = {
  product: SareeProduct;
  onQuickView: (product: SareeProduct) => void;
  layout?: 'grid' | 'list';
};

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString('en-IN')}`;
}

export default function ProductCard({
  product,
  onQuickView,
  layout = 'grid',
}: ProductCardProps) {
  const { addToCart } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = useMemo(
    () => (product.images.length > 0 ? product.images : ['']),
    [product.images]
  );

  useEffect(() => {
    if (!isHovered || images.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setCurrentImage((index) => (index + 1) % images.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [images.length, isHovered]);

  useEffect(() => {
    setCurrentImage(0);
  }, [product.id]);

  const isList = layout === 'list';

  return (
    <article
      className={`group overflow-hidden rounded-lg border border-luxury-gold/15 bg-white shadow-[0_12px_32px_-18px_rgba(26,26,26,0.22)] transition-all duration-500 hover:-translate-y-1 hover:border-luxury-gold/35 hover:shadow-[0_22px_48px_-22px_rgba(140,98,57,0.3)] ${
        isList ? 'sm:flex' : 'flex h-full flex-col'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden bg-luxury-cream ${
          isList ? 'aspect-[3/4] sm:w-64 sm:flex-shrink-0' : 'aspect-[3/4]'
        }`}
      >
        {images.map((image, index) => (
          <img
            key={`${product.id}-${image}-${index}`}
            src={image}
            alt={`${product.name} view ${index + 1}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105' : 'scale-100'} transition-transform duration-500`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/35 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 z-10">
          <span className="rounded bg-luxury-ivory/95 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-luxury-black shadow-sm backdrop-blur-sm">
            {product.fabric}
          </span>
        </div>

        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-ivory/90 text-luxury-black shadow-sm backdrop-blur-sm transition-colors duration-300 hover:text-luxury-crimson"
          aria-label={`Save ${product.name}`}
        >
          <Heart className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-luxury text-luxury-black opacity-100 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.25)] transition-opacity duration-300 hover:bg-luxury-black hover:text-white md:opacity-0 md:group-hover:opacity-100"
        >
          Quick View
        </button>

        {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={`${product.id}-dot-${index}`}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentImage ? 'w-5 bg-white' : 'w-1.5 bg-white/55'
              }`}
              aria-label={`Show ${product.name} image ${index + 1}`}
            />
          ))}
        </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5 p-5 text-left">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-epic text-luxury-gold">
            {product.category ?? product.fabric}
          </p>
          <h3 className="font-serif text-xl font-medium leading-tight tracking-wide text-luxury-black transition-colors duration-300 group-hover:text-luxury-clay">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-luxury-charcoal">
            {product.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-semibold text-luxury-black">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-light text-luxury-charcoal/45 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-luxury-crimson">
                {product.discount}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded bg-luxury-black px-4 py-3 text-[11px] font-semibold uppercase tracking-luxury text-luxury-ivory transition-colors duration-300 hover:bg-luxury-clay"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
