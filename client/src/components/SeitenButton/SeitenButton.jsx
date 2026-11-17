import './SeitenButton.css'

function SeitenButton({ text, funktion, istNeuButton }) {
    return (
        <button onClick={funktion} className={`seitenButton${istNeuButton===true ? ' neuButton' : ''}`}>
            {text}
        </button>
    )
}

export default SeitenButton
