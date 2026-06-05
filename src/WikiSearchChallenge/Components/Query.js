import { createSearchList } from "../WikiUtils";
import { DisplayData, LoadingState, ErrorState, NoQuery } from "./index";

export function QuerySection({ apiState }) {
  const dataState = !!apiState.data;
  const errorState = !!apiState.error;
  const loadingState = !!apiState.loading;
  const noData = !dataState && !errorState && !loadingState;

  const searchList = createSearchList(apiState.data);
  const errMsg = apiState.error;

  if (noData) return <NoQuery />;
  if (dataState) return <DisplayData {...{ searchList }} />;
  if (errorState) return <ErrorState {...{ errMsg }} />;
  if (loadingState) return <LoadingState />;
}
