import './Suchenfeld.css'
import {useState} from "react";

function Suchenfeld({ beiTasteDruecken, beiAenderung }) {
    const [suchtext, setSuchtext] = useState("")

    function suchen(event) {
        if (event.key === 'Enter') {
            console.log(suchtext)
        }
    }

    return (
        <input placeholder="Suchen" onKeyDown={(e) => suchen(e)} onChange={(e) => setSuchtext(e.target.value)}></input>
    )
}

export default Suchenfeld
