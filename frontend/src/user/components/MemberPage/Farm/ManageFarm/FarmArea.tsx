// 畑管理ページの畑エリアを表示する
// ここで持っておくのは、畝数とそれぞれの畝id,畝幅
// ただ畝幅は畝によって変わる可能性あるから、畝側からも情報を得て、リアクティブに表示を変更

import { useState } from "react"
import CreateFurrow from "../ManageFurrow/CreateFurrow"
import { apiClient } from "../../../../../api/client"

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
    const handleFuurowBasicInfo = async() =>{
        try {
            const res = await apiClient.getManageFarms1(props.farmUuid,props.farmManageUuid)
            setFurrowInfo(res)
        }catch(err){
            console.log(err)
        }
    }
    handleFuurowBasicInfo()

    return (
        <div>
            {furrowInfo && [...Array(furrowInfo.furrowNumber)].map((_,index)=>(
                <CreateFurrow
                furrowId={index}
                farmManageUuid={props.farmManageUuid}
                 />
            ))}          
        </div>       
    )
}

export default FarmArea