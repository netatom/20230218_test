import React, { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn }) {
    const [form, setForm] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        // console.log(e)
        e.preventDefault();
        try {
            // console.log(form)
            const res = await axios.post('http://localhost:3040/api/login', form);
            sessionStorage.setItem('token', res.data.token);
            setIsLoggedIn(true);
        } catch {
            alert("Login fail");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input name="username" placeholder="사용자이름" onChange={handleChange} />
            <input name="password" placeholder="비밀번호" type="password" onChange={handleChange} />
            <button type="submit">로그인</button>
        </form>
    )
}

export default Login;