import {useContext, useState} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import WahlenCheckbox from '../WahlenCheckbox/WahlenCheckbox.jsx'
import './Ordner.css'
import icon from '../../assets/dateiIcon/ordnerIcon.png'

function Ordner(props) {
    const context = useContext(HauptContext)
    const [istAktiv, setIstAktiv] = useState(false)

    function ordnerMausEin() {
        setIstAktiv(true)
    }

    function ordnerMausAus() {
        setIstAktiv(false)
    }

    function ordnerWahlen(e) {
        e.stopPropagation();
        props.setMenu(null)
        if (e.ctrlKey || e.metaKey) {
            props.setOrdnernAusgewahlt([...context.ordnernAusgewahlt, props.args.id])
        } else {
            props.setDateienAusgewahlt([])
            props.setOrdnernAusgewahlt([props.args.id])
        }
    }

    function ordnerOffnen(ordnerPfad) {
        props.setAktuellPfad(ordnerPfad)
    }

    return (
        <div className={`einOrdnerVerpackung ${context.ordnernAusgewahlt.includes(props.args.id) ? 'ausgewahlt' : ''}`}
             ref={props.ref} onContextMenu={props.handleContextMenu}
             onClick={ordnerWahlen}
             onDoubleClick={() => ordnerOffnen(props.args.ordnerPfad)}
             onMouseEnter={ordnerMausEin}
             onMouseLeave={ordnerMausAus}
        >
            <div className="einOrdner">
                {(istAktiv || context.ordnernAusgewahlt.includes(props.args.id)) && <WahlenCheckbox id={props.args.id} setOrdnernAusgewahlt={props.setOrdnernAusgewahlt}/>}
                <img className='ordnerIcon' src={icon} alt='' width='20px' height='20px'/>
                <p className='ordnerName'>{props.args.name}</p>
                <p className='ordnerAnderung'>{props.args.letztAnderung}</p>
                <p className='ordnerGrosse'>--</p>
            </div>
        </div>
    )
}


export default Ordner
