import { useState, useRef } from "react";
import {
  setHistoryIncomplete,
  setHistoryFull,
  setFirstQuery,
} from "./WikiUtils.js";
export default function WikiSearch() {
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
