import './Datei.css'

function Datei({ name, dateiendung, ordnerPfad, letztAnderung, grosse, onClick }) {
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
        <div onClick={onClick} className="dateiVerpackung">
            <div className="datei">
                <img className='dateiIcon' src='../../assets/logo.png' alt='' width='20px' height='20px'/>
                <p className='dateiName'>{name}</p>
                <p className='dateiAnderung'>{letztAnderung}</p>
                <p className='dateiGrosse'>{grosse.toFixed(1)}{MfI}</p>
            </div>
        </div>
    )
}


export default Datei
