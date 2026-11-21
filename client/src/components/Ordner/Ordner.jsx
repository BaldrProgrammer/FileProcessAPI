import './Ordner.css'
import icon from '../../assets/ordnerIcon.png'

function Ordner(props) {
    function ordnerOffnen(ordnerPfad) {
        props.setAktuellPfad(ordnerPfad)
    }

    return (
        <div onClick={() => ordnerOffnen(props.args.ordnerPfad)} className="einOrdnerVerpackung">
            <div className="einOrdner">
                <img className='ordnerIcon' src={icon} alt='' width='20px' height='20px'/>
                <p className='ordnerName'>{props.args.name}</p>
                <p className='ordnerAnderung'>{props.args.letztAnderung}</p>
                <p className='ordnerGrosse'>--</p>
            </div>
        </div>
    )
}


export default Ordner
