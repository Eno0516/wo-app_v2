import { useNavigate } from "react-router-dom"
import FarmLinkButton from "../../FarmLinkButton/FarmLinkButton.tsx"
import AddFarmButton from "./AddFarmButton"
import { apiClient } from "../../../../../api/client"
import { useLocation } from "react-router-dom"
import { useState,useEffect } from "react"


type RegisteredFarm = {
    farmName:string,
    farmUuid:string
}

function ManageFarmArea () {
    const navigate = useNavigate()
    // 登録済みの畑名とidを取得して配列として保持
    // クエリパラメータからgroupUuidを取得
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const groupUuid = params.get("groupUuid"); 
    const [registeredFarms,setRegisteredFarms] = useState<RegisteredFarm[]>([])
    // userIDから登録圃場一覧情報を取得
    useEffect(()=>{
        const handleFarm = async () => {
        if(!groupUuid){
            return
        }
        try {
            const farmsRes = await apiClient.getGroupsManageFarms(groupUuid)
            const registeredFarmArray = farmsRes.map((farm)=>{
                return {
                    farmName: farm.farmName,
                    farmUuid: farm.farmUuid
                }
            })
            setRegisteredFarms(registeredFarmArray)
        } catch(err) {
            console.error("Get Farms failed",err)
        }
    }
    handleFarm()
    },[])
    
    // 畑が未登録かどうか
    const isRegisteredFarm = registeredFarms.length !== 0
    // リンク押下で畑管理ページへ移動
    const navigateFarmPage = (result:string) => {
        navigate(`/manageFarm?farmUUID=${result}`)
    }
    return (
        <div style={{ padding: "16px" }}>
            <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "12px",
            }}
            >
                <AddFarmButton 
                    mode="add"
                />
            </div>
            {isRegisteredFarm && 
            <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                maxWidth: "500px",
                minWidth: "250px"
            }}
            >
                { registeredFarms.map((farm)=>(
                    <FarmLinkButton
                    key={farm.farmUuid}
                    title={farm.farmName}
                    uuid={farm.farmUuid}
                    onClickLink={()=>navigateFarmPage(farm.farmUuid)}
                     />
                ))}
            </div>
}
        </div>
    )
}

export default ManageFarmArea