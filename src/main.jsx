import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Timers } from "./Timers";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Timers />
  </StrictMode>
);