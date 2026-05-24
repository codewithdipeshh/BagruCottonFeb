import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#d8c29d] text-black relative overflow-hidden">

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/arabesque.png')",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold mb-6">
              BAGRU COTTON FEB
            </h3>

            <p className="text-black/70 text-sm leading-relaxed mb-6">
              Premium handwoven sarees crafted with love by skilled artisans.
              Experience the beauty of traditional Indian textiles.
            </p>

            <div className="flex gap-4">

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>

               {/* Instagram */}
              <a
                href="https://www.instagram.com/bagru_cotton_feb?igsh=d2F2ZW4xeGlsbzl5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>

            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-5 uppercase tracking-[3px]">
              Legal
            </h4>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/exchange-policy"
                  className="text-black/70 hover:text-black text-sm transition-colors"
                >
                  Exchange Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-black/70 hover:text-black text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping"
                  className="text-black/70 hover:text-black text-sm transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="text-black/70 hover:text-black text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-5 uppercase tracking-[3px]">
              Explore
            </h4>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-black/70 hover:text-black text-sm transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-black/70 hover:text-black text-sm transition-colors"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/sarees"
                  className="text-black/70 hover:text-black text-sm transition-colors"
                >
                  Sarees Collection
                </Link>
              </li>

              <li>
                <Link
                  to="/new-arrivals"
                  className="text-black/70 hover:text-black text-sm transition-colors"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="text-black/70 hover:text-black text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-5 uppercase tracking-[3px]">
              Contact Us
            </h4>

            <ul className="space-y-4">

              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />

                <span className="text-black/70 text-sm">
                  Bus Stop, Ramdev Mandir, Main, Gaushala Rd,
                  Bagru, Jaipur, Rajasthan 303007
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />

                <span className="text-black/70 text-sm">
                  +91 98765 43210
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />

                <span className="text-black/70 text-sm">
                  info@bagrucottonfeb.com
                </span>
              </li>

            </ul>
          </div>

          {/* Sign Up */}
          <div>
            <h4 className="font-semibold mb-5 uppercase tracking-[3px]">
              Sign Up & Save
            </h4>

            <p className="text-black/70 text-sm leading-relaxed mb-6">
              Subscribe to get special offers,
              free giveaways and once-in-a-lifetime deals.
            </p>

            <div className="border-b border-black flex items-center gap-3 pb-2">

              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none text-sm placeholder:text-black/50 w-full"
              />

              <Mail className="w-5 h-5" />

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-black/10">

          <div className="flex justify-center items-center">
            <p className="text-sm text-black/70 text-center">
              © 2024 BAGRU COTTON FEB. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}