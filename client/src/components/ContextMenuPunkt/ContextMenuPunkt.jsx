import logo from '../../assets/punktIcon/punktIconHerunterladen.png'
import './ContextMenuPunkt.css'

function ContextMenuPunkt(props) {
    return (
        <button className='ContextMenuPunkt'>
            <img src={logo} alt='gfd,' width='30px'/>
            {props.text}
        </button>
    )
}

export default ContextMenuPunkt
