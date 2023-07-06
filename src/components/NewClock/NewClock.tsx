import styles from "./NewClock.module.css";
import React, { FC, memo, useEffect, useRef, useState } from "react";
import moment from "moment";
import { actionTypes } from "@/store/actionTypes/index.js";
import {
  DEGREES_TO_ROTATE_HOUR_HAND,
  DEGREES_TO_ROTATE_SECONDS_HAND,
  HOURS_ON_CLOCK_FACE,
  INTERVAL_DELAY,
  MINUTES_IN_HOUR,
  ZONE_STEP,
} from "@/constants/index";
import { Nullable, TimeoutType } from "@/types";
import { NewClockType } from "@/components/NewClock/types";
import { useAppDispatch } from "@/store/store";

export const NewClock: FC<NewClockType> = memo(({ timeZone, name, small = false }) => {
  const dispatch = useAppDispatch();

  const hours = useRef<Nullable<HTMLDivElement>>(null);
  const minutes = useRef<Nullable<HTMLDivElement>>(null);
  const seconds = useRef<Nullable<HTMLDivElement>>(null);
  const interval = useRef<TimeoutType>(undefined);

  const [previousZone, setPreviousZone] = useState<number>(0);
  const [isHourClicked, setIsHourClicked] = useState<boolean>(false);

  const buttonClassStyle = `${styles.clockButton} ${small ? styles.hide : ""}`;
  const hoursClassStyle = `${styles.hours} ${small ? styles.hoursSmall : ""}`;
  const minutesClassStyle = `${styles.minutes} ${small ? styles.minutesSmall : ""}`;
  const secondsClassStyle = `${styles.seconds} ${small ? styles.secondsSmall : ""}`;
  const clockCircle = `${styles.clock} ${small ? styles.clockSmall : ""}`


  const clock = (): void => {
    const day = moment().zone(timeZone)["_d"];
    const currentHours: number = day.getHours() * DEGREES_TO_ROTATE_HOUR_HAND - MINUTES_IN_HOUR;
    const currentMinutes: number = day.getMinutes() * DEGREES_TO_ROTATE_SECONDS_HAND;
    const currentSeconds: number = day.getSeconds() * DEGREES_TO_ROTATE_SECONDS_HAND;

    hours.current!["style"].transform = `rotateZ(${currentHours + currentMinutes / HOURS_ON_CLOCK_FACE}deg)`;
    minutes.current!["style"].transform = `rotateZ(${currentMinutes}deg)`;
    seconds.current!["style"].transform = `rotateZ(${currentSeconds}deg)`;
  };

  const getZone = (x: number, y: number): number => {
    const rect = hours.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(y - centerY, x - centerX);
    let zone = Math.round((angle * 6) / Math.PI);

    if (zone <= 0) {
      zone += 12;
    }
    return zone
  };

  const handleClockUnclicked = () => {
    setIsHourClicked(false)
    setPreviousZone(0)
  }

  const handleClockClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const zone = getZone(mouseX, mouseY);

    setPreviousZone(zone)
    setIsHourClicked(true)
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isHourClicked && !small) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const zone = getZone(mouseX, mouseY);

      if (zone > previousZone && (zone !== 12 && timeZone !== 1) || (zone == 1 && previousZone == 12)) {
        decreaseTimeZone();
      } else if (zone < previousZone || (zone == 12 && previousZone == 1)) {
        increaseTimeZone();
      }

      setPreviousZone(zone);
    }
  };

  const increaseTimeZone = (): void => {
    dispatch({ type: actionTypes.INCREASE_HOUR, timeOffset: ZONE_STEP });
  };

  const decreaseTimeZone = (): void => {
    dispatch({ type: actionTypes.DECREASE_HOUR, timeOffset: ZONE_STEP });
  };

  
  useEffect(() => {
    interval.current = setInterval(() => {
      clock();
    }, INTERVAL_DELAY);

    return () => {
      clock();
      clearInterval(interval.current);
    };
  }, [timeZone]);

  return (
    <div className={styles.clockContainer}>
      <p className={styles.clockName}>{name}</p>
      <div className={styles.buttonContainer}>
        <button type="button" className={buttonClassStyle} onClick={increaseTimeZone}>
          Decrease Time
        </button>
        <button type="button" className={buttonClassStyle} onClick={decreaseTimeZone}>
          Increase Time
        </button>
      </div>

      <div className={clockCircle} onMouseLeave={handleClockUnclicked} onMouseUp={handleClockUnclicked} onMouseMove={handleMouseMove}>
        <div ref={hours} className={styles.hour} onMouseDown={handleClockClick}>
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
