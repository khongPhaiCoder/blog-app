import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from "axios";
import { Container } from "react-bootstrap";
import ArticleBar from "../../../components/Client/ArticleBar/ArticleBar";
import ArticleBody from "../../../components/Client/ArticleBody/ArticleBody";
import ArticleTop from "../../../components/Client/ArticleTop/ArticleTop";
import "./article.css";
import Comments from "../../../components/Client/Comments/Comments";

const Article = () => {
    const [post, setPost] = useState(null);
    const alert = useAlert();
    const { articleId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/post/${articleId}`);
                setPost(res.data.post);
                console.log(res.data.post);
            } catch (err) {
                alert.error(err.response.data.message);
            }
        };
        fetchPost();
    }, []);

    const Loading = () => {
        return <p>Loading...</p>;
    };

    const Post = () => {
        return (
            <Container className="article">
                <ArticleBar
                    likes={post.likes}
                    dislikes={post.dislike}
                    postId={articleId}
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
                    {post.images.map((image) => (
                        <img
                            className="write-img"
                            src={`${process.env.REACT_APP_IMAGE_PATH}${image}`}
                            alt=""
                            key={image}
                        />
                    ))}
                    <ArticleBody
                        title={post.title}
                        content={post.content}
                        images={post.images}
                    />
                    <Comments comments={post.comments} postId={articleId} />
                </div>
            </Container>
        );
    };

    return post ? Post() : Loading();
};

export default Article;
