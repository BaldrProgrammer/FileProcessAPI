import icon from '../../assets/dunkelthema.png'
import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import './HellDunkelButton.css'

function HellDunkelButton() {
    const context = useContext(HauptContext)
    function modusWechseln() {
        console.log(context)
    }

    return (
        <img className='HellDunkelButton' onClick={modusWechseln} src={icon} alt='' width='50px' height='50px'/>
    )
}

export default HellDunkelButton
