import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import ArticleList from "../../components/ArticleList/ArticleList";
import InterestArticleList from "../../components/InterestActicleList/InterestArticleList";
import Pagination from "../../components/Pagination/Pagination";
import { Container } from "react-bootstrap";
import "./home.css";
import AuthorList from "../../components/AuthorList/AuthorList";
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const alert = useAlert();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get("/post");
                setPosts(res.data.posts);
            } catch (err) {
                alert.error(err.response.data.message);
            }
        };
        fetchPost();
    }, []);

    return (
        <Container fluid className="home">
            <div className="left">
                <ArticleList posts={posts} />
                <Pagination />
            </div>
            <div className="right">
                <InterestArticleList posts={posts.slice(0, 5)} />
                <AuthorList />
            </div>
        </Container>
    );
};

export default Home;
