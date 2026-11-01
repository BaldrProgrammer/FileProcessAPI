import './Suchenfeld.css'

function Suchenfeld({ beiTasteDruecken, beiAenderung }) {
    return (
        <input placeholder="Suchen" onKeyDown={beiTasteDruecken} onChange={beiAenderung}></input>
    )
}

export default Suchenfeld