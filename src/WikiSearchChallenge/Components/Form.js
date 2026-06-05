import { useRef } from "react";
import { handleFormSubmission } from "../WikiUtils";

export function Form({ formHandlerArgs }) {
  const inputRef = useRef(null);
  const formArgs = { ...formHandlerArgs, inputRef };
  return (
    <form onSubmit={(e) => handleFormSubmission(e, formArgs)}>
      <input type="text" name={"text"} ref={inputRef} />
      <button>Submit</button>
    </form>
  );
}
