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
export async function fetchData(term, setApiState) {
  const URL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${term}&format=json&origin=*&limit=5`;
  setApiState({ data: null, loading: true, error: null });
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("HTTP error");
    const json = await res.json();
    const term = json[0];
    const termsFound = json[1];
    const termLinks = json[3];
    const data = [];
    for (let i = 0; i < termsFound.length; i++) {
      data.push({ term: termsFound[i], link: termLinks[i], query: term });
    }

    setApiState({ data, loading: null, error: null });
  } catch (err) {
    setApiState({ data: null, loading: null, error: err.message });
  }
}
export function createHistoryList(history) {
  if (history.length == 0) return null;

  return history.map((history) => (
    <li className="query-item">
      {history.term} - {history.timestamp}
    </li>
  ));
}
export function createSearchList(data) {
  if (!data) return;
  const linkList = data.map((query) => (
    <li className="query-item">
      <a target="_blank" rel="noopener noreferrer" href={query.link}>
        {query.term}
      </a>
    </li>
  ));
  const term = data[0].query;
  return { linkList, term };
}
export function handleFormSubmission(e, props) {
  e.preventDefault();
  const { inputRef, setApiState, setHistory, history } = props;

  const input = inputRef.current.value;
  inputRef.current.value = "";

  fetchData(input, setApiState);

  if (history.length < 5) {
    return history.length == 0
      ? setFirstQuery(setHistory, input)
      : setHistoryIncomplete(input, history, setHistory);
  }
  setHistoryFull(input, history, setHistory);
}
