import './WegButton.css'

function WegButton({ text, isPfeil }) {
    let classes = 'WegButton'

    classes += isPfeil ? ' Pfeil' : ''

    return (
        <button className={classes}>{text}</button>
    )
}


export default WegButton
