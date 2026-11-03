import './WegButton.css'

function WegButton({ text, welscheSeitePfeil, onClick }) {
    let classes = 'WegButton'
    classes += welscheSeitePfeil ? welscheSeitePfeil : ''

    return (
        <button className={classes} onClick={onClick}>{text}</button>
    )
}


export default WegButton
