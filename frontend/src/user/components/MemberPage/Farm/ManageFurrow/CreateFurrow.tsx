import { apiClient } from "../../../../../api/client"
import CreateCell, { type CellInfo } from "../ManageCell/CreateCell"
import { useState } from "react"


// propsで畝id・畝幅を貰う。
type CreateFurrowProps = {
    furrowId: number
    farmUuid: string
    farmManageUuid: string
}

type FurrowInfo = {
    furrowWidth: number
    furrowLength: number
    rows: number
    minPlantSpacing: number
}

function CreateFurrow (props:CreateFurrowProps) {
    // furrow dateを保持
    const [furrowInfo,setFurrowInfo] = useState<FurrowInfo>()
    // cell dataを保持
    const [cellInfo,setCellInfo] = useState<CellInfo[]>()
    const handleFurrowCell = async() => {
        // 畝idとfarmManageUuidで畝幅・条数・最小間隔を取得
        // 畝idとfarmManageUuidでcell情報を取得
        const res = await apiClient.getManageFarms2(props.farmUuid,props.farmManageUuid,props.furrowId)
        const resFurrowInfo:FurrowInfo = {
            furrowWidth: res.furrowWidth,
            furrowLength:res.furrowLength,
            rows: res.rows,
            minPlantSpacing: res.minPlantSpacing
        }
        setFurrowInfo(resFurrowInfo)
        const resCellInfo:CellInfo[] = res.CellInfoArray.map((cell)=>{
            return {
                row:cell.cellRow ?? 0,
                column:cell.cellColumn ?? 0,
                item:cell.cropItem ?? "",
                variety:cell.variety ?? "",
                datePlanted:cell.datePlanted ?? "",
                growthStage:cell.growthStage ?? 0,
                status:cell.status ?? 0,
                poorGrowthReason:cell.poorGrowthReason ?? 0,
                dateHarvestPlanted:cell.dateHarvestPlanted ?? "",
                memo:cell.memo ?? ""
            }
        })
        setCellInfo(resCellInfo)
    }
    handleFurrowCell()
    // 畝長÷最小作物間隔でcell数を計算
    let cellNumberPerRow = 0
    if (furrowInfo){
        cellNumberPerRow = Math.floor(furrowInfo.furrowLength/furrowInfo.minPlantSpacing)
    }

    // 以上のデータを渡してcellを描画
    return (
        <>
        {furrowInfo &&
        [...Array(furrowInfo.rows)].map((_,rowIndex)=>(
            <div key={rowIndex}>
                {[...Array(cellNumberPerRow)].map((_,columnIndex)=>{
                    // rowとcolumnが一致するInfoを探す
                    const cell = cellInfo?.find(
                        (c)=>c.row == rowIndex && c.column == columnIndex
                    );
                    return (
                        <div key={columnIndex}>
                        <CreateCell
                        row={rowIndex}
                        column={columnIndex}
                        item={cell?.item ?? ""}
                        variety={cell?.variety ?? ""}
                        datePlanted={cell?.datePlanted ?? ""}
                        growthStage={cell?.growthStage ?? 0}
                        status={cell?.status ?? 0}
                        poorGrowthReason={cell?.poorGrowthReason ?? 0}
                        dateHarvestPlanted={cell?.dateHarvestPlanted ?? ""}
                        memo={cell?.memo ?? ""}
                         />
                        </div>
                    )
                    
        })}
                
            </div>
        )) 
        }
        </>
    )

}

export default CreateFurrow