// 畑を新規登録するためのボタン

import { useState } from "react"
import InputPopFarmInfo from "./InputPopFarmInfo"
import {type PopFarmInfo} from "./InputPopFarmInfo"

function AddFarmButton () {
    const [isPopVisible,setIsPopVisible] = useState(false)
    const onClick = () => {
        setIsPopVisible(true)
    }
    const onClickPopClose = () =>{
        setIsPopVisible(false)
    }
    const onSaveFarm = (result:PopFarmInfo) => {
        // バックエンドに送信
        // モーダルを非表示
        setIsPopVisible(false)
        // 画面をリロードして登録畑を更新

    }
    return (
        <>
        <button onClick={onClick}>畑を追加</button>
        {isPopVisible && 
        <InputPopFarmInfo
            onClose={onClickPopClose}
            onSave={onSaveFarm}
        />
        }
        </>
    )
}

export default AddFarmButton