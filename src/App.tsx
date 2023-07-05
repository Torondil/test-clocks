import "./App.css";
import { appSelector } from "@/store/store";
import { MapComponent, NewClock, Title } from "@/components";

export const App = () => {
  const { previousTimeOffset, timeOffset, nextTimeOffset } = appSelector(
    (state) => state
  );

  return (
    <div className="App">
      <Title />
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
