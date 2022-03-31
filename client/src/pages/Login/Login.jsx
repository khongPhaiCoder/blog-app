import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Context } from "../../context/Context";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch, isFetching } = useContext(Context);

    const alert = useAlert();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("/auth/login", {
                email: email,
                password: password,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            alert.error(err.response.data.message);
        }
    };

    return (
        <div className="login__container">
            <form className="login__form" onSubmit={onSubmitHandler}>
                <h3 className="text-center mb-3">Login</h3>
                <div className="form-group mb-2">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        min="6"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMeCheckbox"
                    />
                    <label
                        htmlFor="rememberMeCheckbox"
                        className="form-check-label"
                    >
                        Remember me
                    </label>
                </div>
                <div className="d-grid gap-2 mb-2">
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
                <div className="d-flex justify-content-between other-option">
                    <p>
                        <Link to="/signup">Create new account</Link>
                    </p>
                    <p>
                        <Link to="#">Forgot password ?</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
