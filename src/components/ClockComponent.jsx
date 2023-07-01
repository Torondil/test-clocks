import React from "react";
import { useSelector } from "react-redux";

const ClockComponent = () => {
  const date = useSelector((state) => state.date);
  //   console.log(date.getHours());

  return (
    <div className={"clock-wrapper"}>
      <div>Число: {date.getDate()}</div>
    </div>
  );
};

export default ClockComponent;
