import { useEffect } from "react";
import {
  Truck,
  Clock,
  ShieldCheck,
  CreditCard,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function ShippingPolicy() {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Shipping Policy | BAGRU COTTON FEB";
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
            Delivery Information
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Shipping Policy
          </h1>

          <p className="text-black/60 text-base md:text-lg max-w-3xl mx-auto leading-8">
            BAGRU COTTON FEB is committed to delivering
            your orders safely and efficiently across India
            and selected international destinations.
            Please review our shipping policy carefully
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

          {/* Domestic Shipping */}
          <section className="mb-14">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Truck className="w-6 h-6" />
              Domestic Shipping & Delivery
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Orders within India are usually delivered
              within 5 to 8 working days
              from the date of dispatch,
              depending on your location and courier service availability.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Delivery timelines may occasionally extend
              due to bad weather conditions,
              courier delays, flight disruptions,
              political disturbances, public holidays,
              or other unforeseen circumstances
              beyond our control.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              In such situations,
              our customer support team
              will stay in touch with you
              regarding order updates and delivery status.
            </p>

          </section>

          {/* International Shipping */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Globe className="w-6 h-6" />
              International Shipping
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              BAGRU COTTON FEB also offers international shipping
              to selected countries worldwide.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              International delivery timelines vary
              depending on destination country,
              customs clearance,
              and courier partner operations.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Customers are responsible for customs duties,
              import taxes, VAT,
              or any additional charges imposed
              by their country’s authorities.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              BAGRU COTTON FEB is not responsible
              for delays caused by customs clearance,
              international courier disruptions,
              or destination country regulations.
            </p>

          </section>

          {/* Delivery Delays */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Clock className="w-6 h-6" />
              Delivery Delays
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              While we make every effort
              to ensure timely deliveries,
              BAGRU COTTON FEB shall not be held responsible
              for delays caused by external factors
              beyond our direct control.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              We will not be liable
              to compensate for any inconvenience,
              financial loss,
              or mental stress caused due to delayed deliveries.
            </p>

          </section>

          {/* Order Cancellation */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              Order Cancellation
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Customers may request cancellation
              if delivery timelines exceed
              the expected delivery period.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              For prepaid orders,
              eligible refunds will be processed
              after successful cancellation confirmation.
            </p>

          </section>

          {/* Shipping Coverage */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Truck className="w-6 h-6" />
              Shipping Coverage
            </h2>

            <p className="text-[15px] leading-8 text-black/70">
              We currently deliver to most locations across India
              and selected international destinations,
              subject to courier service availability.
            </p>

          </section>

          {/* Shipping Charges */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              Shipping Charges
            </h2>

            <div className="space-y-5">

              <div className="bg-[#f8f1e5] rounded-2xl p-5 border border-[#ead7b5]">

                <p className="text-[15px] font-medium text-black">
                  Orders above ₹999 are eligible for FREE shipping within India.
                </p>

              </div>

              <div className="bg-[#f8f1e5] rounded-2xl p-5 border border-[#ead7b5]">

                <p className="text-[15px] font-medium text-black">
                  Orders below ₹999 will incur
                  a shipping charge of ₹100.
                </p>

              </div>

              <div className="bg-[#f8f1e5] rounded-2xl p-5 border border-[#ead7b5]">

                <p className="text-[15px] font-medium text-black">
                  International shipping charges vary
                  based on destination country,
                  package weight,
                  and courier rates.
                </p>

              </div>

            </div>

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