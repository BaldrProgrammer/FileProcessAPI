import './ContextMenuButton.css'

function ContextMenuButton(props) {
    return (
        <button className='ContextMenuButton'>
            {props.text}
        </button>
    )
}

export default ContextMenuButton
