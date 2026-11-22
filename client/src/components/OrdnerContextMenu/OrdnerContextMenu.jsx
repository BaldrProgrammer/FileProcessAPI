import {useState} from "react";
import './OrdnerContextMenu.css'

export function OrdnerContextMenu() {
    const [menu, setMenu] = useState(null);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setMenu({ x: e.clientX, y: e.clientY });
    };

    const closeMenu = () => setMenu(null);

    return (
        <div
            onContextMenu={handleContextMenu}
            onClick={closeMenu}
            style={{ minHeight: '300px', border: '1px solid #ccc', padding: '16px' }}
        >
            {menu && (
                <div onClick={(e) => e.stopPropagation()}>
                    <p>Окно по правому клику</p>
                    <button onClick={closeMenu}>Закрыть</button>
                </div>
            )}
        </div>
    );
}
