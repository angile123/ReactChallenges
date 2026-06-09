export function handleStopTimer(idRef, setTime, setBtnStart) {
  clearInterval(idRef.current);
  idRef.current = null;
  setBtnStart(true);
  setTime({ min: 0, sec: 0, ms: 0 });
}
export function handleTimerDisplay(timerSate) {
  const { min, sec, ms } = timerSate;

  let secStr = sec.toString();
  let minStr = min.toString();
  if (secStr.length == 1) secStr = "0" + secStr;
  if (minStr.length == 1) minStr = "0" + minStr;
  return { minStr, secStr, ms };
}
export function handleTimer(intervalRef, setTime, setBtnStart) {
  setBtnStart((prev) => !prev);
  if (!intervalRef.current) {
    intervalRef.current = setInterval(() => handleTimerCb(setTime), 100);
  }
}
export function handleTimerCb(setTime) {
  setTime((prev) => {
    if (prev.ms == 9) {
      prev.ms = 0;
      if (prev.sec == 59) {
        prev.sec = 0;
        prev.min = prev.min + 1;
      } else {
        prev.sec = prev.sec + 1;
      }
    } else {
      prev.ms = prev.ms + 1;
    }
    return { ...prev };
  });
}
export function handleBtnPause(setBtnStart, intervalRef) {
  setBtnStart((prev) => !prev);
  clearInterval(intervalRef.current);
  intervalRef.current = null;
}
