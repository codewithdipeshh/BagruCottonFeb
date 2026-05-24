import { useEffect } from "react";
import {
  RotateCcw,
  AlertTriangle,
  ShieldCheck,
  Package,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Clock,
} from "lucide-react";

export default function ExchangePolicy() {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Exchange, Return & Refund Policy | BAGRU COTTON FEB";
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#f5ead7] to-[#faf7f2] min-h-screen py-16 px-5 relative overflow-hidden">

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#e6d0a8] blur-3xl opacity-30"></div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-sm text-black/50 mb-4">
            Customer Support
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Exchange, Return & Refund Policy
          </h1>

          <p className="text-black/60 text-base md:text-lg max-w-3xl mx-auto leading-8">
            At BAGRU COTTON FEB, customer satisfaction is important to us.
            Every product is carefully inspected before dispatch.
            Please read our exchange, return, and refund policy carefully
            before placing an order.
          </p>

        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-[32px] shadow-md p-8 md:p-14">

          {/* Last Updated */}
          <div className="border-b border-black/10 pb-6 mb-12">

            <p className="text-sm text-black/60">
              Last Updated: January 2026
            </p>

          </div>

          {/* Exchange Eligibility */}
          <section className="mb-14">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <RotateCcw className="w-6 h-6" />
              Exchange Eligibility
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Exchange requests will only be accepted
              if the product received is damaged,
              defective, or incorrect.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Due to the handcrafted nature of Bagru printed textiles,
              slight variations in color, print placement,
              texture, or weaving are natural characteristics
              of handmade products and are not considered defects.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              We do not accept exchanges for reasons such as
              change of mind, dislike of color,
              personal preference, or incorrect selection by the customer.
            </p>

          </section>

          {/* Damaged Products */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" />
              Damaged or Incorrect Products
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              If you receive a damaged, defective,
              or incorrect item, you must contact us
              within 48 hours of delivery.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Customers are requested to provide:
            </p>

            <ul className="list-disc pl-6 text-[15px] text-black/70 leading-8 space-y-2">

              <li>Order number</li>

              <li>Clear photos of the damaged product</li>

              <li>Photos of packaging (if applicable)</li>

              <li>Short explanation of the issue</li>

            </ul>

          </section>

          {/* Return Conditions */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              Return Conditions
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              To qualify for a return or exchange,
              the product must remain unused,
              unwashed, and in its original condition
              with tags and packaging intact.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Products showing signs of use,
              washing, perfume, stains,
              or physical damage caused after delivery
              will not be eligible for return or exchange.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              BAGRU COTTON FEB reserves the right
              to reject requests that do not meet
              our return and exchange conditions.
            </p>

          </section>

          {/* Refund Policy */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              Refund Policy
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Refunds are only applicable
              for approved damaged, defective,
              or incorrect products.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Once the returned product is received
              and inspected by our team,
              eligible refunds will be processed
              to the original payment method.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Shipping charges, COD charges,
              and handling fees are non-refundable
              unless the issue occurred due to our error.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              Refund processing times may vary
              depending on banks, payment providers,
              and transaction methods.
            </p>

          </section>

          {/* Exchange Process */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Package className="w-6 h-6" />
              Exchange Process
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Once your request is approved,
              our support team will guide you
              through the return or exchange process.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Customers may be required
              to ship the product back to our address
              before a replacement item is dispatched.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              Exchange processing times may vary
              depending on product availability,
              courier services, and delivery location.
            </p>

          </section>

          {/* Non Returnable */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Clock className="w-6 h-6" />
              Non-Returnable Situations
            </h2>

            <ul className="list-disc pl-6 text-[15px] text-black/70 leading-8 space-y-3">

              <li>Change of mind after purchase</li>

              <li>Minor color variation due to screen settings</li>

              <li>Handmade print or weaving irregularities</li>

              <li>Incorrect size or product selection by customer</li>

              <li>Products damaged after use</li>

              <li>Used or washed products</li>

              <li>Requests made after the allowed reporting period</li>

            </ul>

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