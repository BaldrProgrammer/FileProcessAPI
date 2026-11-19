import './WegButton.css'

function WegButton({ text, ref, welscheSeitePfeil, onClick }) {
    let classes = 'WegButton'
    classes += welscheSeitePfeil ? welscheSeitePfeil : ''

    return (
        <button className={classes} ref={ref} onClick={onClick}>{text}</button>
    )
}


export default WegButton
