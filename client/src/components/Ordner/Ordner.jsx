import './Ordner.css'
import icon from '../../assets/ordnerIcon.png'
import { useContext } from "react";
import { PfadContext} from "../../context/PfadContext.js";

function Ordner(props) {
    const aktuellPfad = useContext(PfadContext)
    function ordnerOffnen(ordnerPfad) {
        props.setAktuellPfad(aktuellPfad+ordnerPfad)
    }
    console.log(`jetzt auf ${aktuellPfad}`)

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
