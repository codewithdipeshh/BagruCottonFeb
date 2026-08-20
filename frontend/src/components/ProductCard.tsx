import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { addItemToCart } from '../State/Cart/Action';

type ProductCardProps = {
  product: any;
  onQuickView: (product: any) => void;
  layout?: 'grid' | 'list';
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop";

function formatPrice(price: number) {
  return `₹${(price || 0).toLocaleString('en-IN')}`;
}

export default function ProductCard({
  product,
  onQuickView,
  layout = 'grid',
}: ProductCardProps) {
  const dispatch = useDispatch<any>();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const productId = product._id || product.id;

  const images = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images.map((img: string) => img || FALLBACK_IMAGE);
    }
    if (product.imageUrl) {
      return [product.imageUrl];
    }
    return [FALLBACK_IMAGE];
  }, [product.images, product.imageUrl]);

  useEffect(() => {
    if (!isHovered || images.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setCurrentImage((index) => (index + 1) % images.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [images.length, isHovered]);

  useEffect(() => {
    setCurrentImage(0);
  }, [productId]);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const itemData = {
      productId: productId,
      quantity: 1
    };
    dispatch(addItemToCart(itemData));
  };

  const handleAddToWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentWishlist = JSON.parse(localStorage.getItem('bagru_wishlist') || '[]');
    const isAlreadyInWishlist = currentWishlist.some((item: any) => item._id === productId);
    
    if (!isAlreadyInWishlist) {
      currentWishlist.push(product);
      localStorage.setItem('bagru_wishlist', JSON.stringify(currentWishlist));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  const isList = layout === 'list';

  return (
    <Link
      to={`/product/${productId}`}
      className={`group block overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_12px_32px_-18px_rgba(26,26,26,0.12)] hover:shadow-[0_24px_48px_-15px_rgba(247,218,150,0.18)] transition-all duration-500 hover:-translate-y-1 hover:border-[#F7DA96]/40 text-left ${
        isList ? 'sm:flex sm:gap-6 w-full' : 'flex h-full flex-col'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden bg-stone-50 ${
          isList ? 'aspect-[3/4] sm:w-72 sm:flex-shrink-0' : 'aspect-[3/4]'
        }`}
      >
        <div className="absolute inset-2.5 border border-[#F7DA96]/15 rounded-lg pointer-events-none z-10" />

        {images.map((image: string, index: number) => (
          <img
            key={`${productId}-${index}`}
            src={image}
            alt={`${product.title || 'Saree Masterpiece'} view ${index + 1}`}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105' : 'scale-100'} transition-transform duration-[1200ms]`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 z-20">
          <span className="rounded bg-black/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-medium text-[#F7DA96] border border-[#F7DA96]/20">
            {product.tag || 'Premium weave'}
          </span>
        </div>

        <button 
          type="button"
          onClick={handleAddToWishlistClick}
          aria-label="Add to Wishlist"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-stone-700 hover:text-red-500 flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105 active:scale-95 z-20"
        >
          <Heart className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleQuickViewClick}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/95 backdrop-blur-sm px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-black opacity-100 md:opacity-0 md:group-hover:opacity-100 shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-[#F7DA96] hover:text-black flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Quick View
        </button>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {images.map((_: any, index: number) => (
              <div
                key={`${productId}-dot-${index}`}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  index === currentImage ? 'w-6 bg-[#F7DA96]' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 justify-between gap-5 p-5">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F7DA96]">
            Atelier Curated
          </p>
          
          <h3 className="font-serif text-lg sm:text-xl font-normal leading-tight tracking-wide text-stone-900 group-hover:text-[#F7DA96] transition-colors duration-300 uppercase line-clamp-1">
            {product.title || product.name}
          </h3>
          
          <p className="line-clamp-2 text-xs font-light leading-relaxed text-stone-500 text-left">
            {product.description || product.philosophy}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="text-lg font-medium text-stone-900">
              {formatPrice(product.discountedPrice)}
            </span>
            {product.price && product.discountedPrice < product.price && (
              <>
                <span className="text-xs font-light text-stone-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2.5 py-0.5 rounded">
                  Save {product.discountPercent || Math.round(((product.price - product.discountedPrice) / product.price) * 100)}%
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCartClick}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-neutral-950 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:text-black transition-all duration-300 hover:bg-[#F7DA96] shadow-sm active:scale-98"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}