import React from "react";
import ShortArticle from "../ShortArticle/ShortArticle";
import "./articleList.css";

const ArticleList = ({ posts }) => {
    return (
        <div className="article-list">
            {posts.map((item) => {
                return (
                    <ShortArticle
                        article={item}
                        infoTop={true}
                        key={item._id}
                    />
                );
            })}
        </div>
    );
};

export default ArticleList;
