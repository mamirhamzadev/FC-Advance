import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import BreadCrumb from "../../components/BreadCrumb";
import {
  HOME_ROUTE,
  PRIVACY_POLICY_ROUTE,
  TERMS_CONDITIONS_ROUTE,
} from "../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { getContactInfoData } from "./data";
import { Link } from "react-router-dom";

function ContactUs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  return (
    <>
      <Loader show={loading} />

      <BreadCrumb
        paths={[{ name: "Home", path: HOME_ROUTE }, { name: "Contact Us" }]}
      />

      <section className="wrapper py-[120px] flex gap-[80px] md:gap-[45px] md:flex-row flex-col items-start justify-center">
        <form
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
            className="py-[6px] px-[12px] h-[34px] border-b border-b-[#e7e7e7] w-full text-[14px] mb-[15px]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            className="py-[6px] px-[12px] h-[34px] border-b border-b-[#e7e7e7] w-full text-[14px] mb-[15px]"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="py-[6px] px-[12px] h-[34px] border-b border-b-[#e7e7e7] w-full text-[14px] mb-[15px]"
          />
          <textarea
            name="message"
            placeholder="Write Your Message"
            className="resize-y min-h-[180px] py-[6px] px-[12px] h-[34px] border-b border-b-[#e7e7e7] w-full text-[14px] mb-[15px]"
          ></textarea>
          <div className="flex gap-[20px] mb-[15px]">
            <input type="checkbox" name="notifications" id="notifications" />
            <label htmlFor="notifications" className="text-[14px] text-[#333]">
              By providing your phone number, you agree to receive text messages
              from <strong>Fc Advance</strong> subject to our{" "}
              <Link to={PRIVACY_POLICY_ROUTE} className="underline">
                privacy policy
              </Link>{" "}
              and{" "}
              <Link to={TERMS_CONDITIONS_ROUTE} className="underline">
                terms & conditions
              </Link>
              . Message & data rates may apply. Message frequency varies. Reply
              Stop to opt out.
            </label>
          </div>
          <Button className="mt-[25px] flex gap-[5px] items-center">
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
      </section>
    </>
  );
}

export default ContactUs;
