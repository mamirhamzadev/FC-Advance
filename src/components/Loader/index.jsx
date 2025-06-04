import { LOADER } from "../../constants/images";

function Loader({ show = true }) {
  return (
    <div
      className={`flex items-center justify-center fixed top-0 left-0 w-full h-full z-[1000] bg-no-repeat bg-center bg-white transition-[opacity] duration-500 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <img src={LOADER} alt="" className="w-[300px] h-[300px]" />
    </div>
  );
}

export default Loader;
