import { ArrowRight, Sparkles } from 'lucide-react';

const newArrivals = [
  {
    id: 1,
    name: 'Spring Blossom Cotton',
    price: 2899,
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Cotton',
    isNew: true,
  },
  {
    id: 2,
    name: 'Ocean Blue Linen',
    price: 3699,
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Linen',
    isNew: true,
  },
  {
    id: 3,
    name: 'Sunset Kotadorya',
    price: 3199,
    image: 'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Kotadorya',
    isNew: true,
  },
  {
    id: 4,
    name: 'Garden Print Handblo',
    price: 2299,
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Handblo',
    isNew: true,
  },
  {
    id: 5,
    name: 'Royal Mahsrfe',
    price: 4999,
    image: 'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Mahsrfe',
    isNew: true,
  },
  {
    id: 6,
    name: 'Minimalist Khafi',
    price: 2599,
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Khafi',
    isNew: true,
  },
];

export default function NewArrivals() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="New Arrivals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#080616]/60 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8" />
              <span className="text-lg font-medium">Just In</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">New Arrivals</h1>
            <p className="text-xl text-gray-300 mb-8">
              Fresh designs with traditional roots
            </p>
            <a
              href="#collection"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#080616] font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#080616] mb-4">
              Latest Additions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Be the first to own our newest handwoven sarees, featuring contemporary designs with traditional craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="group bg-[#E8EDF2] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      NEW
                    </span>
                    <span className="px-3 py-1 bg-[#080616] text-white text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#080616] mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-[#080616] mb-4">Rs. {product.price}</p>
                  <button className="w-full py-3 bg-[#080616] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#E8EDF2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Limited Edition</h3>
              <p className="text-gray-600">Each design is crafted in limited quantities for exclusivity</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Pre-Order Available</h3>
              <p className="text-gray-600">Reserve your favorite pieces before they sell out</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Special Launch Price</h3>
              <p className="text-gray-600">Introductory pricing for our newest collection</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
