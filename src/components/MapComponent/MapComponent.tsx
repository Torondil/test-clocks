import { timeZoneHours } from "@/constants/index";
import styles from "./MapComponent.module.css";
import moment from "moment";
import { appSelector, useAppDispatch } from "@/store/store";
import { setNewDateAction } from "@/store/actionCreators";

export const MapComponent = () => {
  const dispatch = useAppDispatch();
  const currentZone = appSelector((state) => state.timeOffset);

  const changeTimeZone = (zone: number): void => {
    dispatch(setNewDateAction(zone));
  };

  const getZoneTime = (zone: number): string => {
    return `${moment().zone(zone).format('HH')}:${moment()
      .zone(zone)
      .format('mm')}`
  }

  const getCurrentZoneStyle = (zone: number): string => {
    return zone === currentZone ? styles.active : ""
  }

  return (
    <div className={styles.mapWrapper}>
      {timeZoneHours.map((zone: number) => (
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
