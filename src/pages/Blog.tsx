import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Handblock Printing: A Traditional Craft',
    excerpt: 'Discover the centuries-old tradition of handblock printing and how skilled artisans create beautiful patterns on fabric using wooden blocks.',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Priya Sharma',
    date: '2024-01-15',
    category: 'Craftsmanship',
  },
  {
    id: 2,
    title: 'Cotton vs Linen: Choosing the Right Saree for You',
    excerpt: 'A comprehensive guide to help you understand the differences between cotton and linen sarees, and which one suits your style and needs.',
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Anjali Patel',
    date: '2024-01-10',
    category: 'Style Guide',
  },
  {
    id: 3,
    title: '5 Ways to Style Your Saree for Modern Occasions',
    excerpt: 'Learn creative ways to drape and style your saree for contemporary events while maintaining the traditional elegance.',
    image: 'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Meera Reddy',
    date: '2024-01-05',
    category: 'Fashion Tips',
  },
  {
    id: 4,
    title: 'Supporting Artisans: Our Journey with Bagru Weavers',
    excerpt: 'An inside look at how we work with artisan families in Bagru to bring you authentic handwoven sarees while supporting their livelihoods.',
    image: 'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Rajesh Kumar',
    date: '2024-01-01',
    category: 'Behind the Scenes',
  },
  {
    id: 5,
    title: 'Caring for Your Handwoven Sarees: A Complete Guide',
    excerpt: 'Essential tips and best practices for washing, storing, and maintaining your precious handwoven sarees to ensure they last for generations.',
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Kavita Singh',
    date: '2023-12-28',
    category: 'Care Guide',
  },
  {
    id: 6,
    title: 'The History of Indian Textiles: From Ancient to Modern',
    excerpt: 'Explore the rich history of Indian textile traditions and how they have evolved over thousands of years to influence modern fashion.',
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Amit Patel',
    date: '2023-12-20',
    category: 'History',
  },
];

export default function Blog() {
  return (
    <div className="bg-[#E8EDF2] min-h-screen">
      {/* Hero */}
      <section className="bg-[#080616] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Blog
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stories, guides, and insights about traditional Indian textiles and craftsmanship
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-[#E8EDF2] text-[#080616] text-xs font-medium rounded-full mb-4">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#080616] mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                </div>
                <Link
                  to={`/blog/${blogPosts[0].id}`}
                  className="inline-flex items-center gap-2 text-[#080616] font-medium hover:underline"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-[#E8EDF2] text-[#080616] text-xs font-medium rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#080616] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#080616]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Blog 
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get the latest articles, style tips, and stories delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-[#080616] font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
