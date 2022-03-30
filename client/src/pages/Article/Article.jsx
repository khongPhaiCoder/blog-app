import React from "react";
import { Container } from "react-bootstrap";
import ArticleBar from "../../components/ArticleBar/ArticleBar";
import ArticleBody from "../../components/ArticleBody/ArticleBody";
import ArticleTop from "../../components/ArticleTop/ArticleTop";
import { post } from "../../DummyData";
import "./article.css";

const Article = () => {
    return (
        <Container className="article">
            <ArticleBar
                likes={post.likes.length}
                dislikes={post.dislike.length}
            />
            <div className="article-info">
                <ArticleTop
                    author={post.author}
                    date={post.date}
                    likes={post.likes.length}
                    dislikes={post.dislike.length}
                    views={post.views}
                    comments={post.comments.length}
                />
                <ArticleBody
                    title={post.title}
                    content={post.content}
                    images={post.images}
                />
            </div>
        </Container>
    );
};

export default Article;
