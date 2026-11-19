interface ProductoProps {
    nombre: string
    precio: number
    stock: number
}

function Producto({ nombre, precio, stock }: ProductoProps) {
    return (
        <div className="tarjeta">
            <h3>{nombre}</h3>
            <p>${precio}</p>
            <p>{stock === 0 ? "Sin stock" : `Stock: ${stock} unidades`}</p>
        </div>
    )
}
export default Producto