import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import ContextMenuItem from '../ContextMenuItem/ContextMenuItem.jsx'
import './OrdnerContextMenu.css'

export function OrdnerContextMenu(props) {
    const context = useContext(HauptContext)

    return (
        <div className='ContextMenu' style={{left: context.menu.x, top: context.menu.y}} onClick={(e) => {e.stopPropagation(); props.closeMenu();}}>
            <ContextMenuItem text='Herunterladen'/>
            <ContextMenuItem text='Umbenennen'/>
            <hr/>
            <ContextMenuItem text='copy'/>
            <ContextMenuItem text='copy'/>
        </div>
    );
}
