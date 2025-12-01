type InputFarmSeasnsProps = {
    selected:number[],
    onChange:(selected:number[])=>void
}

const SEASONS = [
    {id:1,reason:"春"},
    {id:2,reason:"夏"},
    {id:3,reason:"秋"},
    {id:4,reason:"冬"},
]

function InputFarmSeason(props:InputFarmSeasnsProps){
    const toggle = (index:number)=>{
        const newSelected = props.selected.includes(index)
        ? props.selected.filter(i=> i !== index)
        : [...props.selected,index]
        props.onChange(newSelected)
    }
    return (
        <div>
            {SEASONS.map((obj)=>(
                <label>
                    <input
                    type="checkbox"
                    key={obj.id}
                    checked={props.selected.includes(obj.id)}
                    onChange={()=>toggle(obj.id)}
                    />
                    {obj.reason}
                </label>
            ))}
        </div>
    )
}

export default InputFarmSeason
