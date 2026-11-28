import './WahlenCheckbox.css'

function WahlenCheckbox(props) {
    return (
        <div>
            <input className='WahlenCheckbox' id={`WahlenCheckbox${props.id}`} type={'checkbox'} />
            <label htmlFor={`WahlenCheckbox${props.id}`}></label>
        </div>
    )
}

export default WahlenCheckbox
