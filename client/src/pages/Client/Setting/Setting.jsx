import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAlert } from "react-alert";
import { Context } from "../../../context/Context";
import "./setting.css";
import axios from "axios";

const Setting = () => {
    const { user } = useContext(Context);
    const alert = useAlert();

    const [profilePicture, setProfilePicture] = useState(user.profilePicture);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("profilePicture", profilePicture);
        data.append("username", username);
        data.append("email", email);
        data.append("userId", user._id);

        try {
            const res = await axios.put(`/user/${user._id}`, data, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            alert.success(res.data.message);
        } catch (err) {
            alert.error(err.response.data.message);
        }
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
                            src={`${process.env.REACT_APP_IMAGE_PATH}${user.profilePicture}`}
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
                            onChange={(e) =>
                                setProfilePicture(e.target.files[0])
                            }
                            className="setting-profile-picture-input"
                        />
                    </div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder={`${user.username}`}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder={`${user.email}`}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        disabled
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
