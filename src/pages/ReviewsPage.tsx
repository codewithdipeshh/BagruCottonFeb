import { Star, Quote } from 'lucide-react';

const allReviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    review: 'Absolutely stunning saree! The quality is exceptional and the craftsmanship is visible in every thread. I received so many compliments. Will definitely order again!',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Cotton Saree',
    date: '2024-01-10',
  },
  {
    id: 2,
    name: 'Anjali Patel',
    location: 'Delhi',
    rating: 5,
    review: 'The linen saree I purchased exceeded all my expectations. So comfortable and elegant. Perfect for both casual and formal occasions.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Linen Saree',
    date: '2024-01-08',
  },
  {
    id: 3,
    name: 'Meera Reddy',
    location: 'Hyderabad',
    rating: 5,
    review: 'Beautiful handblock print saree! The colors are vibrant and the fabric is so soft. Fast delivery and excellent packaging. Highly recommended!',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Handblo Saree',
    date: '2024-01-05',
  },
  {
    id: 4,
    name: 'Kavita Singh',
    location: 'Jaipur',
    rating: 5,
    review: 'I have been buying from BAGRU COTTON FEB for years now. Their quality has always been consistent. The kotadorya saree is my favorite!',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Kotadorya Saree',
    date: '2024-01-02',
  },
  {
    id: 5,
    name: 'Sunita Verma',
    location: 'Bangalore',
    rating: 4,
    review: 'Great quality and beautiful design. The only reason for 4 stars is the delivery took a bit longer than expected. But the product is worth the wait!',
    image: 'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Mahsrfe Saree',
    date: '2023-12-28',
  },
  {
    id: 6,
    name: 'Ritu Agarwal',
    location: 'Kolkata',
    rating: 5,
    review: 'The khafi cotton saree is so comfortable for daily wear. Love the subtle design and the quality of the fabric. Great value for money!',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Khafi Saree',
    date: '2023-12-25',
  },
];

export default function ReviewsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#080616] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Customer Reviews
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real stories from real customers who have experienced the beauty of our handcrafted sarees
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#E8EDF2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#080616]">5000+</p>
              <p className="text-gray-600 text-sm mt-1">Happy Customers</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <p className="text-4xl font-bold text-[#080616]">4.9</p>
              </div>
              <p className="text-gray-600 text-sm">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#080616]">100+</p>
              <p className="text-gray-600 text-sm mt-1">Unique Designs</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#080616]">50+</p>
              <p className="text-gray-600 text-sm mt-1">Artisan Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#E8EDF2] rounded-2xl p-6 relative hover:shadow-xl transition-shadow duration-300"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#080616]/10" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  "{review.review}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#080616]">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-300">
                  <p className="text-xs text-gray-600">
                    Purchased: <span className="font-medium text-[#080616]">{review.product}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-16 bg-[#080616]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Share Your Experience
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Have you purchased from us? We'd love to hear your feedback!
          </p>
          <button className="px-8 py-3 bg-white text-[#080616] font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Write a Review
          </button>
        </div>
      </section>
    </div>
  );
}
