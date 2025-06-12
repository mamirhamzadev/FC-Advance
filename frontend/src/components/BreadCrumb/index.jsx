import { Link, useLocation } from "react-router-dom";
import ROUTES from "../../constants/routes";

function BreadCrumb({ paths = [{ name: "Home", path: "/" }] }) {
  const location = useLocation();
  const route = ROUTES.find((route) => route.path === location.pathname);
  if (!route) return null;
  return (
    <div
      className={`relative min-h-[400px] h-fit w-full flex items-center justify-center bg-[url('/src/assets/breadcrum-img.jpeg')] bg-no-repeat bg-fixed bg-center bg-cover before:absolute before:top-0 before:left-0 before:size-full before:bg-black before:opacity-50 before:z-0`}
    >
      <div className="relative z-1 flex justify-center sm:justify-between flex-wrap items-center gap-[20px] sm:gap-[5px] md:gap-[30px] wrapper text-white">
        <h1 className="font-bold text-[36px] capitalize sm:text-start text-center md:w-fit w-full">
          {route.name}
        </h1>
        <div className="flex-1 flex justify-center sm:justify-end">
          <div className="text-center leading-[26px] uppercase font-bold rounded-md py-[10px] px-[20px] bg-[#232323]/60 text-[14px]">
            {paths.map((path, index) => (
              <span
                key={index}
                className={`after:content-['/'] after:px-[5px] ${
                  index + 1 === paths.length ? "after:hidden text-gray-700" : ""
                }`}
              >
                <Link to={path.path || location.pathname}>{path.name}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
