import { useState, useEffect } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

// Static fallback reviews (in case backend is empty or loading)
const fallbackReviews = [
  {
    _id: '1',
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    review: 'Absolutely stunning saree! The quality is exceptional and the craftsmanship is visible in every thread. I received so many compliments. Will definitely order again!',
    productTitle: 'Cotton Saree',
    date: '2024-01-10',
  }
];

const stats = [
  { value: '5000+', label: 'Happy Customers' },
  { value: '4.9', label: 'Average Rating', star: true },
  { value: '100+', label: 'Unique Designs' },
  { value: '50+', label: 'Artisan Partners' },
];

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/reviews/all`);
      if (response.data && response.data.length > 0) {
        setReviewsList(response.data);
      } else {
        setReviewsList(fallbackReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviewsList(fallbackReviews);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="bg-white min-h-screen relative dvrev">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .dvrev { font-family: 'Inter', sans-serif; }

        .dvrev__hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #080616 0%, #0f0c26 100%);
        }
        .dvrev__hero-glow {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          top: -160px;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(154,123,86,0.28) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
        }
        .dvrev__hero-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 85%);
          pointer-events: none;
        }
        .dvrev__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C9AE87;
        }
        .dvrev__eyebrow::before,
        .dvrev__eyebrow::after {
          content: '';
          width: 24px;
          height: 1.5px;
          background: #9A7B56;
        }
        .dvrev__title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          color: #FDFAF6;
          letter-spacing: -0.01em;
          margin-top: 14px;
        }
        .dvrev__sub {
          margin-top: 14px;
          font-size: 15.5px;
          color: rgba(253,250,246,0.6);
          max-width: 42ch;
          margin-left: auto;
          margin-right: auto;
        }

        .dvrev__statbar {
          background: #ffffff;
          border: 1px solid rgba(8,6,22,0.08);
          border-radius: 20px;
          box-shadow: 0 24px 50px -30px rgba(8,6,22,0.25);
          margin-top: -56px;
          position: relative;
          z-index: 10;
        }
        .dvrev__stat {
          padding: 28px 16px;
          text-align: center;
          border-right: 1px solid rgba(8,6,22,0.08);
        }
        .dvrev__stat:last-child { border-right: none; }
        .dvrev__stat-value {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 30px;
          color: #080616;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .dvrev__stat-label {
          font-size: 12.5px;
          color: rgba(8,6,22,0.5);
          margin-top: 6px;
          letter-spacing: 0.02em;
        }

        .dvrev__sectiontag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9A7B56;
        }
        .dvrev__sectiontag::before {
          content: '';
          width: 24px;
          height: 1.5px;
          background: #9A7B56;
        }
        .dvrev__sectionheading {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          color: #080616;
          margin-top: 10px;
        }

        .dvrev__card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(8,6,22,0.08);
          border-radius: 18px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .dvrev__card:hover {
          transform: translateY(-4px);
          box-shadow: 0 26px 50px -28px rgba(8,6,22,0.22);
          border-color: rgba(154,123,86,0.35);
        }
        .dvrev__quote-mark {
          position: absolute;
          top: 20px;
          right: 22px;
          opacity: 0.08;
        }

        .dvrev__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9A7B56, #C9AE87);
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dvrev__text {
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(8,6,22,0.72);
        }

        .dvrev__meta-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(8,6,22,0.4);
        }
      `}</style>

      {/* Hero Section */}
      <section className="dvrev__hero py-20">
        <div className="dvrev__hero-glow" />
        <div className="dvrev__hero-grid" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="dvrev__eyebrow">Testimonials</span>
          <h1 className="dvrev__title">Customer Reviews</h1>
          <p className="dvrev__sub">
            Real stories from real customers who have experienced the beauty of our handcrafted sarees.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="dvrev__statbar grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="dvrev__stat">
                <div className="dvrev__stat-value">
                  {stat.star && <Star className="w-5 h-5 fill-[#9A7B56] text-[#9A7B56]" />}
                  {stat.value}
                </div>
                <p className="dvrev__stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="dvrev__sectiontag">What they're saying</span>
            <h2 className="dvrev__sectionheading">In their own words</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
                <Loader2 className="w-7 h-7 animate-spin mb-4 text-[#9A7B56]" />
                <p className="text-sm">Loading beautifully crafted reviews...</p>
              </div>
            ) : (
              reviewsList.map((review) => {
                // Dynamic Data Handling
                const userName = review.user ? `${review.user.firstName} ${review.user.lastName}` : review.name || 'Verified Buyer';
                const productName = review.product?.title || review.productTitle || review.product || 'Cotton Saree';
                const reviewDate = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : review.date || 'Recently';
                const initial = userName.trim().charAt(0).toUpperCase() || 'V';

                return (
                  <div key={review._id || review.id} className="dvrev__card">
                    <Quote className="dvrev__quote-mark w-9 h-9 text-[#080616]" fill="currentColor" />

                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-[#9A7B56] text-[#9A7B56]'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="dvrev__text mb-6 flex-grow">"{review.review}"</p>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="dvrev__avatar">{initial}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#080616] text-sm truncate">{userName}</p>
                        <p className="text-xs text-gray-500">{review.location || 'India'}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="dvrev__meta-label">
                        <span className="text-[#9A7B56] font-semibold">{productName}</span>
                      </p>
                      <p className="text-xs text-gray-400">{reviewDate}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}