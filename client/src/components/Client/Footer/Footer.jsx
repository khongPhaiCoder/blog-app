import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <Container fluid>
                <Link to="/" className="brand">
                    Blog app
                </Link>
                <div className="social">
                    <FontAwesomeIcon
                        icon={brands("facebook")}
                        size="2x"
                        className="icon facebook"
                    />
                    <FontAwesomeIcon
                        icon={brands("youtube")}
                        size="2x"
                        className="icon youtube"
                    />
                    <FontAwesomeIcon
                        icon={brands("github")}
                        size="2x"
                        className="icon github"
                    />
                    <FontAwesomeIcon
                        icon={brands("skype")}
                        size="2x"
                        className="icon skype"
                    />
                </div>
            </Container>
        </div>
    );
};

export default Footer;
