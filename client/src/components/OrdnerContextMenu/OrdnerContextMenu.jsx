import {useContext} from "react";
import {HauptContext} from "../../context/HauptContext.js";
import './OrdnerContextMenu.css'

export function OrdnerContextMenu(props) {
    const context = useContext(HauptContext)

    return (
        <div className='ContextMenu' style={{left: context.menu.x, top: context.menu.y}} onClick={(e) => {e.stopPropagation(); props.closeMenu();}}>
            <p>Окно по правому клику</p>
            <button>Закрыть</button>
        </div>
    );
}
