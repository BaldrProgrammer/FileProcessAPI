import './KontextMenuPunkt.css'
import herunterladenIcon from '../../assets/punktIcon/punktIconHerunterladen.png'
import teilenIcon from '../../assets/punktIcon/punktIconTeilen.png'
import umbenennenIcon from '../../assets/punktIcon/punktIconUmbenennen.png'
import kopierenIcon from '../../assets/punktIcon/punktIconKopieren.png'
import einfugenIcon from '../../assets/punktIcon/punktIconEinfugen.png'
import ausschneidenIcon from '../../assets/punktIcon/punktIconAusschneiden.png'
import eigenschaftenIcon from '../../assets/punktIcon/pinktIconEigenschaften.png'
import loschenIcon from '../../assets/punktIcon/punktIconLoschen.png'

const BUTTONS_UND_ICONS = {
    Herunterladen: herunterladenIcon,
    Teilen: teilenIcon,
    Umbenennen: umbenennenIcon,
    Kopieren: kopierenIcon,
    Einfugen: einfugenIcon,
    Ausschneiden: ausschneidenIcon,
    Eigenschaften: eigenschaftenIcon,
    Loschen: loschenIcon
}

function KontextMenuPunkt(props) {
    let iconSchlussel = props.text.replace('ü', 'u').replace('ö', 'o')

    return (
        <button className='KontextMenuPunkt' onClick={props.onClick}>
            <img src={BUTTONS_UND_ICONS[iconSchlussel]} alt='' width='30px'/>
            {props.text}
        </button>
    )
}

function HerunterladenPunkt() {
    function herunterladen() {
        console.log('HerunterladenPunkt')
    }

    return (
        <KontextMenuPunkt text='Herunterladen' onClick={herunterladen}/>
    )
}

function TeilenPunkt() {
    function teilen() {
        console.log('TeilenPunkt')
    }

    return (
        <KontextMenuPunkt text='Teilen' onClick={teilen}/>
    )
}

function UmbenennenPunkt() {
    function umbenennen() {
        console.log('UmbenennenPunkt')
    }

    return (
        <KontextMenuPunkt text='Umbenennen' onClick={umbenennen}/>
    )
}

function KopierenPunkt() {
    function kopieren() {
        console.log('KopierenPunkt')
    }

    return (
        <KontextMenuPunkt text='Kopieren' onClick={kopieren}/>
    )
}

function EinfugenPunkt() {
    function einfugen() {
        console.log('EinfugenPunkt')
    }

    return (
        <KontextMenuPunkt text='Einfügen' onClick={einfugen}/>
    )
}

function AusschneidenPunkt() {
    function ausschneiden() {
        console.log('AusschneidenPunkt')
    }

    return (
        <KontextMenuPunkt text='Ausschneiden' onClick={ausschneiden}/>
    )
}

function EigenschaftenPunkt() {
    function eigenschaften() {
        console.log('EigenschaftenPunkt')
    }

    return (
        <KontextMenuPunkt text='Eigenschaften' onClick={eigenschaften}/>
    )
}

function LoschenPunkt() {
    function loschen() {
        console.log('LoschenPunkt')
    }

    return (
        <KontextMenuPunkt text='Löschen' onClick={loschen}/>
    )
}

export {
    HerunterladenPunkt,
    TeilenPunkt,
    UmbenennenPunkt,
    KopierenPunkt,
    EinfugenPunkt,
    AusschneidenPunkt,
    EigenschaftenPunkt,
    LoschenPunkt
}
