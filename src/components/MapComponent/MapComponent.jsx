import React from "react";
import { timeZoneHours } from "@/constants/index.js";
import { useDispatch } from "react-redux";
import { actionTypes } from "@/store/actionTypes";

export const MapComponent = () => {
  const dispatch = useDispatch();

  const changeTimeZone = (hour) => {
    dispatch({ type: actionTypes.SET_NEW_DATE, timeOffset: hour }); //не hour, другое чтото надо
  };

  return (
    <div className={"mapWrapper"}>
      {timeZoneHours.map((hour) => (
        <div
          key={hour}
          onClick={() => changeTimeZone(hour)}
          className={"timezoneFrame"}
        >
          {hour}
        </div>
      ))}
    </div>
  );
};
