import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultService } from "../../generated/api";
import { type LoginOrder } from "../../generated/api/models/LoginOrder";

function LoginPage() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        // ログインリクエスト
        const requestBody:LoginOrder = {
            id: 1,
            password: "secret"
        }
        const res = await DefaultService.postLogin(requestBody)
        if (res.id) {
            localStorage.setItem("id",String(res.id))
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