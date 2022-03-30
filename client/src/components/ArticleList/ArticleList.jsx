import React from "react";
import { shortArticles } from "../../DummyData";
import ShortArticle from "../ShortArticle/ShortArticle";
import "./articleList.css";

const ArticleList = () => {
    return (
        <div className="article-list">
            {shortArticles.map((item) => {
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
