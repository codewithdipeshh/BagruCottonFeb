import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Star, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch All Reviews (Jo humne getGlobalReviews API banayi thi)
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5454/reviews/all');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
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
        const token = localStorage.getItem('jwt');
        await axios.delete(`http://localhost:5454/reviews/${reviewId}/delete`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Delete hone ke baad table se us review ko turant hata dein
        setReviews(reviews.filter((review) => review._id !== reviewId));
        alert('Review deleted successfully');
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review. Make sure you are logged in as Admin.');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and moderate reviews left by your customers.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-gray-600">Total Reviews: </span>
            <span className="text-lg font-bold text-[#080616]">{reviews.length}</span>
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
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#080616]" />
                      Loading reviews...
                    </td>
                  </tr>
                ) : reviews.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                      
                      {/* Customer Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#080616] text-white flex items-center justify-center font-bold text-xs">
                            {review.user?.firstName?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {review.user?.firstName} {review.user?.lastName}
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

      </div>
    </div>
  );
}