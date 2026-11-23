import icon from '../../assets/dunkelthema.png'
import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import './HellDunkelButton.css'

function HellDunkelButton({ setThema }) {
    const context = useContext(HauptContext)
    function modusWechseln() {
        setThema(context.thema === 'hell' ? 'dunkel' : 'hell')
    }

    return (
        <img className={`HellDunkelButton ${context.thema === 'hell' ? 'hell' : 'dunkel'}`} onClick={modusWechseln} src={icon} alt='' width='50px' height='50px'/>
    )
}

export default HellDunkelButton
