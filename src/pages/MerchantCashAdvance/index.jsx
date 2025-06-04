import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import BreadCrumb from "../../components/BreadCrumb";
import { FUNDING_SOLUTIONS_ROUTE, HOME_ROUTE } from "../../constants/routes";
import {
  FUNDING_SOLUTIONS_DECLINED_SECTION,
  MERCHANT_CASH_ADVANCE_IMG,
} from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightDots,
  faBullseye,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

function MerchantCashAdvance() {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  return (
    <>
      <Loader show={loading} />

      <BreadCrumb
        paths={[
          { name: "Home", path: HOME_ROUTE },
          { name: "Funding Solutions", path: FUNDING_SOLUTIONS_ROUTE },
          { name: "Merchant Cash Advance" },
        ]}
      />

      <section className="bg-[#f7f7f7] py-[50px] md:py-[80px]">
        <div className="wrapper text-[#666] text-[14px] font-bold leading-[26px]">
          <h2 className="text-[26px] md:text-[40px] text-[#232323] mb-[45px] font-bold">
            Merchant Cash Advance
          </h2>
          <p className="mb-[28px]">
            When your business needs fast capital, a Merchant Cash Advance is a
            great solution. This type of financing is easily accessible for most
            businesses, and it does not come with steep requirements like
            excellent credit scores or overflowing bank statements.
          </p>
          <p className="mb-[28px]">
            Another advantage of a Merchant Cash Advance is the fluid payment
            structure. Each month, your business’s cash flow will dictate how
            much you pay. If things slow down, your payments will shrink in
            proportion. This is what differentiates Merchant Cash Advances from
            traditional loans, and makes them an attractive solution for many
            businesses.
          </p>
          <p className="mb-[28px] text-[#232323] text-[18px]">
            What Is A Merchant Cash Advance?
          </p>
          <p className="mb-[28px]">
            fC advance Solutions offers Merchant Cash Advances that are ideal
            for businesses looking to grow without the hassle of a drawn-out
            application process at a traditional lender like a bank. Our fast
            and flexible funding solutions can help fuel your business growth,
            whether you're investing in new marketing strategies, planning an
            expansion, or requiring new inventory for an upcoming promotion or
            holiday season.
          </p>
          <p className="mb-[28px]">
            Our Merchant Cash Advance program is easily accessible and does not
            come with steep requirements like an excellent credit score.
            Additionally, our fluid payment structure means that each month,
            your business's cash flow will dictate how much you pay. If things
            slow down, your payments will shrink in proportion, making it an
            attractive solution for many businesses. With fC advance Solutions,
            you can get the fast capital you need in as little as 24 hours.
          </p>
          <p className="mb-[28px] text-[#232323] text-[18px]">
            Our Merchant cash advance is ideal for
          </p>
          <p className="mb-[28px]">
            Merchant Cash Advance (MCA) is ideal for small business owners who
            are looking for a fast and flexible way to access funds to help grow
            their business. It is particularly useful for businesses that have a
            high volume of credit card sales, as the repayment structure is tied
            to their daily credit card sales.
          </p>
          <p className="mb-[28px] text-[#232323]">
            Some of the specific types of businesses that can benefit from an
            MCA include -
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Retail businesses:
          </p>
          <p className="mb-[28px]">
            Retail businesses that have a high volume of credit card sales can
            benefit from the fast and easy access to funds that an MCA provides.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Restaurant businesses:
          </p>
          <p className="mb-[28px]">
            Restaurant businesses can also benefit from the flexibility of an
            MCA, as they can make smaller repayments during slower periods and
            larger repayments during busier periods.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Service-based businesses:
          </p>
          <p className="mb-[28px]">
            Service-based businesses that accept credit card payments, such as
            hair salons, spas, and auto repair shops, can also benefit from the
            flexibility of an MCA.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">Startups:</p>
          <p className="mb-[28px]">
            Startups that are just starting out and need quick access to funds
            to cover expenses such as rent, inventory, or marketing can benefit
            from an MCA.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Businesses with poor credit:
          </p>
          <p className="mb-[28px]">
            Businesses that have poor credit or a limited financial history may
            not be eligible for traditional loans, but they may still be able to
            get an MCA.
          </p>
          <p className="mb-[28px]">
            In conclusion, Merchant Cash Advances are ideal for small business
            owners who need quick access to funds, have a high volume of credit
            card sales, and are looking for a flexible repayment structure. If
            you think that an MCA might be the right financing option for your
            business, contact us today to learn more.
          </p>
          <p className="mb-[28px] text-[#232323] text-[18px]">
            Why get funded by fC advance Solutions ?
          </p>
          <p className="mb-[25px] text-[#232323]">
            There are several reasons why you should consider getting funded by
            fC advance Solutions:
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Fast and Easy Access to Funds:
          </p>
          <p className="mb-[28px]">
            With our quick and simple application process, you can get the funds
            you need in as little as 48 hours. We understand that time is of the
            essence when it comes to growing your business, and we are dedicated
            to providing fast and efficient financing solutions.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Tailored Financing Solutions:
          </p>
          <p className="mb-[28px]">
            We understand that every business is unique, and that's why we work
            closely with each of our clients to tailor our financing solutions
            to meet their individual needs. Whether you're looking for a cash
            advance to cover unexpected expenses or to invest in new equipment,
            we have a financing solution that's right for you.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Exceptional Customer Service:
          </p>
          <p className="mb-[28px]">
            Our team of experts is passionate about helping businesses succeed,
            and we are committed to providing exceptional customer service and
            support. We are always available to answer any questions you may
            have, and we strive to make the financing process as seamless and
            stress-free as possible.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Reliable and Trusted Partner:
          </p>
          <p className="mb-[28px]">
            At fC advance Solutions, we believe in building long-lasting
            relationships with our clients. We are a reliable and trusted
            financial partner that you can count on to help you grow and
            succeed.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Innovative Financing Solutions:
          </p>
          <p className="mb-[28px]">
            Our innovative financing solutions are designed to help businesses
            overcome financial obstacles and achieve their goals. Whether you're
            looking to cover unexpected expenses, invest in new equipment, or
            expand your business, we have a solution that's right for you.
          </p>
          <p className="mb-[28px]">
            Overall, fC advance Solutions Group is the perfect partner for
            businesses looking for fast and easy access to funds, exceptional
            customer service, and tailored financing solutions. Contact us today
            to learn more about how we can help your business thrive.
          </p>
          <img
            src={MERCHANT_CASH_ADVANCE_IMG}
            alt="merchant cash advance"
            className="w-full"
          />
        </div>
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

export default MerchantCashAdvance;
