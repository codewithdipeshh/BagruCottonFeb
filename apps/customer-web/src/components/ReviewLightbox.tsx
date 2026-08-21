import { useEffect, useState } from 'react';
import { X, Star, Quote, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

// Exported ReviewData so it can be used in ReviewSection
export interface ReviewData {
  _id?: string;
  id?: string | number;
  name?: string;
  user?: { firstName?: string; lastName?: string };
  location?: string;
  rating: number;
  review: string;
  productTitle?: string;
  product?: { title?: string } | string;
  createdAt?: string;
  date?: string;
  images?: string[];
}

export interface ReviewLightboxProps {
  // Added images and reviews props to match both usage scenarios safely
  images?: string[]; 
  reviews?: ReviewData[];
  currentIndex: number;
  onClose: () => void;
  onNavigate?: (nextIndex: number) => void;
}

export default function ReviewLightbox({ 
  reviews, 
  images: directImages, 
  currentIndex, 
  onClose, 
  onNavigate 
}: ReviewLightboxProps) {
  const [activeImage, setActiveImage] = useState(0);

  const review = reviews && reviews.length > 0 ? reviews[currentIndex] : null;
  const reviewImages = review && review.images && review.images.length > 0 ? review.images : [];
  const displayImages = directImages && directImages.length > 0 ? directImages : reviewImages;

  const totalItems = reviews ? reviews.length : (displayImages ? displayImages.length : 0);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalItems - 1;

  // Reset the active photo whenever the index changes
  useEffect(() => {
    setActiveImage(0);
  }, [currentIndex]);

  // Keyboard navigation: Escape to close, arrows to move between reviews/photos
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (onNavigate) {
        if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1);
        if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [hasNext, hasPrev, currentIndex, onClose, onNavigate]);

  // If no data is available to display
  if (!review && (!displayImages || displayImages.length === 0)) return null;

  const userName = review?.user
    ? `${review.user.firstName || ''} ${review.user.lastName || ''}`.trim()
    : review?.name || 'Verified Buyer';
  const productName =
    (typeof review?.product === 'object' ? review?.product?.title : review?.product) ||
    review?.productTitle ||
    'Cotton Saree';
  const reviewDate = review?.createdAt
    ? new Date(review.createdAt).toLocaleDateString()
    : review?.date || 'Recently';

  const handleNavigation = (index: number) => {
    if (onNavigate) {
      onNavigate(index);
    } else {
      setActiveImage(index);
    }
  };

  // Simplified Gallery View when only images are passed (no reviews)
  if (!review && displayImages && displayImages.length > 0) {
    return (
      <div className="dvlightbox fixed inset-0 z-[999] flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-[#080616]/90 backdrop-blur-md" onClick={onClose} />
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {displayImages.length > 1 && currentIndex > 0 && (
          <button
            onClick={() => handleNavigation(currentIndex - 1)}
            className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="relative z-40 max-w-5xl max-h-[85vh] flex items-center justify-center">
           <img
            src={displayImages[currentIndex] || displayImages[activeImage]}
            alt="Product view"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        {displayImages.length > 1 && currentIndex < displayImages.length - 1 && (
          <button
            onClick={() => handleNavigation(currentIndex + 1)}
            className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    );
  }

  // Full Review View
  return (
    <div className="dvlightbox fixed inset-0 z-[999] flex items-center justify-center p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .dvlightbox { font-family: 'Inter', sans-serif; }
        .dvlightbox__heading { font-family: 'Playfair Display', serif; font-weight: 700; }
        @keyframes dvlightbox-in {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .dvlightbox__card { animation: dvlightbox-in 0.25s ease-out; }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080616]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Prev / Next arrows */}
      {hasPrev && (
        <button
          type="button"
          onClick={() => handleNavigation(currentIndex - 1)}
          aria-label="Previous review"
          className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={() => handleNavigation(currentIndex + 1)}
          aria-label="Next review"
          className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Modal card */}
      <div className="dvlightbox__card relative z-10 w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#080616] shadow-md border-none cursor-pointer transition-colors"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Photo side */}
        <div className="relative bg-[#F2EDE7] flex items-center justify-center min-h-[260px] md:min-h-full">
          {displayImages.length > 0 ? (
            <>
              <img
                src={displayImages[activeImage]}
                alt={`${userName}'s photo of ${productName}`}
                className="w-full h-full object-cover md:absolute md:inset-0"
              />
              {displayImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {displayImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`View photo ${i + 1}`}
                      className={`w-1.5 h-1.5 rounded-full transition-all border-none cursor-pointer ${
                        i === activeImage ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#9A7B56]/50 py-16">
              <ImageOff className="w-8 h-8" />
              <p className="text-xs uppercase tracking-wider">No photos shared</p>
            </div>
          )}
        </div>

        {/* Details side */}
        <div className="p-8 flex flex-col">
          <Quote className="w-8 h-8 text-[#080616]/10 mb-4" fill="currentColor" />

          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < (review?.rating || 0) ? 'fill-[#9A7B56] text-[#9A7B56]' : 'text-gray-200'}`}
              />
            ))}
          </div>

          <p className="text-gray-700 text-sm leading-relaxed flex-grow">"{review?.review}"</p>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="dvlightbox__heading text-lg text-[#080616]">{userName}</p>
            <p className="text-xs text-gray-500 mt-0.5">{review?.location || 'India'}</p>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-gray-600">
                Purchased: <span className="font-medium text-[#9A7B56] uppercase">{productName}</span>
              </p>
              <p className="text-xs text-gray-400">{reviewDate}</p>
            </div>
          </div>

          {/* Mobile prev/next */}
          <div className="flex sm:hidden items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => hasPrev && handleNavigation(currentIndex - 1)}
              disabled={!hasPrev}
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-500 disabled:opacity-30 border-none bg-transparent cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-xs text-gray-400">{currentIndex + 1} / {totalItems}</span>
            <button
              type="button"
              onClick={() => hasNext && handleNavigation(currentIndex + 1)}
              disabled={!hasNext}
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-500 disabled:opacity-30 border-none bg-transparent cursor-pointer disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}