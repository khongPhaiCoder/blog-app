import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Topbar from "./components/Topbar/Topbar";
// import ToTop from "./components/ToTop/ToTop";
import Article from "./pages/Article/Article";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Setting from "./pages/Setting/Setting";
import SignUp from "./pages/SignUp/SignUp";
import Write from "./pages/Write/Write";

function App() {
    return (
        <React.Fragment>
            <Topbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/article/:articleId">
                    <Article />
                </Route>
                <Route path="/write">
                    <Write />
                </Route>
                <Route path="/setting">
                    <Setting />
                </Route>
            </Switch>
            {/* <ToTop /> */}
            <Footer />
        </React.Fragment>
    );
}

export default App;
