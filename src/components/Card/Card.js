import React from "react";

const Card = (props) => {
  return (
    <div className={`rounded-lg border-4 w-full md:w-1/4 py-2 border-${props.className}`}>
        <div className="pl-2">
          <div className={`text-xs md:text-sm uppercase text-${props.className} mb-1`}>
            {props.children}
          </div>
          <div className="text-sm md:text-lg text-gray-400">{props.value ? props.value : '0'}</div>
        </div>
    </div>
  );
};

export default Card;
