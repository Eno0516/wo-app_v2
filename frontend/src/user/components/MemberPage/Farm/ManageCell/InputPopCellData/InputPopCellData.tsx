import { useState } from "react"
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
function InputPopCellData({initial, initialPoorReason,onClose}:InputPopCellDataProps,){
        const [cellData,setCellData] = useState<CellInfo> ({...initial})
    // Reaonだけは形式が違うので別で更新
    const [poorReason,setPoorReason] = useState<number[]>(initialPoorReason)
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
        onClose()
    }
    return (
        <>
            <div className="overlay">
                <div className="modal">
                    <InputCellInfo
                    field={POP_Cell_Data.item}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                    />
                    <InputCellInfo
                    field={POP_Cell_Data.variety}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                    />
                    <InputCellInfo
                    field={POP_Cell_Data.datePlanted}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                    />
                    <InputCellInfo
                    field={POP_Cell_Data.growthStage}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                    />
                    <InputCellInfo
                    field={POP_Cell_Data.status}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                    />
                    <InputPoorGrowthReason
                    selected={poorReason}
                    onChange={newSelected => handleReasonChange(newSelected)}
                    />
                    <InputCellInfo
                    field={POP_Cell_Data.dateHarvestPlanted}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                    />
                    <InputCellInfo
                    field={POP_Cell_Data.memo}
                    cellInfo={cellData}
                    setCellInfo={setCellData}
                    />
                    <button onClick={()=> onSave}>OK</button>
                    <button onClick={() => handleClose}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default InputPopCellData