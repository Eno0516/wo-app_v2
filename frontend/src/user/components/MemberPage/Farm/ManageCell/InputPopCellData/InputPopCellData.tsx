import { useState,useEffect } from "react"
import ReactDOM from "react-dom"
import InputCellInfo from "./InputCellInfo"
import { type CellInfo } from "../CreateCell";
import InputPoorGrowthReason from "./InputPoorGrowthReason";

interface InputPopCellDataProps{
    initial:CellInfo;
    initialPoorReason:number[]
    onClose:()=>void
}
const POP_Cell_Data={
    row:"row",
    column:"column",
    item:"item",
    variety:"variety",
    datePlanted:"datePlanted",
    growthStage:"growthStage",
    status:"status",
    poorGrowthReason:"poorGrowthReason",
    dateHarvestPlanted:"dateHarvestPlanted",
    memo:"memo"
} as const

export type CellData = {
    [POP_Cell_Data.item]: string,
    [POP_Cell_Data.variety]: string,
    [POP_Cell_Data.datePlanted]: string,
    [POP_Cell_Data.growthStage]: string,
    [POP_Cell_Data.status]: string,
    [POP_Cell_Data.dateHarvestPlanted]: string,
    [POP_Cell_Data.memo]:string,

}

// 作物管理に必要な情報を入力するためのポップ
function InputPopCellData(props:InputPopCellDataProps,){
        const [cellData,setCellData] = useState<CellInfo> ({...props.initial})
    // Reaonだけは形式が違うので別で更新
    const [poorReason,setPoorReason] = useState<number[]>(props.initialPoorReason)
    const handleReasonChange = (newSelected:number[]) => {
        setPoorReason(newSelected)
        }
    // cell情報を保存
    const onSave = () => {
        // 送る形に直さないと
        console.log("API保存処理を実装")
    }
    const handleClose = () => {
        //親へ結果を通知
        console.log("click")
        props.onClose()
    }
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
    const modalContent = (
        <div className="modal-overlay">
            <div className="modal">
                <label>品目</label>
                <InputCellInfo
                    field={POP_Cell_Data.item}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                />
                <label>品種</label>
                <InputCellInfo
                    field={POP_Cell_Data.variety}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                />
                <label>作付日</label>
                <InputCellInfo
                    field={POP_Cell_Data.datePlanted}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                />
                <label>生育段階</label>
                <InputCellInfo
                    field={POP_Cell_Data.growthStage}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                />
                <label>状態</label>
                <InputCellInfo
                    field={POP_Cell_Data.status}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                />
                <label>生育遅れ要因</label>
                <InputPoorGrowthReason
                    selected={poorReason}
                    onChange={newSelected => handleReasonChange(newSelected)}
                />
                <label>収穫日</label>
                <InputCellInfo
                    field={POP_Cell_Data.dateHarvestPlanted}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                />
                <label>メモ</label>
                <InputCellInfo
                    field={POP_Cell_Data.memo}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                />
                <div className="modal-buttons">
                    <button  
                    onClick={()=> onSave}>OK</button>
                    <button onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
    return ReactDOM.createPortal(modalContent,modalRoot)
}

export default InputPopCellData