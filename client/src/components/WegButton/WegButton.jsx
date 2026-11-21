import './WegButton.css'

function WegButton(props) {
    let classes = 'WegButton'
    classes += props.welscheSeitePfeil ? props.welscheSeitePfeil : ''

    function pfadVerandern() {
        console.log('WegButton ' + props.ordnerPfad + ' wurde gedrückt')
        props.setAktuellPfad('/'+props.ordnerPfad.join('/'))
    }

    function pfeilButton(richtung) {
        if (richtung === ' LinkerPfeil') {
            console.log('der linke Pfeil')
        } else if (richtung === ' RechterPfeil') {
            console.log('der rechte Pfeil')
        }
    }

    return (
        <button className={classes} onClick={props.welscheSeitePfeil ? () => pfeilButton(props.welscheSeitePfeil) : pfadVerandern}>{props.text}</button>
    )
}


export default WegButton
