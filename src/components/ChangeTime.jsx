import React, { useState } from "react";
import ReactSlider from "react-slider";
import "./changetime.css";

function ChangeTime() {
  const [hours, sethours] = useState(0);
  const [minutes, setminutes] = useState(0);
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
        <button className="btn">Start</button>
      </div>
    </div>
  );
}

export default ChangeTime;
