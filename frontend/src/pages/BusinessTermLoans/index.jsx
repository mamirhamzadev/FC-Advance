import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import BreadCrumb from "../../components/BreadCrumb";
import {
  APPLY_NOW_ROUTE,
  FUNDING_SOLUTIONS_ROUTE,
  HOME_ROUTE,
} from "../../constants/routes";
import {
  BUSINESS_TERM_LOANS_IMG,
  FUNDING_SOLUTIONS_DECLINED_SECTION,
} from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightDots,
  faBullseye,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import Accordian from "../../components/Accordian";
import { getAccordianData } from "./data";

function BusinessTermLoans() {
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(false), []);

  return (
    <>
      <Loader show={loading} />

      <BreadCrumb
        paths={[
          { name: "Home", path: HOME_ROUTE },
          { name: "Funding Solutions", path: FUNDING_SOLUTIONS_ROUTE },
          { name: "Business Term Loans" },
        ]}
      />

      <section className="bg-[#f7f7f7] py-[50px] md:py-[80px]">
        <div className="wrapper text-[#666] text-[14px] font-bold leading-[26px]">
          <h2 className="text-[26px] md:text-[40px] text-[#232323] mb-[45px] font-bold">
            Business Term Loans
          </h2>
          <p className="mb-[28px]">
            A Business Term Loan is a fundamental type of business loan that
            offers attractive rates and terms for borrowers. With this loan, a
            borrower receives a lump sum of money from a business lender like fC
            advance Solution, which is repaid with regular payments over a set
            period. The principle amount can range from $5,000 to $5 million,
            and interest rates start at 5%. While Term Loans offer high
            borrowing amounts and excellent terms, eligibility requirements can
            be restrictive.
          </p>
          <p className="mb-[28px] text-[#232323] text-[18px]">
            How to Get the Best Terms and Rates
          </p>
          <p className="mb-[28px]">
            A fC advancestrike wipes out a majority of your business’ computers.
            Your food truck’s transmission is kaput. An unexpected business
            opportunity lands at your door but requires quick financing. Your
            inventory is depleted due to higher-than-expected demand. There are
            many reasons to secure short-term business loans, and even more
            reasons to choose fC advance Solutions when you need quick access to
            working fC advanceSolutions.
          </p>
          <p className="mb-[28px]">
            Since 2014, fC advance Solutions has helped nearly 4,000 small and
            medium-sized businesses acquire over $500,000,000 in financing. We
            love small businesses and are proud to maintain an A+ rating through
            the Better Business Bureau®.
          </p>
          <p className="mb-[28px]">
            Are you looking into how to secure the best terms and rates on a
            short-term business loan? Read on to get the facts from an insider’s
            perspective
          </p>
          <p className="mb-[28px] text-[#232323]">
            No waiting. Zero brokerage fees. Instant pre-approvals.
          </p>
          <p className="mb-[28px]">
            5 minutes is all it takes to apply and get pre-approved for a
            short-term business loan up to $750,000. By working with a licensed
            direct lender, you won’t have to wait weeks to learn about the
            status of your application (or pay brokerage fees). Apply for a
            short-term small business loan through fC advance Solutions.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Current rates and terms
          </p>
          <p className="mb-[28px]">
            A business loan consolidation can bring much-needed relief to small
            businesses bogged down by multiple loans or debts. Many businesses
            love the convenience of making a single monthly payment instead of
            multiple payments staggered throughout the month.
          </p>
          <p className="mb-[28px]">
            While the terms of a business loan consolidation are often more
            flexible, you might end up repaying your debts at a higher interest
            rate if your credit score has taken a hit due to late payments or
            maxing out numerous lines of credit.
          </p>
          <p className="mb-[28px]">
            Here are the latest rates and terms for small businesses looking to
            secure rapidly funded working fC advanceSolutions:
          </p>
          <p className="mb-[23px] text-[#232323] text-[18px]">Loan Amounts</p>
          <p className="mb-[28px]">$2,000 – $750,000</p>
          <p className="mb-[23px] text-[#232323] text-[18px]">Term Duration</p>
          <p className="mb-[28px]">90 days to 18 months</p>
          <p className="mb-[23px] text-[#232323] text-[18px]">Interest Rates</p>
          <p className="mb-[28px]">10% APR and up</p>
          <p className="mb-[23px] text-[#232323] text-[18px]">Fast Approvals</p>
          <p className="mb-[28px]">Usually within 48 hours</p>
          <p className="mb-[28px]">
            If you have “good” to “excellent” credit, you may also qualify for a
            long-term or SBA loan through fC advance Solutions.
          </p>

          <div className="flex md:gap-[30px] flex-col md:flex-row items-start justify-center">
            <div className="md:w-[50%] w-full flex flex-col">
              <p className="mb-[28px] text-[#232323] text-[18px]">
                How to qualify
              </p>
              <p className="mb-[28px]">
                As a direct lender, fC advance Solutions has more flexibility in
                terms of lending to business owners who may otherwise not
                qualify for a loan through a traditional lender.
              </p>
              <p className="mb-[28px] text-[#232323] text-[18px]">
                Who Qualifies for Business Term Loans?
              </p>
              <p className="mb-[28px] font-[900]">
                Here is what we look for in approval short-term business loan
                applications:
              </p>
              <ul className="text-[#333] font-normal list-disc list-inside ms-[20px] mb-[28px]">
                <li>At least 6 months in business</li>
                <li>$150,000 in annual revenue</li>
                <li>FICO® score of 500 or higher</li>
                <li>3 months of bank statements</li>
              </ul>
            </div>
            <img
              src={BUSINESS_TERM_LOANS_IMG}
              alt="business term laons"
              className="md:w-[50%] w-full"
            />
          </div>

          <p className="mb-[28px]">
            That’s it. That’s all you need to start the process and get
            pre-qualified for a short-term business loan through fC advance
            Solutions. Compared to traditional financial institutions, fC
            advance Solutions gives more weight to current and projected
            revenues than credit scores alone.
          </p>
          <p className="mb-[28px]">
            Even if your credit score has kept you from obtaining a business
            loan in the past, we may still be able to help you obtain rates and
            terms that perfectly align with your business goals.
          </p>
          <p className="mb-[28px] text-[#232323] text-[18px]">
            I have bad credit. Can I apply for quick business funding?
          </p>
          <p className="mb-[28px]">
            Life happens. At fC advance Solutions, we know there are two sides
            to credit; it can either help you secure great rates and terms — or
            squash your financing ambitions. You may have missed credit payments
            in the past, or a past bankruptcy continues to haunt your credit
            years after the fact. We’re here to help. Business owners with
            credit scores in the area of 450 may still qualify for quick
            business funding so long as the business has documentation showing
            $15,000 in monthly revenue, and solid revenue growth.
          </p>
          <p className="mb-[28px]">
            Seeking a loan when you have bad credit may delay the process a few
            days, and you may not qualify for the same rates and terms enjoyed
            by those with good credit. But, taking out a business loan and
            keeping up with the payments can be a great way to restore your
            credit and finance your business.
          </p>
          <p className="mb-[28px]">
            If you have a problematic credit history and would like to learn
            more about which loan product is best for you, call fC advance
            Solutions at We have lending specialists on hand to answer your
            questions and make recommendations.
          </p>
          <p className="mb-[28px] text-[#232323] text-[18px]">
            The benefits of working with a direct lender
          </p>
          <p className="mb-[28px]">
            Many small business owners love the fact that they can apply and be
            approved for a loan the very same day. And, by financing your
            business through a direct lender, businesses have access to loans
            with more reasonable terms and rates than they would typically
            receive from a traditional lender.
          </p>
          <p className="mb-[25px] text-[#232323] text-[18px] font-[900]">
            The benefits of going through a direct lender for this type of loan
            include:
          </p>
          <ul className="text-[#333] font-normal list-disc list-inside ms-[20px] mb-[15px]">
            <li>Fast access to working fC advanceSolutions</li>
            <li>Minimal paperwork</li>
            <li>Flexible repayment terms</li>
            <li>Generous loan amounts</li>
            <li>Low rates compared to other quick loans</li>
          </ul>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            Are there any detractors?
          </p>
          <p className="mb-[28px]">
            Of course. All loans come with their own set of positive and
            negative qualities. So, no matter which loan you ultimately choose
            there are bound to be some drawbacks, and this still holds true with
            short-term loans. Short-term loans usually come with higher interest
            rates compared to loans with longer terms.
          </p>
          <p className="mb-[28px]">
            And, if you operate a business with seasonal revenue highs and lows,
            you may find it difficult to keep up with the fixed repayment
            structure during off-peak seasons. Not sure if a short-term business
            loan is in the longer-term interest of your business? Call fC
            advance Solutions and speak with a lending specialist to discuss
            other options that may be open to you.
          </p>
          <p className="mb-[15px] text-[#232323] text-[18px]">
            How to get the most out of your short-term business loan
          </p>
          <p className="mb-[20px] text-[#232323] text-[18px]">
            1. Replenishing inventory
          </p>
          <p className="mb-[28px]">
            Let’s say a customer requests a bulk order of a certain product.
            They can pay for the items once they arrive in four weeks. But, the
            supplier doesn’t offer net 30 payments or credit of any kind — only
            payments in full. As it is, this product has a 200% markup and you
            extend a 10% discount to the customer since they are buying in bulk.
            Without taking a loan, it would be nearly impossible to fund this
            inventory purchase out-of-pocket. By securing a short-term business
            loan, you can pay your supplier upfront, the customer receives the
            products they ordered, and you have the money to pay off the loan
            and keep a decent amount of money as pure profit.
          </p>
          <p className="mb-[20px] text-[#232323] text-[18px]">
            2. Upgrade or repair equipment
          </p>
          <p className="mb-[28px]">
            A business plan is only as strong as its weakest link in the chain.
            If you find that a certain piece of machinery, equipment, or
            infrastructure is causing money-losing inefficiencies in your
            business, securing a loan with a shorter term may be a great option.
            This loan type allows you to receive funds quickly so you can being
            seeing returns on your investment as soon as possible.
          </p>
          <p className="mb-[20px] text-[#232323] text-[18px]">
            3. Promote your business
          </p>
          <p className="mb-[28px]">
            Short-term loans are not designed for those taking their first leap
            into the business world. But, if customers are raving about your
            products or services and one of the few things holding your company
            back is a lack of exposure, you may want to consider a loan to
            finance promotional opportunities. Plus, many advertising and
            marketing expenses are tax-deductible.
          </p>
          <p className="mb-[20px] text-[#232323] text-[18px]">
            4. Covering seasonal peaks and slumps
          </p>
          <p className="mb-[28px]">
            Many businesses face seasonal ups and downs. A retailer may suddenly
            remembers selling out a certain good the year prior, and wants to
            make an additional inventory purchase. Or, due to an unexpectedly
            rainy spring, the grass is growing faster and a lawncare provider
            needs to hire additional staff. These are a few instances where a
            short-term loan can cover a short-term need, without causing undue
            financial hardship on the business owner.
          </p>
          <p className="mb-[20px] text-[#232323] text-[18px]">
            5. Expand operations
          </p>
          <p className="mb-[28px]">
            Depending on the nature of the business, a short-term loan can also
            be used to finance a business expansion. Just be sure that your
            expansion plans can begin generating profits before the term of the
            loan is finalized, otherwise, you may find yourself upside-down on
            the loan and have difficulty making payments.
          </p>
          <p className="mb-[28px]">
            Those considering expansions into multiple markets over the course
            of several years are generally better off going with a long-term
            loan.
          </p>
        </div>
      </section>

      {/* Best Pricing section */}
      <section className="wrapper py-[50px] md:py-[80px] text-[#666] text-[14px] leading-[26px] flex flex-col items-center">
        <h2 className="uppercase text-center text-[26px] md:text-[30px] mb-[20px] text-[#232323]">
          Best Pricing
        </h2>
        <p className="font-bold text-center max-w-[66%] mb-[60px]">
          Able an hope of body. Any nay shyness article matters own removal
          nothing his forming. Gay own additions education satisfied the
          perpetual. If he cause manor happy. Without farther she exposed saw
          man led. Along on happy could cease green oh.
        </p>
        <div className="flex flex-col w-full border border-[#e7e7e7]">
          {getAccordianData().map((data, index) => (
            <Accordian title={data.title} key={index}>
              <p className="p-[20px] text-gray-700 font-bold">{data.desc}</p>
            </Accordian>
          ))}
        </div>
        <p className="mb-[28px] text-[#666] font-[900] text-start mt-[30px] w-full px-[10px]">
          At this point in the process, we will reach out to you for additional
          information, which may include:
        </p>
        <ul className="text-[#333] font-normal list-disc list-inside w-full ms-[20px] mb-[28px] px-[10px]">
          <li>Documentation of ownership</li>
          <li>State-issued ID</li>
          <li>Last three months of bank statements</li>
          <li>Personal tax return information</li>
          <li>Bank account (routing and account number)</li>
          <li>Last 3 moths of bank statements</li>
          <li>Voided check from business account</li>
        </ul>
      </section>

      {/* need working section */}
      <section className="bg-[#f3f6f8] py-[50px] md:py-[80px]">
        <div className="wrapper text-[#666] text-[14px] leading-[26px] font-bold flex flex-col gap-[28px]">
          <h4 className="text-[#222] text-[26px] leading-[1.2] md:text-[40px]">
            Need working fC advanceSolutions… and FAST?
          </h4>
          <p>
            As a company that works with small businesses on a daily basis, we
            know how important it can be to secure funding as quickly as
            possible. So, if you need working fC advanceSolutions “like
            yesterday,” you’ll be happy to know that fC advance Solutions can
            transfer funds directly into your account in a matter of days — not
            several weeks or months — days!
          </p>
          <p>
            To see if you qualify for a short-term business loan, complete our
            fast business financing application, or call to speak with one of
            our lending specialists. Dial +1 (646)-707-5610 today.
          </p>
          <p>
            If your business can’t wait several days for a business loan, we’ve
            got you covered there, too. fC advance Solutions also offers fast
            business loans which can be approved and deposited into your
            business checking account with 24 hours.
          </p>
          <h4 className="text-[#222] text-[26px] leading-[1.2] md:text-[40px]">
            Sensible borrowing for small businesses
          </h4>
          <p>
            At fC advance Solutions, we know it’s typically better for
            businesses to save money in anticipation of future financial
            obstacles or unexpected opportunities. And, most business owners we
            talk to understand the value of saving versus borrowing, but there
            are always those instances when taking out a loan becomes a business
            necessity.
          </p>
          <p>
            In these cases, business owners aren’t looking for Benjamin
            Franklin-like advice — they just need quick access to working fC
            advanceSolutions to overcome a present financial situation. This is
            what short-term loans are designed to do.
          </p>
          <p>
            With short-term business loans, all funds that are approved and
            requested are deposited all at once. This allows businesses to
            immediately reinvest in their operations, whether this means buying
            equipment, hiring personnel, or consolidating multiple loans to take
            advantage of fC advance Solutions’s interest rates.
          </p>
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
        <Button text="Apply Now" href={APPLY_NOW_ROUTE} />
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

export default BusinessTermLoans;
