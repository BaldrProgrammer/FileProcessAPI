import './WahlenCheckbox.css'

function WahlenCheckbox(props) {
    return (
        <div>
            <input className='WahlenCheckbox' id='WahlenCheckbox' type={'checkbox'} />
            <label htmlFor='WahlenCheckbox'></label>
        </div>
    )
}

export default WahlenCheckbox
