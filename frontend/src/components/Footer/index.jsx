import { Link } from "react-router-dom";
import { LOGO } from "../../constants/images";
import ROUTES, {
  BUSINESS_LINES_OF_CREDIT_ROUTE,
  BUSINESS_TERM_LOANS_ROUTE,
  HOME_ROUTE,
  MERCHANT_CASH_ADVANCE_ROUTE,
} from "../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="pt-[50px] md:pt-[80px] bg-[#00081d]">
      <div className="wrapper flex flex-col md:flex-row items-start gap-[15px]">
        <div className="w-full md:w-[25%] mt-[50px] md:mt-0">
          <img src={LOGO} alt="logo" />
        </div>
        <div className="w-full md:w-[25%] flex flex-col gap-[15px] text-white mt-[50px] md:mt-0">
          <h4 className="whitespace-nowrap text-[18px] mb-[5px] pb-[10px] ps-[12px] leading-[1.2] uppercase font-bold flex items-center relative before:absolute before:w-[5px] before:h-[15px] before:left-0 before:bg-gray-700">
            Quick Links
          </h4>
          {ROUTES.map((route, index) => {
            if (route.isFooterRoute)
              return (
                <Link
                  key={index}
                  to={route.path}
                  className="text-[14px] text-[#ccc] flex items-center gap-[10px] font-semibold leading-[26px] transition-colors hover:text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="text-[11px]"
                  />
                  {route.name}
                </Link>
              );
            return null;
          })}
        </div>
        <div className="w-full md:w-[25%] flex flex-col gap-[15px] text-white mt-[50px] md:mt-0">
          <h4 className="whitespace-nowrap text-[18px] mb-[5px] pb-[10px] ps-[12px] leading-[1.2] uppercase font-bold flex items-center relative before:absolute before:w-[5px] before:h-[15px] before:left-0 before:bg-gray-700">
            Useful Links
          </h4>
          <Link
            to={MERCHANT_CASH_ADVANCE_ROUTE}
            className="text-[14px] text-[#ccc] flex items-center gap-[10px] font-semibold leading-[26px] transition-colors hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faAngleRight} className="text-[11px]" />
            Merchant Cash Advance
          </Link>
          <Link
            to={BUSINESS_TERM_LOANS_ROUTE}
            className="text-[14px] text-[#ccc] flex items-center gap-[10px] font-semibold leading-[26px] transition-colors hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faAngleRight} className="text-[11px]" />
            Business Term Loans
          </Link>
          <Link
            to={BUSINESS_LINES_OF_CREDIT_ROUTE}
            className="text-[14px] text-[#ccc] flex items-center gap-[10px] font-semibold leading-[26px] transition-colors hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faAngleRight} className="text-[11px]" />
            Business Lines Of Credit
          </Link>
        </div>
        <div className="w-full md:w-[25%] flex flex-col gap-[15px] text-white mt-[50px] md:mt-0">
          <h4 className="whitespace-nowrap text-[18px] mb-[5px] pb-[10px] ps-[12px] leading-[1.2] uppercase font-bold flex items-center relative before:absolute before:w-[5px] before:h-[15px] before:left-0 before:bg-gray-700">
            Contact info
          </h4>
          <div className="flex flex-col gap-[5px] text-[#ccc] text-[14px] font-bold">
            <p>Address</p>
            <p className="italic">1122 Ave J Brooklyn NY 11230</p>
          </div>
          <div className="flex flex-col gap-[5px] text-[#ccc] text-[14px] font-bold">
            <p>Send Us Mail</p>
            <Link className="text-white" to={"mailto:info@fcadvance.com"}>
              info@fcadvance.com
            </Link>
          </div>
          <div className="flex flex-col gap-[5px] text-[#ccc] text-[14px] font-bold">
            <p>Call Us</p>
            <Link className="text-white" to={"tel:+16467075610"}>
              +1 (646) 707 5610
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-[50px] md:mt-[30px] bg-gray-700 py-[15px]">
        <p className="wrapper text-center text-white open-sans text-[14px] font-bold leading-[40px]">
          &copy; Copyright {new Date().getFullYear()}&nbsp;
          <Link className="underline" to={HOME_ROUTE}>
            Single Solution
          </Link>
          , All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
