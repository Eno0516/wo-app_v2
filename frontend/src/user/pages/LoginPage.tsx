import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/client"; 
import { type LoginOrder } from "../../generated/api/models/LoginOrder";
 
function LoginPage() {
    const [userId, setUserId] = useState("")
    const [groupId,setGroupId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // ログインリクエスト
        const requestBody:LoginOrder = {
            userId: userId,
            groupId:groupId,
            password: password
        }
        try {
            const res = await apiClient.postLogin(requestBody)
            console.log("res",res)
            if (res.groupUuid) {
                const groupUuid = res.groupUuid
                navigate(`/memberPage?groupUuid=${groupUuid}`)
            } else {
                throw new Error ()
            }
        } catch (err) {
            console.error("login failed",err)
            navigate("/")
        }
    }

    return (
        <form onSubmit={handleSubmit}
        style=
        {{
            display: "flex", 
            flexDirection: "column", 
            gap: "12px",
        }}
        >
            <h1>ログイン</h1>
            <input
                placeholder="グループID"
                value={groupId}
                onChange={(e)=>setGroupId(e.target.value)}
            />
            <input
                placeholder="ユーザーID"
                value={userId}
                onChange={(e)=>setUserId(e.target.value)}
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