import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

function Accordian({ children = null, title = "", className = "" }) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  function toggleAccordion() {
    const contentHeight = contentRef.current.scrollHeight || 0;
    setHeight(!open ? contentHeight : 0);
    setOpen(!open);
  }

  return (
    <div className={`flex flex-col group`}>
      <button
        type="button"
        className={`text-[16px] text-[#333] font-bold flex justify-between w-full items-center cursor-pointer border-0 p-[20px] outline-0 ${
          open ? "active" : ""
        }`}
        onClick={toggleAccordion}
      >
        <p>{title}</p>
        <span>
          <FontAwesomeIcon
            icon={faAngleRight}
            className={`transition-[transform] duration-500 ${
              open ? "transform-[rotate(90deg)]" : "transform-[rotate(0deg)]"
            }`}
          />
        </span>
      </button>
      <div
        style={{ maxHeight: `${height}px` }}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "" : "max-h-0"
        }`}
      >
        <div ref={contentRef} className={className || ""}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordian;
