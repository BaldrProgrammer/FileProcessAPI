import './Datei.css'
import image from '../../assets/image.png'
import text from '../../assets/textfile.png'

const DATEIENDUNGEN_UND_ICONS = {
    jpg: image,
    jpeg: image,
    png: image,
    webm: image,
    txt: text
}

function Datei({ name, ordnerPfad, letztAnderung, grosse, onClick }) {
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


    console.log(name.split('.').at(-1))
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
