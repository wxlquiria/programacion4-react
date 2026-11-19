interface ProductoTProps {
    nombre: string
    precio: number
    stock: number
    oferta?: boolean
}

function ProductoT({ nombre, precio, stock, oferta }: ProductoTProps) {
    return (
        <div className="tarjeta">
            <h3>{nombre}</h3>
            {oferta === true && <p>Oferta!</p>}
            <p>${precio}</p>
            <p>{stock === 0 ? "Sin stock" : `Stock: ${stock} unidades`}</p>
        </div>
    )
}
export default ProductoT