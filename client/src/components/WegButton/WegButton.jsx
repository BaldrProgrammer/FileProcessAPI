import './WegButton.css'

function WegButton(props) {
    let classes = 'WegButton'
    classes += props.welscheSeitePfeil ? props.welscheSeitePfeil : ''

    function pfadVerandern() {

    }

    return (
        <button className={classes} onClick={pfadVerandern}>{props.text}</button>
    )
}


export default WegButton
