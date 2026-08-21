import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Star, Send, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

// 1. Added proper TypeScript Interface for Props
export interface ReviewFormProps {
  productId?: string;
  existingReview?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ReviewForm({ 
  productId: propProductId, 
  existingReview, 
  onSuccess, 
  onCancel 
}: ReviewFormProps) {
  const navigate = useNavigate();

  // Safely get auth token
  const { user, jwt } = useSelector((state: any) => state.auth);
  const authToken = jwt || (typeof window !== 'undefined' ? localStorage.getItem('jwt') : null);

  // Initialize state with existing review if editing, else defaults
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState(existingReview?.review || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Ensure we have a productId from props or fallback
    if (!propProductId) {
      setError('Product ID is missing. Cannot submit review.');
      return;
    }

    if (rating === 0) {
      setError('Please select a star rating before submitting.');
      return;
    }
    if (reviewText.trim().length < 10) {
      setError('Please share a few more words about your experience (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);
    try {
      // Determine if we are creating new or updating existing
      const endpoint = existingReview 
        ? `${API_BASE_URL}/reviews/update/${existingReview._id || existingReview.id}`
        : `${API_BASE_URL}/reviews/create`;

      await axios.post(
        endpoint,
        {
          productId: propProductId,
          rating,
          review: reviewText.trim(),
        },
        {
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
        }
      );
      
      setIsSubmitted(true);
      
      // Notify parent component if provided
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      }
    } catch (err: any) {
      const message = err.response?.data?.error || err.response?.data?.message || 'Failed to submit your review. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="dvreviewform min-h-screen bg-[#FAF9F6] w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .dvreviewform { font-family: 'Inter', sans-serif; }
        .dvreviewform__heading {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
        }
        .dvreviewform__star {
          transition: transform 0.15s ease;
        }
        .dvreviewform__star:hover {
          transform: scale(1.15);
        }
        .dvreviewform__input:focus {
          border-color: #9A7B56;
          box-shadow: 0 0 0 3px rgba(154, 123, 86, 0.12);
        }
      `}</style>

      {/* Header band */}
      <div className="bg-[#080616] py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C9AE87] hover:text-white transition-colors mb-6 border-none bg-transparent cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {onCancel ? 'Cancel' : 'Back'}
          </button>
          <div className="block">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C9AE87] font-semibold">
              <span className="w-6 h-[1.5px] bg-[#9A7B56]" />
              Share Your Experience
              <span className="w-6 h-[1.5px] bg-[#9A7B56]" />
            </span>
          </div>
          <h1 className="dvreviewform__heading text-3xl md:text-4xl text-white mt-4">
            {existingReview ? 'Update Your Review' : 'Write a Review'}
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">
            Your honest feedback helps other patrons discover the right piece — and helps our artisans too.
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-xl mx-auto px-4 -mt-10 pb-24">
        <div className="bg-white rounded-2xl shadow-[0_24px_50px_-30px_rgba(8,6,22,0.3)] border border-gray-100 p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#F4EFEA] rounded-full flex items-center justify-center mx-auto text-[#9A7B56]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="dvreviewform__heading text-xl text-[#080616]">Thank you for your review!</h2>
              <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                Your feedback has been submitted and will appear once it's been reviewed by our team.
              </p>
              {!onSuccess && (
                <button
                  onClick={() => navigate('/reviews')}
                  className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#9A7B56] hover:text-[#080616] transition-colors bg-transparent border-none cursor-pointer"
                >
                  View all reviews
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">
                  Reviewing as
                </p>
                <p className="dvreviewform__heading text-lg text-[#080616]">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Verified Buyer'}
                </p>
              </div>

              {/* Star rating */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
                  Your Rating
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="dvreviewform__star border-none bg-transparent cursor-pointer p-0"
                      aria-label={`Rate ${star} out of 5 stars`}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? 'fill-[#9A7B56] text-[#9A7B56]'
                            : 'text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review text */}
              <div>
                <label htmlFor="reviewText" className="block text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">
                  Your Review
                </label>
                <textarea
                  id="reviewText"
                  rows={5}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about the fabric, the fit, the print — what stood out to you?"
                  className="dvreviewform__input w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none box-border"
                />
                <p className="text-xs text-gray-400 mt-1.5">{reviewText.trim().length}/500 characters</p>
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#080616] hover:bg-[#9A7B56] text-white text-xs uppercase tracking-widest font-semibold py-3.5 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {existingReview ? 'Update Review' : 'Submit Review'}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}