import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Filter, ThumbsUp, ThumbsDown, Loader2, Image as ImageIcon, Verified, Trash2 } from 'lucide-react';
import { getAllReviews, getReviewSummary, markReviewHelpful, getUserReview, deleteReview } from '../State/Review/Action';
import ReviewForm from './ReviewForm';
import ReviewLightbox from './ReviewLightbox';
import { getImageUrl } from '../config/apiConfig';

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const dispatch = useDispatch<any>();
  const { reviews, reviewSummary, loading, userReview } = useSelector((state: any) => state.review);
  const { user } = useSelector((state: any) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Early return if productId is missing
  if (!productId) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
        <p className="text-stone-500 text-center">Unable to load reviews. Product ID is missing.</p>
      </div>
    );
  }

  useEffect(() => {
    if (!productId) return;
    
    dispatch(getReviewSummary(productId))
      .catch((err: any) => console.error('Failed to load review summary:', err));
    dispatch(getAllReviews(productId, { page: 1, limit: 5, sort: 'recent' }))
      .catch((err: any) => console.error('Failed to load reviews:', err));
    if (user) {
      dispatch(getUserReview(productId))
        .catch((err: any) => console.error('Failed to load user review:', err));
    }
  }, [productId, dispatch, user]);

  const handleFilterChange = (rating: number | null) => {
    setFilterRating(rating);
    setPage(1);
    setError(null);
    dispatch(getAllReviews(productId, { 
      rating: rating || undefined, 
      sort: sortBy, 
      page: 1, 
      limit: 5 
    }))
      .catch(() => setError('Failed to filter reviews'));
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setPage(1);
    setError(null);
    dispatch(getAllReviews(productId, { 
      rating: filterRating || undefined, 
      sort, 
      page: 1, 
      limit: 5 
    }))
      .catch(() => setError('Failed to sort reviews'));
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setError(null);
    dispatch(getAllReviews(productId, { 
      rating: filterRating || undefined, 
      sort: sortBy, 
      page: nextPage, 
      limit: 5 
    }))
      .catch(() => setError('Failed to load more reviews'));
  };

  const handleHelpfulVote = async (reviewId: string) => {
    try {
      const result = await dispatch(markReviewHelpful(reviewId));
      if (result.success) {
        dispatch(getAllReviews(productId, { 
          rating: filterRating || undefined, 
          sort: sortBy, 
          page, 
          limit: page * 5 
        }));
      } else {
        console.error('Failed to mark review as helpful:', result.error);
      }
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const openLightbox = (images: string[], index: number) => {
    if (!images || images.length === 0) return;
    const safeIndex = Math.min(Math.max(0, index), images.length - 1);
    setLightboxImages(images);
    setLightboxIndex(safeIndex);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setLightboxImages([]);
    setLightboxIndex(0);
  };

  const handleReviewSubmit = () => {
    setShowForm(false);
    setError(null);
    dispatch(getReviewSummary(productId))
      .catch(() => setError('Failed to load review summary'));
    dispatch(getAllReviews(productId, { page: 1, limit: 5, sort: 'recent' }))
      .catch(() => setError('Failed to load reviews'));
    if (user) {
      dispatch(getUserReview(productId))
        .catch(() => setError('Failed to load your review'));
    }
  };

  const handleDeleteReview = async () => {
    if (!userReview?._id) return;
    
    const confirmDelete = window.confirm("Are you sure you want to delete your review?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    setError(null);
    try {
      await dispatch(deleteReview(userReview._id));
      dispatch(getReviewSummary(productId));
      dispatch(getAllReviews(productId, { page: 1, limit: 5, sort: 'recent' }));
      dispatch(getUserReview(productId));
      setShowForm(false);
    } catch (error) {
      console.error(error);
      setError('Failed to delete your review');
    } finally {
      setIsDeleting(false);
    }
  };

  const ratingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-[#9A7B56] text-[#9A7B56]' : 'text-stone-300'}`}
      />
    ));
  };

  const filteredReviews = filterRating 
    ? (reviews || []).filter((r: any) => r.rating === filterRating)
    : (reviews || []);

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={() => setError(null)} className="text-red-600 text-sm underline mt-2">
            Dismiss
          </button>
        </div>
      )}

      {/* Review Summary */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
          <div>
            <h3 className="font-serif text-2xl text-stone-900 mb-2">Customer Reviews</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-stone-900 mr-2">
                  {reviewSummary?.averageRating?.toFixed(1) || '0.0'}
                </span>
                <div className="flex">
                  {ratingStars(Math.round(reviewSummary?.averageRating || 0))}
                </div>
              </div>
              <span className="text-stone-500">
                ({reviewSummary?.totalReviews || 0} reviews)
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            {user && !userReview && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-[#9A7B56] to-[#B8945F] text-white py-2 px-6 rounded-xl font-semibold hover:from-[#8A6B46] hover:to-[#A8844F] transition-all cursor-pointer"
              >
                Write a Review
              </button>
            )}
            {user && userReview && (
              <>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="border border-[#9A7B56] text-[#9A7B56] py-2 px-6 rounded-xl font-semibold hover:bg-[#9A7B56] hover:text-white transition-all cursor-pointer"
                >
                  Edit Your Review
                </button>
                <button
                  onClick={handleDeleteReview}
                  disabled={isDeleting}
                  className="border border-red-500 text-red-500 py-2 px-4 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviewSummary?.ratingDistribution?.[star] || 0;
            const total = reviewSummary?.totalReviews || 0;
            const percentage = total > 0 ? (count / total) * 100 : 0;
            
            return (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center w-16">
                  <span className="text-sm text-stone-600">{star}</span>
                  <Star className="w-4 h-4 ml-1 fill-[#9A7B56] text-[#9A7B56]" />
                </div>
                <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#9A7B56] to-[#B8945F] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-stone-500 w-12 text-right">
                  {Math.round(percentage)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {showForm && (
        <ReviewForm
          productId={productId}
          existingReview={userReview}
          onSuccess={handleReviewSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Filters and Sorting */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-stone-500" />
          <span className="text-sm font-semibold text-stone-700">Filter:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleFilterChange(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filterRating === null ? 'bg-[#9A7B56] text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => handleFilterChange(star)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  filterRating === star ? 'bg-[#9A7B56] text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {star}★
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-semibold text-stone-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-stone-300 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#9A7B56] cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      {loading && (!reviews || reviews.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#9A7B56] mb-4" />
          <p className="text-stone-500 text-sm">Loading reviews...</p>
        </div>
      ) : !filteredReviews || filteredReviews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
          <Star className="w-12 h-12 mx-auto text-stone-300 mb-4" />
          <p className="text-stone-600">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review: any) => {
            if (!review) return null;
            
            const isExpanded = expandedReviews.has(review._id);
            const shouldShowReadMore = review.review && review.review.length > 300;
            const isUserOwnReview = userReview && review._id === userReview._id;

            // 🔴 BULLETPROOF SAFE NAME EXTRACTOR (Handles strings, nulls, and undefined fields)
            const getUserDisplayName = (userField: any) => {
              if (!userField || typeof userField === 'string') return 'Valued Patron';
              
              // Handle firstName that might be literal "undefined" string or actual undefined
              let fName = '';
              if (userField.firstName) {
                const strFirstName = String(userField.firstName).trim();
                if (strFirstName && strFirstName !== 'undefined' && strFirstName !== 'null') {
                  fName = strFirstName;
                }
              }
              
              if (fName) return fName; // Only use firstName, remove lastName logic
              
              if (userField.email) return userField.email.split('@')[0];
              return 'Valued Patron';
            };

            const displayName = getUserDisplayName(review.user);

            return (
              <div key={review._id} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm relative text-left">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9A7B56] to-[#B8945F] flex items-center justify-center text-white font-semibold text-lg">
                      {displayName[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-stone-900">
                          {displayName}
                        </h4>
                        {review.verifiedPurchase && (
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <Verified className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {ratingStars(review.rating)}
                        </div>
                        <span className="text-sm text-stone-500">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isUserOwnReview && (
                    <button
                      onClick={handleDeleteReview}
                      disabled={isDeleting}
                      title="Delete your review"
                      className="text-stone-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <p className={`text-stone-700 leading-relaxed ${!isExpanded && shouldShowReadMore ? 'line-clamp-3' : ''}`}>
                    {review.review || 'No review text provided'}
                  </p>
                  {shouldShowReadMore && (
                    <button
                      onClick={() => toggleReviewExpansion(review._id)}
                      className="text-[#9A7B56] font-semibold text-sm mt-2 hover:underline cursor-pointer"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                {review.images && Array.isArray(review.images) && review.images.length > 0 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {review.images.map((image: string, index: number) => {
                      if (!image) return null;
                      const imageUrl = getImageUrl(image);
                      if (!imageUrl) return null;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => openLightbox(
                            review.images.map((img: string) => getImageUrl(img)).filter(Boolean),
                            index
                          )}
                          className="flex-shrink-0 relative group cursor-pointer"
                        >
                          <img
                            src={imageUrl}
                            alt={`Review image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border border-stone-200 group-hover:opacity-80 transition-opacity"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-lg">
                            <ImageIcon className="w-6 h-6 text-white" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                  <span className="text-sm text-stone-600">Was this helpful?</span>
                  <button
                    onClick={() => handleHelpfulVote(review._id)}
                    className="flex items-center gap-1 text-sm text-stone-600 hover:text-[#9A7B56] transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Yes ({review.helpfulVotes})</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-800 transition-colors cursor-pointer">
                    <ThumbsDown className="w-4 h-4" />
                    <span>No</span>
                  </button>
                </div>
              </div>
            );
          })}

          {page * 5 < reviewSummary.totalReviews && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-stone-100 text-stone-700 py-3 px-8 rounded-xl font-semibold hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More Reviews'
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {showLightbox && (
        <ReviewLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}