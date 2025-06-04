import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import BreadCrumb from "../../components/BreadCrumb";
import { HOME_ROUTE } from "../../constants/routes";

function PrivacyPolicy() {
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

      <section className="wrapper pb-[50px] pt-[80px] md:pb-[80px] flex flex-col gap-[15px] text-[14px] text-[#666] font-bold leading-[26px]">
        <h2 className="text-[26px] md:text-[40px] text-[#232323] mb-[15px] font-bold">
          Privacy Policy
        </h2>

        <p>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your personal information when
          you visit our website ("Site") or use our services. By using our Site
          and services, you consent to the practices described in this Privacy
          Policy.
        </p>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323]">
          Information We Collect
        </h4>
        <p>
          We may collect both personally identifiable information ("PII") and
          non-personally identifiable information ("Non-PII") from you when you
          interact with our Site or use our services.
        </p>
        <p>
          PII may include but is not limited to your name, email address, postal
          address, phone number, and any other information you voluntarily
          provide to us.
        </p>
        <p>
          Non-PII may include technical information such as your IP address,
          browser type, device information, and website usage data.
        </p>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323]">
          How We Use Your Information
        </h4>
        <p>
          We use the information we collect for various purposes, including:
        </p>
        <ul className="text-[#333] font-normal">
          <li>Providing and improving our services</li>
          <li>Communicating with you</li>
          <li>Responding to your inquiries</li>
          <li>
            Sending you marketing and promotional materials (if you opt-in)
          </li>
          <li>Understanding how users interact with our Site</li>
          <li>Complying with legal obligations</li>
          <li>
            3. The campaign registry would like to confirm that you are not
            selling data to any other 3rd party, as that would be considered
            lead generation which is a prohibited use case according to most
            carriers.
          </li>
        </ul>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323] mt-[-15px]">
          Sale of Data
        </h4>
        <p>
          We do not sell your information you provide to us under any
          circumstance.
        </p>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323]">
          Data Security
        </h4>
        <p>
          We implement reasonable security measures to protect your information
          from unauthorized access, disclosure, alteration, or destruction.
          However, no method of transmission over the internet or electronic
          storage is entirely secure, and we cannot guarantee absolute security.
        </p>
        <p className="text-[#333] font-normal">
          4. The campaign registry would like to confirm that you are not doing
          any form of affiliate marketing as that is as well a prohibited use
          case.
        </p>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323] mt-[-15px]">
          Third-Party Services
        </h4>
        <p>
          We may use third-party services to collect, monitor, and analyze data
          on our behalf, such as website analytics tools. These third parties
          may have their privacy policies governing the use of the information
          they collect.
        </p>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323]">
          Cookies and Similar Technologies
        </h4>
        <p>
          Our Site may use cookies and similar technologies to enhance your
          experience, analyze usage patterns, and personalize content. You can
          manage your cookie preferences through your browser settings.
        </p>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323]">
          Links to Other Websites
        </h4>
        <p>
          Our Site may contain links to other websites that are not operated by
          us. We are not responsible for the privacy practices of those sites,
          and we encourage you to review their respective privacy policies.
        </p>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323]">
          Children's Privacy
        </h4>
        <p>
          Our services are not intended for children under the age of 13. We do
          not knowingly collect or solicit personal information from anyone
          under 13. If you are under 13, please do not use our services or
          provide any information on our Site.
        </p>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323]">
          Changes to This Privacy Policy
        </h4>
        <p>
          We may update this Privacy Policy from time to time. The revised
          policy will be posted on this page with the "Last Updated" date. We
          recommend checking this page periodically for any changes. Your
          continued use of the Site or services after any modifications will
          signify your acceptance of the updated Privacy Policy.
        </p>
        <h4 className="font-normal text-[20px] md:text-[24px] text-[#232323]">
          Contact Us
        </h4>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us using the
          information provided below:
        </p>
        <p>Email: info@fcadvance.com</p>
      </section>
    </>
  );
}

export default PrivacyPolicy;
