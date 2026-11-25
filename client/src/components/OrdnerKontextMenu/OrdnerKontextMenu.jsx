import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import KontextMenuPunkt from '../KontextMenuPunkt/KontextMenuPunkt.jsx'
import './OrdnerKontextMenu.css'

function OrdnerKontextMenu(props) {
    const context = useContext(HauptContext)

    return (
        <div className='KontextMenu' style={{left: context.menu.x, top: context.menu.y}} onClick={(e) => {e.stopPropagation(); props.closeMenu();}}>
            <KontextMenuPunkt text='Herunterladen'/>
            <KontextMenuPunkt text='Teilen'/>
            <hr/>
            <KontextMenuPunkt text='Umbenennen'/>
            <KontextMenuPunkt text='Kopieren'/>
            <KontextMenuPunkt text='Einfügen'/>
            <KontextMenuPunkt text='Ausschneiden'/>
            <hr/>
            <KontextMenuPunkt text='Eigenschaften'/>
            <KontextMenuPunkt text='Löschen'/>
        </div>
    );
}

export default OrdnerKontextMenu
