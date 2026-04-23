import { useState } from 'react';
import { Filter, Grid2x2 as Grid, List, ChevronDown } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Sarees' },
  { id: 'Cotton Mulmul Sarees', name: 'Cotton Mulmul Sarees' },
  { id: 'Handblock Printed Cotton Sarees', name: 'Handblock Printed Cotton Sarees' },
  { id: 'Linen Cotton Sarees', name: 'Linen Cotton Sarees' },
  { id: 'kota doria Sarees', name: 'kota doria Sarees' },
  { id: 'Chanderi Bagru Sarees', name: 'Chanderi Bagru Sarees' },
  { id: 'Maheshwari Silk Sarees', name: 'Maheshwari Silk Sarees' },
];

const sarees = [
  {
    id: 1,
    name: 'Cotton Mulmul Sarees',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cotton',
    description: 'Elegant cotton saree with traditional motifs',
  },
  {
    id: 2,
    name: 'Linen Cotton Sarees',
    price: 3299,
    originalPrice: 3999,
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'linen',
    description: 'Premium linen saree with modern design',
  },
  {
    id: 3,
    name: 'kota doria Sarees',
    price: 2799,
    originalPrice: 3499,
    image: 'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'kota doria',
    description: 'Authentic kotadorya weave with rich patterns',
  },
  {
    id: 4,
    name: 'Handblock Print Saree',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'handblo',
    description: 'Beautiful handblock printed cotton saree',
  },
  {
    id: 5,
    name: 'Maheshwari Silk Sarees',
    price: 4499,
    originalPrice: 5499,
    image: 'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Maheshwari Silk',
    description: 'Luxurious mahsrfe saree with silk blend',
  },
  {
    id: 6,
    name: 'Chanderi Bagru Sarees',
    price: 2299,
    originalPrice: 2799,
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Chanderi Silk',
    description: 'Comfortable khafi cotton for daily wear',
  },
  {
    id: 7,
    name: 'Cotton Mulmul Sarees',
    price: 2699,
    originalPrice: 3299,
    image: 'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cotton',
    description: 'Rich maroon cotton saree with golden border',
  },
  {
    id: 8,
    name: 'Linen Cotton Sarees',
    price: 3599,
    originalPrice: 4299,
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'linen',
    description: 'Natural dyed linen saree',
  },
    {
    id: 9,
    name: 'Linen Cotton Sarees',
    price: 3599,
    originalPrice: 4299,
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'linen',
    description: 'Natural dyed linen saree',
  },
  
];

export default function Sarees() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredSarees = selectedCategory === 'all'
    ? sarees
    : sarees.filter(saree => saree.category === selectedCategory);

  return (
    <div className="bg-[#E8EDF2] min-h-screen">
      {/* Header */}
      <section className="bg-[#080616] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Saree Collection
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover handwoven masterpieces crafted by skilled artisans
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h3 className="font-bold text-[#080616] mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-[#080616] text-white'
                          : 'text-gray-700 hover:bg-[#E8EDF2]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* <p className="text-gray-600">
                Showing <span className="font-medium text-[#080616]">{filteredSarees.length}</span> products
              </p> */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  {/* <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-[#E8EDF2] px-4 py-2 pr-8 rounded-lg text-sm focus:outline-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                  </div> */}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#080616] text-white' : 'bg-[#E8EDF2] text-gray-700'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#080616] text-white' : 'bg-[#E8EDF2] text-gray-700'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredSarees.map((saree) => (
                <div
                  key={saree.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[3/4]'}`}>
                    <img
                      src={saree.image}
                      alt={saree.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#080616] text-white text-xs font-medium rounded-full capitalize">
                        {saree.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-semibold text-[#080616] mb-2">{saree.name}</h3>
                    {viewMode === 'list' && (
                      <p className="text-gray-600 text-sm mb-2">{saree.description}</p>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-[#080616]">Rs. {saree.price}</span>
                      <span className="text-sm text-gray-400 line-through">Rs. {saree.originalPrice}</span>
                      <span className="text-sm text-green-600 font-medium">
                        {Math.round((1 - saree.price / saree.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    <button className="w-full py-2 bg-[#080616] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
