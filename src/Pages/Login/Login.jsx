import React, { useState } from 'react';
import "./login.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';


const LoginForm = () => {
    const Navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const onInput = (e, name) => {
        setData({ ...data, [name]: e.target.value })
        // console.log([name], e.target.value);
    }
    const toLogin = async () => {
        try {
            const responce = await axios.post("http://localhost:6767/api/log/login", data)
            Navigate("/")
            console.log("success");
            console.log(responce);
            localStorage.setItem("token", responce.data.token)
            setData({
                username: "",
                password: "",
            })
        } catch (error) {
            console.log(error);
        }
    }
    const signupBtn = () => {
        Navigate("/signup")
    }
    return <>
        <div class="login-box">
            <h2> Login</h2>
            <form>
                <div class="user-box">
                    <input type="text" name="" required="" onChange={(e) => { onInput(e, "username") }} value={data.username} />
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required="" onChange={(e) => { onInput(e, "password") }} value={data.password} />
                    <label>Password</label>
                </div>
                <div class="user-box">
                    <Button variant="contained" color='success' onClick={toLogin}>Login</Button>
                    {/* <Button variant="contained" color='success' onClick={signupBtn}>Sign up</Button> */}
                    <p>Don't have an account?</p>
                    <p className='link' onClick={signupBtn}>Sign up</p>
                </div>
            </form>
        </div>
    </>;
};

export default LoginForm;