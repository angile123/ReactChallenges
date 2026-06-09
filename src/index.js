// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Timer from "./Chrono/Timer.js";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<Timer />);
