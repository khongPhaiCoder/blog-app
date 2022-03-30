import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./write.css";

const Write = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <Container className="write">
            <img
                className="write-img"
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
            />
            <form onSubmit={onSubmitHandler} className="write-form">
                <div className="write-form-group">
                    <label htmlFor="file-input">
                        <FontAwesomeIcon
                            icon={solid("plus")}
                            className="write-icon"
                        />
                    </label>
                    <input
                        type="file"
                        id="file-input"
                        style={{ display: "none" }}
                    />
                    <input
                        type="text"
                        className="write-input"
                        placeholder="Title"
                        autoFocus={true}
                    />
                </div>
                <div className="write-form-group">
                    <textarea
                        className="write-input write-text"
                        placeholder="Write your article..."
                        autoFocus={true}
                    ></textarea>
                </div>
                <button type="submit" className="write-submit">
                    Publish
                </button>
            </form>
        </Container>
    );
};

export default Write;
