import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { addItemToCart } from '../State/Cart/Action';

type FeaturedProductCardProps = {
  product: any;
  onQuickView: (product: any) => void;
};

function formatPrice(price: number) {
  return `Rs. ${(price || 0).toLocaleString('en-IN')}`;
}

export default function FeaturedProductCard({
  product,
  onQuickView,
}: FeaturedProductCardProps) {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const displayTitle = product?.title || product?.name || 'Heritage Drape';
  const displayPrice = product?.discountedPrice || product?.price || 0;
  const originalPrice = product?.price || 0;

  const images = useMemo<string[]>(() => {
    if (!product) return [''];
    if (product?.imageUrls && Array.isArray(product.imageUrls) && product.imageUrls.length > 0) return product.imageUrls;
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) return product.images;
    if (product?.imageUrl) return [product.imageUrl];
    if (product?.image) return [product.image];
    return ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500'];
  }, [product]);

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

  const handleAddToCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const itemData = {
      productId: product?._id || product?.id,
      quantity: 1
    };
    dispatch(addItemToCart(itemData));
  };

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_8px_30px_-12px_rgba(26,26,26,0.12)] transition-shadow duration-300 hover:shadow-[0_16px_40px_-14px_rgba(26,26,26,0.16)] text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[320px] w-full overflow-hidden rounded-t-[12px] bg-stone-50">
        {images.map((image: string, index: number) => (
          <img
            key={`${product?._id || product?.id}-view-${index}`}
            src={image}
            alt={`${displayTitle} view ${index + 1}`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <span className="absolute left-3 top-3 z-10 rounded-[4px] bg-black/55 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-[2px]">
          {product?.fabric || (typeof product?.category === 'object' ? product?.category?.name : product?.category) || 'Premium Weave'}
        </span>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsWishlisted((value) => !value);
          }}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-950 shadow-sm transition-colors duration-300 hover:text-red-600 border-none outline-none cursor-pointer"
          aria-label={isWishlisted ? `Remove ${displayTitle} from wishlist` : `Save ${displayTitle}`}
        >
          <Heart
            className={`h-4 w-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`}
          />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onQuickView(product);
          }}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-950 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.35)] transition-opacity duration-300 hover:bg-neutral-950 hover:text-white md:opacity-0 md:group-hover:opacity-100 border-none cursor-pointer outline-none"
        >
          Quick View
        </button>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
            {images.map((_, index: number) => (
              <button
                key={`${product?._id || product?.id}-dot-${index}`}
                type="button"
                onClick={() => setCurrentImage(index)}
                className="h-1.5 rounded-full transition-all duration-300 border-none outline-none cursor-pointer w-1.5 bg-white/50"
                style={{ width: index === currentImage ? '20px' : '6px', backgroundColor: index === currentImage ? '#ffffff' : 'rgba(255,255,255,0.5)' }}
                aria-label={`Show ${displayTitle} image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-5 p-5 text-left">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-400">
            {product?.brand || 'Jaipur Print Trails'}
          </p>
          <h3 
            onClick={() => navigate(`/products/${product?._id || product?.id}`)}
            className="font-serif text-[1.35rem] font-medium leading-snug tracking-wide text-neutral-950 hover:text-[#9A7B56] transition-colors cursor-pointer"
          >
            {displayTitle}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs font-light leading-relaxed text-stone-500">
            {product?.description || 'No description provided.'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="text-base font-semibold text-neutral-950">
              {formatPrice(displayPrice)}
            </span>
            {originalPrice > displayPrice && (
              <span className="text-xs font-light text-stone-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCartClick}
            className="flex w-full items-center justify-center gap-2 bg-neutral-950 px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:opacity-90 active:scale-[0.99] border-none outline-none cursor-pointer rounded-lg"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}