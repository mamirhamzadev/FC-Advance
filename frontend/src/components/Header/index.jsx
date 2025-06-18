import { Link, useLocation } from "react-router-dom";
import { LOGO } from "../../constants/images";
import {
  APPLY_NOW_ROUTE,
  HOME_ROUTE,
  REP_DASHBOARD_ROUTE,
} from "../../constants/routes";
import ROUTES from "../../constants/routes";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Header() {
  const headerRef = useRef(null);
  const location = useLocation();
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

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 h-[105px] w-full bg-white z-[10] group/header"
    >
      <div className="wrapper relative flex items-center lg:justify-between justify-center">
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
        <div className="flex gap-[10px]">
          <Button
            className="lg:flex hidden !bg-black !px-[20px]"
            text={"Apply Now"}
            href={APPLY_NOW_ROUTE}
          />
          {isAuthorized && REP_DASHBOARD_ROUTE.includes(location.pathname) ? (
            <Button
              className="lg:flex hidden !px-[20px]"
              text={"Logout"}
              href={""}
              onClick={() => {
                localStorage.removeItem("rep-token");
                window.location.reload();
              }}
            />
          ) : (
            <Button
              className="lg:flex hidden !px-[20px]"
              text={"Dashboard"}
              href={REP_DASHBOARD_ROUTE}
            />
          )}
        </div>
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

            {isAuthorized && REP_DASHBOARD_ROUTE.includes(location.pathname) ? (
              <Button
                text={"Logout"}
                onClick={() => {
                  localStorage.removeItem("rep-token");
                  window.location.reload();
                }}
              />
            ) : (
              <Button text={"Dashboard"} href={REP_DASHBOARD_ROUTE} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
