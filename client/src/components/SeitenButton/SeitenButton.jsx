import './SeitenButton.css'
import neuIcon from '../../assets/buttonNeuIcon.png'
import favoritenIcon from '../../assets/buttonFavoritenIcon.png'
import kurzlichIcon from '../../assets/buttonKurzlichIcon.png'
import geteiltIcon from '../../assets/buttonGeteiltIcon.png'
import freundeIcon from '../../assets/buttonFreundenIcon.png'
import papierkorbIcon from '../../assets/buttonPapierkorbIcon.png'

const BUTTONS_UND_ICONS = {
    Neu: neuIcon,
    Favoriten: favoritenIcon,
    Kurzlich: kurzlichIcon,
    Geteilt: geteiltIcon,
    Freunden: freundeIcon,
    Papierkorb: papierkorbIcon
}

function SeitenButton({ text, funktion, istNeuButton }) {
    return (
        <button onClick={funktion} className={`seitenButton${istNeuButton===true ? ' neuButton' : ''}`}>
            <img src={BUTTONS_UND_ICONS[text.replace('ü', 'u')]} alt='' width='20px'></img>
            {text}
        </button>
    )
}

export default SeitenButton
