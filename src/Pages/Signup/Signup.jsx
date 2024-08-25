import "./signup.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import * as React from 'react';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const SignupForm = () => {
    const Navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        email:"",
        password: "",
        confirmPassword:"",
    });
    const onInput = (e, name) => {
        setData({ ...data, [name]: e.target.value })
        // console.log([name], e.target.value);
    }
    const toSignup = async () => {
        try {
            const responce = await axios.post("http://localhost:6767/api/user/create", data)
            console.log("success");
            console.log(responce);
                Navigate("/login")
                setData({
                    username: "",
                    email:"",
                    password: "",
                    confirmPassword:"",
                })

        } catch (error) {
            console.log(error);
        }
    }
    const loginBtn =()=>{
        Navigate("/login")
    }
    return <>
        <div class="login-box">
            <h2>Sign up</h2>
            <form>
                <div class="user-box">
                    <input type="text" name="" required="" onChange={(e) => { onInput(e, "username") }} value={data.username} />
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="email" name="" required="" onChange={(e) => { onInput(e, "email") }} value={data.email} />
                    <label>E mail</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required="" onChange={(e) => { onInput(e, "password") }} value={data.password} />
                    <label>Password</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required="" onChange={(e) => { onInput(e, "confirmPassword") }} value={data.confirmPassword} />
                    <label>Confirm password</label>
                </div>
                <div class="user-box">
                    <Button variant="contained" color='success' onClick={toSignup}>Sign up</Button>
                    {/* <Button variant="contained" color='success' onClick={loginBtn}>Login</Button> */}
                    <p>Already have an account?</p>
                    <p className='link' onClick={loginBtn}>Login</p>
                </div>
            </form>
        </div>
    </>;
};

export default SignupForm;