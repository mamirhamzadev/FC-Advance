import { useEffect, useRef, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import {
  getAdvanceFundingSolutionsTableData,
  getCrousalData,
  getFundingSolutionsCrousalData,
} from "./data";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  ABOUT_US_SECTION,
  TRUSTFUL_FUNDING_IMG_1,
  TRUSTFUL_FUNDING_IMG_2,
} from "../../constants/images";
import Loader from "../../components/Loader";
import { ABOUT_US_ROUTE } from "../../constants/routes";

function Home() {
  const [swiperIndex, setSwiperIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [fundingSolutionSwiperIndex, setFundingSolutionSwiperIndex] =
    useState(0);
  const swiperRef = useRef(null);
  const fundingSolutionSwiperRef = useRef(null);

  useEffect(() => {
    setSwiperIndex(0);
    setLoading(false);
  }, []);

  return (
    <>
      <Loader show={loading} />

      {/* hero section */}
      <section className="h-screen w-full flex items-center justify-center relative group/hero overflow-x-hidden">
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="absolute z-2 size-[50px] flex items-center justify-center text-[30px] text-white left-[20px] transform-[translateX(calc(-100%-20px))] transition-[transform] duration-700 group-[:hover]/hero:transform-[translateX(0)]"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="absolute z-2 size-[50px] flex items-center justify-center text-[30px] text-white right-[20px] transform-[translateX(calc(100%+20px))] transition-[transform] duration-700 group-[:hover]/hero:transform-[translateX(0)]"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          modules={[EffectFade, Autoplay]}
          effect="fade"
          loop
          autoplay={{ delay: 20000 }}
          className="size-full"
          onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
        >
          {getCrousalData().map((crousal, index) => (
            <SwiperSlide key={index}>
              <div
                className={`size-full relative flex items-center justify-center before:absolute before:top-0 before:left-0 before:size-full before:bg-black before:opacity-50 before:z-1 text-white ${
                  swiperIndex === index ? "active" : ""
                } group/slide`}
              >
                <img
                  src={crousal.img}
                  alt={`Crousal ${index + 1}`}
                  className={`size-full object-cover transform-[scale(1,1)] group-[.active]/slide:animate-[var(--animate-zoom)]`}
                />
                <div className="wrapper absolute flex z-2 items-center justify-center flex-col gap-[35px] overflow-hidden">
                  <div
                    className={`text-center delay-1000 duration-500 transition-[transform] transform-[translateY(-100%)] group-[.active]/slide:transform-[translateY(0)]`}
                  >
                    {crousal.text}
                  </div>
                  <div
                    className={`flex flex-wrap justify-center gap-[15px] delay-[1.3s] duration-500 transition-[transform] transform-[translateY(100%)] group-[.active]/slide:transform-[translateY(0)]`}
                  >
                    {crousal.buttons.map((button) => (
                      <Button
                        key={button.title}
                        text={button.title}
                        href={button.path}
                        className="first:bg-white first:text-black first:hover:text-white"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* about us section */}
      <section className="wrapper py-[50px] md:py-[80px] flex gap-[20px] md:gap-[45px] md:flex-row flex-col items-center justify-center">
        <img
          src={ABOUT_US_SECTION}
          alt="About US"
          className="w-full md:w-[50%]"
        />
        <div className="flex flex-col gap-[15px] w-full md:w-[50%]">
          <h2 className="mb-[15px] text-[26px] md:text-[40px] text-[#232323] font-bold">
            About Us
          </h2>
          <p className="text-[14px] open-sans font-[900] text-[#666]">
            FC advance Solutions is a leading financial company dedicated to
            providing merchant cash advances to small and medium-sized
            businesses.
          </p>
          <p className="text-[14px] open-sans font-semibold text-[#666]">
            Our mission is to help businesses access the funds they need to grow
            align-center and succeed, and we do so by offering innovative
            financing solutions that are tailored to meet the unique needs of
            each of our clients.
          </p>
          <p className="text-[14px] open-sans font-semibold text-[#666]">
            Contact us today to learn more about how we can help your business
            thrive.
          </p>
          <Button text="Read More" className="w-fit" href={ABOUT_US_ROUTE} />
        </div>
      </section>

      {/* Funding Solutions section */}
      <section className="py-[50px] md:py-[80px] bg-[#f3f6f8]">
        <div className="wrapper">
          <h2 className="text-[26px] lg:text-[30px] font-normal uppercase text-center mb-[45px]">
            Funding Solutions
          </h2>
          <p className="text-[14px] open-sans font-bold text-center text-[#666] mb-[60px]">
            At FC advance Solutions, we are a leading provider of financing
            solutions and services that are designed to help your business grow
            align-center. Our offerings are highly competitive and easily
            accessible, providing a range of options to meet the diverse needs
            of business owners. Whether you are looking to expand your
            operations, upgrade your equipment, or pursue new opportunities, we
            offer customized funding solutions to support your unique goals. Our
            team of experts is committed to providing exceptional customer
            service, and we work closely with each of our clients to understand
            their specific needs and help them achieve their goals.
          </p>
          <div className="relative flex items-center justify-center">
            <Swiper
              ref={fundingSolutionSwiperRef}
              slidesPerView={1}
              onSlideChange={(swiper) =>
                setFundingSolutionSwiperIndex(swiper.realIndex)
              }
            >
              {getFundingSolutionsCrousalData().map((crousal, index) => (
                <SwiperSlide key={index}>
                  <div className="flex gap-[15px] flex-col lg:flex-row items-center justify-center">
                    <img
                      src={crousal.img}
                      alt={crousal.title}
                      className="w-full lg:w-[50%]"
                    />
                    <div className="w-full lg:w-[50%] px-0 py-[50px] lg:p-[80px] flex flex-col gap-[15px] items-center lg:items-start">
                      <h3 className="text-center lg:text-start text-[26px] lg:text-[30px] font-bold text-[#232323]">
                        {crousal.title}
                      </h3>
                      <p className="text-center lg:text-start text-[14px] text-[#666] font-bold leading-[26px] line-clamp-3">
                        {crousal.description}
                      </p>
                      <Button
                        text={crousal.button.title}
                        href={crousal.button.path}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute z-1 bottom-0 lg:bottom-[30px] right-auto lg:right-[30px] flex items-center gap-[15px]">
              {getFundingSolutionsCrousalData().map((_, index) => (
                <span
                  onClick={() =>
                    fundingSolutionSwiperRef.current?.swiper.slideTo(index)
                  }
                  key={index}
                  className={`border-[3px] border-gray-700 rounded-full size-[20px] aspect-square cursor-pointer transition-colors duration-300 hover:bg-gray-700 ${
                    fundingSolutionSwiperIndex === index ? "bg-gray-700" : ""
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FC advance funding solutions vs banks section */}
      <section className="pt-[50px] pb-[20px] md:py-[80px] bg-[#f3f6f8]">
        <div className="wrapper">
          <h2 className="text-[26px] lg:text-[30px] font-normal uppercase text-center mb-[45px] md:mb-[60px]">
            FC Advance Funding Solutions VS Banks
          </h2>
          <div className="overflow-auto w-full md:border-0 border border-[#ddd]">
            <table className="w-full text-[14px] open-sans">
              <thead>
                <tr>
                  <th className="text-start p-[20px] border-b-[2px] border-b-[#ddd]"></th>
                  <th className="text-start p-[20px] border-b-[2px] border-b-[#ddd]">
                    PRO
                  </th>
                  <th className="text-start p-[20px] border-b-[2px] border-b-[#ddd]">
                    Basic
                  </th>
                </tr>
              </thead>
              <tbody>
                {getAdvanceFundingSolutionsTableData().map((data) => (
                  <tr className="nth-of-type-[odd]:bg-[#0000000d]">
                    <th className="text-start p-[20px] whitespace-nowrap">
                      {data.title}
                    </th>
                    <td className="text-start p-[20px]">
                      <FontAwesomeIcon
                        icon={data.pro ? faCheck : faXmark}
                        className={
                          data.pro ? "text-[#3c763d]" : "text-[#a94442]"
                        }
                        fontSize={15}
                        width={15}
                      />
                    </td>
                    <td className="text-start p-[20px]">
                      <FontAwesomeIcon
                        icon={data.Basic ? faCheck : faXmark}
                        className={
                          data.Basic ? "text-[#3c763d]" : "text-[#a94442]"
                        }
                        fontSize={15}
                        width={15}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* A Trustful Funding Option section */}
      <section className="wrapper py-[50px] md:py-[80px]">
        <h2 className="mb-[45px] md:mb-[75px] text-[26px] md:text-[30px] text-[#232323] text-center uppercase">
          A Trustful Funding Option
        </h2>
        <div className="flex items-center flex-col md:flex-row gap-[30px] md:gap-[45px] justify-center mb-[100px] md:mb-[160px]">
          <img
            src={TRUSTFUL_FUNDING_IMG_1}
            alt="Trustful Funding"
            className="w-full md:w-[50%]"
          />
          <div className="flex flex-col gap-[15px] text-[#666] font-bold text-[14px] leading-[26px] w-full md:w-[50%]">
            <p>
              At FC advance Solutions, we're dedicated to helping businesses of
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
              At FC advance Solutions, we're dedicated to providing exceptional
              customer service. We understand that your time is valuable, and
              we're committed to making the financing process as quick and
              efficient as possible. Our team is always available to answer any
              questions you may have and help you navigate the funding process
              from start to finish.
            </p>
          </div>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-0 md:gap-[45px] justify-center">
          <div className="flex flex-col gap-[15px] text-[#666] font-bold text-[14px] leading-[26px] w-full md:w-[50%]">
            <p>
              We offer funding products ranging from $5,000 to $1 million,
              ensuring that we can meet the needs of businesses of all sizes.
              Our financing solutions help you maintain a positive cash flow, so
              you can focus on conducting business as usual. We're proud to
              serve businesses in all 50 states, providing funding solutions to
              companies that may be unable to secure financing through
              traditional methods.
            </p>
            <p>
              Whether you've been in business for years or are just starting
              out, FC advance Solutions can help. We've worked with businesses
              of all sizes, including those in industries that other providers
              may avoid. Our clients have included restaurants, entertainment
              companies, general contractors, landscapers, retailers, hair and
              nail salons, and resorts, among others.
            </p>
            <p>
              The cash advance products we offer can be used for any business
              purpose, giving you the freedom and flexibility to use the funds
              in a way that makes sense for your business. We're committed to
              helping you achieve your goals and take your business to the next
              level. Let us help you secure the financing you need to succeed.
            </p>
          </div>
          <img
            src={TRUSTFUL_FUNDING_IMG_2}
            alt="Trustful Funding"
            className="w-full md:w-[50%]"
          />
        </div>
      </section>
    </>
  );
}

export default Home;
