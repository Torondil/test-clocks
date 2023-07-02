import React from "react";
import { timeZoneHours } from "@/constants/index.js";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "@/store/actionTypes";
import styles from "./MapComponent.module.css";
import map from "@/assets/images/map.png";
import moment from "moment";

export const MapComponent = () => {
  const dispatch = useDispatch();
  const currentZone = useSelector((state) => state.timeOffset);
  const changeTimeZone = (zone) => {
    dispatch({ type: actionTypes.SET_NEW_DATE, timeOffset: zone });
  };

  return (
    <div className={styles.mapWrapper}>
      {/* <img src={map} alt="Map" className={styles.img} /> */}
      {timeZoneHours.map((zone) => {
        return (
          <div
            key={zone}
            onClick={() => changeTimeZone(zone)}
            className={`${styles.timezoneFrame} ${
              zone === currentZone ? styles.active : ""
            }`}
          >
            {`${moment().zone(zone).format('HH')}:${moment()
              .zone(zone)
              .format('mm')}`}
          </div>
        );
      })}
    </div>
  );
};
