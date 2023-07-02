import "./App.css";
import { useSelector } from "react-redux";
import { MapComponent, NewClock } from "@/components";

export const App = () => {
  const timeOffset = useSelector((state) => state);

  return (
    <div className="App">
      <div>
        <h2>World Clock Test App</h2>
      </div>
      <div className="clockWrapper">
        <NewClock
          timeZone={timeOffset.previousTimeOffset}
          name={"Previous zone time"}
          small
        />
        <NewClock
          timeZone={timeOffset.timeOffset}
          name={"Current zone time"}
        />
        <NewClock
          timeZone={timeOffset.nextTimeOffset}
          name={"Next zone time"}
          small
        />
      </div>
      <MapComponent />
    </div>
  );
};

export default App;
