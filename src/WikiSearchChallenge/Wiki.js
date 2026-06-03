import { useState, useRef } from "react";
import {
  setHistoryIncomplete,
  setHistoryFull,
  setFirstQuery,
  fetchData,
} from "./WikiUtils.js";
import Query from "./Components/Query.js";
import NoQuery from "./Components/NoQuery.js";
import "./styles.css";
import History from "./Components/History.js";

export default function WikiSearch() {
  const [history, setHistory] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const list = history.map((history) => (
    <li className="query-item">
      {history.term} - {history.timestamp}
    </li>
  ));
  const fetchedTerms =
    !!data &&
    data.map((query) => (
      <li className="query-item">
        <a target="_blank" rel="noopener noreferrer" href={query.link}>
          {query.term}
        </a>
      </li>
    ));
  const inputRef = useRef(null);
  const currentSearch = history[0];

  function updateHistory(e) {
    e.preventDefault();
    const input = inputRef.current.value;
    inputRef.current.value = "";

    fetchData(input, setData, setLoading, setError);

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

      {currentSearch ? (
        <Query term={currentSearch.term} queries={fetchedTerms} />
      ) : (
        <NoQuery />
      )}
      {!!list.length && <History history={list} />}
    </div>
  );
}
