import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./setting.css";

const Setting = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    };
    return (
        <Container className="setting">
            <div className="setting-wrapper">
                <div className="setting-title">
                    <span className="setting-title-update">
                        Update your account
                    </span>
                    <span className="setting-title-delete">
                        <FontAwesomeIcon icon={solid("trash-can")} /> Delete
                        your account
                    </span>
                </div>
                <form onSubmit={onSubmitHandler} className="setting-form">
                    <label>Profile Picture</label>
                    <div className="setting-profile-picture">
                        <img
                            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                        />
                        <label htmlFor="file-input">
                            <FontAwesomeIcon
                                icon={solid("user-circle")}
                                className="setting-profile-picture-icon"
                            />
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            style={{ display: "none" }}
                            className="setting-profile-picture-input"
                        />
                    </div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="username" />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="username@email.com"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                    <button type="submit" className="setting-submit-button">
                        Update
                    </button>
                </form>
            </div>
        </Container>
    );
};

export default Setting;
