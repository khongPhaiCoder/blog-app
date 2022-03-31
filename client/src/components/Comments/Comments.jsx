import React, { useContext, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { format } from "timeago.js";
import { Context } from "../../context/Context";
import "./comments.css";
import { useAlert } from "react-alert";

const Comment = ({ cmt, userId, token }) => {
    const history = useHistory();
    const alert = useAlert();

    const onReactHandler = async (react) => {
        try {
            await axios.post(
                `/comment/${cmt._id}/react?react=${react}`,
                {
                    userId: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            history.go(0);
        } catch (err) {
            alert.error(err.response.data.message);
        }
    };

    return (
        <Container className="cmt">
            <Image
                src={`${process.env.REACT_APP_IMAGE_PATH}${cmt.author.profilePicture}`}
                roundedCircle
                width={48}
                height={48}
            />
            <div className="cmt-right">
                <div className="cmt-top">
                    <Link to={"#"} className="cmt-author">
                        {cmt.author.username}
                    </Link>
                    <span>{format(cmt.updatedAt)}</span>
                </div>
                <div className="cmt-content">{cmt.content}</div>
                <div className="cmt-bottom">
                    <span>
                        <FontAwesomeIcon
                            icon={solid("thumbs-up")}
                            className="icon"
                            onClick={() => onReactHandler("like")}
                            style={{
                                color: cmt.like.includes(userId)
                                    ? "yellowgreen"
                                    : "inherit",
                            }}
                        />{" "}
                        {cmt.like.length}
                    </span>
                    <span>
                        <FontAwesomeIcon
                            icon={solid("thumbs-down")}
                            className="icon"
                            onClick={() => onReactHandler("dislike")}
                            style={{
                                color: cmt.dislike.includes(userId)
                                    ? "red"
                                    : "inherit",
                            }}
                        />{" "}
                        {cmt.dislike.length}
                    </span>
                </div>
            </div>
        </Container>
    );
};

const Comments = ({ comments, postId }) => {
    const { user } = useContext(Context);
    const [comment, setComment] = useState("");
    const history = useHistory();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "/comment",
                {
                    author: user._id,
                    post: postId,
                    content: comment,
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
            console.log(err);
        }
    };

    return (
        <Container className="comments">
            {user ? (
                <form onSubmit={onSubmitHandler} className="write-comment">
                    <textarea
                        className="form-control"
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write something..."
                    ></textarea>
                    <button type="submit" className="btn btn-success">
                        Comment
                    </button>
                </form>
            ) : (
                <Container fluid className="mb-4">
                    <Link
                        to="/login"
                        className="btn btn-outline-success login-btn"
                    >
                        Login to comment
                    </Link>
                </Container>
            )}
            {comments.map((item) => (
                <Comment
                    cmt={item}
                    key={item._id}
                    userId={user._id}
                    token={user.token}
                />
            ))}
        </Container>
    );
};

export default Comments;
