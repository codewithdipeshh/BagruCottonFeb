import { useEffect } from "react";

export default function TermsOfService() {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-black">

      {/* Heading */}
      <h1 className="text-center text-2xl font-semibold tracking-widest mb-8">
        TERMS OF SERVICE
      </h1>

      {/* Content Wrapper */}
      <div className="max-w-2xl mx-auto">

        {/* Last Updated */}
        <p className="mb-6 font-medium text-[13px]">
          Last Updated: January 2026
        </p>

        {/* Intro */}
        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          Welcome to Bagru Cotton Feb. These Terms of Service govern your use of our website,
          products, and services. By accessing or using our website, you agree to be bound by
          these terms.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          1. Use of Our Services
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          You agree to use our website only for lawful purposes. You must not misuse our
          services, attempt unauthorized access, or engage in activities that may harm
          our platform or other users.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          2. Products and Pricing
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          We strive to display accurate product descriptions and pricing. However, errors
          may occur. We reserve the right to correct any errors and update information
          without prior notice.
        </p>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          3. Orders and Payments
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          By placing an order, you agree to provide accurate and complete information.
          Payments are processed securely through third-party payment gateways. We reserve
          the right to cancel or refuse any order at our discretion.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          4. Shipping and Delivery
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          Delivery timelines are estimates and may vary depending on location and external
          factors. We are not responsible for delays caused by courier partners or unforeseen
          circumstances.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          5. Returns and Refunds
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          Returns and refunds are subject to our return policy. Please review the policy
          carefully before making a purchase.
        </p>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          6. Intellectual Property
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          All content on this website, including images, text, logos, and designs, is the
          property of Bagru Cotton Feb and is protected by applicable copyright laws.
        </p>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          7. Limitation of Liability
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          We are not liable for any indirect, incidental, or consequential damages arising
          from your use of our services or products.
        </p>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          8. Changes to Terms
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          We may update these Terms of Service from time to time. Changes will be posted
          on this page with an updated date.
        </p>

        {/* Contact */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          Contact
        </h2>

        <p className="mb-2 text-[13px]">
          Email: info@bagrucottonfeb.com
        </p>

        <p className="mb-2 text-[13px]">
          Phone / WhatsApp: +91 98765 43210
        </p>

        <p className="text-[13px]">
          Address: Bagru, Jaipur, Rajasthan, India
        </p>

      </div>
    </div>
  );
}