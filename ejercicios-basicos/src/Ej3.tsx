import { useState } from "react";

function Tarjeta() {
    const [visible, setVisible] = useState(false)

    return (
        <div className="faq">
            <h3 className="faq-pregunta">¿Qué es JSX?</h3>
            <button className ="boton" onClick={() => setVisible(!visible)}>
                {visible ? "Ocultar respuesta." : "Mostrar respuesta."}
            </button>
            {visible && <p className="faq-respuesta">Una sintaxis que permite escribir estructura parecida a HTML dentro de JavaScript. Se transforma en llamadas a funciones de React.</p>}
        </div>
    )

}export default Tarjeta