import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const DATA = [
  { id: "todo0", name: "eat", completed: true },
  { id: "todo1", name: "sleep", completed: false },
  { id: "todo2", name: "homework", completed: false },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>
);
