import { useState, useRef } from "react";
import {
  setHistoryIncomplete,
  setHistoryFull,
  setFirstQuery,
} from "./WikiUtils.js";
import Query from "./Components/Query.js";
import NoQuery from "./Components/NoQuery.js";
import "./styles.css";

export default function WikiSearch() {
  const [history, setHistory] = useState([]);
  const list = history.map((history) => (
    <li className="query-item">
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
    <div className="wiki-container">
      <form onSubmit={updateHistory}>
        <input type="text" name={"text"} ref={inputRef} />
        <button>Submit</button>
      </form>

      {currentSearch ? <Query term={currentSearch.term} /> : <NoQuery />}
      {!!list.length && <ol className="query-history-list">{list}</ol>}
    </div>
  );
}
