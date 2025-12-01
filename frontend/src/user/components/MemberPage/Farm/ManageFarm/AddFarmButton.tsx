// 畑を新規登録するためのボタン

import { useState } from "react"
import InputPopFarmInfo from "./InputPopFarmInfo"

type AddFarmButtonProps =
  | { mode: "add" }
  | { mode: "edit"; farmUuid: string;farmManageUuid: string };

function AddFarmButton (props:AddFarmButtonProps) {
    const [isPopVisible,setIsPopVisible] = useState(false)
    const buttonLabel = props.mode === "add" ? "畑を追加" : "畑を編集"
    const onClick = () => {
        setIsPopVisible(true)
    }
    const onClickPopClose = () =>{
        setIsPopVisible(false)
    }
    return (
        <>
        <button onClick={onClick}>{buttonLabel}</button>
        {isPopVisible && 
        ( props.mode === "add" ? (
            <InputPopFarmInfo
            mode="add"
            onClose={onClickPopClose}
        />
        ) : (
           <InputPopFarmInfo
            mode="edit"
            onClose={onClickPopClose}
            farmUuid={props.farmUuid}
            farmManageUuid={props.farmManageUuid}
        /> 
        )

    )
        
        }
        </>
    )
}

export default AddFarmButton