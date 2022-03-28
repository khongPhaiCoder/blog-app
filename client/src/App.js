import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Topbar from "./components/Topbar";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
    return (
        <React.Fragment>
            {/* <Topbar /> */}
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default App;
