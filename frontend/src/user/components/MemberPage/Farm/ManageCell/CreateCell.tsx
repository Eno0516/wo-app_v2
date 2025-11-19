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
      <div onClick={()=>handleClick()}>

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