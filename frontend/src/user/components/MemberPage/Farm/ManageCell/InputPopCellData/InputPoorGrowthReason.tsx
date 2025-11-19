type PoorGrowthReasonProps = {
    selected:number[],
    onChange:(selected:number[])=>void
}

const REASONS = [
    {id:1,reason:"天候不順"},
    {id:2,reason:"病気"},
    {id:3,reason:"害虫"},
    {id:4,reason:"栄養不足"},
    {id:5,reason:"栄養過多"}
]

function InputPoorGrowthReason(props:PoorGrowthReasonProps){
    const toggle = (index:number)=>{
        const newSelected = props.selected.includes(index)
        ? props.selected.filter(i=> i !== index)
        : [...props.selected,index]
        props.onChange(newSelected)
    }
    return (
        <div>
            {REASONS.map((obj)=>(
                <label>
                    <input
                    type="checkbox"
                    checked={props.selected.includes(obj.id)}
                    onChange={()=>toggle(obj.id)}
                    />
                    {obj.reason}
                </label>
            ))}
        </div>
    )
}

export default InputPoorGrowthReason