import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <DarkModeContextProvider>
            <App />
        </DarkModeContextProvider>
    </React.StrictMode>
);
