import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import ClockComponent from "./components/ClockComponent";

function App() {
  const dispatch = useDispatch();

  const date = useSelector((state) => state.date);

  const changeDate = () => {
    dispatch({ type: "SETNEWDATE", timeOffset: 24 });
  };

  return (
    <div className="App">
      <ClockComponent />
      <button onClick={() => changeDate()}>But</button>
    </div>
  );
}

export default App;
