import "./App.css";
import { useSelector } from "react-redux";
import { MapComponent, NewClock, Title } from "@/components";

export const App = () => {
  const { previousTimeOffset, timeOffset, nextTimeOffset } = useSelector(
    (state) => state
  );

  return (
    <div className="App">
      <Title/>
      <div className="clockWrapper">
        <NewClock timeZone={previousTimeOffset} name={"Previous zone time"} small />
        <NewClock timeZone={timeOffset} name={"Current zone time"} />
        <NewClock timeZone={nextTimeOffset} name={"Next zone time"} small />
      </div>
      <MapComponent />
    </div>
  );
};

export default App;
