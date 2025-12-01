// 畑登録を行うための諸情報を入力させるモーダル
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import InputFarmInfo from "./InputFarmInfo"
import InputFarmSeason from "./InputFarmSeason"
import { apiClient } from "../../../../../api/client"
import { useLocation } from "react-router-dom"
import { type FarmInfoDetail } from "../../../../../generated/api/models/FarmInfoDetail"
import { useFarmContext } from "../../../../contexts/FarmContext"

interface BaseProps {
    onClose:()=>void
}
type ClickPopInputBoxProps =
  | (BaseProps & { mode: "add" })
  | (BaseProps & { mode: "edit"; farmUuid: string; farmManageUuid: string });

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
    // contextの呼び出し
    const {farmName} = useFarmContext()
    const [farmInfo,setFarmInfo] = useState<PopFarmInfo> ({
        [POP_FARM_INFO.farmName]:farmName ?? "",
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
    // 必須項目が入力されているかを管理
    const isRegister = farmInfo[POP_FARM_INFO.farmName].trim() !== ""
    //モーダル表示管理
    const [mounted,setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    },[])

    if(!mounted){
        return null
    }
    const modalRoot = document.getElementById('modal-root')
    if(!modalRoot){
        return null
    }
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
            farmYear:Number(farmInfo[POP_FARM_INFO.plantYear]),
            farmSeasons:farmSeasons,
            farmLength:farmInfo[POP_FARM_INFO.length],
            farmWidth:farmInfo[POP_FARM_INFO.width],
            furrowNumber: Number(farmInfo[POP_FARM_INFO.furrows]),
            furrowWidth:farmInfo[POP_FARM_INFO.furrowWidth] !== ""
            ? farmInfo[POP_FARM_INFO.furrowWidth]
            : undefined
        }
        try{
            console.log("start")
            if(props.mode=="add"){
                if(!groupUuid){
                    return
                }   
                console.log("add")
                const res = await apiClient.postGroupsManageFarms(groupUuid,registerParams)
                if (!res.ok) {
                    throw new Error()
                }
            } else if (props.mode=="edit"){
                console.log("Put")
               const res = await apiClient.putManageFarms(props.farmUuid,props.farmManageUuid,registerParams)
               console.log(res)
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
    // モーダルの中身
    const modalContent = (
        <div className="modal-overlay">
            <div className="modal">
                <label>圃場名</label>
                 <InputFarmInfo
                    field={POP_FARM_INFO.farmName}
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="圃場名"
                    />
                    <label>栽培年</label>
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
                     <label>長さ（ m ）</label>
                    <InputFarmInfo
                    field={POP_FARM_INFO.length}
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="長さ"
                    />
                    <label>幅（ m ）</label>
                    <InputFarmInfo
                    field={POP_FARM_INFO.width}
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="幅"
                    />
                    
                    <label>畝数</label>
                    <InputFarmInfo
                    field={POP_FARM_INFO.furrows}
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="畝数"
                    />
                    
                    <div className="modal-buttons">
                        <button 
                        disabled={!isRegister}
                        onClick={()=> handleSubmit()}>OK</button>
                        <button onClick={handleClose}>Cancel</button>
                    </div>
            </div>
        </div>
    )
    return ReactDOM.createPortal(modalContent,modalRoot)
}

export default InputPopFarmInfo