import { useState } from "react"
import type {Dispatch,SetStateAction} from "react"

interface ClickPopInputBoxProps{
    initial:string;
    onClose:(value:string | null)=>void
    isVisible:boolean
    setIsVisible:Dispatch<SetStateAction<boolean>>
}

function ClickPopInputBox({initial, onClose,isVisible, setIsVisible }:ClickPopInputBoxProps){
    const [value, setValue] = useState(initial)
    //モーダル表示管理
    const handleClose = (result: string | null) => {
        setIsVisible(false)
        //親へ結果を通知
        onClose(result)
    }
    return (
        <>
        {isVisible && (
            <div className="overlay">
                <div className="modal">
                    <input value={value} onChange={e => setValue(e.target.value)} />
                    <button onClick={()=> handleClose(value)}>OK</button>
                    <button onClick={() => handleClose(null)}>Cancel</button>
                </div>
            </div>
        )}
        </>
    )
}

export default ClickPopInputBox