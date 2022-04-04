import React from "react";
import ShortArticle from "../ShortArticle/ShortArticle";
import "./interestArticleList.css";

const InterestArticleList = ({ posts }) => {
    return (
        <div className="interest-article-list">
            <h4 className="ms-2 mt-1">Articles of interest</h4>
            {posts.map((item) => {
                return <ShortArticle article={item} key={item._id} />;
            })}
        </div>
    );
};

export default InterestArticleList;
