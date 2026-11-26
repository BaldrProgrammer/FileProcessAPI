import './Ordner.css'
import {useState, useContext} from 'react';
import {HauptContext} from "../../context/HauptContext.js";
import icon from '../../assets/dateiIcon/ordnerIcon.png'

function Ordner(props) {
    const context = useContext(HauptContext)

    function ordnerOffnen(ordnerPfad) {
        console.log(props.ref.current)
        props.setAktuellPfad(ordnerPfad)
    }

    return (
        <div className="einOrdnerVerpackung" ref={props.ref} onContextMenu={props.handleContextMenu} onDoubleClick={() => ordnerOffnen(props.args.ordnerPfad)}>
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
