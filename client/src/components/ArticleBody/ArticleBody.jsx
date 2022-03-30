import React from "react";
import "./articleBody.css";

const ArticleBody = ({ title, content, images }) => {
    return (
        <div className="article-body">
            <div className="title">{title}</div>
            <p className="content">{content}</p>
        </div>
    );
};

export default ArticleBody;
