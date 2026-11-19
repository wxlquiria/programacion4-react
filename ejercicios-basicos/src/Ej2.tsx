import { useState } from "react";

function Contador() {
    const [cont, setCont] = useState(0)
    return (
        <div className="contador">

            <p className="numero">{cont}</p>

            <div className="contador-botones">
                <button className="boton" disabled={cont >= 10} onClick={() => setCont(cont + 1)}> + </button>
                <button className="boton" disabled={cont <= 0} onClick={() => setCont(cont - 1)}> - </button>
                <button className="boton" disabled={cont <= 0} onClick={() => setCont(0)}>Reiniciar</button>
            </div>

            {cont >= 10 && <p className="mensaje">Estás en el máximo</p>}
            {cont <= 0 && <p className="mensaje">Estás en el mínimo</p>}
        </div>
    )
}

export default Contador

