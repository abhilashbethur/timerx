<div className="settime">
  <input type="text" onChange={hourhandler} value={hours} maxLength="2" />
  <p>:</p>
  <input type="text" onChange={minutehandler} value={minutes} maxLength="2" />

  <button onClick={setTime}>START</button>
</div>;
