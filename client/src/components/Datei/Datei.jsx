import './Datei.css'
import abbildung from '../../assets/dateiBildIcon.png'
import text from '../../assets/dateiTextIcon.png'

const DATEIENDUNGEN_UND_ICONS = {
    jpg: abbildung,
    jpeg: abbildung,
    png: abbildung,
    webm: abbildung,
    svg: abbildung,

    txt: text
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
