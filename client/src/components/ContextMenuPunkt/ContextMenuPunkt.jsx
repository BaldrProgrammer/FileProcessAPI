import './ContextMenuPunkt.css'
import herunterladenIcon from '../../assets/punktIcon/punktIconHerunterladen.png'
import teilenIcon from '../../assets/punktIcon/punktIconTeilen.png'
import umbenennenIcon from '../../assets/punktIcon/punktIconUmbenennen.png'
import kopierenIcon from '../../assets/punktIcon/punktIconKopieren.png'
import einfugenIcon from '../../assets/punktIcon/punktIconEinfugen.png'
import ausschneidenIcon from '../../assets/punktIcon/punktIconAusschneiden.png'
import eigenschaftenIcon from '../../assets/punktIcon/pinktIconEigenschaften.png'
import loschenIcon from '../../assets/punktIcon/punktIconLoschen.png'

const BUTTONS_UND_ICONS = {
    Herunterladen: herunterladenIcon,
    Teilen: teilenIcon,
    Umbenennen: umbenennenIcon,
    Kopieren: kopierenIcon,
    Einfugen: einfugenIcon,
    Ausschneiden: ausschneidenIcon,
    Eigenschaften: eigenschaftenIcon,
    Loschen: loschenIcon
}

function ContextMenuPunkt(props) {
    return (
        <button className='ContextMenuPunkt'>
            <img src={BUTTONS_UND_ICONS[props.text.replace('ü', 'u').replace('ö', 'o')]} alt='gfd,' width='30px'/>
            {props.text}
        </button>
    )
}

export default ContextMenuPunkt
