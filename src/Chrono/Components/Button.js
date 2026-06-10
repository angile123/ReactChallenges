import { handleBtnPause, handleStopTimer, handleTimer } from "../Utils";

export function StopBtn({ intervalRef, setTime, setBtnStart }) {
  return (
    <button
      className="stop-btn"
      onClick={() => handleStopTimer(intervalRef, setTime, setBtnStart)}
    >
      X
    </button>
  );
}
export function StartBtn({ intervalRef, setTime, setBtnStart }) {
  return (
    <button
      className="start-btn"
      onClick={() => handleTimer(intervalRef, setTime, setBtnStart)}
    >
      start
    </button>
  );
}
export function PauseBtn({ setBtnStart, intervalRef }) {
  return (
    <button
      className="pause-btn"
      onClick={() => handleBtnPause(setBtnStart, intervalRef)}
    >
      pause
    </button>
  );
}
