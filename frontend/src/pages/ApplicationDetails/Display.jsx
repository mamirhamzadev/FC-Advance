function Display({ title, data, className = "", dataClassName = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center border border-black rounded w-full p-[10px] ${className}`}
    >
      <p className="absolute bg-white px-[10px] text-[12px] font-bold whitespace-nowrap left-[10px] top-0 transform-[translateY(-50%)]">
        {title}
      </p>
      <p className={`w-full text-start text-[14px] ${dataClassName}`}>{data}</p>
    </div>
  );
}

export default Display;
