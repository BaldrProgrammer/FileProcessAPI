import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import {
    HerunterladenPunkt,
    TeilenPunkt,
    UmbenennenPunkt,
    KopierenPunkt,
    EinfugenPunkt,
    AusschneidenPunkt,
    EigenschaftenPunkt,
    LoschenPunkt
} from '../KontextMenuPunkt/KontextMenuPunkt.jsx'
import './OrdnerDateiKontextMenu.css'

function OrdnerDateiKontextMenu(props) {
    const context = useContext(HauptContext)

    return (
        <div className='KontextMenu' style={{left: context.menu.x, top: context.menu.y}} onClick={(e) => {
            e.stopPropagation();
            props.setMenu(null);
        }}>
            <HerunterladenPunkt/>
            <TeilenPunkt/>
            <hr/>
            <UmbenennenPunkt/>
            <KopierenPunkt/>
            <EinfugenPunkt/>
            <AusschneidenPunkt/>
            <hr/>
            <EigenschaftenPunkt/>
            <LoschenPunkt/>
        </div>
    );
}

export default OrdnerDateiKontextMenu
