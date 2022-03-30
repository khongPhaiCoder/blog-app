import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./toTop.css";

const ToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    window.addEventListener("scroll", toggleVisible);

    return (
        <button
            className="to-top-arrow"
            style={{ display: visible ? "inline" : "none" }}
            onClick={scrollToTop}
        >
            <FontAwesomeIcon icon={solid("circle-arrow-up")} size="2x" />
        </button>
    );
};

export default ToTop;
