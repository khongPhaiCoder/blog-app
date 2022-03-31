import React, { useContext } from "react";
import axios from "axios";
import { Container, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./articleBar.css";
import { Context } from "../../context/Context";
import { useAlert } from "react-alert";

const ArticleBar = ({ likes, dislikes, postId }) => {
    const { user } = useContext(Context);
    const alert = useAlert();
    const history = useHistory();

    const onReactHandler = async (react) => {
        try {
            await axios.post(
                `/post/${postId}/react?react=${react}`,
                {
                    userId: user._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            history.go(0);
        } catch (err) {
            alert.error(err.response.data.message);
        }
    };

    return (
        <Container fluid className="article-bar">
            <Container>
                <div className="article-bar-left">
                    <Link to="/">
                        <Image
                            src={`${process.env.REACT_APP_IMAGE_PATH}${user.profilePicture}`}
                            roundedCircle
                            width={50}
                            height="50"
                        />
                    </Link>
                    <div className="article-bar-react">
                        <FontAwesomeIcon
                            icon={solid("arrow-up")}
                            className="icon"
                            onClick={() => onReactHandler("like")}
                            style={{
                                color: likes.includes(user._id)
                                    ? "yellowgreen"
                                    : "inherit",
                            }}
                        />
                        <p>{likes.length - dislikes.length}</p>
                        <FontAwesomeIcon
                            icon={solid("arrow-down")}
                            className="icon"
                            onClick={() => onReactHandler("dislike")}
                            style={{
                                color: dislikes.includes(user._id)
                                    ? "red"
                                    : "inherit",
                            }}
                        />
                    </div>
                    <FontAwesomeIcon
                        icon={brands("facebook-f")}
                        className="icon facebook"
                    />
                </div>
            </Container>
        </Container>
    );
};

export default ArticleBar;
