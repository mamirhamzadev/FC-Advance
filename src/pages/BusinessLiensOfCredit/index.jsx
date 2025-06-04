import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import BreadCrumb from "../../components/BreadCrumb";
import { FUNDING_SOLUTIONS_ROUTE, HOME_ROUTE } from "../../constants/routes";
import { FUNDING_SOLUTIONS_DECLINED_SECTION } from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightDots,
  faBullseye,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

function BusinessLiensOfCredit() {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  return (
    <>
      <Loader show={loading} />

      <BreadCrumb
        paths={[
          { name: "Home", path: HOME_ROUTE },
          { name: "Funding Solutions", path: FUNDING_SOLUTIONS_ROUTE },
          { name: "Business Lines of Credit" },
        ]}
      />

      <section className="bg-[#f3f6f8] py-[50px] md:py-[80px]">
        <div className="wrapper text-[#666] text-[14px] font-bold leading-[26px]">
          <h2 className="text-[26px] md:text-[40px] text-[#232323] mb-[45px] font-bold">
            Business Lines of Credit
          </h2>
          <p className="mb-[28px]">
            There are many kinds of business financing available on the market
            today. Most businesses are familiar with the standard Business Term
            Loan, but the lesser known Business Line of Credit can also be a
            powerful tool for growing or struggling businesses.
          </p>
          <p className="mb-[28px]">
            Business Lines of Credit give you access to funds while avoiding
            many of the inconveniences and costs of other business financing
            options. The Business Line of Credit is versatile, it can be used to
            cover emergency expenses when calamity strikes, to fund an
            unexpected opportunity for growth, or even just used as working
            capital to fund your daily operations during a slow month or
            otherwise.
          </p>
          <p className="mb-[20px] text-[#232323] text-[18px]">
            What Is A Business Line Of Credit?
          </p>
          <p className="mb-[28px]">
            A Business Line of Credit works much like a credit card. Your
            business is assigned a borrowing limit with terms and an interest
            rate. You can borrow from this line of credit whenever you need, up
            to the limit. There is a minimum payment you will be required to
            make on any balance you carry, along with interest. You only pay for
            what you borrow, and when your balance is paid in full, your
            borrowing limit is usually restored. This is called a revolving line
            of credit, and it means your business will have continuous access to
            the borrowing limit without having to reapply.
          </p>
          <p className="mb-[28px]">
            Businesses with steady access to credit are able to capitalize on
            spur of the moment opportunities that come their way, and pay for
            any surprise expenses without destabilizing their cashflow.
          </p>

          <ul className="mb-[28px] text-[#333] font-normal ms-[20px] list-disc list-inside">
            <li>Rates: Starting at 8%</li>
            <li>Funding Amount: $1K - $250K</li>
            <li>Funding Term: Up to 18 Months</li>
            <li>Speed: 1 - 3 Business Days</li>
          </ul>

          <p className="mb-[20px] text-[#232323] text-[18px]">
            How Do Business Lines Of Credit Work?
          </p>
          <p className="mb-[28px]">
            After you draw money from your Business Line of Credit, minimum
            payments will be due on a weekly or monthly basis, until you repay
            what you borrowed. Your line of credit will have a repayment term
            for when the full balance is due. If your balance is paid on time,
            your credit line is usually replenished.
          </p>
          <p className="mb-[28px]">
            You can always pay off your balance early to save money on interest,
            and so long as you remain in good standing, your Business Line of
            Credit will be accessible to you indefinitely.
          </p>
          <p className="mb-[28px]">
            fC advance Solutions offers Business Lines of Credit with borrowing
            limits of up to $250,000, term lengths of up to 18 months, and
            interest rates starting at 8%. There may be an additional fee
            between 1%-3% every time you draw from the credit line.
          </p>
          <p className="mb-[28px]">
            Collateral is not usually required to secure a Business Line of
            Credit, unless you are applying for a very large credit limit.
          </p>
          <p className="mb-[28px] text-[#232323] text-[18px]">
            What Are The Benefits Of A Business Line Of Credit?
          </p>
          <p className="mb-[28px]">
            The flexible nature of Business Lines of Credit means you only pay
            interest on funds that you draw. You can pay back the money you
            spend as soon as works best for you, providing it is within the set
            term and you keep up with your minimum payments. With other types of
            funding, like Business Term Loans, you begin making fixed payments
            with interest as soon as you receive the money, regardless of how
            much of it you spend.
          </p>
          <p className="mb-[28px]">
            Business Lines of Credit are also flexible when it comes to their
            many uses. Once you are approved for a Business Line of Credit, you
            will have access to funds whenever you need, no matter what the
            reason. This means that unexpected problems down the road can easily
            be dealt with, and business opportunities that spring up along the
            way will not pass you by. For example if you own a retail business,
            and one of your products is flying off the shelves after a
            particularly successful marketing initiative, a Business Line of
            Credit will allow you to restock your inventory immediately, so you
            do not miss out on any sales. Later on in the year, you might
            experience a sudden drop in your sales, in which case you could use
            your Business Line of Credit to fill in the gaps where your cash
            flow falls short, until sales pick up again. A Business Line of
            Credit will protect you from unforeseen pitfalls and prepare you for
            unexpected opportunities.
          </p>
          <p className="mb-[28px]">
            If you apply for a Business Line of Credit and you are approved, the
            moment your business needs access to capital you are covered. There
            is no need to waste time shopping around for business financing and
            filling out lengthy applications. Your Business Line of Credit is
            already available to you for any scenario your business might
            encounter.
          </p>
          <p className="mb-[28px]">
            Business Lines of Credit have much larger borrowing limits than
            credit cards usually do, and your interest rate will not increase
            when you approach your borrowing limit like it does with most credit
            cards. Borrowing close to your limit with a credit card can also
            damage your credit score, and this is not the case with Business
            Lines of Credit.
          </p>
          <p className="mb-[28px]">
            Depending on your desired borrowing limit, the requirements for a
            Business Line of Credit can be among the easiest to qualify for on
            the market, and applications are approved in as few as 1-3 business
            days.
          </p>
          <p className="mb-[28px] text-[#232323] text-[18px]">
            What Are The Downsides To A Business Line Of Credit?
          </p>
          <p className="mb-[28px]">
            The advantages of Business Lines of Credit are somewhat reserved for
            businesses with strong financials and excellent credit scores.
            Weaker businesses may still be approved, but they will not have
            access to large borrowing amounts and favorable interest rates.
            days.
          </p>
          <p className="mb-[28px]">
            If you are not already approved for a Business Line of Credit and
            your business runs into trouble, it is unlikely you will access
            large borrowing limits and low interest rates. The best time to
            apply for a Business Line of Credit is when your cashflow is strong,
            but applying for business financing is usually the last thing on a
            business owners mind when things are going well.
          </p>
          <p className="mb-[28px] text-[#232323] text-[18px]">
            Who Qualifies for Business Lines Of Credit?
          </p>
          <p className="mb-[28px]">
            Approved businesses generally met the following criteria:
          </p>
          <ul className="mb-[28px] text-[#333] font-normal ms-[20px] list-disc list-inside">
            <li>
              <span className="font-[900]">Annual Revenue:</span> $75K+
            </li>
            <li>
              <span className="font-[900]">Credit Score:</span> 550+
            </li>
            <li>
              <span className="font-[900]">Time In business:</span> 6 Months+
            </li>
          </ul>
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

export default BusinessLiensOfCredit;
