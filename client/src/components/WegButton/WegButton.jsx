import './WegButton.css'

function WegButton({ text, welscheSeitePfeil }) {
    let classes = 'WegButton'
    classes += welscheSeitePfeil ? welscheSeitePfeil : ''

    return (
        <button className={classes}>{text}</button>
    )
}


export default WegButton
