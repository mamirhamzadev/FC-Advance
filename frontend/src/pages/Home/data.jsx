import {
  CROUSAL_IMG_1,
  CROUSAL_IMG_2,
  CROUSAL_IMG_3,
  FUNDING_SOLUTIONS_CROUSAL_1,
  FUNDING_SOLUTIONS_CROUSAL_2,
  FUNDING_SOLUTIONS_CROUSAL_3,
} from "../../constants/images";
import {
  ABOUT_US_ROUTE,
  BUSINESS_LINES_OF_CREDIT_ROUTE,
  BUSINESS_TERM_LOANS_ROUTE,
  CONTACT_US_ROUTE,
  HOME_ROUTE,
  MERCHANT_CASH_ADVANCE_ROUTE,
} from "../../constants/routes";

export const getCrousalData = () => [
  {
    img: CROUSAL_IMG_1,
    text: (
      <h2 className="font-bold text-[30px] md:text-[70px]">
        Grow your <span className="text-gray-700">business</span> with us
      </h2>
    ),
    buttons: [
      {
        title: "Learn More",
        path: HOME_ROUTE,
      },
      {
        title: "Contact Us",
        path: CONTACT_US_ROUTE,
      },
    ],
  },
  {
    img: CROUSAL_IMG_2,
    text: (
      <h2 className="font-bold text-[30px] md:text-[70px]">
        FC advance Solutions
      </h2>
    ),
    buttons: [
      {
        title: "About Us",
        path: ABOUT_US_ROUTE,
      },
      {
        title: "Contact Us",
        path: CONTACT_US_ROUTE,
      },
    ],
  },
  {
    img: CROUSAL_IMG_3,
    text: (
      <h2 className="font-bold text-[30px] md:text-[70px]">
        Fluency in Financing
      </h2>
    ),
    buttons: [
      {
        title: "Learn More",
        path: HOME_ROUTE,
      },
      {
        title: "Contact Us",
        path: CONTACT_US_ROUTE,
      },
    ],
  },
];

export const getFundingSolutionsCrousalData = () => [
  {
    img: FUNDING_SOLUTIONS_CROUSAL_1,
    title: "Merchant Cash",
    description:
      "When your business needs fast capital, a Merchant Cash Advance is a great solution. This type of financing is easily accessible for most businesses, and it does not come...",
    button: {
      title: "Read More",
      path: MERCHANT_CASH_ADVANCE_ROUTE,
    },
  },
  {
    img: FUNDING_SOLUTIONS_CROUSAL_2,
    title: "Business Term Loans",
    description:
      "The Business Term Loan is one of the most common types of business loans due to its straightforward nature. Businesses can borrow align-center a sum of money that they repay",
    button: {
      title: "Read More",
      path: BUSINESS_TERM_LOANS_ROUTE,
    },
  },
  {
    img: FUNDING_SOLUTIONS_CROUSAL_3,
    title: "Business Lines Of Credit",
    description:
      "There are many kinds of business financing available on the market today. Most businesses are familiar with the standard Business Term Loan, but the lesser known Business....",
    button: {
      title: "Read More",
      path: BUSINESS_LINES_OF_CREDIT_ROUTE,
    },
  },
];

export const getAdvanceFundingSolutionsTableData = () => [
  {
    title: "Approvals within hours",
    pro: false,
    Basic: true,
  },
  {
    title: "Funds the next day",
    pro: false,
    Basic: true,
  },
  {
    title: "Renewable source of funds",
    pro: false,
    Basic: true,
  },
  {
    title: "No Personal collateral or assets",
    pro: false,
    Basic: true,
  },
  {
    title: "Minimal paperwork",
    pro: false,
    Basic: true,
  },
];
