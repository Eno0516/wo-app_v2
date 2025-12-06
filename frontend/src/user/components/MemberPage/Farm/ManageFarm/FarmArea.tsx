// 畑管理ページの畑エリアを表示する
// ここで持っておくのは、畝数とそれぞれの畝id,畝幅
// ただ畝幅は畝によって変わる可能性あるから、畝側からも情報を得て、リアクティブに表示を変更

import { useState,useEffect } from "react"
import CreateFurrow from "../ManageFurrow/CreateFurrow"
import { apiClient } from "../../../../../api/client"
import AddFarmButton from "./AddFarmButton"

type FarmAreaProps = {
    farmUuid: string,
    farmManageUuid: string
}
type FurrowBasicInfo = {
    furrowNumber: number,
}
function FarmArea (props:FarmAreaProps) {
    const [furrowInfo,setFurrowInfo] = useState<FurrowBasicInfo>()
    // 畝数・畝幅を取得
    useEffect(()=>{
        const handleFurrowBasicInfo = async() =>{
        try {
            const res = await apiClient.getManageFarms1(props.farmUuid,props.farmManageUuid)
            setFurrowInfo(res)
        }catch(err){
            console.log(err)
        }
    }
    handleFurrowBasicInfo()
    },[])
    console.log("furrowInfo",furrowInfo)
    return (
        <>
            <AddFarmButton
            mode="edit"
            farmUuid={props.farmUuid}
            farmManageUuid={props.farmManageUuid}
             />
            <div style={{ 
            display: "flex",
            flexDirection: "row", 
            gap: "16px",
            padding: "24px",
            }}>
            {furrowInfo && [...Array(furrowInfo.furrowNumber)].map((_,index)=>(
                <CreateFurrow
                key={`${props.farmManageUuid}-${index}`}
                furrowId={index}
                farmUuid={props.farmUuid}
                farmManageUuid={props.farmManageUuid}
                 />
            ))}          
        </div>  
    </>     
    )
}

export default FarmArea