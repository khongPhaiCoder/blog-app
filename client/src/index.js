import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { ContextProvider } from "./context/Context";
import "./index.css";
import App from "./App";

axios.defaults.baseURL = "http://localhost:8080/api";

const options = {
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    offset: "30px",
    transition: transitions.SCALE,
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AlertProvider template={AlertTemplate} {...options}>
                <ContextProvider>
                    <App />
                </ContextProvider>
            </AlertProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
