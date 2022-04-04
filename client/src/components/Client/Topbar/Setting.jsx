import React, { useContext } from "react";
import { Dropdown, Nav, Image } from "react-bootstrap";
import { Context } from "../../../context/Context";

const Setting = ({ avatar }) => {
    const { dispatch } = useContext(Context);

    const onLogoutHandler = () => {
        dispatch({ type: "LOGOUT" });
    };

    const MobileSetting = () => {
        return (
            <Nav className="me-auto my-2 mb-lg-0 mobile-setting">
                <Nav.Link href="/" className="nav-item">
                    Settings
                </Nav.Link>
                <Nav.Link
                    href="/"
                    className="nav-item"
                    onClick={onLogoutHandler}
                >
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
                        src={`${process.env.REACT_APP_IMAGE_PATH}${avatar}`}
                    />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/setting">Settings</Dropdown.Item>
                    <Dropdown.Item href="/" onClick={onLogoutHandler}>
                        Logout
                    </Dropdown.Item>
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
