import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Client/Footer/Footer";
import Topbar from "./components/Client/Topbar/Topbar";
import { Context } from "./context/Context";
// import ToTop from "./components/ToTop/ToTop";
import Article from "./pages/Client/Article/Article";
import Home from "./pages/Client/Home/Home";
import Login from "./pages/Client/Login/Login";
import Setting from "./pages/Client/Setting/Setting";
import SignUp from "./pages/Client/SignUp/SignUp";
import Write from "./pages/Client/Write/Write";

function App() {
    const { user } = useContext(Context);

    return (
        <React.Fragment>
            <Topbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/signup">{user ? <Home /> : <SignUp />}</Route>
                <Route path="/login">{user ? <Home /> : <Login />}</Route>
                <Route path="/article/:articleId">
                    <Article />
                </Route>
                <Route path="/write">{user ? <Write /> : <Login />}</Route>
                <Route path="/setting">{user ? <Setting /> : <Login />}</Route>
            </Switch>
            {/* <ToTop /> */}
            <Footer />
        </React.Fragment>
    );
}

export default App;
