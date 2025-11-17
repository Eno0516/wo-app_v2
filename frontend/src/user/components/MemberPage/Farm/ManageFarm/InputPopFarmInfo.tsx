// 畑登録を行うための諸情報を入力させるモーダル
import { useState } from "react"
import InputFarmInfo from "./InputFarmInfo"
import InputFarmSeason from "./InputFarmSeason"
import { apiClient } from "../../../../../api/client"
import { useLocation } from "react-router-dom"
import { type FarmInfoDetail } from "../../../../../generated/api/models/FarmInfoDetail"

interface ClickPopInputBoxProps{
    mode:"add" | "edit"
    onClose:()=>void
}

const POP_FARM_INFO={
    farmName:"farmName",
    plantYear:"plantYear",
    plantSeason:"plantSeason",
    length:"length",
    width:"width",
    furrows:"furrows",
    furrowWidth:"furrowWidth"
} as const


export type PopFarmInfo = {
    [POP_FARM_INFO.farmName]: string 
    [POP_FARM_INFO.plantYear]: number
    [POP_FARM_INFO.length]: string
    [POP_FARM_INFO.width]:string
    [POP_FARM_INFO.furrows]:number
    [POP_FARM_INFO.furrowWidth]:string
}

function InputPopFarmInfo (props:ClickPopInputBoxProps) {
    const location = useLocation()
    const [farmInfo,setFarmInfo] = useState<PopFarmInfo> ({
        [POP_FARM_INFO.farmName]:"",
        [POP_FARM_INFO.plantYear]:0,
        [POP_FARM_INFO.length]:"",
        [POP_FARM_INFO.width]:"",
        [POP_FARM_INFO.furrows]:0,
        [POP_FARM_INFO.furrowWidth]:""
})
    // Seaonだけは形式が違うので別で更新
    const [farmSeasons,setFarmSeasons] = useState<number[]>([])
    const handleSeasonChange = (newSelected:number[]) => {
        setFarmSeasons(newSelected)
        }
    //モーダル表示管理
    const handleClose = () => {
        //親へ結果を通知
        props.onClose()
    }
    // 新しい畑を登録
    const handleSubmit =async () => {
        // クエリパラメータからgroupUuidを取得  
        const params = new URLSearchParams(location.search);
        const groupUuid = params.get("groupUuid"); 
        const registerParams:FarmInfoDetail = {
            farmName:farmInfo[POP_FARM_INFO.farmName],
            farmYear:farmInfo[POP_FARM_INFO.plantYear],
            farmSeasons:farmSeasons,
            farmLength:farmInfo[POP_FARM_INFO.length],
            farmWidth:farmInfo[POP_FARM_INFO.width],
            furrowNumber:farmInfo[POP_FARM_INFO.furrows],
            furrowWidth:farmInfo[POP_FARM_INFO.furrowWidth]
        }
        try{
            if(!groupUuid){
            return
        }   
            if(props.mode=="add"){
                const res = await apiClient.postGroupsManageFarms(groupUuid,registerParams)
                if (!res.ok) {
                    throw new Error()
                }
            } else if (props.mode=="edit"){
               const res = await apiClient.putGroupsManageFarms(groupUuid,registerParams)
                if (!res.ok) {
                    throw new Error()
                } 
            }
            
        }catch(err){
            console.error("add farm failed",err)
        } finally{
            props.onClose()
            window.location.reload()
        }
    }
    return (
        <>
                <div className="modal">
                    <InputFarmInfo
                    field={POP_FARM_INFO.farmName}
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="圃場名"
                    />
                    <InputFarmInfo
                    field={POP_FARM_INFO.plantYear}  
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="栽培年"
                    />
                    <InputFarmSeason
                    selected={farmSeasons}
                    onChange={(newSelected)=>handleSeasonChange(newSelected)}
                     />
                                        <InputFarmInfo
                    field={POP_FARM_INFO.length}
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="長さ"
                    />
                                        <InputFarmInfo
                    field={POP_FARM_INFO.width}
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="幅"
                    />
                                        <InputFarmInfo
                    field={POP_FARM_INFO.furrows}
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="畝数"
                    />

                    <button onClick={()=> handleSubmit()}>OK</button>
                    <button onClick={handleClose}>Cancel</button>
                </div>
         
        </>
       
    )
}

export default InputPopFarmInfo