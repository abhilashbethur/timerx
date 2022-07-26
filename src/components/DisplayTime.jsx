import React, { useContext } from "react";
import { TimerContext } from "./TimerContext";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./changetime.css";

function DisplayTime() {
  const { seconds, remainingSeconds, mode, setshowTimer } =
    useContext(TimerContext);

  const onReset = () => {
    setshowTimer(false);
  };

  const displayminutes = Math.floor(seconds / 60);
  const displayseconds = seconds % 60;

  const showminutes =
    displayminutes < 10 ? "0" + displayminutes : displayminutes;
  const showseconds =
    displayseconds < 10 ? "0" + displayseconds : displayseconds;

  const percentage = Math.round(
    (seconds /
      (mode === "break"
        ? 300
        : remainingSeconds <= 1800
        ? remainingSeconds
        : 1500)) *
      100
  );

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={showminutes + ":" + showseconds}
        styles={buildStyles({
          pathColor: mode === "work" ? "red" : "green",
          trailColor: "yellow",
        })}
      />
      {seconds !== 0 && remainingSeconds !== 0 && mode === "break" ? (
        <span>Take a chill pill</span>
      ) : (
        <span>Work Bitch!</span>
      )}
      {seconds === 0 && remainingSeconds === 0 && (
        <div>
          <span>Time up! Good Job</span>
          <div className="btn-div">
            <button className="btn" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayTime;
