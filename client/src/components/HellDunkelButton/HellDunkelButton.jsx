import icon from '../../assets/dunkelmodus.png'
import './HellDunkelButton.css'

function HellDunkelButton() {
    function modusWechseln() {
        console.log('modus gewechselt')
    }

    return (
        <img className='HellDunkelButton' onClick={modusWechseln} src={icon} alt='' width='50px' height='50px'/>
    )
}

export default HellDunkelButton
