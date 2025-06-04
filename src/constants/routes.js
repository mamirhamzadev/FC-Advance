import AboutUs from "../pages/AboutUs";
import BusinessLiensOfCredit from "../pages/BusinessLiensOfCredit";
import BusinessTermLoans from "../pages/BusinessTermLoans";
import ContactUs from "../pages/ContactUs";
import FundingSolutions from "../pages/FundingSolutions";
import Home from "../pages/Home";
import MerchantCashAdvance from "../pages/MerchantCashAdvance";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";

export const HOME_ROUTE = "/";
export const ABOUT_US_ROUTE = "/about-us";
export const FUNDING_SOLUTIONS_ROUTE = "/funding-solutions";
export const CONTACT_US_ROUTE = "/contact-us";
export const PRIVACY_POLICY_ROUTE = "/privacy-policy";
export const TERMS_CONDITIONS_ROUTE = "/terms-and-conditions";

export const MERCHANT_CASH_ADVANCE_ROUTE = "/merchant-cash-advance";
export const BUSINESS_TERM_LOANS_ROUTE = "/business-term-loans";
export const BUSINESS_LINES_OF_CREDIT_ROUTE = "/business-lines-of-credit";

export default [
  {
    name: "Home",
    path: HOME_ROUTE,
    component: Home,
    isHeaderRoute: true,
    isFooterRoute: true,
  },
  {
    name: "About Us",
    path: ABOUT_US_ROUTE,
    component: AboutUs,
    isHeaderRoute: true,
    isFooterRoute: true,
  },
  {
    name: "Funding Solutions",
    path: FUNDING_SOLUTIONS_ROUTE,
    component: FundingSolutions,
    isHeaderRoute: true,
    isFooterRoute: true,
  },
  {
    name: "Contact Us",
    path: CONTACT_US_ROUTE,
    component: ContactUs,
    isHeaderRoute: true,
    isFooterRoute: true,
  },
  {
    name: "Privacy & Policy",
    path: PRIVACY_POLICY_ROUTE,
    component: PrivacyPolicy,
    isHeaderRoute: false,
    isFooterRoute: true,
  },
  {
    name: "Terms & Conditions",
    path: TERMS_CONDITIONS_ROUTE,
    component: TermsConditions,
    isHeaderRoute: false,
    isFooterRoute: true,
  },
  {
    name: "Merchant Cash Advance",
    path: MERCHANT_CASH_ADVANCE_ROUTE,
    component: MerchantCashAdvance,
    isHeaderRoute: false,
    isFooterRoute: false,
  },
  {
    name: "Business Term Loans",
    path: BUSINESS_TERM_LOANS_ROUTE,
    component: BusinessTermLoans,
    isHeaderRoute: false,
    isFooterRoute: false,
  },
  {
    name: "Business Lines of Credit",
    path: BUSINESS_LINES_OF_CREDIT_ROUTE,
    component: BusinessLiensOfCredit,
    isHeaderRoute: false,
    isFooterRoute: false,
  },
];
