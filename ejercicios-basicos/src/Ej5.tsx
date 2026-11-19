import { useState } from "react";

interface Item {
    nombre: string
    id: number
}

function Lista() {
    const [items, setItems] = useState<Item[]>([])
    const [inp, setInp] = useState("")

    function agregar() {
        if (inp.trim() === "") {
            return
        }
        setItems([...items, { nombre: inp, id: Date.now() }]);
        setInp("")
    }
    return (
        <div className="lista">
            <div className="lista-form">
                <input
                    className="lista-input"
                    value={inp}
                    onChange={(e) => setInp(e.target.value)} />
                <button onClick={agregar}>Agregar</button>
            </div>

            <ul className="lista-items">
                {items.map((item) => (
                    <li className="lista-item" key={item.id}>
                        {item.nombre}
                        <button className="boton" onClick={() => setItems(items.filter((i) => i.id !== item.id))}>Eliminar</button></li>
                ))}
            </ul>
            {items.length === 0 && <p className="lista-vacia">No hay nada para comprar</p>}
        </div>
    )
}

export default Lista