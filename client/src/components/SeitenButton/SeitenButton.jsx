import './SeitenButton.css'
import neuIcon from '../../assets/seitenButtonIcon/seitenButtonIconNeu.png'
import favoritenIcon from '../../assets/seitenButtonIcon/seitenButtonIconFavoriten.png'
import kurzlichIcon from '../../assets/seitenButtonIcon/seitenButtonIconKurzlich.png'
import geteiltIcon from '../../assets/seitenButtonIcon/seitenButtonIconGeteilt.png'
import freundeIcon from '../../assets/seitenButtonIcon/seitenButtonIconFreunden.png'
import papierkorbIcon from '../../assets/seitenButtonIcon/seitenButtonIconPapierkorb.png'

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
