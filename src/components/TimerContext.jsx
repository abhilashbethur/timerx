import React, { useState, createContext } from "react";

export const TimerContext = createContext();

export const TimerProvider = (props) => {
  const [showTimer, setshowTimer] = useState(false);
  const [hours, sethours] = useState(0);
  const [minutes, setminutes] = useState(10);
  const [seconds, setseconds] = useState(0);
  const [remainingSeconds, setremainingSeconds] = useState(0);
  const [mode, setmode] = useState("work");

  return (
    <TimerContext.Provider
      value={{
        showTimer,
        setshowTimer,
        hours,
        sethours,
        minutes,
        setminutes,
        seconds,
        setseconds,
        remainingSeconds,
        setremainingSeconds,
        mode,
        setmode,
      }}
    >
      {props.children}
    </TimerContext.Provider>
  );
};
