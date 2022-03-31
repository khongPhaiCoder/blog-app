import React from "react";
import { Container, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { format } from "timeago.js";
import "./shortArticle.css";
import { Link } from "react-router-dom";

const ShortArticle = ({ article, infoTop }) => {
    return (
        <React.Fragment>
            <div className="short-article">
                {infoTop && (
                    <div className="avatar">
                        <Image
                            src="https://m.media-amazon.com/images/I/41rFcx-S+8L._AC_SY450_.jpg"
                            roundedCircle
                            width={50}
                            height="50"
                        />
                    </div>
                )}
                <Container fluid>
                    {infoTop && (
                        <div className="info-top">
                            <Link to="/" className="author">
                                {article.author.username}
                            </Link>
                            <p>{format(article.updatedAt)}</p>
                            {article.categories.map((item) => {
                                return (
                                    <div
                                        className="category-item"
                                        key={item._id}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <Link
                        to={`/article/${article._id}`}
                        className="article-title"
                    >
                        {article.title}
                    </Link>
                    <div className="info-bottom">
                        <FontAwesomeIcon
                            icon={solid("sort")}
                            size="xs"
                            className="icon"
                        />
                        {article.likes.length - article.dislike.length}
                        <FontAwesomeIcon
                            icon={solid("eye")}
                            size="xs"
                            className="icon"
                        />
                        {article.views}
                        <FontAwesomeIcon
                            icon={solid("comment")}
                            size="xs"
                            className="icon"
                        />
                        {article.comments.length}
                    </div>
                    {!infoTop && (
                        <p className="author">{article.author.username}</p>
                    )}
                </Container>
            </div>
            <div className="line"></div>
        </React.Fragment>
    );
};

export default ShortArticle;
