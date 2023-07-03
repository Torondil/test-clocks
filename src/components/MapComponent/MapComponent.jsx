import { timeZoneHours } from "@/constants/index.js";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "@/store/actionTypes";
import styles from "./MapComponent.module.css";
import moment from "moment";

export const MapComponent = () => {
  const dispatch = useDispatch();
  const currentZone = useSelector((state) => state.timeOffset);

  const changeTimeZone = (zone) => {
    dispatch({ type: actionTypes.SET_NEW_DATE, timeOffset: zone });
  };

  const getZoneTime = (zone) => {
    return `${moment().zone(zone).format('HH')}:${moment()
      .zone(zone)
      .format('mm')}`
  }

  const getCurrentZoneStyle = (zone) => {
    return zone === currentZone ? styles.active : ""
  }

  return (
    <div className={styles.mapWrapper}>
      {timeZoneHours.map((zone) => (
          <div
            key={zone}
            onClick={() => changeTimeZone(zone)}
            className={`${styles.timezoneFrame} ${getCurrentZoneStyle(zone)}`}
          >
            {getZoneTime(zone)}
          </div>
        )
      )}
    </div>
  );
};
