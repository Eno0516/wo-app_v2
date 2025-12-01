import {useState} from 'react'
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
            backgroundColor:props.item ? "a8e6a2":"fff",
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
        initial={initial}
        initialPoorReason={[initial.poorGrowthReason]}
        onClose={handleClose}
        />
      }
      </>
    )
}

export default CreateCell