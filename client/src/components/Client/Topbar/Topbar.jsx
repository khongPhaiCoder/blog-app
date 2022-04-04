import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./topbar.css";
import { Login } from "./Login";
import Setting from "./Setting";
import { Context } from "../../../context/Context";

const Topbar = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    const { user } = useContext(Context);

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Blog app</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="me-auto my-2 mb-lg-0">
                        <Nav.Link href="/" className="nav-item">
                            Article
                        </Nav.Link>
                        <Nav.Link href="/" className="nav-item">
                            Q &#38; A
                        </Nav.Link>
                        <Nav.Link href="/" className="nav-item">
                            Discussion
                        </Nav.Link>
                        <Nav.Link href="/write" className="nav-item">
                            Write
                        </Nav.Link>
                    </Nav>
                    <form className="d-flex search" onSubmit={onSubmitHandler}>
                        <input
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            className="form-control"
                        />
                        <button type="submit" className="btn btn-success">
                            Search
                        </button>
                    </form>
                    <hr />
                    {user ? (
                        <Setting avatar={user.profilePicture} />
                    ) : (
                        <Login />
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Topbar;
