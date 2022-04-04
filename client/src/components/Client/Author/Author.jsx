import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./author.css";

const Author = ({ author }) => {
    return (
        <Container className="author">
            <Link to="/">
                <Image
                    src="https://m.media-amazon.com/images/I/41rFcx-S+8L._AC_SY450_.jpg"
                    roundedCircle
                    width="64"
                    height="64"
                />
            </Link>
            <div className="info">
                <Link to="/">{author.username}</Link>
                <p>
                    {author.email}{" "}
                    <span>
                        <FontAwesomeIcon icon={solid("pen")} size="xs" />{" "}
                        {author.numPosts}
                    </span>
                </p>
            </div>
        </Container>
    );
};

export default Author;
