import { createHistoryList } from "../WikiUtils";
import { NoHistoryList, HistoryList } from "./index.js";

export function HistorySection({ history }) {
  const historyList = createHistoryList(history);
  if (!historyList) return <NoHistoryList />;
  if (historyList) return <HistoryList {...{ historyList }} />;
}
