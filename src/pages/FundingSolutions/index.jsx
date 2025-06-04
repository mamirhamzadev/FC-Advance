import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import BreadCrumb from "../../components/BreadCrumb";
import { HOME_ROUTE } from "../../constants/routes";
import {
  FUNDING_SOLUTIONS_DECLINED_SECTION,
  FUNDING_SOLUTIONS_IMG_1,
} from "../../constants/images";
import { getFundingSolutionsCardData } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightDots,
  faBullseye,
  faLink,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

function FundingSolutions() {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  return (
    <>
      <Loader show={loading} />

      <BreadCrumb
        paths={[
          { name: "Home", path: HOME_ROUTE },
          { name: "Funding Solutions" },
        ]}
      />

      {/* first section after breadcrumb section */}
      <section className="wrapper py-[50px] md:py-[80px] flex gap-[20px] md:gap-[45px] md:flex-row flex-col items-center justify-center">
        <img
          src={FUNDING_SOLUTIONS_IMG_1}
          alt="Funding Solutions"
          className="w-full md:w-[50%]"
        />
        <div className="flex flex-col gap-[15px] w-full md:w-[50%] text-[#666] text-[14px] open-sans font-semibold leading-[26px]">
          <p className="font-[900]">
            Explore funding solutions tailored to your business
          </p>
          <p>
            FC advance Solutions is committed to providing a wide range of
            financial products that cater to the unique needs of small business
            owners. Our mission is to empower our clients with the funding
            necessary to achieve their goals, with loans ranging from $5,000 to
            $5 million and fast deposit turnaround times.
          </p>
          <p>
            We are proud to revolutionize the industry with our innovative
            merit-based underwriting system. Unlike traditional lenders who
            focus solely on credit scores, our approach creates a fair
            opportunity for qualified businesses to access funding.
          </p>
          <p>
            To learn more about our comprehensive services, please visit our
            website or fill out our quick and easy one-minute application form
            for a free consultation with a business lending expert from FC
            advance Solutions. Alternatively, you may contact us during business
            hours at (855) 952-2383 to discuss your financing needs.
          </p>
        </div>
      </section>

      {/* second section after breadcrumb section */}
      <section className="wrapper py-[50px] md:py-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[30px]">
        {getFundingSolutionsCardData().map((data, index) => (
          <div
            key={index}
            className="aspect-square relative flex items-center justify-center w-ful overflow-hidden group/card"
          >
            <img src={data.img} alt="Card 1" className="w-full h-full" />
            <div className="absolute z-1 bottom-0 py-[25px] px-[30px] flex items-center justify-center text-center bg-gray-700 w-full text-white font-bold text-[18px] trasnition-[transform] duration-[0.8s] delay-[0.35s] transform-[translateY(0)] group-[:hover]/card:transform-[translateY(calc(100%+65px))]">
              <p>{data.title}</p>
              <span className="absolute size-[65px] top-0 transform-[translateY(-50%)] bg-gray-700 rounded-full flex items-center justify-center text-[25px]">
                <FontAwesomeIcon icon={faLink} />
              </span>
            </div>
            <div className="bg-[#2154cfcc] absolute top-0 left-0 size-full z-1 text-white flex items-center justify-center text-center flex-col gap-[15px] px-[10px] font-bold trasnition-[transform] duration-700 delay-[0.1s] transform-[translateY(-100%)] group-[:hover]/card:transform-[translateY(0)]">
              <p className="text-[18px]">{data.title}</p>
              <p className="line-clamp-3 text-[14px] leading-[26px]">
                {data.desc}
              </p>
              <Link to={"#"} className="uppercase text-[12px]">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* How to apply section */}
      <section className="wrapper py-[50px] md:py-[80px]">
        <h2 className="mb-[30px] md:mb-[75px] text-[26px] md:text-[30px] uppercase text-center">
          How to Apply
        </h2>

        <h4 className="text-[#232323] mb-[15px] text-[20px] md:text-[24px]">
          Step 1: Contemplate Your Needs
        </h4>
        <p className="text-[#666] text-[14px] mb-[28px] font-bold leading-[26px]">
          The application process is swift and easy, taking only a few minutes
          to complete, and funds can be deposited into your bank account within
          1 business day from approval. Here is how to get started: Before
          submitting your application, take the time to evaluate whether the
          funding program aligns with your business needs. Consider if the funds
          will meet your desired outcome and if the repayment schedule works
          with your cash flow. Carefully determine the optimal amount of funding
          that will best benefit your business.
        </p>

        <h4 className="text-[#232323] mb-[15px] text-[20px] md:text-[24px]">
          Step 2: Collect Your Documents
        </h4>
        <p className="text-[#666] text-[14px] mb-[28px] font-bold leading-[26px]">
          Here is what you will need to submit with your application:
        </p>
        <ul className="list-disc list-inside mb-[15px] ms-[20px] open-sans text-[14px]">
          <li>A valid driver’s license or passport</li>
          <li>Business voided check</li>
          <li>Past 3 months of bank statements</li>
        </ul>

        <h4 className="text-[#232323] mb-[15px] text-[20px] md:text-[24px]">
          Step 3: Fill Out Our Online Application
        </h4>
        <p className="text-[#666] text-[14px] mb-[28px] font-bold leading-[26px]">
          Getting started with the application process is easy. You can either
          call us or complete our brief online form. We will ask for some
          essential information about your business and the funding amount you
          require. With this information, we can quickly evaluate your needs and
          get you on the path to securing the financing you need.
        </p>

        <h4 className="text-[#232323] mb-[15px] text-[20px] md:text-[24px]">
          Step 4: Speak to a Representative
        </h4>
        <p className="text-[#666] text-[14px] mb-[28px] font-bold leading-[26px]">
          After submitting your application, our representative will guide you
          through the nex3 steps. Have all necessary documents ready as outlined
          i3 Step 2. We'll review your qualifications and explain repayment
          structure, interest rates, and terms. You'll have a clear
          understanding of what to expect during repayment and eliminate any
          surprises. If you agree, complete the final application and submit
          supporting documents.
        </p>

        <h4 className="text-[#232323] mb-[15px] text-[20px] md:text-[24px]">
          Step 5: Receive Approval
        </h4>
        <p className="text-[#666] text-[14px] mb-[28px] font-bold leading-[26px]">
          After approval, expect to receive a confirmation within 24 hours and
          the funds to be deposited in your bank account within 24hours.
        </p>
        <Button text="Apply Now" />
      </section>

      {/* What If I’m Declined section */}
      <section className="py-[50px] md:py-[80px] bg-[#f3f6f8]">
        <div className="wrapper">
          <h2 className="mb-[30px] md:mb-[75px] text-[26px] md:text-[30px] uppercase text-center">
            What If I’m Declined?
          </h2>
          <div className="flex gap-[20px] md:gap-[45px] items-start md:flex-row flex-col">
            <img
              src={FUNDING_SOLUTIONS_DECLINED_SECTION}
              alt="Funding Solutions"
              className="w-full md:w-[50%]"
            />
            <div className="flex flex-col gap-[15px] w-full md:w-[50%] text-[#666] text-[14px] font-bold open-sans leading-[26px]">
              <p className="text-[26px] md:text-[40px] text-[#232323] mb-[5px] md:mb-[25px] leading-[1.2]">
                What If I’m Declined?
              </p>
              <p>
                At FC advance Solutions, we understand that not every
                application for a merchant cash advance will be approved. In
                some cases, a business's cash flow may be insufficient at the
                time of application, or their sales may not meet the required
                minimum over the past three months. In the event that your
                application is declined, we will work with you to explore
                alternative financing options that may better suit your business
                needs.
              </p>
              <p>
                Our goal is to help you find the best solution for your unique
                situation, and we have a team of financial experts who can guide
                you through the process. Our commitment to our clients is to
                provide transparent and personalized guidance, so you can make
                informed decisions that will help your business succeed.
              </p>
            </div>
          </div>

          <div className="mt-[100px] md:mt-[160px] grid-cols-1 grid lg:grid-cols-3 gap-[30px]">
            <div className="text-[14px] h-fit lg:h-[415px] w-full bg-white flex flex-col items-center justify-start gap-[10px] rounded-[10px] p-[30px]">
              <FontAwesomeIcon
                icon={faUserTie}
                className="mb-[5px] text-[36px]"
              />
              <p className="text-[#232323] text-center font-bold">
                Complete The Application
              </p>
              <p className="text-[#666] text-center font-bold leading-[26px]">
                To receive a fast decision, simply provide some basic
                information about your business. Our online application is quick
                and easy to complete, allowing you to get started on securing
                the funding you need.
              </p>
            </div>
            <div className="text-[14px] h-fit lg:h-[415px] w-full bg-white flex flex-col items-center justify-start gap-[10px] rounded-[10px] p-[30px]">
              <FontAwesomeIcon
                icon={faBullseye}
                className="mb-[5px] text-[36px]"
              />
              <p className="text-[#232323] text-center font-bold">
                Approval In Less Than 24 Hours
              </p>
              <p className="text-[#666] text-center font-bold leading-[26px]">
                At FC advance Solutions, we pride ourselves on delivering a
                speedy and efficient funding experience for your business needs.
                Our team of seasoned professionals will work tirelessly to match
                you with the perfect funding solution that aligns with your
                specific requirements and helps you achieve your goals in record
                time.
              </p>
            </div>
            <div className="text-[14px] h-fit lg:h-[415px] w-full bg-white flex flex-col items-center justify-start gap-[10px] rounded-[10px] p-[30px]">
              <FontAwesomeIcon
                icon={faArrowUpRightDots}
                className="mb-[5px] text-[36px]"
              />
              <p className="text-[#232323] text-center font-bold">
                Same-day Funding
              </p>
              <p className="text-[#666] text-center font-bold leading-[26px]">
                At FC advance Solutions, we understand the importance of timely
                funding for the growth and success of your business. Our
                streamlined application process enables you to receive approval
                and transfer of funds within a matter of hours. Let us help you
                get the capital you need to take your business to the next
                level.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FundingSolutions;
