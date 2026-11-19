import { useState } from "react";

function Calculador(){

    const [grados, setGrados] = useState("")
    const g = Number(grados)

    return(
        <div className="calculador">
        <input className="calculador-input "type="number"
        placeholder="Grados Celsius"
        value ={grados}
        onChange={(e) => setGrados(e.target.value)}/>        
        {grados !== "" && <p className="calculador-resultado">{(g*9/5+32).toFixed(1)} °F</p>} 

        {g >30 && <p className="mensaje">Hace calor</p>}
        </div>   
    )   
}

export default Calculador