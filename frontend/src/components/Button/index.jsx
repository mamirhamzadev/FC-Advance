import { useNavigate } from "react-router-dom";

function Button({
  type = "button",
  onClick = (e) => {},
  href = "#",
  text = "",
  className = "",
  children = null,
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => (href ? navigate(href) : onClick(e))}
      type={type}
      className={`rounded-md py-[12px] px-[40px] text-[12px] bg-gray-700 text-white font-bold transition-colors duration-300 tracking-[1px] uppercase leading-6 cursor-pointer hover:bg-black ${className}`}
    >
      {text || children}
    </button>
  );
}

export default Button;
