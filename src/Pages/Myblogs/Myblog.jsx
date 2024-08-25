import * as React from 'react';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

const MyBlogs = () => {
    const [data, setData] = useState([]);
    const [showComments, setShowComments] = useState({});

    const getBlogsByUser = async () => {
        try {
            const responce = await axios.get("http://localhost:6767/api/blog/getBlogById", {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            // console.log(responce);
            setData(responce.data.data)
        }
        catch (e) {
            console.log(e);
        }
    }
    console.log(data);
    const onDeleteClick = async (id) => {
        try {
            const responce = await axios.delete(`http://localhost:6767/api/blog/deleteBlog/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            getBlogsByUser();
        }
        catch (e) {
            console.log(e);
        }
    }
    const handleToggleComments = (id) => {
        setShowComments(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    useEffect(() => { getBlogsByUser() }, []);
    return <>

        <ul>
            {data.map((item) => (
                <li className="card">

                    <img src={`http://localhost:6767/images/${item.coverImage}`} alt="no image" crossOrigin="anonymous" className="featured-image" />
                    <article className="card-body">
                        <header>
                            <a href="utilidata-national-governors-association-meeting">
                                <span className="pre-heading"></span>
                                <div className="title">
                                    <h3>{item.title}</h3>
                                </div>
                                <p className="meta">
                                    <span className="author">{item.content}</span>
                                    <span> | </span>
                                </p>
                                <p className="meta">
                                        Tags:
                                        {
                                            item.tags.map((tag,i) => (
                                                <p className="chip">{tag}</p>
                                            ))
                                        }
                                    </p>
                            </a>
                            <div className="chips">
                            <NavLink to={`/addBlog/${item._id}`} className="chip">Edit</NavLink>
                            <Button variant="text" color="error" onClick={() => { onDeleteClick(item._id) }}>Delete blog</Button>
                        </div>
                        </header>
                        <div>
                                <button
                                    className="chip"
                                    onClick={() => handleToggleComments(item._id)}
                                >
                                    {showComments[item._id] ? "Hide Comments" : "Show Comments"}
                                </button>

                                {showComments[item._id] && (
                                    <div className="comments-box">
                                        {item.comments && item.comments.length > 0 ? (
                                            item.comments.map((comment, index) => (
                                                <div key={index} className="comment">
                                                    <p style={{ "color": "black" }}> {comment.content}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No comments yet</p>
                                        )}
                                    </div>
                                )}
                            </div>
                    </article>
                </li>
            ))}
        </ul>
    </>
}
export default MyBlogs;