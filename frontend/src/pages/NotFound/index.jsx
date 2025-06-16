import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routes";

function NotFound() {
  return (
    <div className="py-[50px] flex flex-col gap-[15px] items-center justify-center wrapper ">
      <p className="text-[20px] font-bold">Page not found</p>
      <Link to={HOME_ROUTE} className="text-[14px] text-blue-600 underline">
        Go To Home
      </Link>
    </div>
  );
}

export default NotFound;
