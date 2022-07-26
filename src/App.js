import "./App.css";
import { useEffect, useRef, useContext } from "react";
import { Howl } from "howler";
import "./components/changetime.css";
import ChangeTime from "./components/ChangeTime";
import DisplayTime from "./components/DisplayTime";
import { TimerContext } from "./components/TimerContext";
import soundSrc from "./ding.mp3";

function App() {
  const {
    setseconds,
    setremainingSeconds,
    seconds,
    remainingSeconds,
    mode,
    setmode,
    showTimer,
    setshowTimer,
  } = useContext(TimerContext);

  const modeRef = useRef(mode);
  const secondsref = useRef(seconds);
  const remainingSecondsref = useRef(remainingSeconds);

  const callmySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  useEffect(() => {
    function switchMode() {
      callmySound(soundSrc);
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
        callmySound(soundSrc);
        console.log("time up");
        clearInterval(interval);
        return;
      }
      if (seconds === 0 && remainingSeconds !== 0) {
        return switchMode();
      }
      setseconds(seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [
    seconds,
    mode,
    remainingSeconds,
    setmode,
    setremainingSeconds,
    setseconds,
    setshowTimer,
    showTimer,
  ]);

  return (
    <div className="App">
      {showTimer === false ? <ChangeTime /> : <DisplayTime />}
      {showTimer}
    </div>
  );
}

export default App;
