import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
    return (
        <div className="login__container">
            <form className="login__form">
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
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter password"
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
                <p className="text-end forgot-password">
                    <Link to="#">Forgot password ?</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
