import { useState } from "react"
import InputPopFurrowInfo from "./InputPopFurrowInfo"

type Props = {
    farmUuid: string
    farmManageUuid: string
    rowId: number
}

function ManageFurrowInfo (props: Props) {
    const [isPopVisible,setIsPopVisible] = useState(false)
    const onClick = () => {
        setIsPopVisible(true)
    }
    const onClickPopClose = () =>{
        setIsPopVisible(false)
    }
    return (
        <>
    <button onClick={onClick}>編集</button>
    {isPopVisible && (
        <InputPopFurrowInfo
        farmUuid={props.farmUuid}
        farmManageUuid={props.farmManageUuid}
        rowId={props.rowId}
        onClose={onClickPopClose}
        />
    )
    }
    </>
    )
}

export default ManageFurrowInfo