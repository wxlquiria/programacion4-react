import { useState } from "react";

const lenguajes = [
    {id: 1, nombre: "JavaScript"},
    {id: 2, nombre: "Python" },
    {id: 3, nombre: "Java" },
    {id: 4, nombre: "C#" },
    {id: 5, nombre: "TypeScript" },
    {id: 6, nombre: "PHP" },
];

function Buscador(){
    const [buscar, setBuscar] = useState("")
    const filtrado = lenguajes.filter((lenguaje) =>
        lenguaje.nombre.toLowerCase().includes(buscar.toLowerCase().trim()))

  return (
    <div className="buscador">

        <input 
        className="buscador-input"
        placeholder="Buscá un lenguaje"
            value = {buscar}
            onChange={(e) => setBuscar(e.target.value)}
        />
        <p className="buscador-cantidad">{filtrado.length === 1 ? "Resultado: " : "Resultados: " } {filtrado.length}</p>
      <ul className="buscador-items">
        {filtrado.map((lenguaje) => (
          <li className="buscador-item" key= {lenguaje.id}>
            {lenguaje.nombre}
          </li>
        ))}
      </ul>
    </div>
  );

}
export default Buscador;