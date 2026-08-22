import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Star, Loader2, Image as ImageIcon, Eye, X} from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // 1. Fetch All Reviews (Jo humne getGlobalReviews API banayi thi)
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('admin_jwt');
      const response = await axios.get('http://localhost:5454/api/admin/reviews', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 2. Delete Review Handler
  const handleDelete = async (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('admin_jwt');
        await axios.delete(`http://localhost:5454/api/admin/reviews/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Delete hone ke baad table se us review ko turant hata dein
        setReviews(reviews.filter((review) => review._id !== reviewId));
        setShowDetailsModal(false);
        alert('Review deleted successfully');
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review. Make sure you are logged in as Admin.');
      }
    }
  };

  // 3. View Review Details
  const handleViewDetails = (review: any) => {
    setSelectedReview(review);
    setShowDetailsModal(true);
  };

  // 4. Filter reviews by rating
  const filteredReviews = filterRating 
    ? reviews.filter(review => review.rating === filterRating)
    : reviews;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and moderate reviews left by your customers.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-sm font-medium text-gray-600">Total Reviews: </span>
              <span className="text-lg font-bold text-[#080616]">{reviews.length}</span>
            </div>
            <div className="relative">
              <select
                value={filterRating || 'all'}
                onChange={(e) => setFilterRating(e.target.value === 'all' ? null : parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#080616]"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4 min-w-[300px]">Review</th>
                  <th className="px-6 py-4 text-center">View Details</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#080616]" />
                      Loading reviews...
                    </td>
                  </tr>
                ) : filteredReviews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  filteredReviews.map((review) => (
                    <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                      
                      {/* Customer Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#080616] text-white flex items-center justify-center font-bold text-xs">
                            {review.user?.firstName?.charAt(0) || review.user?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {review.user?.firstName && review.user?.lastName 
                                ? `${review.user.firstName} ${review.user.lastName}` 
                                : review.user?.firstName || review.user?.name || 'Anonymous User'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Product Column */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {review.product?.title || "Unknown Product"}
                        </p>
                      </td>

                      {/* Rating Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </td>

                      {/* Review Content Column */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          "{review.review}"
                        </p>
                        {/* Agar photo hai, toh ek chota icon dikhayenge */}
                        {review.images && review.images.length > 0 && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                            <ImageIcon className="w-3 h-3" />
                            <a href={review.images[0]} target="_blank" rel="noreferrer">
                              View Attached Image
                            </a>
                          </div>
                        )}
                      </td>

                      {/* View Details Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewDetails(review)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>

                      {/* Action Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Review Details Modal */}
        {showDetailsModal && selectedReview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Review Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-[#080616] text-white flex items-center justify-center font-bold text-lg">
                    {selectedReview.user?.firstName?.charAt(0) || selectedReview.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedReview.user?.firstName && selectedReview.user?.lastName 
                        ? `${selectedReview.user.firstName} ${selectedReview.user.lastName}` 
                        : selectedReview.user?.firstName || selectedReview.user?.name || 'Anonymous User'}
                    </p>
                    <p className="text-sm text-gray-500">{selectedReview.user?.email || 'No email'}</p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="pb-4 border-b border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Product</p>
                  <p className="font-medium text-gray-900">{selectedReview.product?.title || 'Unknown Product'}</p>
                  <p className="text-sm text-gray-500">Product ID: {selectedReview.product?._id || 'N/A'}</p>
                </div>

                {/* Rating */}
                <div className="pb-4 border-b border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Rating</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < selectedReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{selectedReview.rating} out of 5 stars</p>
                </div>

                {/* Review Text */}
                <div className="pb-4 border-b border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Review</p>
                  <p className="text-gray-900 leading-relaxed">"{selectedReview.review}"</p>
                </div>

                {/* Images */}
                {selectedReview.images && selectedReview.images.length > 0 && (
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Attached Images ({selectedReview.images.length})</p>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedReview.images.map((image: string, index: number) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <a
                            href={image}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg"
                          >
                            <Eye className="w-6 h-6 text-white" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedReview.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Helpful Votes</p>
                    <p className="text-sm text-gray-900">{selectedReview.helpfulVotes || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Verified Purchase</p>
                    <p className="text-sm text-gray-900">
                      {selectedReview.verifiedPurchase ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Review ID</p>
                    <p className="text-xs text-gray-500 font-mono">{selectedReview._id}</p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedReview._id);
                    setShowDetailsModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Review
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}