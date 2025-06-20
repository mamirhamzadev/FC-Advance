import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGO } from "../../constants/images";
import {
  APPLY_NOW_ROUTE,
  HOME_ROUTE,
  REP_DASHBOARD_ROUTE,
} from "../../constants/routes";
import ROUTES from "../../constants/routes";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPowerOff,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRepAuthorized } from "../../redux/actions/rep-dashboard";
import { useEffect } from "react";

function Header() {
  const headerRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector(
    (state) => state?.repDashboard?.isAuthorized
  );

  const handleDropDownToggle = (e) => {
    if (!headerRef.current) return;
    headerRef.current.classList.toggle("active");
    const dropdown = headerRef.current.querySelector(".drop-down");
    if (!dropdown) return;
    dropdown.style.maxHeight = headerRef.current.classList.contains("active")
      ? `${dropdown.scrollHeight + 30}px`
      : "0px";
  };

  useEffect(() => {
    headerRef.current?.classList.remove("active");
  }, [location]);

  const repDashboardLoginHandler = () => {
    if (REP_DASHBOARD_ROUTE === location.pathname) {
      if (isAuthorized) {
        localStorage.removeItem("rep-token");
        dispatch(setRepAuthorized(false));
      }
    } else return navigate(REP_DASHBOARD_ROUTE);
    headerRef.current?.classList.remove("active");
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 h-[105px] w-full bg-white z-[10] group/header"
    >
      <div className="wrapper relative flex items-center gap-[10px]">
        <div className="flex-1 flex items-center lg:justify-between justify-center">
          <Link
            to={HOME_ROUTE}
            className="py-[20px] flex items-center justify-center"
          >
            <img src={LOGO} alt="Logo" className="w-[120px] h-auto" />
          </Link>

          <button
            onClick={handleDropDownToggle}
            className="lg:hidden flex items-center justify-center absolute left-[15px] text-[18px] cursor-pointer"
          >
            <span className="group-[.active]/header:hidden block">
              <FontAwesomeIcon icon={faBars} />
            </span>
            <span className="group-[.active]/header:block hidden">
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </button>

          <div className="hidden lg:flex h-max items-center">
            {ROUTES.map((route, index) => {
              if (route.isHeaderRoute)
                return (
                  <Link
                    key={index}
                    to={route.path}
                    className="px-[15px] font-bold uppercase text-[13px] tracking-[0.06em] flex items-center h-full transition-colors duration-300 text-gray-900 hover:text-gray-700"
                  >
                    {route.name}
                  </Link>
                );
              return null;
            })}
          </div>
          <Button
            className="lg:flex hidden !bg-black !px-[20px]"
            text={"Apply Now"}
            href={APPLY_NOW_ROUTE}
          />
        </div>

        <Button
          onClick={repDashboardLoginHandler}
          className="lg:!px-[40px] lg:!py-[12px] !px-[20px]"
        >
          <span className="lg:block hidden">
            {REP_DASHBOARD_ROUTE === location.pathname
              ? isAuthorized
                ? "Logout"
                : "Login"
              : isAuthorized
              ? "Dashboard"
              : "Login"}
          </span>
          <span className="lg:hidden block text-[20px]">
            <FontAwesomeIcon
              icon={
                REP_DASHBOARD_ROUTE === location.pathname
                  ? isAuthorized
                    ? faPowerOff
                    : faUser
                  : isAuthorized
                  ? faUser
                  : faPowerOff
              }
              className=""
            />
          </span>
        </Button>
      </div>
      <div className="drop-down group-[.active]/header:flex lg:!hidden hidden absolute top-[105px] w-full bg-white transition-all duration-300 overflow-hidden">
        <div className="wrapper flex flex-col items-center w-full pb-[30px]">
          {ROUTES.map((route, index) => {
            if (route.isHeaderRoute)
              return (
                <Link
                  key={index}
                  to={route.path}
                  className="py-[10px] border-b border-b-gray-300 w-full font-bold uppercase text-[13px] tracking-[0.06em] flex items-center justify-center"
                >
                  {route.name}
                </Link>
              );
            return null;
          })}
          <div className="flex gap-[10px] mt-[30px]">
            <Button
              text={"Apply Now"}
              className="!bg-black"
              href={APPLY_NOW_ROUTE}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
