import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', {username, password});
            localStorage.setItem("token", res.data.token);
            navigate("../notes");
            console.log("Login Successful")
        }
        catch (err) {
            alert("Error logging in: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <form style={{ margin: "1rem"}} onSubmit={handleLogin}>
            <h1>Login</h1>
            <label style={{ margin: "0.5rem"}} for="username">Username</label>
            <input style={{ marginBottom: "0.5rem"}} id="username" name="username" placeholder='Username' onChange={(e) => {setUsername(e.target.value)}}></input><br></br>
            <label style={{ margin: "0.5rem"}} for="password">Password</label>
            <input style={{ marginRight: "0.5rem"}} id="password" name="password" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}></input>
            <button type='submit' >Login</button>
        </form>
    );
};
