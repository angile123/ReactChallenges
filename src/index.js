// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import WikiSearch from "./WikiSearchChallenge/Wiki.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<WikiSearch />);
