import styles from "./NewClock.module.css";
import { useEffect, useRef } from "react";
import moment from "moment";

export const NewClock = (props) => {
  // console.log(moment().add(props.timeZone, "hours").toDate());
  // console.log(moment().zone() - 60);

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

  return (
    <div>
      <p className={styles.clockName}>{props.name}</p>
      <div
        className={`${styles.clock} ${props.small ? styles.clockSmall : ""}`}
      >
        <div ref={hours} className={styles.hour}>
          <div className={`${styles.hours} ${props.small ? styles.hoursSmall : ""}`}></div>
        </div>

        <div className={styles.minute}>
          <div ref={minutes} className={`${styles.minutes} ${props.small ? styles.minutesSmall : ""}`}></div>
        </div>

        <div className={styles.second}>
          <div ref={seconds} className={`${styles.seconds} ${props.small ? styles.secondsSmall : ""}`}></div>
        </div>
      </div>
    </div>
  );
};
