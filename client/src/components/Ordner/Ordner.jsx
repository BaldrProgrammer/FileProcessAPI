import './Ordner.css'
import icon from '../../assets/ordnerIcon.png'
import { useContext } from "react";
import { PfadContext} from "../../context/PfadContext.js";

function Ordner(props) {
    const aktuellPfad = useContext(PfadContext)
    function ordnerOffnen(ordnerPfad) {
        console.log(`jetzt auf ${ordnerPfad}`)
        props.setAktuellPfad(ordnerPfad)
    }
    console.log(aktuellPfad)

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
