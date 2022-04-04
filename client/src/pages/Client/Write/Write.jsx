import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAlert } from "react-alert";
import { Context } from "../../../context/Context";
import "./write.css";
import axios from "axios";
import CategoryList from "../../../components/Client/CategoryList/CategoryList";

const Write = () => {
    const { user } = useContext(Context);
    const alert = useAlert();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState(null);
    const [categories, setCategories] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("author", user._id);
        data.append("title", title);
        data.append("content", content);
        data.append("userId", user._id);

        if (categories.length) {
            for (let i = 0; i < categories.length; ++i) {
                data.append(`categories[${i}]`, categories[i]);
            }
        }

        if (images) {
            for (let i = 0; i < images.length; ++i) {
                data.append(`postImages`, images[i]);
            }
        }

        try {
            const res = await axios.post("/post", data, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            alert.success(res.data.message);
            history.push("/");
        } catch (err) {
            err.response.data.data.map((item) =>
                alert.error(`${item.param} ${item.msg} ${item?.value}`)
            );
        }
    };

    return (
        <Container className="write">
            {images &&
                images.map((image) => (
                    <img
                        className="write-img"
                        src={URL.createObjectURL(image)}
                        alt=""
                        key={image.name}
                    />
                ))}
            <form onSubmit={onSubmitHandler} className="write-form">
                <div className="write-form-group">
                    <label htmlFor="file-input">
                        <FontAwesomeIcon
                            icon={solid("plus")}
                            className="write-icon"
                        />
                    </label>
                    <input
                        type="file"
                        multiple
                        id="file-input"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            setImages(Array.from(e.target.files));
                        }}
                    />
                    <input
                        type="text"
                        className="write-input"
                        placeholder="Title"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="write-form-group">
                    <textarea
                        className="write-input write-text"
                        placeholder="Write your article..."
                        autoFocus={true}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <CategoryList onCategoriesChange={setCategories} />
                <button type="submit" className="write-submit">
                    Publish
                </button>
            </form>
        </Container>
    );
};

export default Write;
