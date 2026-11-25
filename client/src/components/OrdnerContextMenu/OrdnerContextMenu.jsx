import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import ContextMenuPunkt from '../ContextMenuPunkt/ContextMenuPunkt.jsx'
import './OrdnerContextMenu.css'

export function OrdnerContextMenu(props) {
    const context = useContext(HauptContext)

    return (
        <div className='ContextMenu' style={{left: context.menu.x, top: context.menu.y}} onClick={(e) => {e.stopPropagation(); props.closeMenu();}}>
            <ContextMenuPunkt text='Herunterladen'/>
            <ContextMenuPunkt text='geteilen'/>
            <hr/>
            <ContextMenuPunkt text='Umbenennen'/>
            <ContextMenuPunkt text='kopieren'/>
            <ContextMenuPunkt text='einfügen'/>
            <ContextMenuPunkt text='ausschneiden'/>
            <hr/>
            <ContextMenuPunkt text='Eigenschaften'/>
            <ContextMenuPunkt text='löschen'/>
        </div>
    );
}
