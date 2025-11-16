// 畑登録を行うための諸情報を入力させるモーダル
import { useState } from "react"
import InputFarmInfo from "./InputFarmInfo"

interface ClickPopInputBoxProps{
    onClose:()=>void
    onSave:(value:PopFarmInfo) => void
}

const POP_FARM_INFO={
    farmName:"farmName",
    length:"length",
    width:"width",
    furrows:"furrows",
    furrowWidth:"furrowWidth"
} as const


export type PopFarmInfo = {
    [POP_FARM_INFO.farmName]: string 
    [POP_FARM_INFO.length]: string
    [POP_FARM_INFO.width]:string
    [POP_FARM_INFO.furrows]:string
    [POP_FARM_INFO.furrowWidth]:string
}

function InputPopFarmInfo (props:ClickPopInputBoxProps) {
    const [farmInfo,setFarmInfo] = useState<PopFarmInfo> ({
        [POP_FARM_INFO.farmName]:"",
        [POP_FARM_INFO.length]:"",
        [POP_FARM_INFO.width]:"",
        [POP_FARM_INFO.furrows]:"",
        [POP_FARM_INFO.furrowWidth]:""
})
    //モーダル表示管理
    const handleClose = () => {
        //親へ結果を通知
        props.onClose()
    }
    const handleSubmit = () => {
        props.onSave(farmInfo)
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
                                        <InputFarmInfo
                    field={POP_FARM_INFO.furrowWidth}
                    farmInfo={farmInfo}
                    setFarmInfo={setFarmInfo}
                    placeHolder="畝幅"
                    />
                 

                    <button onClick={()=> handleSubmit()}>OK</button>
                    <button onClick={handleClose}>Cancel</button>
                </div>
         
        </>
       
    )
}

export default InputPopFarmInfo