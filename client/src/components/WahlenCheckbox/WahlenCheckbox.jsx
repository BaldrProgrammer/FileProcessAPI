import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import './WahlenCheckbox.css'

function WahlenCheckbox(props) {
    const context = useContext(HauptContext)
    return (
        <div>
            <input className='WahlenCheckbox' id={`WahlenCheckbox${props.id}`} type={'checkbox'} checked={context.ordnernAusgewahlt.includes(props.id)}/>
            <label htmlFor={`WahlenCheckbox${props.id}`}></label>
        </div>
    )
}

export default WahlenCheckbox
