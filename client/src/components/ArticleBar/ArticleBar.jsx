import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./articleBar.css";

const ArticleBar = ({ likes, dislikes }) => {
    return (
        <Container fluid className="article-bar">
            <Container>
                <div className="article-bar-left">
                    <Link to="/">
                        <Image
                            src="https://m.media-amazon.com/images/I/41rFcx-S+8L._AC_SY450_.jpg"
                            roundedCircle
                            width={50}
                            height="50"
                        />
                    </Link>
                    <div className="article-bar-react">
                        <FontAwesomeIcon
                            icon={solid("arrow-up")}
                            className="icon"
                        />
                        <p>{likes - dislikes}</p>
                        <FontAwesomeIcon
                            icon={solid("arrow-down")}
                            className="icon"
                        />
                    </div>
                    <FontAwesomeIcon
                        icon={brands("facebook-f")}
                        className="icon facebook"
                    />
                </div>
            </Container>
        </Container>
    );
};

export default ArticleBar;
