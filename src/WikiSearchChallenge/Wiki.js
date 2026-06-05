import { useState } from "react";
import { QuerySection, HistorySection, Form } from "./Components/index.js";
import "./styles.css";

export default function WikiSearch() {
  const [history, setHistory] = useState([]);
  const [apiState, setApiState] = useState({
    data: null,
    error: null,
    loading: null,
  });

  const formHandlerArgs = { setApiState, history, setHistory };

  return (
    <div className="wiki-container">
      <Form {...{ formHandlerArgs }} />
      <QuerySection {...{ apiState }} />
      <HistorySection {...{ history }} />
    </div>
  );
}
