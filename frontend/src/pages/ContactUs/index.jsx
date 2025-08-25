import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import {
  HOME_ROUTE,
  PRIVACY_POLICY_ROUTE,
  TERMS_CONDITIONS_ROUTE,
} from "../../constants/routes";
import { getContactInfoData } from "./data";

function ContactUs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData(e.target);
    console.log(Object.fromEntries(payload))
  }

  return (
    <>
      <Loader show={loading} />

      <BreadCrumb
        paths={[{ name: "Home", path: HOME_ROUTE }, { name: "Contact Us" }]}
      />

      <section className="wrapper py-[120px] flex gap-[80px] md:gap-[45px] md:flex-row flex-col items-start justify-center">
        <form
          onSubmit={handleFormSubmit}
          action=""
          className="shadow-[0_0_10px_#cccccc] px-[30px] py-[50px] flex-1"
        >
          <h3 className="text-[20px] md:text-[24px] mb-[20px] text-[#232323] font-bold">
            Get In Touch
          </h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border-0 outline-0 py-[6px] px-[12px] h-[34px] border-b border-b-[#e7e7e7] w-full text-[14px] mb-[15px]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            className="border-0 outline-0 py-[6px] px-[12px] h-[34px] border-b border-b-[#e7e7e7] w-full text-[14px] mb-[15px]"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone*"
            className="border-0 outline-0 py-[6px] px-[12px] h-[34px] border-b border-b-[#e7e7e7] w-full text-[14px] mb-[15px]"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="border-0 outline-0 py-[6px] px-[12px] h-[34px] border-b border-b-[#e7e7e7] w-full text-[14px] mb-[15px]"
          />
          <textarea
            name="message"
            placeholder="Write Your Message"
            className="border-0 outline-0 resize-y min-h-[180px] py-[6px] px-[12px] h-[34px] border-b border-b-[#e7e7e7] w-full text-[14px] mb-[15px]"
          ></textarea>
          <div className="flex gap-[20px] mb-[15px]">
            <input type="checkbox" name="notifications" id="notifications" required />
            <label htmlFor="notifications" className="text-[14px] text-[#333]">
              By checking this box, you agree to the Terms of Use and Privacy Policy of FC Advance. You agree to receive text messages (message and data rates may apply; message frequency may vary. By opting in, you will receive important updates, promotional offers, and account-related FC Advance Messages directly to your phone. For assistance, call us at <a href="tel:+1 (646) 707 5610">+1 (646) 707 5610</a>. You may opt out at any time by replying <strong>"STOP"</strong> to text messages.) and emails to the contact information provided. Your information will be handled in accordance with our&nbsp;
              <Link to={TERMS_CONDITIONS_ROUTE} className="underline">
                Terms of Use
              </Link>
              &nbsp;and&nbsp;
              <Link to={PRIVACY_POLICY_ROUTE} className="underline">
                privacy policy
              </Link>
            </label>
          </div>
          <Button type="submit" className="mt-[25px] flex gap-[5px] items-center">
            <p>Send Message</p>
            <FontAwesomeIcon icon={faPaperPlane} className="text-[12px]" />
          </Button>
        </form>
        <div className="md:w-[33%] flex flex-col mt-[30px] gap-[20px] text-[#232323] text-[14px] font-bold">
          <h3 className="text-[20px] md:text-[24px]">Contact Info</h3>
          {getContactInfoData().map((data, index) => (
            <div key={index} className="flex gap-[15px] items-center">
              <span className="size-[70px] rounded-full border border-gray-700 text-gray-700 flex items-center justify-center text-[30px]">
                <FontAwesomeIcon icon={data.icon} />
              </span>
              <div className="flex-1">
                <p className="mb-[10px] uppercase">{data.title}</p>
                <p className="capitalize font-normal">{data.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section >
    </>
  );
}

export default ContactUs;
