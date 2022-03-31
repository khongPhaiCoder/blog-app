import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import "./categoryList.css";

const CategoryList = ({ onCategoriesChange }) => {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState({});

    const { user } = useContext(Context);

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await axios.get("/category", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: {
                    userId: user._id,
                },
            });
            setCategoryList(res.data.categories);
        };
        fetchCategory();
    }, [user._id, user.token]);

    const onCheckedHandler = (e) => {
        setSelectedCategories({
            ...selectedCategories,
            [e.target.value]: !selectedCategories[e.target.value],
        });
    };

    useEffect(() => {
        onCategoriesChange(
            Object.keys(selectedCategories).filter(
                (key) => selectedCategories[key] === true
            )
        );
    }, [onCategoriesChange, selectedCategories]);

    return (
        <div className="category-list">
            {categoryList.map((item) => (
                <div key={item._id}>
                    <input
                        type="checkbox"
                        className="btn-check"
                        id={`${item._id}`}
                        autoComplete="off"
                        value={item._id}
                        onChange={onCheckedHandler}
                    />
                    <label
                        className="btn btn-outline-success"
                        htmlFor={`${item._id}`}
                    >
                        {item.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
