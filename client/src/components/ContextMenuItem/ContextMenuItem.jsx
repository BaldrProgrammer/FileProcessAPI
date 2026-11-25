import './ContextMenuItem.css'

function ContextMenuItem(props) {
    return (
        <button className='ContextMenuButton'>
            {props.text}
        </button>
    )
}

export default ContextMenuItem
