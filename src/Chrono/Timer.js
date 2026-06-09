import { useRef, useState } from "react";
import { StopBtn, PauseBtn, StartBtn } from "./Components/Button";
import { handleTimerDisplay } from "./Utils";
import "./styles.css";
export default function Timer() {
  const [btnStart, setBtnStart] = useState(true);
  const [time, setTime] = useState({ min: 0, sec: 0, ms: 0 });
  const intervalRef = useRef(null);

  const { minStr, secStr, ms } = handleTimerDisplay(time);

  return (
    <div className="container">
      <div className="wrapper">
        <p className="timer-display">
          {minStr}:{secStr}:{ms}
        </p>
        <div className="btn-container">
          {btnStart && <StartBtn {...{ intervalRef, setTime, setBtnStart }} />}
          {!btnStart && <PauseBtn {...{ setBtnStart, intervalRef }} />}
          <StopBtn {...{ intervalRef, setTime, setBtnStart }} />
        </div>
      </div>
    </div>
  );
}
