import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Filter,
  Grid2x2 as Grid,
  List,
  Heart,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { getCategoryBySlug, sareeCategories } from '../data/sareeCategories';

const categories = [
  { id: 'all', name: 'All Sarees' },
  {
    id: 'cotton',
    name: 'Cotton Mulmul',
  },
  {
    id: 'handblock',
    name: 'Handblock Print',
  },
  {
    id: 'linen',
    name: 'Linen Cotton',
  },
  {
    id: 'kota',
    name: 'Kota Doria',
  },
  {
    id: 'chanderi',
    name: 'Chanderi Bagru',
  },
  {
    id: 'maheshwari',
    name: 'Maheshwari Silk',
  },
];

const sarees = [
  {
    id: 1,
    name: 'Cotton Mulmul Saree',
    price: 2499,
    originalPrice: 2999,
    image:
      'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cotton',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Linen Cotton Saree',
    price: 3299,
    originalPrice: 3999,
    image:
      'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'linen',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Kota Doria Saree',
    price: 2799,
    originalPrice: 3499,
    image:
      'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'kota',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Handblock Print Saree',
    price: 1999,
    originalPrice: 2499,
    image:
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'handblock',
    rating: 5,
  },
  {
    id: 5,
    name: 'Maheshwari Silk Saree',
    price: 4499,
    originalPrice: 5499,
    image:
      'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'maheshwari',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Chanderi Bagru Saree',
    price: 2299,
    originalPrice: 2799,
    image:
      'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'chanderi',
    rating: 4.8,
  },
];

export default function Sarees() {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q')?.trim().toLowerCase() ?? '';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const match = getCategoryBySlug(categorySlug);
    setSelectedCategory(match?.filterId ?? 'all');
  }, [categorySlug]);

  const selectCategory = (id: string) => {
    setSelectedCategory(id);
    if (id === 'all') {
      navigate('/sarees');
      return;
    }
    const slug = sareeCategories.find((c) => c.filterId === id)?.slug;
    if (slug) navigate(`/sarees/${slug}`);
  };

  const filteredSarees = useMemo(() => {
    let list =
      selectedCategory === 'all'
        ? sarees
        : sarees.filter((saree) => saree.category === selectedCategory);

    if (searchQuery) {
      list = list.filter((saree) =>
        saree.name.toLowerCase().includes(searchQuery)
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F0] via-[#FFFDF9] to-[#F3EEE7]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#080616] via-[#1A1333] to-[#080616] py-24">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4AF37]/10 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 text-[#D4AF37] text-sm font-medium mb-6 border border-white/10">
            Premium Saree Collection
          </span>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Discover Timeless
            <br />
            Handcrafted Elegance
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore luxurious Bagru sarees
            crafted with tradition, elegance,
            and premium artistry.
          </p>
          {searchQuery && (
            <p className="mt-4 text-[#D4AF37] text-sm">
              Showing results for &ldquo;{searchParams.get('q')}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72">
            <div className="bg-white/90 backdrop-blur-xl border border-[#E5DED3] rounded-3xl p-6 sticky top-24 shadow-lg">
              <h3 className="flex items-center gap-2 text-xl font-bold text-[#080616] mb-6">
                <Filter className="w-5 h-5" />
                Categories
              </h3>

              <div className="space-y-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => selectCategory(cat.id)}
                    className={`w-full text-left px-5 py-3 rounded-2xl transition-all duration-300 font-medium ${
                      selectedCategory === cat.id
                        ? 'bg-[#080616] text-white shadow-lg'
                        : 'bg-[#F8F5F0] text-gray-700 hover:bg-[#E9DFD0]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white/90 backdrop-blur-xl border border-[#E5DED3] rounded-3xl p-5 mb-8 flex items-center justify-between shadow-md">
              <div>
                <h2 className="text-2xl font-bold text-[#080616]">
                  Our Collection
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {filteredSarees.length} Premium
                  Sarees Available
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setViewMode('grid')
                  }
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#080616] text-white'
                      : 'bg-[#F5F1EB] text-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>

                <button
                  onClick={() =>
                    setViewMode('list')
                  }
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'list'
                      ? 'bg-[#080616] text-white'
                      : 'bg-[#F5F1EB] text-gray-700'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
              {filteredSarees.map((saree) => (
                <div
                  key={saree.id}
                  className={`group bg-white rounded-[30px] overflow-hidden border border-[#ECE4D8] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${
                    viewMode === 'list'
                      ? 'flex'
                      : ''
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === 'list'
                        ? 'w-72'
                        : 'aspect-[3/4]'
                    }`}
                  >
                    <img
                      src={saree.image}
                      alt={saree.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Wishlist */}
                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white transition">
                      <Heart className="w-5 h-5 text-[#080616]" />
                    </button>

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1 bg-[#080616] text-white text-xs rounded-full">
                        Premium
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center text-[#D4AF37]">
                        <Star className="w-4 h-4 fill-[#D4AF37]" />
                      </div>

                      <span className="text-sm text-gray-600">
                        {saree.rating} Rating
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#080616] mb-2">
                      {saree.name}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                      Premium handcrafted saree
                      designed with timeless
                      elegance and comfort.
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl font-bold text-[#080616]">
                        ₹{saree.price}
                      </span>

                      <span className="text-gray-400 line-through">
                        ₹{saree.originalPrice}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-[#080616] text-white rounded-2xl font-medium hover:bg-black transition-all duration-300 flex items-center justify-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
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