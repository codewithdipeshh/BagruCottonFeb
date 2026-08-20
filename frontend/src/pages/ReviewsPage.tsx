import { useEffect, useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Star, Quote, X } from 'lucide-react';
import { getProductReviews, createReview } from '../State/Review/Action';

// ... staticFallbackReviews array ko waise hi rehne dein ...
// 🌟 Add this fallback array right above your ReviewsPage component function
const staticFallbackReviews = [
  {
    _id: "static_1",
    user: { firstName: 'Priya', lastName: 'Sharma' },
    rating: 5,
    review: 'Absolutely stunning saree! The quality is exceptional and the craftsmanship is visible in every thread. I received so many compliments.',
    createdAt: '2026-01-10',
  },
  {
    _id: "static_2",
    user: { firstName: 'Anjali', lastName: 'Patel' },
    rating: 5,
    review: 'The linen saree I purchased exceeded all my expectations. So comfortable and elegant. Perfect for both casual and formal occasions.',
    createdAt: '2026-01-08',
  }
];


  // ... aapka component code yahan se start hoga ...
export default function ReviewsPage() {
  const dispatch = useDispatch<any>();
  const [searchParams] = useSearchParams();

  // 🌟 1. Redux Store se live products aur reviews nikaliye
  const { products } = useSelector((state: any) => state.product || { products: [] });
  const { reviews, loading } = useSelector((state: any) => state.review || { reviews: [], loading: false });

  // 🌟 2. Real Dynamic ID Strategy: 
  // Pehle URL search params check karega, agar wahan nahi hai toh Redux store mein load hui kisi bhi pehli live saree ki real MongoDB _id utha lega!
  const finalProductsList = Array.isArray(products) ? products : products?.content || [];
  const firstLiveProductId = finalProductsList[0]?._id || finalProductsList[0]?.id;
  
  const productId = searchParams.get('productId') || firstLiveProductId;

  // Local Form Controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (productId) {
      dispatch(getProductReviews(productId));
    }
  }, [productId, dispatch]);

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (!productId) {
      alert("No active live product found to attach this review!");
      return;
    }

    const reviewData = {
      productId: productId, // 🌟 Live real ID pass hogi ab
      review: comment.trim(),
      rating: rating
    };

    dispatch(createReview(reviewData));
    
    setComment('');
    setRating(5);
    setIsModalOpen(false);
  };

  const finalReviewsArray = reviews && reviews.length > 0 ? reviews : staticFallbackReviews;

  return (
    <div className="bg-white min-h-screen pt-12">
      {/* HERO SECTION */}
      <section className="bg-[#080616] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Customer Reviews
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Real stories from real customers who have experienced the beauty of our handcrafted masterpieces.
          </p>
        </div>
      </section>

      {/* STATS HUD */}
      <section className="py-12 bg-[#E8EDF2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#080616]">5000+</p>
              <p className="text-gray-600 text-xs mt-1">Happy Patrons</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <p className="text-4xl font-bold text-[#080616]">4.9</p>
              </div>
              <p className="text-gray-600 text-xs">Average Metric</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#080616]">100+</p>
              <p className="text-gray-600 text-xs mt-1">Unique Drapes</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#080616]">50+</p>
              <p className="text-gray-600 text-xs mt-1">Artisan Units</p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS LIST RENDERING GRID */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">Loading Verified Reviews...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {finalReviewsArray.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-[#E8EDF2] rounded-2xl p-6 relative hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-[#080616]/10" />
                  
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm mb-6 leading-relaxed italic">
                      "{item.review || item.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-300/60 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                      {item.user?.firstName?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#080616]">
                        {item.user ? `${item.user.firstName} ${item.user.lastName || ''}` : 'Verified Buyer'}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WRITE A REVIEW OVERLAY ACTION */}
      <section className="py-16 bg-[#080616]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Share Your Experience</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm">
            Have you wrapped yourself in our pure organic heritage fabrics? We would love to hear your thoughts.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-white text-[#080616] text-sm font-semibold rounded-xl hover:bg-gray-100 active:scale-95 transition-all"
          >
            Write a Review
          </button>
        </div>
      </section>

      {/* WRITE REVIEW DIALOG MODAL BOX */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-left">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-stone-100 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-neutral-900 mb-2">Write a Masterpiece Review</h3>
            <p className="text-xs text-gray-500 mb-6">Your feedback directly touches our local weaver networks in Jaipur.</p>

            <form onSubmit={handleSubmitReview} className="space-y-5">
              {/* STAR SELECTION NODE */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">Star Assessment</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      onMouseEnter={() => setHoverRating(num)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-0.5 focus:outline-none transition-transform active:scale-125"
                    >
                      <Star 
                        className={`w-7 h-7 transition-colors ${
                          num <= (hoverRating || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* COMMENTS TEXTAREA */}
              <div>
                <label htmlFor="comment" className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">Detailed Critique</label>
                <textarea
                  id="comment"
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the drape comfort, print accuracy, mud-resist smell..."
                  className="w-full p-4 border border-stone-300 rounded-xl text-sm focus:outline-none focus:border-black bg-stone-50 transition-all resize-none"
                />
              </div>

              {/* ACTION COMPILING SUBMIT */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-neutral-800 transition-colors"
              >
                Compile & Post Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}