import { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import {
  getAboutUsTabsData,
  getAdvanceSolutionsData,
  getWorkProcessData,
  getWorkProcessVisualData,
} from "./data";
import { ABOUT_US_IMG_1, ABOUT_US_IMG_2 } from "../../constants/images";
import { HOME_ROUTE } from "../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../components/Loader";

function AboutUs() {
  const [activeTab, setActiveTab] = useState("Our Mission");
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  return (
    <>
      <Loader show={loading} />

      <BreadCrumb
        paths={[{ name: "Home", path: HOME_ROUTE }, { name: "About Us" }]}
      />

      {/* About Us section */}
      <section className="wrapper flex items-center flex-col py-[50px] md:py-[120px]">
        <h2 className="mb-[45px] text-[26px] md:text-[30px] uppercase text-center">
          About Us
        </h2>
        <p className="mb-[30px] md:mb-[60px] text-[14px] text-[#666] open-sans md:max-w-[66%] font-bold text-center">
          FC advance Solutions is a leading financial company dedicated to
          providing merchant cash advances to small and medium-sized businesses.
        </p>
        <div className="flex gap-[15px] md:flex-row items-start flex-col justify-center">
          <img
            src={ABOUT_US_IMG_1}
            alt="About US"
            className="w-full md:w-[50%]"
          />
          <div className="flex flex-col gap-[15px] w-full md:w-[50%] py-[50px] md:p-[20px]">
            <div className="flex gap-[15px] flex-wrap items-center text-[14px] py-[30px] *:h-[40px] md:*:h-[50px]">
              {getAboutUsTabsData().map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(tab.name)}
                  className={`${
                    activeTab === tab.name ? "text-gray-700" : "text-black"
                  } hover:text-gray-700 bg-white shadow-[0_0_10px_#cccccc] font-bold p-[7px] md:p-[11px] rounded-[4px] transition-colors duration-300`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-[15px] text-[#666] text-[14px] leading-[26px] font-bold open-sans">
              {getAboutUsTabsData()
                .filter((tab) => tab.name === activeTab)
                .map((data) => {
                  return data.text.map((datum, index) => (
                    <p key={index}>{datum}</p>
                  ));
                })}
            </div>
          </div>
        </div>
      </section>

      {/* A Trustful Funding Option section */}
      <section className="wrapper flex items-center flex-col py-[50px] md:py-[80px]">
        <h2 className="mb-[45px] md:mb-[75px] text-[26px] md:text-[30px] uppercase text-center">
          A Trustful Funding Option
        </h2>
        <div className="flex gap-[30px] md:gap-[45px] md:flex-row items-center flex-col justify-center">
          <img
            src={ABOUT_US_IMG_2}
            alt="Trustful funding"
            className="w-full md:w-[50%]"
          />
          <div className="flex flex-col gap-[15px] text-[#666] text-[14px] leading-[26px] font-bold open-sans">
            <p>
              At fC advance Solutions, we're dedicated to helping businesses of
              all sizes reach their full potential. We understand that securing
              financing can be a major challenge, especially in today's economic
              climate. That's why we're committed to offering a range of funding
              solutions designed to meet the unique needs of our clients. We
              pride ourselves on our ability to provide customized financing
              options that are tailored to your specific goals and objectives.
            </p>
            <p>
              Our team of experienced professionals has helped businesses across
              a wide range of industries secure the funding they need to grow
              align-center and succeed. Whether you're looking to expand,
              upgrade equipment, or take advantage of new opportunities, we can
              help. Our funding products are competitively priced and
              accessible, providing a range of options to suit your business's
              financial needs.
            </p>
            <p>
              At fC advance Solutions, we're dedicated to providing exceptional
              customer service. We understand that your time is valuable, and
              we're committed to making the financing process as quick and
              efficient as possible. Our team is always available to answer any
              questions you may have and help you navigate the funding process
              from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* part of above section */}
      <section className="wrapper pt-[80px] pb-[50px] md:py-[80px] flex gap-[30px] md:gap-[45px] md:flex-row items-center flex-col justify-center">
        <div className="flex flex-col gap-[15px] text-[#666] text-[14px] leading-[26px] font-bold open-sans">
          <p>
            We offer funding products ranging from $5,000 to $1 million,
            ensuring that we can meet the needs of businesses of all sizes. Our
            financing solutions help you maintain a positive cash flow, so you
            can focus on conducting business as usual. We're proud to serve
            businesses in all 50 states, providing funding solutions to
            companies that may be unable to secure financing through traditional
            methods.
          </p>
          <p>
            Whether you've been in business for years or are just starting out,
            fC advance Solutions can help. We've worked with businesses of all
            sizes, including those in industries that other providers may avoid.
            Our clients have included restaurants, entertainment companies,
            general contractors, landscapers, retailers, hair and nail salons,
            and resorts, among others.
          </p>
          <p>
            The cash advance products we offer can be used for any business
            purpose, giving you the freedom and flexibility to use the funds in
            a way that makes sense for your business. We're committed to helping
            you achieve your goals and take your business to the next level. Let
            us help you secure the financing you need to succeed.
          </p>
        </div>
        <img
          src={ABOUT_US_IMG_2}
          alt="Trustful funding"
          className="w-full md:w-[50%]"
        />
      </section>

      {/* fC advance Solutions section */}
      <section className="wrapper flex items-center flex-col py-[50px] md:pt-[80px] pb-[20px]">
        <h2 className="mb-[30px] md:mb-[45px] text-[26px] md:text-[30px] uppercase text-center">
          fC advance Solutions
        </h2>
        <p className="mb-[30px] md:mb-[60px] text-[14px] text-[#666] open-sans md:max-w-[66%] font-bold text-center">
          There are several reasons why you should consider getting funded by fC
          advance Solutions:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-x-[30px] md:gap-y-[50px] mt-[10px]">
          {getAdvanceSolutionsData().map((data, index) => (
            <div
              key={index}
              className="flex gap-[15px] md:gap-[20px] flex-col md:flex-row md:items-start items-center"
            >
              <span className="size-[70px] rounded-full flex items-center justify-center text-[25px] bg-gray-700 text-white">
                <FontAwesomeIcon icon={data.icon} />
              </span>
              <div className="flex-1 flex flex-col gap-[15px] md:items-start items-center">
                <h4 className="text-center md:text-start text-[18px] text-[#232323] font-bold">
                  {data.title}
                </h4>
                <p className="text-center md:text-start text-[14px] text-[#666] font-bold open-sans leading-[26px]">
                  {data.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Process section */}
      <section className="wrapper flex items-center flex-col py-[50px] md:py-[80px]">
        <h2 className="mb-[30px] md:mb-[45px] text-[26px] md:text-[30px] uppercase text-center">
          Work Process
        </h2>
        <p className="mb-[30px] md:mb-[60px] text-[14px] text-[#666] open-sans font-bold text-center">
          Able an hope of body. Any nay shyness article matters own removal
          nothing his forming. Gay own additions education satisfied the
          perpetual. If he cause manor happy. Without farther she exposed saw
          man led. Along on happy could cease green oh.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:!grid-cols-5 w-full gap-[30px] mb-[120px]">
          {getWorkProcessData().map((data, index) => (
            <>
              {index === 2 ? (
                <div
                  key={data.title}
                  className="w-full xl:!hidden md:block hidden"
                ></div>
              ) : null}
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 ? "flex-col-reverse" : ""
                } ${
                  index === 4 ? "xl:!col-span-1 md:col-span-2" : ""
                } gap-[15px] items-center justify-center w-full text-center group/work`}
              >
                <div
                  className={`h-[190px] ${
                    index % 2 ? "flex items-end justify-center" : ""
                  }`}
                >
                  <span className="size-[80px] rounded-full bg-gray-700 text-[30px] italic text-white flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <span
                  className={`relative size-[40px] rounded-full bg-[#e7e7e7] flex items-center justify-center before:absolute before:w-[2px] before:h-[140px] before:bg-[#e7e7e7] after:absolute after:size-[8px] after:rounded-full after:bg-[#e7e7e7] before:transition-[height] after:transition-[top,bottom] before:duration-1000 after:duration-1000 group-[:hover]/work:before:h-0 ${
                    index % 2
                      ? "before:top-0 after:top-[140px] group-[:hover]/work:after:top-0"
                      : "before:bottom-0  after:bottom-[140px] group-[:hover]/work:after:bottom-0"
                  }`}
                ></span>
                <div className="flex flex-col gap-[15px]">
                  <p className="text-[18px] text-[#232323] font-bold">
                    {data.title}
                  </p>
                  <p className="text-[14px] open-sans text-[#666] font-bold">
                    {data.tagline}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="flex flex-col w-full gap-[30px]">
          {getWorkProcessVisualData().map((data, index) => (
            <div
              key={index}
              className={`flex gap-[25px] md:gap-[50px] flex-col md:flex-row items-center md:items-start w-full p-[30px] rounded-[5px] bg-white shadow-[0_0_10px_#cccccc]`}
            >
              <img
                src={data.img}
                alt={data.title}
                className="w-full md:w-[250px] rounded-[10px]"
              />
              <div className="flex flex-col gap-[10px] md:items-start items-center">
                <h4 className="text-[#232323] font-bold text-[18px] md:text-start text-center">
                  {data.title}
                </h4>
                <p className="open-sans text-[#666] text-[14px] font-bold italic md:text-start text-center">
                  {data.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default AboutUs;
