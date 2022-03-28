import React from "react";
import { Dropdown, Nav, Image } from "react-bootstrap";

const Setting = () => {
    const MobileSetting = () => {
        return (
            <Nav className="me-auto my-2 mb-lg-0 mobile-setting">
                <Nav.Link href="/" className="nav-item">
                    Profile
                </Nav.Link>
                <Nav.Link href="/" className="nav-item">
                    Settings
                </Nav.Link>
                <Nav.Link href="/" className="nav-item">
                    Logout
                </Nav.Link>
            </Nav>
        );
    };

    const LargeScreenSetting = () => {
        return (
            <Dropdown className="large-screen-setting">
                <Dropdown.Toggle variant="light" className="toggle-icon">
                    <Image
                        roundedCircle
                        width="36"
                        height="36"
                        src="https://media.dayoftheshirt.com/images/shirts/LE9Fb/teepublic_black-cat-and-knife-what-shirt-teepublic_1571926081.large.png"
                    />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/">Profile</Dropdown.Item>
                    <Dropdown.Item href="/">Settings</Dropdown.Item>
                    <Dropdown.Item href="/">Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    return (
        <React.Fragment>
            <MobileSetting />
            <LargeScreenSetting />
        </React.Fragment>
    );
};

export default Setting;
