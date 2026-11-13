import './Datei.css'
import abbildungIcon from '../../assets/dateiBildIcon.png'
import audioIcon from '../../assets/dateiAudioIcon.png'
import videoIcon from '../../assets/dateiVideoIcon.png'
import textIcon from '../../assets/dateiTextIcon.png'

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

function Datei({name, ordnerPfad, letztAnderung, grosse, onClick}) {
    let MfI = 'B'
    if (grosse >= 1000) {
        MfI = 'KB'
        grosse /= 1000
    }
    if (grosse >= 1000) {
        MfI = 'MB'
        grosse /= 1000
    }
    if (grosse >= 1000) {
        MfI = 'GB'
        grosse /= 1000
    }


    let icon
    if (name.includes('.')) {
        icon = DATEIENDUNGEN_UND_ICONS[name.split('.').at(-1)]
    } else {
        icon = text
    }


    return (
        <div onClick={onClick} className="dateiVerpackung">
            <div className="datei">
                <img className='dateiIcon' src={icon} alt='' width='20px' height='20px'/>
                <p className='dateiName'>{name}</p>
                <p className='dateiAnderung'>{letztAnderung}</p>
                <p className='dateiGrosse'>{grosse.toFixed(1)}{MfI}</p>
            </div>
        </div>
    )
}


export default Datei
