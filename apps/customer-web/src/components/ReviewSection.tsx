import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Star, Filter, ChevronDown, ThumbsUp, Trash2, Edit, X, ZoomIn } from 'lucide-react';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import { getReviews, getReviewSummary, deleteReview, getUserReview } from '../State/Review/Action';

type ReviewSectionProps = {
  productId: string;
  user?: any;
};

type ReviewStats = {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: { [key: string]: number };
  ratingPercentages: { [key: string]: number };
};

export default function ReviewSection({ productId, user }: ReviewSectionProps) {
  const dispatch = useDispatch<any>();
  const [reviews, setReviews] = useState<any[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [existingReview, setExistingReview] = useState<any>(null);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('recent');
  const [displayedReviews, setDisplayedReviews] = useState(5);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    loadReviews();
    loadReviewStats();
    if (user) {
      loadUserReview();
    }
  }, [productId, user]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getReviews(productId, { rating: filterRating, sort: sortBy }));
      const reviewsData = result?.data || result || [];
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
    } catch (error) {
      console.error('Failed to load reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const loadReviewStats = async () => {
    try {
      const result = await dispatch(getReviewSummary(productId));
      if (result?.data) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Failed to load review stats:', error);
    }
  };

  const loadUserReview = async () => {
    try {
      const result = await dispatch(getUserReview(productId));
      if (result?.data) {
        setExistingReview(result.data);
      }
    } catch (error) {
      console.error('Failed to load user review:', error);
      setExistingReview(null);
    }
  };

  const handleHelpfulVote = async (reviewId: string) => {
    try {
      // Call API to mark review as helpful
      console.log('Marking review as helpful:', reviewId);
    } catch (error) {
      console.error('Failed to mark review as helpful:', error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const result = await dispatch(deleteReview(reviewId));
      if (result.success) {
        setExistingReview(null);
        loadReviews();
        loadReviewStats();
        loadUserReview(); // Reload user's review after deletion
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  const handleEditReview = () => {
    setShowForm(true);
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = Array.isArray(reviews) ? [...reviews] : [];

    if (filterRating) {
      filtered = filtered.filter(review => review.rating === filterRating);
    }

    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'helpful':
        filtered.sort((a, b) => (b.helpfulVotes || 0) - (a.helpfulVotes || 0));
        break;
      case 'highest':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'lowest':
        filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
    }

    return filtered;
  };

  const filteredReviews = getFilteredAndSortedReviews();
  const visibleReviews = filteredReviews.slice(0, displayedReviews);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-[#F7DA96] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      {stats && (
        <div className="bg-gradient-to-br from-stone-50 to-[#F7DA96]/10 rounded-2xl p-6 border border-[#F7DA96]/20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-baseline gap-2 justify-center md:justify-start">
                <span className="text-5xl font-bold text-stone-900">
                  {stats.averageRating || 0}
                </span>
                <span className="text-2xl text-stone-600">/5</span>
              </div>
              <div className="flex justify-center md:justify-start mt-2">
                <StarRating rating={Math.round(stats.averageRating || 0)} setRating={() => {}} readonly />
              </div>
              <p className="text-sm text-stone-600 mt-2">
                Based on {stats.totalReviews || 0} reviews
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{star}</span>
                    <Star className="w-4 h-4 fill-[#F7DA96] text-[#F7DA96]" />
                  </div>
                  <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F7DA96] rounded-full transition-all duration-500"
                      // FIX: Added optional chaining and fallback to 0 to prevent crash
                      style={{ width: `${stats.ratingPercentages?.[star] || 0}%` }}
                    />
                  </div>
                  <span className="text-sm text-stone-600 w-12 text-right">
                    {/* FIX: Added optional chaining and fallback to 0 */}
                    {stats.ratingPercentages?.[star] || 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-stone-900">
            Customer Reviews ({stats?.totalReviews || 0})
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-stone-300 rounded-lg hover:border-[#F7DA96] transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">
                {filterRating ? `${filterRating}★` : 'All Ratings'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showFilterDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 rounded-lg shadow-lg z-10 min-w-[150px]">
                <button
                  type="button"
                  onClick={() => {
                    setFilterRating(null);
                    setShowFilterDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-stone-50 text-sm"
                >
                  All Ratings
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => {
                      setFilterRating(rating);
                      setShowFilterDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 text-sm flex items-center gap-2"
                  >
                    {rating}★
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg hover:border-[#F7DA96] transition-colors text-sm"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>

          {/* Write Review Button */}
          {user ? (
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-gradient-to-r from-[#F7DA96] to-[#E5C488] text-stone-900 font-medium rounded-lg hover:from-[#E5C488] hover:to-[#D4B376] transition-all duration-300"
            >
              {showForm ? 'Cancel' : existingReview ? 'Edit Review' : 'Write Review'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => alert('Please login to write a review')}
              className="px-4 py-2 bg-gradient-to-r from-[#F7DA96] to-[#E5C488] text-stone-900 font-medium rounded-lg hover:from-[#E5C488] hover:to-[#D4B376] transition-all duration-300"
            >
              Login to Write Review
            </button>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <ReviewForm
            productId={productId}
            onSuccess={() => {
              setShowForm(false);
              loadReviews();
              loadReviewStats();
              loadUserReview(); // Reload user's review after submission
            }}
            onCancel={() => setShowForm(false)}
            existingReview={existingReview}
          />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {visibleReviews.length === 0 ? (
          <div className="text-center py-12 text-stone-500">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          visibleReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-stone-200 rounded-xl p-6 hover:border-[#F7DA96]/30 transition-colors"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* FIX: Added safe access to user properties */}
                  {review?.user?.avatar ? (
                    <img
                      src={review.user.avatar}
                      alt={review.user.name || review.user.firstName || 'User'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#F7DA96] flex items-center justify-center text-stone-900 font-semibold">
                      {review?.user?.firstName ? review.user.firstName.charAt(0).toUpperCase() : 
                       review?.user?.name ? review.user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-stone-900">
                      {review?.user?.firstName && review?.user?.lastName 
                        ? `${review.user.firstName} ${review.user.lastName}` 
                        : review?.user?.name || 'Anonymous User'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.rating || 0} setRating={() => {}} readonly size="sm" />
                      {review.verifiedPurchase && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-stone-500">
                  {new Date(review.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-stone-700 mb-4 leading-relaxed">
                {review.review || 'No text provided.'}
              </p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setLightboxImage(image)}
                      className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-200 hover:border-[#F7DA96] transition-colors"
                    >
                      <img
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center transition-colors">
                        <ZoomIn className="w-4 h-4 text-white opacity-0 hover:opacity-100" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Helpful Votes & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => handleHelpfulVote(review._id)}
                  className="flex items-center gap-2 text-sm text-stone-600 hover:text-[#F7DA96] transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpfulVotes || 0})
                </button>

                {/* User's own review actions */}
                {user && (review.user?._id === user._id || review.user?.id === user._id) && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleEditReview}
                      className="flex items-center gap-1 text-sm text-stone-600 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(review._id)}
                      className="flex items-center gap-1 text-sm text-stone-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredReviews.length > displayedReviews && (
        <button
          type="button"
          onClick={() => setDisplayedReviews(prev => prev + 5)}
          className="w-full py-3 border border-stone-300 rounded-xl text-stone-700 hover:border-[#F7DA96] hover:text-stone-900 transition-colors"
        >
          Load More Reviews
        </button>
      )}

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-[#F7DA96] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Review image"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}