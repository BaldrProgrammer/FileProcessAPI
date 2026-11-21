import './WegButton.css'

function WegButton(props) {
    let classes = 'WegButton'
    classes += props.welscheSeitePfeil ? props.welscheSeitePfeil : ''

    function pfadVerandern() {
        console.log(props.ordnerPfad)
        props.setAktuellPfad('/'+props.ordnerPfad.join('/'))
    }

    return (
        <button className={classes} onClick={pfadVerandern}>{props.text}</button>
    )
}


export default WegButton
