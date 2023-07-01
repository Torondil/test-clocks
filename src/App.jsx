import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {ClockComponent, MapComponent} from "@/components";
import {hoursInDay, timeZoneHours} from "@/constants/index.js";
import {actionTypes} from "@/store/actionTypes/index.js";

export const App = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date);

  const changeDate = () => {
    dispatch({type: actionTypes.SET_NEW_DATE, timeOffset: hoursInDay});
  };

  return (
    <div className="App">
      <ClockComponent />
        <button type="button"
        onClick={changeDate}>Изменить таймзону</button>
      {date.getDate()}
      <MapComponent/>
    </div>
  );
}

export default App;
