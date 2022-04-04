import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { format } from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./articleTop.css";

const ArticleTop = ({ author, date, likes, dislikes, views, comments }) => {
    return (
        <div className="article-top">
            <div className="article-top-left">
                <div className="avatar">
                    <Image
                        src="https://m.media-amazon.com/images/I/41rFcx-S+8L._AC_SY450_.jpg"
                        roundedCircle
                        width={50}
                        height={50}
                    />
                </div>
                <div className="author-info">
                    <Link to="/" className="author-name">
                        <p>{author.username}</p>
                    </Link>
                    <p className="email">{author.email}</p>
                </div>
            </div>
            <div className="article-top-right">
                <p className="post-time">Posted {format(date)}</p>
                <div>
                    <span>
                        <FontAwesomeIcon icon={solid("eye")} className="icon" />{" "}
                        {views}
                    </span>
                    <span>
                        <FontAwesomeIcon
                            icon={solid("thumbs-up")}
                            className="icon"
                        />{" "}
                        {likes}
                    </span>
                    <span>
                        <FontAwesomeIcon
                            icon={solid("thumbs-down")}
                            className="icon"
                        />{" "}
                        {dislikes}
                    </span>
                    <span>
                        <FontAwesomeIcon
                            icon={solid("comment")}
                            className="icon"
                        />{" "}
                        {comments}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ArticleTop;
