import React from "react";

const Title = ({ title, subtitle, align = "center", font = "text-3xl" }) => {
  return (
    <div className="mb-4 flex flex-col justify-center items-center text-center gap-2">
      <h1 className={`${font} font-bold`} style={{ textAlign: align }}>
        {title}
      </h1>

      <p className="text-gray-600" style={{ textAlign: align }}>
        {subtitle}
      </p>
    </div>
  );
};

export default Title;