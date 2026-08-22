import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Send, CheckCircle2, X } from 'lucide-react';
import StarRating from './StarRating';
import ReviewImageUpload from './ReviewImageUpload';
import { createReview } from '../State/Review/Action';

type ReviewFormProps = {
  productId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  existingReview?: any;
};

export default function ReviewForm({
  productId,
  onSuccess,
  onCancel,
  existingReview,
}: ReviewFormProps) {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: any) => state.auth || {});

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [reviewText, setReviewText] = useState(existingReview?.review || '');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isFormValid = rating > 0 && reviewText.length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError('Please provide a rating and at least 10 characters for your review');
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        productId,
        rating,
        review: reviewText,
        images,
      };

      const result = await dispatch(createReview(reviewData));

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setRating(0);
          setReviewText('');
          setImages([]);
          onSuccess?.();
        }, 2000);
      } else {
        setError(result.error || 'Failed to submit review');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setReviewText('');
    setImages([]);
    setError(null);
    onCancel?.();
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">
          Review Submitted Successfully!
        </h3>
        <p className="text-emerald-700 text-sm">
          Thank you for sharing your experience.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#F7DA96] flex items-center justify-center text-stone-900 font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div>
            <p className="font-medium text-stone-900">{user?.name || 'User'}</p>
            <p className="text-xs text-stone-500">Verified Buyer</p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-900 mb-2">
          Your Rating <span className="text-red-500">*</span>
        </label>
        <StarRating rating={rating} setRating={setRating} />
        {rating === 0 && (
          <p className="text-xs text-red-500 mt-1">Please select a rating</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-900 mb-2">
          Your Review <span className="text-red-500">*</span>
        </label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
          className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#F7DA96] focus:border-transparent resize-none"
          required
          minLength={10}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-stone-500">
            {reviewText.length < 10 ? `Minimum 10 characters (${reviewText.length}/10)` : '✓ Minimum reached'}
          </p>
          <p className="text-xs text-stone-500">
            {reviewText.length}/1000
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-900 mb-2">
          Add Photos (Optional)
        </label>
        <ReviewImageUpload images={images} setImages={setImages} maxImages={5} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm flex items-start gap-2">
          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full bg-gradient-to-r from-[#F7DA96] to-[#E5C488] text-stone-900 font-semibold py-3 px-6 rounded-xl hover:from-[#E5C488] hover:to-[#D4B376] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Review
          </>
        )}
      </button>
    </form>
  );
}