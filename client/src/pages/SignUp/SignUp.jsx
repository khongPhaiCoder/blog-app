import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signUp.css";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();

        console.log(username);
        console.log(email);
        console.log(password);
    };

    return (
        <div className="signup__container" onSubmit={onSubmitHandler}>
            <form className="signup__form">
                <h3 className="text-center mb-3">Sign up</h3>
                <div className="form-group mb-2">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
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
                <div className="d-grid gap-2 mt-4 mb-2">
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>
                <p className="text-end forgot-password">
                    Already have account ?{" "}
                    <Link to="/login" className="other-option">
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
