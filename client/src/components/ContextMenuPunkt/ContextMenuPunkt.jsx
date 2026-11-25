import logo from '../../assets/herunterladenPunktIcon.png'
import './ContextMenuPunkt.css'

function ContextMenuPunkt(props) {
    return (
        <button className='ContextMenuPunkt'>
            <img src={logo} alt='' width='30px'/>
            {props.text}
        </button>
    )
}

export default ContextMenuPunkt
