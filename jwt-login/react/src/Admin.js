import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Admin({ setIsLoggedIn }) {

    const [data, setData] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        // console.log(token)
        if (!token) return;

        // JWT 디코드에서 세션 만료시간 체크
        const decoded = jwtDecode(token);
        const exp = decoded.exp * 1000; // 초 -> 밀리초
        const now = Date.now();

        if (now >= exp) {
            handleLogout();
            return;
        }

        // 토큰 만료까지 남은 시간만큼 타이머 설정
        const timerId = setTimeout(() => {
            alert('세션이 만료되었습니다. 다시 로그인 해주세요');
            handleLogout();
        }, exp - now);

        axios.get('http://localhost:3040/api/protected', {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setData(res.data.message);
        }).catch(() => {
            alert('세션이 만료되었거나 오류입니다');
            handleLogout();
        });

        return () => {
            clearTimeout(timerId);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <div>
            <h2>Admin</h2>
            {data ? <p>{data}</p> : <p>Loading...</p>}
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    )
}

export default Admin;