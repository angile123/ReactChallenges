import { useState, useRef } from "react";
import {
  setHistoryIncomplete,
  setHistoryFull,
  setFirstQuery,
} from "./WikiUtils.js";
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

function Query({ term = null }) {
  return (
    <div className="query-container">
      <p className="query-search-term-p">You searched {term}</p>

      <ul className="query-search-list">
        <li className="query-item">1</li>
        <li className="query-item">2</li>
        <li className="query-item">3</li>
      </ul>
    </div>
  );
}
function NoQuery() {
  return <p className="query-search-term-p no-query-p">Search something...</p>;
}
