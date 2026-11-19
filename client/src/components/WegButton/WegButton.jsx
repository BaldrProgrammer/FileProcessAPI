import './WegButton.css'
import {useState} from "react";
import {useRef} from "react";


function WegButton(props) {

    let classes = 'WegButton'
    classes += props.args.welscheSeitePfeil ? props.args.welscheSeitePfeil : ''

    function wegButton(buttonIndex) {
        buttonRefs[buttonIndex].current.classList.add('aktiv')
        if (aktivButton) {
            aktivButton.classList.remove('aktiv')
        }
        setAktivButton(buttonRefs[buttonIndex].current)
        console.log(buttonRefs[buttonIndex].current.textContent)
    }

    return (
        <button className={classes} ref={ref} onClick={() => wegButton()}>{props.args.text}</button>
    )
}


export default WegButton
