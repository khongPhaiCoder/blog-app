import React from "react";
import { authors } from "../../DummyData";
import Author from "../Author/Author";
import "./authorList.css";

const AuthorList = () => {
    return (
        <div>
            <h4 className="ms-2 mt-1">Top authors</h4>
            {authors.map((author) => {
                return <Author author={author} />;
            })}
        </div>
    );
};

export default AuthorList;
