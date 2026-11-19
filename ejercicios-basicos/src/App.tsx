import './App.css'
import Producto from './Ej1'
import Contador from './Ej2'
import Tarjeta from './Ej3'
import Calculador from './Ej4'
import Lista from './Ej5'
import Buscador from './Ej6'
import ProductoT from './Ej7'

function App() {

  return (
    <>
      <p>Ejercicio 1: Tarjetas de producto</p>
      <div className='cont'>
        <Producto nombre="Teclado" precio={45000} stock={0} />
        <Producto nombre="Mouse" precio={18000} stock={5} />
        <Producto nombre="Parlante" precio={35000} stock={8} />
      </div>

      <p>Ejercicio 2: Contador</p>
      <Contador></Contador>

      <p>Ejercicio 3: Mostrar y ocultar</p>
      <Tarjeta></Tarjeta>

      <p>Ejercicio 4: Conversor de grados</p>
      <Calculador></Calculador>

      <p>Ejercicio 5: Lista de compras</p>
      <Lista></Lista>

      <p>Ejercicio 6: Buscador de lenguajes</p>
      <Buscador></Buscador>

      <p>Ejercicio 7: Tarjetas de producto 2</p>
      <div className='cont'>
        <ProductoT nombre="Teclado" precio={35000} oferta stock={2} />
        <ProductoT nombre="Mouse" precio={18000} stock={0} />
        <ProductoT nombre="Parlante" precio={32000} oferta stock={7} />
      </div>

    </>

  )
}

export default App
