import {useState} from "react"
import { useLocation } from "react-router-dom"
import CreateCell from "../../share/components/ManagePlant/CreateCell/CreateCell.tsx"
//import ClickPopInputBox from "../../share/components/ManagePlant/ClickPopInputBok/clickPopInputBox"

function ManageFarmPage () {
    // クエリパラメータから畑uuidを取得
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const farmId = params.get("farmUUID"); 
    // UUIDで畑情報を取得
    const res = await
    //idごとの名前の保持
    const [names,setName] = useState<Record<string,string>>({})
    //名前入力の表示管理
    const [isOpenInputName, setIsOpenInputName] = useState(false)
    // const handleClose = (value: string | null) => {
    //     if (value !== null) {
    //         setName({name:value})
    //     }
    //     setIsOpenInputName(false)
    // }
    const onClickCell = (id: string) => {
        setIsOpenInputName(!!id)
    }
    return(
        <div>
        <CreateCell
        rows={15}
        columns={5}
        names={names}
        setName={setName}
        onClick={onClickCell}
        />
        {isOpenInputName && (
            <div></div>

        )}
        </div>
    )
}

export default ManageFarmPage