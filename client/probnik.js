import { useRef } from 'react';

function ItemList({ items }) {
    // Создаем один реф, который будет хранить коллекцию Map
    const itemsRef = useRef(new Map());

    const handleScrollTo = (id) => {
        // Достаем нужный DOM-элемент по id
        const node = itemsRef.current.get(id);
        if (node) {
            node.scrollIntoView({ behavior: 'smooth', block: 'center' });
            node.style.backgroundColor = '#ffffcc'; // Пример прямого изменения
        }
    };

    return (
        <div>
            {/* Кнопки для проверки работы */}
            <div style={{ marginBottom: '20px' }}>
                {items.map((item) => (
                    <button key={item.id} onClick={() => handleScrollTo(item.id)}>
                        Перейти к {item.name}
                    </button>
                ))}
            </div>

            {/* Сам список */}
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        // Передаем функцию (колбэк-реф) вместо объекта
                        ref={(node) => {
                            if (node) {
                                // Когда элемент монтируется, сохраняем его в Map
                                itemsRef.current.set(item.id, node);
                            } else {
                                // Когда элемент удаляется из DOM, очищаем ссылку, чтобы не было утечки памяти
                                itemsRef.current.delete(item.id);
                            }
                        }}
                        style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
