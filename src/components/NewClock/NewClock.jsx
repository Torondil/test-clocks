import styles from "./NewClock.module.css";
import {useEffect, useRef} from "react";
import moment from "moment";
import {actionTypes} from "@/store/actionTypes";
import {useDispatch} from "react-redux";
import {
  DEGREES_TO_ROTATE_HOUR_HAND,
  DEGREES_TO_ROTATE_SECONDS_HAND,
  HOURS_ON_CLOCK_FACE,
  INTERVAL_DELAY,
  ZONE_STEP
} from "@/constants";

export const NewClock = ({timeZone, name, small}) => {
  const dispatch = useDispatch();

  const hours = useRef(null);
  const minutes = useRef(null);
  const seconds = useRef(null);
  const interval = useRef(null);

  const clock = () => {
    const day = moment().zone(timeZone)._d;
    const currentHours = day.getHours() * DEGREES_TO_ROTATE_HOUR_HAND - 60;
    const currentMinutes = day.getMinutes() * DEGREES_TO_ROTATE_SECONDS_HAND;
    const currentSeconds = day.getSeconds() * DEGREES_TO_ROTATE_SECONDS_HAND;

    hours.current.style.transform = `rotateZ(${
      currentHours + currentMinutes / HOURS_ON_CLOCK_FACE
    }deg)`;
    minutes.current.style.transform = `rotateZ(${currentMinutes}deg)`;
    seconds.current.style.transform = `rotateZ(${currentSeconds}deg)`;
  };

  useEffect(() => {
    interval.current = setInterval(() => {
      clock();
    }, INTERVAL_DELAY);

    return () => {
      clock();
      clearInterval(interval.current);
    };
  });

  const buttonClassStyle = `${styles.clockButton} ${small ? styles.hide : ""}`
  const hoursClassStyle = `${styles.hours} ${small ? styles.hoursSmall : ""}`
  const minutesClassStyle = `${styles.minutes} ${small ? styles.minutesSmall : ""}`
  const secondsClassStyle = `${styles.seconds} ${small ? styles.secondsSmall : ""}`

  const increaseTimeZone = () => {
    dispatch({type: actionTypes.INCREASE_HOUR, timeOffset: ZONE_STEP});
  };

  const decreaseTimeZone = () => {
    dispatch({type: actionTypes.DECREASE_HOUR, timeOffset: ZONE_STEP});
  };

  return (
    <div className={styles.clockContainer}>
      <p className={styles.clockName}>{name}</p>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={buttonClassStyle}
          onClick={increaseTimeZone}
        >
          Decrease Time
        </button>
        <button
          type="button"
          className={buttonClassStyle}
          onClick={decreaseTimeZone}
        >
          Increase Time
        </button>
      </div>

      <div className={`${styles.clock} ${small ? styles.clockSmall : ""}`}>
        <div ref={hours} className={styles.hour}>
          <div className={hoursClassStyle}></div>
        </div>

        <div className={styles.minute}>
          <div ref={minutes} className={minutesClassStyle}></div>
        </div>

        <div className={styles.second}>
          <div ref={seconds} className={secondsClassStyle}></div>
        </div>
      </div>
    </div>
  );
};
