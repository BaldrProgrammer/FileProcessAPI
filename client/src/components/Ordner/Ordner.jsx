import './Ordner.css'
import icon from '../../assets/ordnerIcon.png'

function Ordner({ name, ordnerPfad, letztAnderung, onClick }) {
    return (
        <div className="einOrdnerVerpackung">
            <div onClick={onClick} className="einOrdner">
                <img className='ordnerIcon' src={icon} alt='' width='20px' height='20px'/>
                <p className='ordnerName'>{name}</p>
                <p className='ordnerAnderung'>{letztAnderung}</p>
                <p className='ordnerGrosse'>--</p>
            </div>
        </div>
    )
}


export default Ordner
