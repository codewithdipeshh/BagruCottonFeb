import { useEffect } from "react";
import {
  ShieldCheck,
  Globe,
  FileText,
  Mail,
  Phone,
  MapPin,
  Lock,
  Cookie,
  User,
  CreditCard,
} from "lucide-react";

export default function Privacy() {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | BAGRU COTTON FEB";
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
            Legal Information
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Privacy Policy
          </h1>

          <p className="text-black/60 text-base md:text-lg max-w-3xl mx-auto leading-8">
            At BAGRU COTTON FEB, your privacy is important to us.
            This Privacy Policy explains how we collect, use,
            store, and protect your personal information while
            you interact with our website and services.
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
              BAGRU COTTON FEB operates this website and related services,
              including all information, tools, products, and content
              available through our platform. We are committed to
              protecting your privacy and ensuring transparency
              regarding how your information is handled.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              By using our website, placing an order, or interacting
              with our services, you agree to the practices described
              in this Privacy Policy.
            </p>

          </section>

          {/* Information We Collect */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <User className="w-6 h-6" />
              Information We Collect
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              We may collect personal information such as your name,
              email address, phone number, billing address,
              shipping address, and payment-related details when
              you make a purchase or contact us.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              We may also automatically collect technical information
              including device details, browser type, IP address,
              pages visited, and browsing behavior to improve
              website performance and customer experience.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              Information may also be collected when you subscribe
              to newsletters, participate in promotions, submit reviews,
              or communicate with customer support.
            </p>

          </section>

          {/* How We Use Information */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              How We Use Your Information
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Your information is used to process orders,
              provide customer support, improve our services,
              personalize your shopping experience, and communicate
              important updates related to purchases and deliveries.
            </p>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              We may also use your information for analytics,
              fraud prevention, marketing communications,
              and service optimization.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              Promotional emails and offers will only be sent
              where permitted by applicable laws,
              and you may unsubscribe at any time.
            </p>

          </section>

          {/* Cookies */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Cookie className="w-6 h-6" />
              Cookies and Tracking Technologies
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Our website uses cookies and similar technologies
              to improve functionality, remember preferences,
              analyze website traffic, and enhance user experience.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              You may choose to disable cookies through your browser settings,
              although some website features may not function properly.
            </p>

          </section>

          {/* Payment Security */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              Payment Security
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              We use secure payment gateways and encryption technologies
              to protect your payment information during transactions.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              BAGRU COTTON FEB does not directly store your full
              debit card, credit card, or banking information on our servers.
            </p>

          </section>

          {/* Third Party */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Globe className="w-6 h-6" />
              Third-Party Services and Links
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Our website may include links to third-party websites,
              payment providers, social media platforms,
              or external services that are not controlled by us.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              We encourage users to review the privacy practices
              of such third-party platforms before sharing information.
            </p>

          </section>

          {/* Security */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <Lock className="w-6 h-6" />
              Data Security and Retention
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              We implement reasonable technical and organizational
              safeguards to protect your information from unauthorized access,
              misuse, alteration, or disclosure.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              Personal data is retained only for as long as necessary
              to fulfill orders, comply with legal obligations,
              resolve disputes, and improve customer service.
            </p>

          </section>

          {/* Rights */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              Your Rights and Choices
            </h2>

            <p className="text-[15px] leading-8 text-black/70 mb-6">
              Depending on applicable laws, you may have rights
              to access, correct, update, delete,
              or transfer your personal information.
            </p>

            <p className="text-[15px] leading-8 text-black/70">
              You may also opt out of promotional communications
              and request information about how your data is processed.
            </p>

          </section>

          {/* Children */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <User className="w-6 h-6" />
              Children's Privacy
            </h2>

            <p className="text-[15px] leading-8 text-black/70">
              Our services are not intended for children under the age of 13.
              We do not knowingly collect personal information from children.
            </p>

          </section>

          {/* Changes */}
          <section className="mb-14 border-t border-black/10 pt-12">

            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-[#c8a96b] pl-4 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Changes to This Privacy Policy
            </h2>

            <p className="text-[15px] leading-8 text-black/70">
              We may revise this Privacy Policy from time to time.
              Updated versions will be published on this page
              with the revised “Last Updated” date.
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
                    Green Star Tailor, Children Play School ke samne,
                    Baba Ramdev Mandir, Main Gaushala Rd,
                    Bagru, Jaipur, Rajasthan 303007, India
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