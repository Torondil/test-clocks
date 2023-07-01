import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ClockComponent = () => {
  const date = useSelector((state) => state.date);

//   const [dateState, setState] = useState({
//     hourAngle: 0,
//     minAngle: 0,
//     secAngle: 0,
//     dateText: "0",
//   });

//   const seconds = date.getSeconds();
//   const minutes = date.getMinutes() + seconds / 60;
//   const hour = date.getHours() + minutes / 60;
//   let day = date.getDate();
//   let sDay = day < 10 ? "0" + day : day.toString();

//   let adjust = 30;
//   let secAngle = (seconds - adjust) * 6;
//   let minAngle = (minutes - adjust) * 6;
//   let hourAngle = (hour - adjust) * 30;
//   let dateText = sDay;

//   setState({ secAngle, minAngle, hourAngle, dateText });

  useEffect(() => {
    const interval = setInterval(() => {

        // тут наверное стрелки передвигать
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={"clock-wrapper"}>
    
      <div>Число: {date.getDate()}</div>

      <svg className={"clock"} viewBox="0 0 100 100">
        <circle className={"clock-face"} cx="50" cy="50" r="45" />
        <g className={"arrows"}>
          <rect
            className={"arrow-hours"}
            x="48.5"
            y="12.5"
            width="3"
            height="40"
            rx="2.5"
            ry="2.55"
          />
          <rect
            className={"arrow-minutes"}
            x="48"
            y="12.5"
            width="3"
            height="40"
            rx="2"
            ry="2"
          />
          <line className={"arrow-seconds"} x1="50" y1="50" x2="50" y2="16" />
        </g>
      </svg>
    </div>
  );
};

