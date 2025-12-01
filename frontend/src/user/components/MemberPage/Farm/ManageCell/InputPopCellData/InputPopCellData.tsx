import { useState,useEffect } from "react"
import ReactDOM from "react-dom"
import InputCellInfo from "./InputCellInfo"
import { type CellInfo } from "../CreateCell";
import type { CellInfo as generatedCellInfo } from "../../../../../../generated/api";
import InputPoorGrowthReason from "./InputPoorGrowthReason";
import { apiClient } from "../../../../../../api/client";

interface InputPopCellDataProps{
    farmUuid: string;
    farmManageUuid: string;
    rowId: number;
    initial:CellInfo;
    initialPoorReason:number[];
    onClose:()=>void;
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
    // Jsonがから文字だとTimeｗ入れてしまうので成形
    const normalizeDate = (value: string | null | undefined) => {
        return value?.startsWith("0001-01-01") ? "" : value ?? ""
    }
    const [cellData,setCellData] = useState<CellInfo> ({
        ...props.initial,
        datePlanted: normalizeDate(props.initial.datePlanted),
        dateHarvestPlanted: normalizeDate(props.initial.dateHarvestPlanted)
    })
    // Reaonだけは形式が違うので別で更新
    const [poorReason,setPoorReason] = useState<number[]>(props.initialPoorReason)
    const handleReasonChange = (newSelected:number[]) => {
        setPoorReason(newSelected)
    }
    // 新規保存か更新か
    const isUpdate = cellData.row !== undefined && cellData.column !== undefined
    // cell情報を保存
    const onSave = async() => {
        const params:generatedCellInfo = {
                cellRow: cellData.row,
                cellColumn: cellData.column,
                cropItem: cellData.item,
                variety: cellData.variety,
                datePlanted: cellData.datePlanted,
                growthStage: cellData.growthStage,
                status: cellData.status,
                poorGrowthReason: cellData.poorGrowthReason,
                dateHarvestPlanted: cellData.dateHarvestPlanted,
                memo: cellData.memo
            }
        if(isUpdate){
            try {    
                const res = await apiClient.putManageFarmsCell(props.farmUuid,props.farmManageUuid,props.rowId,params)
                if(!res){
                    throw new Error()
                }
            } catch(err){
                console.error(err)
            } finally{
                props.onClose()
                window.location.reload()
            }
        } else{
        try{
            
            const res = apiClient.postManageFarmsCell(props.farmUuid,props.farmManageUuid,props.rowId,params)
            if (!res){
                throw new Error()
            }
        }catch(err){
            console.error(err)
        } finally{
            window.location.reload()
            props.onClose()
        }
    }
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
                    onClick={onSave}>OK</button>
                    <button onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
    return ReactDOM.createPortal(modalContent,modalRoot)
}

export default InputPopCellData