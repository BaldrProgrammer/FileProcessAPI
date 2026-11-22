import './SortButton.css'

function SortButton(props) {
    function sortButton(name) {
        console.log(`jetzt das sortiert nach ${name}`)
    }

    return (
        <button className={props.text === 'Name' ? 'NameSortButton' : 'SortButton'} onClick={() => sortButton(props.text)}>
            {props.text}
        </button>
    )
}

export default SortButton
