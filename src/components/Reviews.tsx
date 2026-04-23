import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    review: 'Absolutely stunning saree! The quality is exceptional and the craftsmanship is visible in every thread. I received so many compliments. Will definitely order again!',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Cotton Saree',
  },
  {
    id: 2,
    name: 'Anjali Patel',
    location: 'Delhi',
    rating: 5,
    review: 'The linen saree I purchased exceeded all my expectations. So comfortable and elegant. Perfect for both casual and formal occasions.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Linen Saree',
  },
  {
    id: 3,
    name: 'Meera Reddy',
    location: 'Hyderabad',
    rating: 5,
    review: 'Beautiful handblock print saree! The colors are vibrant and the fabric is so soft. Fast delivery and excellent packaging. Highly recommended!',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Handblo Saree',
  },
  {
    id: 4,
    name: 'Kavita Singh',
    location: 'Jaipur',
    rating: 5,
    review: 'I have been buying from BAGRU COTTON FEB for years now. Their quality has always been consistent. The kotadorya saree is my favorite!',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Kotadorya Saree',
  },
];

export default function Reviews() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-[#E8EDF2] text-[#080616] text-sm font-medium rounded-full mb-4">
            Customer Love
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#080616] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from real customers who have experienced the beauty of our handcrafted sarees
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#E8EDF2] rounded-2xl p-6 relative hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#080616]/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                "{review.review}"
              </p>

              {/* Customer Info */}
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

              {/* Product Badge */}
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-600">
                  Purchased: <span className="font-medium text-[#080616]">{review.product}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-[#080616]">5000+</p>
            <p className="text-gray-600 text-sm mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#080616]">4.9</p>
            <p className="text-gray-600 text-sm mt-1">Average Rating</p>
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
  );
}
