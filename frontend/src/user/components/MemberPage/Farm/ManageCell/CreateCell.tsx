import {useState} from 'react'
import InputPopCellData from './InputPopCellData/InputPopCellData'

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

//セルを作成・描画するのみ。そのセルに今後の処理を踏まえてクリックイベントを付随させておく
function CreateCell (props:CellInfo) {
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
        initial={props}
        initialPoorReason={[props.poorGrowthReason]}
        onClose={handleClose}
        />
      }
      </>
    )
}

export default CreateCell