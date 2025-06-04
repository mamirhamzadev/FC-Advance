import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import BreadCrumb from "../../components/BreadCrumb";
import { HOME_ROUTE } from "../../constants/routes";

function TermsConditions() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <Loader show={loading} />

      <BreadCrumb
        paths={[
          { name: "Home", path: HOME_ROUTE },
          { name: "Privacy and Policy" },
        ]}
      />

      <section className="wrapper pb-[50px] pt-[80px] md:pb-[80px] text-[14px] text-[#333] leading-[26px]">
        <h2 className="text-[26px] md:text-[40px] text-[#232323] mb-[30px] font-bold">
          Privacy Policy
        </h2>

        <p>Terms and Conditions - Business fcadvance.com</p>
        <p>1. Introduction</p>
        <p>
          Welcome to Business fcadvance.com. These Terms and Conditions govern
          your use of our website and services. By accessing and using our
          website, you agree to be bound by these Terms and Conditions. If you
          do not agree with any part of these terms, you must not use our
          website.
        </p>
        <p>2. Use of Our Website</p>
        <p>
          (a) You must be at least 18 years old to use our website and services.
          By using our website, you confirm that you are at least 18 years old.
        </p>
        <p>
          (b) You may not use our website for any illegal or unauthorized
          purposes. You agree to comply with all applicable laws and
          regulations.
        </p>
        <p>
          (c) We reserve the right to modify, suspend, or discontinue any part
          of our website, services, or content without prior n
        </p>
        <p>
          (d) Your use of any information or materials on this website is
          entirely at your own risk, for which we shall not be liable.
        </p>
        <p>3. Intellectual Property Rights</p>
        <p>
          (a) All content on this website, including but not limited to text,
          graphics, logos, images, videos, and software, is the property of
          Business (Your Company Name) and is protected by copyright and other
          intellectual property laws.
        </p>
        <p>
          (b) You may not reproduce, distribute, modify, transmit, or use any
          part of our website's content without our prior written consent.
        </p>
        <p>4. Privacy Policy</p>
        <p>
          (a) Our Privacy Policy outlines how we collect, use, and protect your
          personal information. By using our website, you consent to our Privacy
          Policy.
        </p>
        <p>
          (b) We do not share or sell your personal information to third
          parties.
        </p>
        <p>5. Disclaimer</p>
        <p>
          (a) The information provided on our website is for general
          informational purposes only. We make no warranties or representations
          about the accuracy, completeness, or reliability of the content.
        </p>
        <p>
          (b) We are not responsible for any damages or losses resulting from
          the use of our website or any information provided therein.
        </p>
        <p>6. Links to Third-Party Websites</p>
        <p>
          Our website may contain links to third-party websites. We do not
          endorse or have any control over the content or practices of these
          websites. Your use of third-party websites is at your own risk.
        </p>
        <p>7. Limitation of Liability</p>
        <p>
          To the extent permitted by law, Business (Your Company Name) shall not
          be liable for any direct, indirect, incidental, consequential, or
          special damages arising from or in any way related to your use of our
          website or services.
        </p>
        <p>8. Indemnification</p>
        <p>
          You agree to indemnify and hold harmless Business (Your Company Name),
          its officers, directors, employees, and affiliates, from any claims,
          losses, damages, liabilities, costs, or expenses (including legal
          fees) arising out of your use of our website or violation of these
          Terms and Conditions.
        </p>
        <p>9. Governing Law and Jurisdiction</p>
        <p>
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of [Your Jurisdiction]. Any disputes arising
          from or related to these terms shall be subject to the exclusive
          jurisdiction of the courts.
        </p>
        <p>10. Changes to Terms and Conditions</p>
        <p>
          We reserve the right to update or modify these Terms and Conditions at
          any time without prior notice. Your continued use of our website
          following the posting of any changes constitutes your acceptance of
          such changes.
        </p>
        <p>11. Contact Us</p>
        <p>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at info@fcadvance.com.
        </p>
      </section>
    </>
  );
}

export default TermsConditions;
