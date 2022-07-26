import React, { useContext } from "react";
import ReactSlider from "react-slider";
import "./changetime.css";
import { TimerContext } from "./TimerContext";

function ChangeTime() {
  const {
    setseconds,
    hours,
    sethours,
    minutes,
    setminutes,
    setremainingSeconds,
    setshowTimer,
  } = useContext(TimerContext);

  const setTime = () => {
    setshowTimer((showTimer) => !showTimer);

    setseconds(600);
    setremainingSeconds(hours * 3600 + minutes * 60 - 600);
  };
  return (
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
  );
}

export default ChangeTime;
