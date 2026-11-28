import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import './WahlenCheckbox.css'

function WahlenCheckbox(props) {
    const context = useContext(HauptContext)

    function wahlen(e) {
        props.setOrdnernAusgewahlt([...context.ordnernAusgewahlt, props.id])
    }

    return (
        <div className='WahlenCheckboxVerpackung'  onClick={(e) => e.stopPropagation()}>
            <input className='WahlenCheckbox' id={`WahlenCheckbox${props.id}`} onChange={wahlen} type={'checkbox'} checked={context.ordnernAusgewahlt.includes(props.id)}/>
            <label htmlFor={`WahlenCheckbox${props.id}`}></label>
        </div>
    )
}

export default WahlenCheckbox
