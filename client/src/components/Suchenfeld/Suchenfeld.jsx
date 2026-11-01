import './Suchenfeld.css'

function Suchenfeld({ onTasteDruecken }) {
    return (
        <input placeholder="Suchen" onKeyDown={onTasteDruecken}></input>
    )
}

export default Suchenfeld