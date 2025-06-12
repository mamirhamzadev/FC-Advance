import {
  FUNDING_SOLUTIONS_CARD_1,
  FUNDING_SOLUTIONS_CARD_2,
  FUNDING_SOLUTIONS_CARD_3,
} from "../../constants/images";
import {
  BUSINESS_LINES_OF_CREDIT_ROUTE,
  BUSINESS_TERM_LOANS_ROUTE,
  MERCHANT_CASH_ADVANCE_ROUTE,
} from "../../constants/routes";

export const getFundingSolutionsCardData = () => [
  {
    img: FUNDING_SOLUTIONS_CARD_1,
    title: "Merchant Cash Advance",
    href: MERCHANT_CASH_ADVANCE_ROUTE,
    desc: "A Merchant Cash Advance offers fast capital for businesses without strict requirements. Accessible to most businesses, it provides a quick solution without the need for excellent credit scores or overflowing bank statements.",
  },
  {
    img: FUNDING_SOLUTIONS_CARD_2,
    title: "Business Term Loans",
    href: BUSINESS_TERM_LOANS_ROUTE,
    desc: "Our Business Term Loan offers a simple and easy-to-understand solution for your business financing needs. With a set repayment term and manageable monthly payments plus interest, this financing option won't overburden your cashflow. It's a straightforward solution to help your business grow..                                                ",
  },
  {
    img: FUNDING_SOLUTIONS_CARD_3,
    title: "Business Lines Of Credit",
    href: BUSINESS_LINES_OF_CREDIT_ROUTE,
    desc: "A Business Line of Credit from FC advance Solutions provides a flexible and convenient financing option for businesses of all sizes. With a Business Line of Credit, you can access the funds you need quickly and easily, without the limitations and expenses associated with other financing options. Whether you need emergency funds, want to take advantage of a growth opportunity, or simply need working capital to maintain your operations, our Business Line of Credit has got you covered. Trust us to help you navigate your business needs with confidence and ease.",
  },
];
