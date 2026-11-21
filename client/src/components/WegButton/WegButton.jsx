import './WegButton.css'
import { useContext } from "react";
import { PfadContext} from "../../context/PfadContext.js";

function WegButton(props) {
    let classes = 'WegButton'
    classes += props.welscheSeitePfeil ? props.welscheSeitePfeil : ''

    const aktuellPfad = useContext(PfadContext)
    function pfadVerandern() {
        console.log(props.ordnerPfad)
        props.setAktuellPfad('/'+props.ordnerPfad.join('/'))
    }
    console.log(`jetzt auf ${aktuellPfad}`)

    return (
        <button className={classes} onClick={pfadVerandern}>{props.text}</button>
    )
}


export default WegButton
