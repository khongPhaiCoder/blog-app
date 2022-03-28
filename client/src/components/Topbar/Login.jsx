import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <div className="d-grid gap-2 require-login__container">
            <Link to="/login" type="button" className="btn btn-outline-success">
                Log In
            </Link>
            <Link
                to="/signup"
                type="button"
                className="btn btn-outline-success"
            >
                Sign Up
            </Link>
        </div>
    );
};
