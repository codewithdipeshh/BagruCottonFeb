import {
  Star,
  Quote,
  Sparkles,
} from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    review:
      'Absolutely stunning saree! The quality is exceptional and the craftsmanship is visible in every thread. I received so many compliments.',
    image:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Cotton Mulmul Saree',
  },
  {
    id: 2,
    name: 'Anjali Patel',
    location: 'Delhi',
    rating: 5,
    review:
      'The linen saree exceeded all my expectations. So elegant, lightweight, and premium. Perfect for festive occasions.',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Linen Cotton Saree',
  },
  {
    id: 3,
    name: 'Meera Reddy',
    location: 'Hyderabad',
    rating: 5,
    review:
      'Beautiful handblock print and amazing fabric quality. Packaging was luxurious and delivery was very fast.',
    image:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Handblock Saree',
  },
  {
    id: 4,
    name: 'Kavita Singh',
    location: 'Jaipur',
    rating: 5,
    review:
      'I have been shopping here for years. Their Kota Doria collection is absolutely timeless and elegant.',
    image:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    product: 'Kota Doria Saree',
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F5F6FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#080616] text-white text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Customer Love
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#080616] mb-5">
            What Our Customers Say
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Thousands of women trust our handcrafted sarees
            for elegance, comfort, and timeless beauty.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative bg-white/70 backdrop-blur-lg border border-white/50 rounded-[32px] p-7 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#080616]/5 rounded-full blur-3xl" />

              {/* Quote */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-[#080616]" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-5 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 leading-relaxed mb-8 relative z-10">
                “{review.review}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4 relative z-10">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                />

                <div>
                  <h4 className="font-semibold text-[#080616]">
                    {review.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {review.location}
                  </p>
                </div>
              </div>

              {/* Product */}
              <div className="mt-6 pt-5 border-t border-gray-200 relative z-10">
                <span className="text-xs text-gray-500">
                  Purchased
                </span>

                <p className="font-medium text-[#080616] mt-1">
                  {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24">
          <div className="bg-[#080616] rounded-[40px] px-8 py-14 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              <div>
                <h3 className="text-5xl font-bold text-white mb-2">
                  5000+
                </h3>

                <p className="text-gray-300">
                  Happy Customers
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-bold text-white mb-2">
                  4.9★
                </h3>

                <p className="text-gray-300">
                  Average Rating
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-bold text-white mb-2">
                  100+
                </h3>

                <p className="text-gray-300">
                  Premium Designs
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-bold text-white mb-2">
                  50+
                </h3>

                <p className="text-gray-300">
                  Artisan Partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}