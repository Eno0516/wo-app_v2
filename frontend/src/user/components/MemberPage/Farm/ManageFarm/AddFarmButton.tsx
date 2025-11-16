// 畑を新規登録するためのボタン

import { useState } from "react"
import InputPopFarmInfo from "./InputPopFarmInfo"

type AddFarmButtonProps = {
    mode: "add" | "edit"
}

function AddFarmButton ({mode}:AddFarmButtonProps) {
    const [isPopVisible,setIsPopVisible] = useState(false)
    const onClick = () => {
        setIsPopVisible(true)
    }
    const onClickPopClose = () =>{
        setIsPopVisible(false)
    }
    return (
        <>
        <button onClick={onClick}>畑を追加</button>
        {isPopVisible && 
        <InputPopFarmInfo
            mode={mode}
            onClose={onClickPopClose}
        />
        }
        </>
    )
}

export default AddFarmButton