import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { MapComponent, NewClock } from "@/components";
import { actionTypes } from "@/store/actionTypes/index.js";

export const App = () => {
  const dispatch = useDispatch();
  const timeOffset = useSelector((state) => state);

  const changeDate = () => {
    dispatch({ type: actionTypes.SET_NEW_DATE, timeOffset: 2 });
  };

  return (
    <div className="App">
      <div className="clockWrapper">
        <NewClock timeZone = {timeOffset.previousTimeOffset}/>
        <NewClock timeZone = {timeOffset.timeOffset} />
        <NewClock timeZone = {timeOffset.nextTimeOffset} />
      </div>
      <button type="button" onClick={changeDate}>
        Изменить таймзону
      </button>
      <MapComponent />
    </div>
  );
};

export default App;
