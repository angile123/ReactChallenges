export function indexOfTerm(history, input) {
  return history.findIndex((query) => query.term == input);
}
export function newHistoryList(index, history) {
  const historyCopy = [...history];
  historyCopy.splice(index, 1);
  return historyCopy;
}
export function setHistoryIncomplete(input, history, setHistory) {
  const indexFound = indexOfTerm(history, input);
  const newSearchTerm = {
    term: input,
    timestamp: new Date().toLocaleString(),
  };

  if (indexFound == -1) {
    setHistory([newSearchTerm, ...history]);
  } else {
    const historyCopy = newHistoryList(indexFound, history);
    setHistory([newSearchTerm, ...historyCopy]);
  }
}
export function setHistoryFull(input, history, setHistory) {
  const indexFound = indexOfTerm(history, input);
  const newSearchTerm = {
    term: input,
    timestamp: new Date().toLocaleString(),
  };
  if (indexFound >= 0) {
    const historyCopy = newHistoryList(indexFound, history);
    setHistory([newSearchTerm, ...historyCopy]);
    return;
  }
  const historyCopy = [...history];
  historyCopy.pop();
  setHistory([newSearchTerm, ...historyCopy]);
}
export function setFirstQuery(setHistory, input) {
  const newSearchTerm = {
    term: input,
    timestamp: new Date().toLocaleString(),
  };
  setHistory([newSearchTerm]);
}
