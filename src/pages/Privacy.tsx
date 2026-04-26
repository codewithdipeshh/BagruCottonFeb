import { useEffect } from "react";

export default function Privacy() {

  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-black">

      {/* Heading */}
      <h1 className="text-center text-2xl font-semibold tracking-widest mb-8">
        PRIVACY POLICY
      </h1>

      {/* Content Wrapper */}
      <div className="max-w-2xl mx-auto">

        {/* Last Updated */}
        <p className="mb-6 font-medium text-[13px]">
          Last Updated: January 2026
        </p>

        {/* Intro */}
        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          Bagru Cotton Feb operates this website and related services, including all information,
          content, features, products, and tools, to provide you with a smooth and reliable shopping
          experience (the “Services”). Our platform is designed to help customers explore and purchase
          authentic Bagru handblock cotton sarees with ease. This Privacy Policy explains how we
          collect, use, and manage your personal information when you visit our website, interact with
          our services, make a purchase, or communicate with us. In case of any conflict between our
          Terms of Service and this Privacy Policy, this Privacy Policy will take precedence.
        </p>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          We encourage you to read this Privacy Policy carefully. By accessing or using any part of
          our Services, you confirm that you have read, understood, and agreed to the collection,
          use, and disclosure of your information as described in this Privacy Policy.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          Third-Party Websites and Links
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          Our Services may include links to external websites or platforms operated by third parties.
          These websites are not controlled by Bagru Cotton Feb. We recommend reviewing their privacy
          policies before sharing any personal information.
        </p>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          Any information shared on public platforms like social media may be visible to others and
          used according to their policies. Links to third-party websites do not imply endorsement
          unless explicitly stated.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          Security and Retention of Your Information
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          We take reasonable measures to protect your personal information. However, no method of
          transmission or storage is completely secure. We cannot guarantee absolute security.
        </p>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          We retain your data only as long as necessary to provide services, fulfill orders, comply
          with legal obligations, resolve disputes, and enforce policies.
        </p>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          Your Rights and Choices
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          Depending on applicable laws, you may have rights to access, correct, delete, or transfer
          your personal data. You can also opt out of marketing communications anytime.
        </p>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          Some essential communications (like order updates) may still be sent. We may verify your
          identity before processing requests.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          Complaints
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          If you have concerns about how your data is handled, you can contact us. You may also have
          the right to file a complaint with a data protection authority.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          International Transfers
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          Your information may be processed outside your country. We ensure appropriate safeguards
          are in place to protect your data.
        </p>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          Changes to This Privacy Policy
        </h2>

        <p className="text-[13px] font-poppins mb-[25px] leading-relaxed">
          We may update this policy from time to time. Updates will be posted here with a revised
          “Last Updated” date.
        </p>

        {/* Contact */}
        <h2 className="text-xl font-semibold tracking-widest mb-4 mt-8">
          Contact
        </h2>

        <p className="mb-2 text-[13px]">Email: info@bagrucottonfeb.com</p>
        <p className="mb-2 text-[13px]">Phone / WhatsApp: +91 98765 43210</p>
        <p className="text-[13px]">
          Address: Bus Stop, Bagru Cotton Feb, Green Star Tailor, Children Play School ke samne,
          Baba Ramdev Mandir, Main Gaushala Rd, Bagru, Jaipur, Rajasthan 303007, India
        </p>

      </div>
    </div>
  );
}