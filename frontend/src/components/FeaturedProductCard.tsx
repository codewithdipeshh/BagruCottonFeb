import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Heart, ShoppingBag } from 'lucide-react';
import { addItemToCart } from '../State/Cart/Action';
import type { SareeProduct } from '../types/product';

type FeaturedProductCardProps = {
  product: SareeProduct;
  onQuickView: (product: SareeProduct) => void;
};

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString('en-IN')}`;
}

export default function FeaturedProductCard({
  product,
  onQuickView,
}: FeaturedProductCardProps) {
  const dispatch = useDispatch<any>();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images = useMemo(
    () => (product.images.length > 0 ? product.images : ['']),
    [product.images]
  );

  useEffect(() => {
    if (!isHovered || images.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setCurrentImage((index) => (index + 1) % images.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [images.length, isHovered]);

  useEffect(() => {
    if (!isHovered) setCurrentImage(0);
  }, [isHovered]);

  const handleAddToCartClick = () => {
  const itemData = {
    productId: (product as any)._id || product.id,
    quantity: 1
  };
  dispatch(addItemToCart(itemData));
};
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_8px_30px_-12px_rgba(26,26,26,0.12)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-14px_rgba(26,26,26,0.16)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[320px] w-full overflow-hidden rounded-t-[12px] bg-luxury-cream">
        {images.map((image, index) => (
          <img
            key={`${product.id}-${index}`}
            src={image}
            alt={`${product.name} view ${index + 1}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <span className="absolute left-3 top-3 z-10 rounded-[4px] bg-black/55 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-[2px]">
          {product.fabric}
        </span>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsWishlisted((value) => !value);
          }}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-luxury-black shadow-sm transition-colors duration-300 hover:text-luxury-crimson"
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? 'fill-luxury-crimson text-luxury-crimson' : ''}`}
          />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onQuickView(product);
          }}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-luxury-black shadow-[0_10px_28px_-8px_rgba(0,0,0,0.35)] transition-opacity duration-300 hover:bg-luxury-black hover:text-white md:opacity-0 md:group-hover:opacity-100"
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
                  index === currentImage ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
                aria-label={`Show ${product.name} image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5 p-5 text-left">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-luxury-clay">
            {product.fabric}
          </p>
          <h3 className="font-serif text-[1.35rem] font-medium leading-snug tracking-wide text-luxury-black">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-luxury-charcoal/80">
            {product.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="text-base font-semibold text-luxury-black">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-light text-luxury-charcoal/40 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCartClick}
            className="flex w-full items-center justify-center gap-2 bg-luxury-black px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}