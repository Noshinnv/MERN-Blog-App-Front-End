import "./blogFunction.css";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import OptionalTags from "../../Components/OptionalTags/OptionalTag";

const BlogFunction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        image: null,
        title: "",
        content: "",
        tags: []
    });

    const onInput = (e, name) => {
        setBlog({ ...blog, [name]: e.target.value });
    };

    const onImageChange = (e) => {
        setBlog({ ...blog, image: e.target.files[0] });
    };

    const handleTagsChange = (tags) => {
        setBlog({ ...blog, tags });
        console.log("Updated blog data:", blog);
    };

    const addBlog = async () => {
        try {
            const formData = new FormData();
            formData.append("title", blog.title);
            formData.append("image", blog.image);
            formData.append("content", blog.content);
            formData.append("tags", JSON.stringify(blog.tags));

            const response = await axios.post("http://localhost:6767/api/blog/create", formData, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            });

            navigate("/myBlogs");
            setBlog({
                title: "",
                image: null,
                content: "",
                tags: []
            });
        } catch (error) {
            console.log(error);
        }
    };

    const editBlog = async () => {
        try {
            const response = await axios.put(`http://localhost:6767/api/blog/editBlog/${id}`, blog, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            setBlog(response.data);
            setBlog({
                title: "",
                content: "",
                image: null,
                tags: []
            });

            navigate("/myBlogs");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="main">
            <div className="add-blog">
                <TextField
                    id="filled-basic"
                    label="Title"
                    variant="filled"
                    onChange={(e) => onInput(e, "title")}
                    value={blog.title}
                    color='success'
                />
                <TextField
                    id="filled-basic"
                    label="Content"
                    variant="filled"
                    onChange={(e) => onInput(e, "content")}
                    value={blog.content}
                    color='success'
                />
                <input type="file" onChange={onImageChange} />
                <OptionalTags
                    tags={blog.tags}
                    handleTagsChange={handleTagsChange}
                />
                <Button
                    variant="contained"
                    color='success'
                    onClick={id ? editBlog : addBlog}
                >
                    {id ? "Edit blog" : "Post blog"}
                </Button>
            </div>
        </div>
    );
};

export default BlogFunction;
