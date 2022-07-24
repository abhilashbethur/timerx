import "./App.css";
import { useEffect, useRef, useState } from "react";
//import ChangeTime from "./components/ChangeTime";

import ReactSlider from "react-slider";
import "./components/changetime.css";

function App() {
  const [showTimer, setshowTimer] = useState(0);
  const [hours, sethours] = useState(0);
  const [minutes, setminutes] = useState(0);
  const [seconds, setseconds] = useState(0);
  const [remainingSeconds, setremainingSeconds] = useState(0);
  const [mode, setmode] = useState("work");
  const modeRef = useRef(mode);
  const secondsref = useRef(seconds);
  const remainingSecondsref = useRef(remainingSeconds);
  const setTime = () => {
    setshowTimer(true);
    setseconds(600);
    setremainingSeconds(hours * 3600 + minutes * 60 - 600);
  };

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      setmode(nextMode);
      modeRef.current = nextMode;
      console.log(nextMode);

      let nextSeconds = nextMode === "work" ? 1500 : 300;
      if (remainingSeconds <= 1800 && nextMode === "work")
        nextSeconds = remainingSeconds;
      console.log(nextSeconds);
      const nextremainingseconds = remainingSeconds - nextSeconds;

      console.log(nextremainingseconds);

      setseconds(nextSeconds);
      secondsref.current = nextSeconds;

      setremainingSeconds(nextremainingseconds);
      remainingSecondsref.current = nextremainingseconds;
    }
    const interval = setInterval(() => {
      if (seconds === 0 && remainingSeconds === 0) {
        console.log("time up");
        clearInterval(interval);
        return;
      }
      if (seconds === 0 && remainingSeconds !== 0) {
        return switchMode();
      }
      setseconds(seconds - 1);
    }, 10);
    return () => clearInterval(interval);
  }, [seconds, mode, remainingSeconds]);

  const displayminutes = Math.floor(seconds / 60);
  const displayseconds = seconds % 60;
  return (
    <div className="App">
      {showTimer === 0 ? (
        <div className="changetime">
          <div className="hours">
            <label>Hours:</label>
            <ReactSlider
              className="slider"
              marks
              thumbClassName="thumb"
              trackClassName="track"
              min={0}
              max={5}
              value={hours}
              onChange={(newValue) => sethours(newValue)}
            />
          </div>
          <span>{hours} hours</span>
          <div className="hours">
            <label>Minutes:</label>
            <ReactSlider
              className="slider"
              marks
              step={5}
              thumbClassName="thumb"
              trackClassName="track"
              min={10}
              max={55}
              value={minutes}
              onChange={(newValue) => setminutes(newValue)}
            />
          </div>
          <span>{minutes} minutes</span>
          <div className="btn-div">
            <button className="btn" onClick={setTime}>
              Start
            </button>
          </div>
        </div>
      ) : (
        <div>
          {displayminutes < 10 ? "0" + displayminutes : displayminutes}:
          {displayseconds < 10 ? "0" + displayseconds : displayseconds}
          {mode === "break" && seconds !== 0 && remainingSeconds !== 0 ? (
            <div>Take a chill pill</div>
          ) : (
            <div>Work Bitch!</div>
          )}
          {seconds === 0 && remainingSeconds === 0 && (
            <div>Time up! Good Job</div>
          )}
        </div>
      )}
      {/* <ChangeTime /> */}
    </div>
  );
}

export default App;
