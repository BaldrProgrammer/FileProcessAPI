import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import ContextMenuPunkt from '../ContextMenuPunkt/ContextMenuPunkt.jsx'
import './OrdnerContextMenu.css'

export function OrdnerContextMenu(props) {
    const context = useContext(HauptContext)

    return (
        <div className='ContextMenu' style={{left: context.menu.x, top: context.menu.y}} onClick={(e) => {e.stopPropagation(); props.closeMenu();}}>
            <ContextMenuPunkt text='Herunterladen'/>
            <ContextMenuPunkt text='Teilen'/>
            <hr/>
            <ContextMenuPunkt text='Umbenennen'/>
            <ContextMenuPunkt text='Kopieren'/>
            <ContextMenuPunkt text='Einfügen'/>
            <ContextMenuPunkt text='Ausschneiden'/>
            <hr/>
            <ContextMenuPunkt text='Eigenschaften'/>
            <ContextMenuPunkt text='Löschen'/>
        </div>
    );
}
