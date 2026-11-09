import './Ordner.css'
import icon from '../../assets/ordnerIcon.png'

function Ordner({ name, ordnerPfad, onClick }) {
    return (
        <div onClick={onClick} className="einOrdner">
            <img className='ordnerIcon' src={icon} alt='' width='20px' height='20px'/>
        </div>
    )
}


export default Ordner
