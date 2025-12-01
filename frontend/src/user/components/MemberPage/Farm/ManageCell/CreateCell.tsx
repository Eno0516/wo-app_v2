import {useEffect, useState} from 'react'
import InputPopCellData from './InputPopCellData/InputPopCellData'

interface BaseProps {
    farmUuid: string
    farmManageUuid: string
    rowId: number
}
export type CellInfo = {
    row: number
    column: number
    item: string
    variety: string
    datePlanted: string
    growthStage: number
    status: number
    poorGrowthReason: number
    dateHarvestPlanted: string
    memo: string
}

type Props = BaseProps & CellInfo


//セルを作成・描画するのみ。そのセルに今後の処理を踏まえてクリックイベントを付随させておく
function CreateCell (props:Props) {
    const {
        farmUuid,
        farmManageUuid,
        rowId,
        ...initial
    } = props
    // リアクティブにCell情報を管理
    const [cellState,setCellState] = useState<CellInfo>({
        row: initial.row,
        column: initial.column,
        item: initial.item,
        variety: initial.variety,
        datePlanted: initial.datePlanted,
        growthStage: initial.growthStage,
        status: initial.status,
        poorGrowthReason: initial.poorGrowthReason,
        dateHarvestPlanted: initial.dateHarvestPlanted,
        memo: initial.memo,
    })
    useEffect(()=>{
        setCellState({
            row: initial.row,
        column: initial.column,
        item: initial.item,
        variety: initial.variety,
        datePlanted: initial.datePlanted,
        growthStage: initial.growthStage,
        status: initial.status,
        poorGrowthReason: initial.poorGrowthReason,
        dateHarvestPlanted: initial.dateHarvestPlanted,
        memo: initial.memo,
        })
    },[
        initial.row,
        initial.column,
        initial.item,
        initial.variety,
        initial.datePlanted,
        initial.growthStage,
        initial.status,
        initial.poorGrowthReason,
        initial.dateHarvestPlanted,
        initial.memo,
    ])
    // ポップの表示管理
    const [isVisiblePop,setIsVisiblePop] = useState(false)

    const handleClick = () => {
        setIsVisiblePop(true)
    }
    const handleClose = () => {
        setIsVisiblePop(false)
    }

    return (
        <>
      <div onClick={()=>handleClick()}
        style={{
            backgroundColor:cellState.item ? "#a8e6a2" : "#fff",
            border: "2px solid #ccc",
            boxSizing: "border-box",
            width: "40px",
            height: "40px",
            cursor: "pointer"
        }}
        >
        {""}
      </div>
      {isVisiblePop && 
        <InputPopCellData 
        farmUuid={farmUuid}
        farmManageUuid={farmManageUuid}
        rowId={rowId}
        initial={cellState}
        initialPoorReason={[cellState.poorGrowthReason]}
        onClose={handleClose}
        />
      }
      </>
    )
}

export default CreateCell