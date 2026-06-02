import { useState, useRef } from "react";
export default function App() {
  const [history, setHistory] = useState([]);
  const list = history.map((history) => (
    <li>
      {history.term} - {history.timestamp}
    </li>
  ));
  const inputRef = useRef(null);
  const currentSearch = history[0];

  function updateHistory(e) {
    e.preventDefault();
    const input = inputRef.current.value;
    inputRef.current.value = "";

    if (history.length < 5) {
      return history.length == 0
        ? setFirstQuery(setHistory, input)
        : setHistoryIncomplete(input, history, setHistory);
    }
    setHistoryFull(input, history, setHistory);
  }

  return (
    <div>
      <form onSubmit={updateHistory}>
        <input type="text" name={"text"} ref={inputRef} />
        <button>Submit</button>
      </form>

      {currentSearch == null && <p>Search something...</p>}
      {currentSearch && <p>You searched {currentSearch.term}</p>}
      {list.length >= 1 && <ul>{list}</ul>}
    </div>
  );
}

function indexOfTerm(history, input) {
  return history.findIndex((query) => query.term == input);
}
function newHistoryList(index, history) {
  const historyCopy = [...history];
  historyCopy.splice(index, 1);
  return historyCopy;
}
function setHistoryIncomplete(input, history, setHistory) {
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
function setHistoryFull(input, history, setHistory) {
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
function setFirstQuery(setHistory, input) {
  const newSearchTerm = {
    term: input,
    timestamp: new Date().toLocaleString(),
  };
  setHistory([newSearchTerm]);
}
