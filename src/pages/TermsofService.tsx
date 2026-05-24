import { useEffect } from "react";
import {
  FileText,
  ShieldCheck,
  CreditCard,
  Truck,
  RotateCcw,
  AlertCircle,
  Scale,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function TermsOfService() {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms of Service | BAGRU COTTON FEB";
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#f5ead7] to-[#faf7f2] min-h-screen py-16 px-5 relative overflow-hidden">

      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#e6d0a8] blur-3xl opacity-30"></div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-sm text-black/50 mb-4">
            Legal Information
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Terms of Service
          </h1>

          <p className="text-black/60 text-base md:text-lg max-w-3xl mx-auto leading-8">
            These Terms of Service govern your use of the BAGRU COTTON FEB website,
            products, and services. By accessing or using our website,
            you agree to comply with these terms and conditions.
          </p>

        </div>

        {/* Content Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-[32px] shadow-md p-8 md:p-14">

          {/* Last Updated */}
          <div className="border-b border-black/10 pb-6 mb-12">

            <p className="text-sm text-black/60">
              Last Updated: January 2026
            </p>

          </div>

          {/* Introduction */}
          <section className="mb-14">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Introduction
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Welcome to BAGRU COTTON FEB. These Terms of Service outline
              the rules, responsibilities, and conditions governing your use
              of our website, products, and services.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              By accessing our website or placing an order,
              you agree to be legally bound by these Terms of Service.
              If you do not agree with any part of these terms,
              please discontinue use of our services.
            </p>

          </section>

          {/* Use of Services */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              Use of Our Services
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              You agree to use our website only for lawful purposes
              and in accordance with these Terms of Service.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Users must not attempt unauthorized access,
              interfere with website functionality,
              distribute harmful software,
              or engage in fraudulent or abusive activities.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              We reserve the right to suspend or terminate access
              to users who violate these terms or misuse our services.
            </p>

          </section>

          {/* Products */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Products and Pricing
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              We strive to provide accurate product descriptions,
              pricing, images, and availability information.
              However, occasional errors or inaccuracies may occur.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Colors and textures of handcrafted products may vary slightly
              due to screen settings, photography,
              and the handmade nature of Bagru textiles.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              We reserve the right to modify prices,
              discontinue products, or correct errors at any time
              without prior notice.
            </p>

          </section>

          {/* Orders */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              Orders and Payments
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              By placing an order, you confirm that the information provided,
              including shipping and payment details,
              is accurate and complete.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              All payments are processed securely through trusted
              third-party payment gateways.
              BAGRU COTTON FEB does not directly store your full payment details.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              We reserve the right to cancel or refuse any order
              suspected of fraud, unauthorized activity,
              or policy violations.
            </p>

          </section>

          {/* Shipping */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Truck className="w-6 h-6" />
              Shipping and Delivery
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Delivery timelines displayed on our website are estimated
              and may vary depending on location,
              courier availability, and external circumstances.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              We are not responsible for delays caused by courier partners,
              customs processes, weather conditions,
              or other unforeseen events beyond our control.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              Customers are responsible for providing accurate delivery details.
              Additional charges may apply for incorrect addresses
              or failed delivery attempts.
            </p>

          </section>

          {/* Returns */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <RotateCcw className="w-6 h-6" />
              Returns, Exchanges, and Refunds
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Returns, exchanges, and refunds are subject
              to our official Return and Exchange Policy.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Products must be returned unused,
              unwashed, and in original condition with packaging intact.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              Refund timelines may vary depending on
              payment methods and banking processes.
            </p>

          </section>

          {/* Intellectual Property */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Intellectual Property
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              All website content including logos,
              images, product photography, graphics,
              text, videos, and designs are the intellectual property
              of BAGRU COTTON FEB.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              Unauthorized copying, reproduction,
              distribution, or commercial use of our content
              is strictly prohibited.
            </p>

          </section>

          {/* Liability */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6" />
              Limitation of Liability
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              BAGRU COTTON FEB shall not be liable
              for indirect, incidental, special,
              or consequential damages arising from the use
              of our website or products.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              Our total liability for any claim related to a purchase
              shall not exceed the amount paid for the product involved.
            </p>

          </section>

          {/* Governing Law */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Scale className="w-6 h-6" />
              Governing Law
            </h2>

            <p className="text-[15px] leading-8 text-black/70">
              These Terms of Service shall be governed
              and interpreted in accordance with the laws of India.
              Any disputes arising from these terms
              shall fall under the jurisdiction of courts located in Jaipur, Rajasthan.
            </p>

          </section>

          {/* Changes */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Changes to These Terms
            </h2>

            <p className="text-[15px] leading-8 text-black/70">
              We reserve the right to modify or update these Terms of Service
              at any time. Updated versions will be published on this page
              along with the revised “Last Updated” date.
            </p>

          </section>

          {/* Contact */}
          <section className="border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-8 border-l-4 border-[#c8a96b] pl-4">
              Contact Us
            </h2>

            <div className="space-y-8">

              {/* Email */}
              <div className="flex items-start gap-5">

                <div className="w-14 h-14 rounded-full bg-[#f5ead7] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-black" />
                </div>

                <div>
                  <p className="font-semibold mb-1">
                    Email
                  </p>

                  <a
                    href="mailto:info@bagrucottonfeb.com"
                    className="text-black/70 hover:text-black transition-colors"
                  >
                    info@bagrucottonfeb.com
                  </a>
                </div>

              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">

                <div className="w-14 h-14 rounded-full bg-[#f5ead7] flex items-center justify-center">
                  <Phone className="w-6 h-6 text-black" />
                </div>

                <div>
                  <p className="font-semibold mb-1">
                    Phone / WhatsApp
                  </p>

                  <a
                    href="tel:+919876543210"
                    className="text-black/70 hover:text-black transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>

              </div>

              {/* Address */}
              <div className="flex items-start gap-5">

                <div className="w-14 h-14 rounded-full bg-[#f5ead7] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-black" />
                </div>

                <div>
                  <p className="font-semibold mb-1">
                    Address
                  </p>

                  <p className="text-black/70 leading-8">
                    Bus Stop, Bagru Cotton Feb,
                    Main Gaushala Rd,
                    Bagru, Jaipur,
                    Rajasthan 303007, India
                  </p>
                </div>

              </div>

            </div>

          </section>
        </div>
      </div>
    </div>
  );
}