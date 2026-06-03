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
export async function fetchData(term, setData, setLoading, setError) {
  const URL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${term}&format=json&origin=*&limit=5`;
  setLoading(true);
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("HTTP error");
    const json = await res.json();
    const termsFound = json[1];
    const termLinks = json[3];
    const data = [];
    for (let i = 0; i < termsFound.length; i++) {
      data.push({ term: termsFound[i], link: termLinks[i] });
    }

    setData(data);
    setError(null);
  } catch (error) {
    setError(error.message);
    setData(null);
  } finally {
    setLoading(null);
  }
}
