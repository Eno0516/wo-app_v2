import {useState} from "react"
import CreateCell from "../../share/components/ManagePlant/CreateCell/CreateCell.tsx"
//import ClickPopInputBox from "../../share/components/ManagePlant/ClickPopInputBok/clickPopInputBox"

function CropsManagement () {
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

export default CropsManagement