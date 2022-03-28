import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Topbar = () => {
    return (
        <Navbar fixed="top" bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Blog app</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Topbar;
