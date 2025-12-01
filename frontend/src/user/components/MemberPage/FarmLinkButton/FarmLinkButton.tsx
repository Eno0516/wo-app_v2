import "./FarmLinkButton.css"

type FarmLinkButtonProps = {
    title:string
    uuid: string
    onClickLink:(value:string)=>void
}
function FarmLinkButton (props:FarmLinkButtonProps) {
    const onClickTitle = () => {
        props.onClickLink(props.uuid)
    }
    return (
        <button onClick={onClickTitle} className="link-button">{props.title}</button>
    )
}

export default FarmLinkButton