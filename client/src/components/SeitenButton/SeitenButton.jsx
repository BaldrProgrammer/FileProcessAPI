import './SeitenButton.css'
import textIcon from "../../assets/dateiTextIcon.png";
import abbildungIcon from "../../assets/dateiBildIcon.png";
import audioIcon from "../../assets/dateiAudioIcon.png";
import videoIcon from "../../assets/dateiVideoIcon.png";

const BUTTONS_UND_ICONS = {
    Neu: textIcon
}

function SeitenButton({ text, funktion, istNeuButton }) {
    return (
        <button onClick={funktion} className={`seitenButton${istNeuButton===true ? ' neuButton' : ''}`}>
            <img src={textIcon} width='20px'></img>
            {text}
        </button>
    )
}

export default SeitenButton
