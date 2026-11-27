import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import './Ordner.css'
import icon from '../../assets/dateiIcon/ordnerIcon.png'

function Ordner(props) {
    const context = useContext(HauptContext)

    function ordnerWahlen(e) {
        console.log(e.ctrlKey, context.ausgewahlt)
        if (e.ctrlKey || e.metaKey) {
            props.setAusgewahlt([...context.ausgewahlt, props.args.id])
        } else {
            props.setAusgewahlt([props.args.id])
        }
    }

    function ordnerOffnen(ordnerPfad) {
        props.setAktuellPfad(ordnerPfad)
    }

    return (
        <div className={`einOrdnerVerpackung ${context.ausgewahlt.includes(props.args.id) ? 'ausgewahlt' : ''}`} ref={props.ref} onContextMenu={props.handleContextMenu} onClick={ordnerWahlen} onDoubleClick={() => ordnerOffnen(props.args.ordnerPfad)}>
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
