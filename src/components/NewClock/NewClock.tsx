import styles from "./NewClock.module.css";
import React, {FC, memo, useEffect, useRef} from "react";
import moment from "moment";
import {
  DEGREES_TO_ROTATE_HOUR_HAND,
  DEGREES_TO_ROTATE_SECONDS_HAND,
  HOURS_ON_CLOCK_FACE,
  INTERVAL_DELAY,
  MINUTES_IN_HOUR,
  ZONE_STEP
} from "@/constants/index";
import {Nullable, TimeoutType,} from "@/types";
import {NewClockType} from "@/components/NewClock/types";
import {useAppDispatch} from "@/store/store";
import { decreaseHourAction, increaseHourAction } from "@/store/actionCreators";

export const NewClock: FC<NewClockType> = memo(({timeZone, name, small = false}) => {
  const dispatch = useAppDispatch();

  const hours = useRef<Nullable<HTMLDivElement>>(null);
  const minutes = useRef<Nullable<HTMLDivElement>>(null);
  const seconds = useRef<Nullable<HTMLDivElement>>(null);
  const interval = useRef<TimeoutType>(undefined);


  const clock = (): void => {
    const day = moment().zone(timeZone)["_d"];
    const currentHours: number = day.getHours() * DEGREES_TO_ROTATE_HOUR_HAND - MINUTES_IN_HOUR;
    const currentMinutes: number = day.getMinutes() * DEGREES_TO_ROTATE_SECONDS_HAND;
    const currentSeconds: number = day.getSeconds() * DEGREES_TO_ROTATE_SECONDS_HAND;

     hours.current!["style"].transform = `rotateZ(${
      currentHours + currentMinutes / HOURS_ON_CLOCK_FACE
    }deg)`;
    minutes.current!["style"].transform = `rotateZ(${currentMinutes}deg)`;
    seconds.current!["style"].transform = `rotateZ(${currentSeconds}deg)`;
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

  const increaseTimeZone = (): void => {
    dispatch(increaseHourAction(ZONE_STEP));
  };

  const decreaseTimeZone = (): void => {
    dispatch(decreaseHourAction(ZONE_STEP));
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
});
