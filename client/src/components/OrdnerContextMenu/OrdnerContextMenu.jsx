import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import ContextMenuItem from '../ContextMenuItem/ContextMenuItem.jsx'
import './OrdnerContextMenu.css'

export function OrdnerContextMenu(props) {
    const context = useContext(HauptContext)

    return (
        <div className='ContextMenu' style={{left: context.menu.x, top: context.menu.y}} onClick={(e) => {e.stopPropagation(); props.closeMenu();}}>
            <ContextMenuItem text='Herunterladen'/>
            <ContextMenuItem text='geteilen'/>
            <hr/>
            <ContextMenuItem text='Umbenennen'/>
            <ContextMenuItem text='kopieren'/>
            <ContextMenuItem text='einfügen'/>
            <ContextMenuItem text='ausschneiden'/>
            <hr/>
            <ContextMenuItem text='Eigenschaften'/>
            <ContextMenuItem text='löschen'/>
        </div>
    );
}
