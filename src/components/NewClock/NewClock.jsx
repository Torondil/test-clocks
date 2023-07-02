import styles from "./NewClock.module.css";
import { useEffect, useRef } from "react";
import moment from "moment";
import { actionTypes } from "@/store/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { ZONE_STEP } from "@/constants";

export const NewClock = (props) => {
  const dispatch = useDispatch();
  const currentZone = useSelector((state) => state.timeOffset);

  const hours = useRef(null);
  const minutes = useRef(null);
  const seconds = useRef(null);
  const interval = useRef(null);

  const degSecond = 6;
  const degHour = 30;

  const clock = () => {
    const day = moment().zone(props.timeZone)._d;
    const currentHours = day.getHours() * degHour - 60;
    const currentMinutes = day.getMinutes() * degSecond;
    const currentSeconds = day.getSeconds() * degSecond;

    hours.current.style.transform = `rotateZ(${
      currentHours + currentMinutes / 12
    }deg)`;
    minutes.current.style.transform = `rotateZ(${currentMinutes}deg)`;
    seconds.current.style.transform = `rotateZ(${currentSeconds}deg)`;
  };

  useEffect(() => {
    interval.current = setInterval(() => {
      clock();
    }, 0);

    return () => {
      clock();
      clearInterval(interval.current);
    };
  });

  const increaseTimeZone = () => {
    dispatch({ type: actionTypes.INCREASE_HOUR, timeOffset: ZONE_STEP });
  };

  const decreaseTimeZone = () => {
    dispatch({ type: actionTypes.DECREASE_HOUR, timeOffset: ZONE_STEP });
  };

  return (
    <div className={styles.clockContainer}>
      <p className={styles.clockName}>{props.name}</p>
      <button className={`${styles.clockButton} ${
              props.small ? styles.hide : ""
            }`} onClick={() => decreaseTimeZone()}>
        Increase Time
      </button>
      <button className={`${styles.clockButton} ${
              props.small ? styles.hide : ""
            }`} onClick={() => increaseTimeZone()}>
        Decrease Time
      </button>
      <div
        className={`${styles.clock} ${props.small ? styles.clockSmall : ""}`}
      >
        <div ref={hours} className={styles.hour}>
          <div
            className={`${styles.hours} ${
              props.small ? styles.hoursSmall : ""
            }`}
          ></div>
        </div>

        <div className={styles.minute}>
          <div
            ref={minutes}
            className={`${styles.minutes} ${
              props.small ? styles.minutesSmall : ""
            }`}
          ></div>
        </div>

        <div className={styles.second}>
          <div
            ref={seconds}
            className={`${styles.seconds} ${
              props.small ? styles.secondsSmall : ""
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};
