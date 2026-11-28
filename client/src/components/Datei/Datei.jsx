import {useContext, useState} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import './Datei.css'
import abbildungIcon from '../../assets/dateiIcon/dateiIconBild.png'
import audioIcon from '../../assets/dateiIcon/dateiIconAudio.png'
import videoIcon from '../../assets/dateiIcon/dateiIconVideo.png'
import textIcon from '../../assets/dateiIcon/dateiIconText.png'
import WahlenCheckbox from "../WahlenCheckbox/WahlenCheckbox.jsx";

const DATEIENDUNGEN_UND_ICONS = {
    txt: textIcon,

    jpg: abbildungIcon,
    jpeg: abbildungIcon,
    png: abbildungIcon,
    webm: abbildungIcon,
    svg: abbildungIcon,

    mp3: audioIcon,
    m4a: audioIcon,
    wav: audioIcon,
    ogg: audioIcon,

    mp4: videoIcon,
    mov: videoIcon,
    mkv: videoIcon,
    avi: videoIcon,
}

function Datei(props) {
    const context = useContext(HauptContext)
    const [istAktiv, setIstAktiv] = useState(false)

    let MfI = 'B'
    if (props.args.grosse >= 1000) {
        MfI = 'KB'
        props.args.grosse /= 1000
    }
    if (props.args.grosse >= 1000) {
        MfI = 'MB'
        props.args.grosse /= 1000
    }
    if (props.args.grosse >= 1000) {
        MfI = 'GB'
        props.args.grosse /= 1000
    }

    let icon
    if (props.args.name.includes('.')) {
        icon = DATEIENDUNGEN_UND_ICONS[props.args.name.split('.').at(-1)]
    } else {
        icon = textIcon
    }

    function ordnerMausEin() {
        setIstAktiv(true)
    }

    function ordnerMausAus() {
        setIstAktiv(false)
    }

    function dateiWahlen(e) {
        e.stopPropagation();
        props.setMenu(null)
        if (e.ctrlKey || e.metaKey) {
            props.setDateienAusgewahlt([...context.dateienAusgewahlt, props.args.id])
        } else {
            props.setOrdnernAusgewahlt([])
            props.setDateienAusgewahlt([props.args.id])
        }
    }

    function dateiOffnen(dateiPfad) {
        console.log(`${dateiPfad} öffnet sich`)
    }


    return (
        <div  className={`dateiVerpackung ${context.dateienAusgewahlt.includes(props.args.id) ? 'ausgewahlt' : ''}`}
              ref={props.ref} onContextMenu={props.handleContextMenu}
              onClick={dateiWahlen}
              onDoubleClick={() => dateiOffnen(props.args.dateiPfad)}
              onMouseEnter={ordnerMausEin}
              onMouseLeave={ordnerMausAus}
        >
            <div className="datei">
                {(istAktiv || context.dateienAusgewahlt.includes(props.args.id) || context.ordnernAusgewahlt.length > 0 ||  context.dateienAusgewahlt.length > 0) && <WahlenCheckbox id={props.args.id} typ='Datei' setDateienAusgewahlt={props.setDateienAusgewahlt}/>}
                <img className='dateiIcon' src={icon} alt='' width='20px' height='20px'/>
                <p className='dateiName'>{props.args.name}</p>
                <p className='dateiAnderung'>{props.args.letztAnderung}</p>
                <p className='dateiGrosse'>{props.args.grosse % 1 === 0 ? props.args.grosse : props.args.grosse.toFixed(1)}{MfI}</p>
            </div>
        </div>
    )
}


export default Datei
