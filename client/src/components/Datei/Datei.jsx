import './Datei.css'
import icon from '../../assets/ordnerIcon.png'

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

    return (
        <div className="dateiVerpackung">
            <div onClick={onClick} className="datei">
                <img className='dateiIcon' src={icon} alt='' width='20px' height='20px'/>
                <p className='dateiName'>{name}</p>
                <p className='dateiAnderung'>{letztAnderung}</p>
                <p className='dateiGrosse'>{grosse.toFixed(1)}{MfI}</p>
            </div>
        </div>
    )
}


export default Datei
