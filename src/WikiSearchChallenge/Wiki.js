import { useState, useRef } from "react";
import {
  createHistoryList,
  createSearchList,
  handleFormSubmission,
} from "./WikiUtils.js";
import { Query, NoQuery, History } from "./Components/index.js";
import "./styles.css";

export default function WikiSearch() {
  const [history, setHistory] = useState([]);
  const [apiState, setApiState] = useState({
    data: null,
    error: null,
    loading: null,
  });

  const historyExist = !!history.length;
  const { term } = historyExist && history[0];
  const historyList = createHistoryList(history);
  const hrefList = createSearchList(apiState.data);
  const inputRef = useRef(null);
  const formHandlerArgs = {
    setApiState,
    inputRef,
    history,
    setHistory,
  };

  return (
    <div className="wiki-container">
      <form onSubmit={(e) => handleFormSubmission(e, formHandlerArgs)}>
        <input type="text" name={"text"} ref={inputRef} />
        <button>Submit</button>
      </form>

      {!historyExist && <NoQuery />}
      {historyExist && <Query term={term} queries={hrefList} />}
      {historyExist && <History history={historyList} />}
    </div>
  );
}
