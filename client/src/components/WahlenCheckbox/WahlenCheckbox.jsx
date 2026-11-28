import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import './WahlenCheckbox.css'

function WahlenCheckbox(props) {
    const context = useContext(HauptContext)

    function wahlen() {
        if (props.typ === 'Ordner') {
            props.setOrdnernAusgewahlt([...context.ordnernAusgewahlt, props.id])
        } else if (props.typ === 'Datei') {
            props.setDateienAusgewahlt([...context.dateienAusgewahlt, props.id])
        }
    }

    return (
        <div className='WahlenCheckboxVerpackung'  onClick={(e) => e.stopPropagation()}>
            <input className='WahlenCheckbox' id={`WahlenCheckbox${props.typ}${props.id}`} onChange={wahlen} type={'checkbox'} checked={props.typ === 'Ordner' ? context.ordnernAusgewahlt.includes(props.id) : context.dateienAusgewahlt.includes(props.id)}/>
            <label htmlFor={`WahlenCheckbox${props.typ}${props.id}`}></label>
        </div>
    )
}

export default WahlenCheckbox
