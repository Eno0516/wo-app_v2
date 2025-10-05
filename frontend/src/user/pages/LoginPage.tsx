import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        const navigate = useNavigate()
        // ログインリクエスト
        const res = await
        if (res.ok) {
            const data = await res.json()
            localStorage.setItem("token",data.token)
            navigate("/memberPage")
        } else {
            navigate("/")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>ログイン</h1>
            <input
                placeholder="ユーザー名"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button type="submit">ログイン</button>
        </form>
    )
}

export default LoginPage;