import { Users, Award, Heart, Leaf } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#080616]/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">Our Story</h1>
            <p className="text-xl text-gray-300">Crafting Excellence Since 2010</p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-[#E8EDF2] text-[#080616] text-sm font-medium rounded-full mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#080616] mb-6">
                Preserving Tradition, Empowering Artisans
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At BAGRU COTTON FEB, we believe in the power of traditional craftsmanship. Our journey began with a simple mission: to bring the finest handwoven sarees from the skilled artisans of Bagru to women across India and beyond.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every saree in our collection tells a story of dedication, skill, and heritage passed down through generations. We work directly with artisan families, ensuring fair wages and sustainable practices that keep these beautiful traditions alive.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#080616]">14+</p>
                  <p className="text-sm text-gray-600">Years of Excellence</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#080616]">50+</p>
                  <p className="text-sm text-gray-600">Artisan Families</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#080616]">5000+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Artisan at work"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#080616] text-white p-6 rounded-xl">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm">Handwoven</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#E8EDF2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#080616] mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#080616] flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Artisan First</h3>
              <p className="text-gray-600 text-sm">
                We prioritize fair wages and sustainable livelihoods for our artisan partners.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#080616] flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Quality Assured</h3>
              <p className="text-gray-600 text-sm">
                Every saree undergoes rigorous quality checks before reaching you.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#080616] flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Customer Love</h3>
              <p className="text-gray-600 text-sm">
                Your satisfaction is our priority. We go above and beyond to delight you.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#080616] flex items-center justify-center">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Sustainable</h3>
              <p className="text-gray-600 text-sm">
                Eco-friendly practices and natural dyes for a greener tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#080616] mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind BAGRU COTTON FEB
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Founder & CEO', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { name: 'Priya Sharma', role: 'Head of Design', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { name: 'Amit Patel', role: 'Operations Manager', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold text-[#080616]">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#080616]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Tradition?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore our collection of handwoven sarees and bring home a piece of Indian heritage
          </p>
          <a
            href="/sarees"
            className="inline-block px-8 py-3 bg-white text-[#080616] font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Shop Collection
          </a>
        </div>
      </section>
    </div>
  );
}
