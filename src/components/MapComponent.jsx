import React from "react";
import { timeZoneHours } from "@/constants/index.js";

export const MapComponent = () => {
  return (
    <div className={"mapWrapper"}>
      {timeZoneHours.map((hour) => (
        <div
          key={hour}
          className={'timezoneFrame'}
          style={{ width: "41.6px", height: "100%" }}
        >
          {hour}
        </div>
        // ЭТО ЧЕРНОВИК дивов на карте))
      ))}
    </div>
  );
};