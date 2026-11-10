import './Datei.css'
import icon from '../../assets/ordnerIcon.png'

function Datei({ name, ordnerPfad, letztAnderung, grosse, onClick }) {
    let MfI = 'B'
    if (grosse >= 1000) {
        MfI = 'KB'
        grosse /= 1000
    if (grosse >= 1000) {
        MfI = 'MB'
        grosse /= 1000
    }
    if (grosse >= 1000) {
        MfI = 'GB'
        grosse /= 1000
    }
    grosse = grosse.toFixed(1)

    return (
        <div className="einOrdnerVerpackung">
            <div onClick={onClick} className="einOrdner">
                <img className='ordnerIcon' src={icon} alt='' width='20px' height='20px'/>
                <p className='ordnerName'>{name}</p>
                <p className='ordnerAnderung'>{letztAnderung}</p>
                <p className='ordnerGrosse'>{grosse}{MfI}</p>
            </div>
        </div>
    )
}}


export default Datei
