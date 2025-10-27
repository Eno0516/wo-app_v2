import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/client"; 
import { type LoginOrder } from "../../generated/api/models/LoginOrder";

function LoginPage() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // ログインリクエスト
        const requestBody:LoginOrder = {
            id: userName,
            password: password
        }
        console.log("req",requestBody)
        try {
            const res = await apiClient.postLogin(requestBody)
            console.log("res",res)
            if (res.uuid) {
                const uuid = res.uuid
                navigate(`/memberPage?uuid=${uuid}`)
            } else {
                throw new Error ()
            }
        } catch (err) {
            console.error("login failed",err)
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