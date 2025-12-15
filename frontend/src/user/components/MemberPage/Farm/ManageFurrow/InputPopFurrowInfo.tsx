import ReactDOM from "react-dom"
import {useState,useEffect} from "react"
import { apiClient } from "../../../../../api/client"
import type { FurrowCellInfo } from "../../../../../generated/api"
import InputFurrowInfo from "./InputFurrowInfo"

interface BaseProps {
    farmUuid: string
    farmManageUuid: string
    rowId: number
    onClose:()=>void
}

const POP_FURROW_INFO={
    width:"width",
    length:"length",
    rows: "rows",
    minPlantSpace: "minPlantSpace"
} as const

export type PopFurrowInfo = {
    [POP_FURROW_INFO.width]: number,
    [POP_FURROW_INFO.length]: number,
    [POP_FURROW_INFO.rows]: number,
    [POP_FURROW_INFO.minPlantSpace]: number,
}

function InputPopFurrowInfo(props:BaseProps){
    const [furrowInfo,setFurrowInfo] = useState<PopFurrowInfo>({
        [POP_FURROW_INFO.width]:0,
        [POP_FURROW_INFO.length]:0,
        [POP_FURROW_INFO.rows]:0,
        [POP_FURROW_INFO.minPlantSpace]:0,
    })
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
        // 親へ結果を通知
        props.onClose()
    }
    // 全て必須入力項目とする
    const isRegister = 
        furrowInfo[POP_FURROW_INFO.width] !== 0 &&
        furrowInfo[POP_FURROW_INFO.length] !== 0 &&
        furrowInfo[POP_FURROW_INFO.rows] !== 0 &&
        furrowInfo[POP_FURROW_INFO.minPlantSpace] !== 0

    // 新しい畝情報を登録
    const handleSubmit = async () =>{
        const params: FurrowCellInfo = {
            furrowWidth: Number(furrowInfo[POP_FURROW_INFO.width]),
            furrowLength: Number(furrowInfo[POP_FURROW_INFO.length]),
            rows: Number(furrowInfo[POP_FURROW_INFO.rows]),
            minPlantSpacing: Number(furrowInfo[POP_FURROW_INFO.minPlantSpace]),
            CellInfoArray:[]
        }
        // PostかPutか どれか一つでも存在すればupdate
        const isUpdate = !!furrowInfo[POP_FURROW_INFO.width]
        if (isUpdate) {
            try {
                const res = await apiClient.putManageFarms1(props.farmUuid,props.farmManageUuid,props.rowId,params)
                if (!res.ok){
                throw new Error()
                }
            }catch(err){
                console.log(err)
            }
        } else {
            try{
                const res = await apiClient.postManageFarms(props.farmUuid,props.farmManageUuid,props.rowId,params)
                if (!res.ok){
                    throw new Error()
            }
            } catch(err){
                console.error(err)
            } finally {
                props.onClose()
                window.location.reload()
            }
        }

        
    }
    // モーダルの中身
    const modalContet = (
        <div className="modal-overlay">
            <div className="modal">
                <label>幅（cm）</label>
                <InputFurrowInfo
                field={POP_FURROW_INFO.width}
                furrowInfo={furrowInfo}
                setFurrowInfo={setFurrowInfo}
                placeHolder="幅"
                />
                <label>長さ（m）</label>
                <InputFurrowInfo
                field={POP_FURROW_INFO.length}
                furrowInfo={furrowInfo}
                setFurrowInfo={setFurrowInfo}
                placeHolder="長さ"
                />
                <label>条数</label>
                <InputFurrowInfo
                field={POP_FURROW_INFO.rows}
                furrowInfo={furrowInfo}
                setFurrowInfo={setFurrowInfo}
                placeHolder="条数"
                />
                <label>最小作物間隔（cm）</label>
                <InputFurrowInfo
                field={POP_FURROW_INFO.minPlantSpace}
                furrowInfo={furrowInfo}
                setFurrowInfo={setFurrowInfo}
                placeHolder="最小間隔"
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
    return ReactDOM.createPortal(modalContet,modalRoot)
}
export default InputPopFurrowInfo