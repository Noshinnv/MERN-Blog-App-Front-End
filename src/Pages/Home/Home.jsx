import "./home.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);
    const [comment, setComment] = useState({});
    const [showComments, setShowComments] = useState({});
    const [user, setUser] = useState([])

    const onInput = (e, id) => {
        setComment(prev => ({
            ...prev,
            [id]: e.target.value
        }));
    };

    const getBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:6767/api/blog/getBlogs", {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (e) {
            console.error("Error fetching blogs:", e);
        }
    };

    const addComment = async (id) => {
        try {
            await axios.post(
                `http://localhost:6767/api/blog/addComment/${id}`,
                { content: comment[id] },
                {
                    withCredentials: true,
                    headers: { Authorization: localStorage.getItem("token") },
                }
            );
            setComment(prev => ({
                ...prev,
                [id]: ""
            }));
            getBlogs();
        } catch (e) {
            console.error("Error adding comment:", e);
        }
    };

    const handleToggleComments = (id) => {
        setShowComments(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const getUser = async () => {
        try {
            const responce = await axios.get("http://localhost:6767/api/user/getUser", {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            console.log(responce);
            setUser(responce.data.data)
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getBlogs();
    }, []);
    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <ul className="blog-main">
                {data.map((item) => (
                    <li className="card" key={item._id}>
                        <img src={`http://localhost:6767/images/${item.coverImage}`} alt="Cover" crossOrigin="anonymous" className="featured-image" />
                        <article className="card-body">
                            <header>
                                <a href="#!">
                                    <div className="title">
                                        <h3>{item.title}</h3>
                                    </div>
                                    <p className="meta">
                                        <span className="author">{item.content}</span>
                                    </p>
                                    <p className="meta">
                                        Tags:
                                        {
                                            item.tags.map((tag, i) => (
                                                <p className="chip">{tag}</p>
                                            ))
                                        }
                                    </p>
                                </a>
                                <div className="chips">
                                    <input
                                        type="text"
                                        placeholder="comment"
                                        value={comment[item._id] || ""}
                                        onChange={(e) => onInput(e, item._id)}
                                    />
                                    <button
                                        className="chip"
                                        onClick={() => addComment(item._id)}
                                    >
                                        Comment
                                    </button>
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
                                            user && item.comments.map((comment, index) => (
                                                <div key={index} className="comment">
                                                    <p style={{ "color": "black" }}> {user.username}:{comment.content}</p>
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
    );
}

export default Home;
