import React from "react";
import ArticleList from "../../components/ArticleList/ArticleList";
import InterestArticleList from "../../components/InterestActicleList/InterestArticleList";
import Pagination from "../../components/Pagination/Pagination";
import { Container } from "react-bootstrap";
import "./home.css";
import AuthorList from "../../components/AuthorList/AuthorList";

const Home = () => {
    return (
        <Container fluid className="home">
            <div className="left">
                <ArticleList />
                <Pagination />
            </div>
            <div className="right">
                <InterestArticleList />
                <AuthorList />
            </div>
        </Container>
    );
};

export default Home;
