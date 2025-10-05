import type {Dispatch, SetStateAction} from "react"

interface GridProps {
    rows: number;
    columns: number;
    names?:Record<string,string>;
    setName?:Dispatch<SetStateAction<Record<string,string>>>
    onClick?:(id:string)=>void
}

//セルを作成・描画するのみ。そのセルに今後の処理を踏まえてクリックイベントを付随させておく
function CreateCell ({rows, columns, onClick,names }:GridProps) {
    //行と列のインデックス配列を生成
    const rowIndices = Array.from({length: rows}, (_, i) => i);
    const colIndices = Array.from({length: columns}, (_,i) => i);

    return (
        <div
        className="grid-container"
        style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns},1fr)`,
            gap: '8px',
        }}
        >
            {rowIndices.map(row =>
                colIndices.map(col => {
                    const id = `${row}-${col}`;
                    const name = names?.[id]
                    return (
                        <div
                            key={id}
                            id={id}
                            className="grid-item"
                            onClick={()=>onClick?.(id)}
                        >
                            {name}
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default CreateCell