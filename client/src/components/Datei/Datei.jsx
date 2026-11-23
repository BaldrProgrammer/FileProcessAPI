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

function Datei(props) {
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

    function dateiOffnen(dateiPfad) {
        console.log(`${dateiPfad} öffnet sich`)
    }


    return (
        <div  className="dateiVerpackung" onContextMenu={props.handleContextMenu} onClick={() => dateiOffnen(props.args.dateiPfad)}>
            <div className="datei">
                <img className='dateiIcon' src={icon} alt='' width='20px' height='20px'/>
                <p className='dateiName'>{props.args.name}</p>
                <p className='dateiAnderung'>{props.args.letztAnderung}</p>
                <p className='dateiGrosse'>{props.args.grosse % 1 === 0 ? props.args.grosse : props.args.grosse.toFixed(1)}{MfI}</p>
            </div>
        </div>
    )
}


export default Datei
