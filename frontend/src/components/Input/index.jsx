import { useState } from "react";

function FloatingInput({
  name,
  placeholder,
  type,
  required,
  readOnly,
  disabled,
  className,
  onChange,
  value,
  inputClassName,
}) {
  const [_value, setValue] = useState(value || "");
  return (
    <label
      htmlFor={name}
      className={`flex items-center w-full relative text-[14px] group/input ${className}`}
    >
      <input
        type={type || "text"}
        name={name}
        id={name}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
        defaultValue={_value}
        required={!!required}
        readOnly={!!readOnly}
        disabled={!!disabled}
        className={`w-full border-b-[2px] border-b-gray-300 outline-0 px-[2px] py-[5px] transition-colors focus:border-b-black read-only:text-gray-400 disabled:text-gray-600 disabled:bg-gray-100 disabled:border-b-gray-200 ${
          _value ? "!border-b-black" : ""
        } ${inputClassName}`}
      />
      <span
        className={`bg-white absolute ps-[5px] text-gray-400 transition-[transform,font-size] group-has-[input:focus]/input:transform-[translate(-5px,-105%)] group-has-[input:focus]/input:font-bold group-has-[input:focus]/input:text-[12px] group-has-[input:focus]/input:text-black ${
          _value
            ? "!transform-[translate(-5px,-105%)] !text-[12px] !text-black font-bold"
            : ""
        } ${
          readOnly ? "!text-[12px] !transform-[translate(-5px,-105%)]" : ""
        } ${
          disabled
            ? "!text-gray-400 transform-[translate(-5px,-105%)] !text-[12px]"
            : ""
        }`}
      >
        {placeholder}
        {required ? "*" : ""}
      </span>
    </label>
  );
}

export default FloatingInput;
