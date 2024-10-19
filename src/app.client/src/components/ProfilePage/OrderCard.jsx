import './OrderCard.css'
import { useCart } from "../../context/CartController.jsx";

export function OrderCard() {
   
    const { getProductsInCart, getPriceTotalOfCart} = useCart();

    const productsInCart = getProductsInCart();

    const productsPriceTotal = getPriceTotalOfCart();

    return(
    <>
        <div className="OrderCard-Conteiner" >
            <div className="OrderCard-Header">🔷 ID Pedido: 2441 - Fecha de Creacion: 19/10/24 - Estado: Pendiente de pago</div>
            <div className="OrderCard-Content">
                
                <div className="OrderCard-ProductsDetails">
                    <label htmlFor="ul">📦 Productos</label>
                    <hr />
                    <ul>
                    {productsInCart.map(product => { return <li key={product.id}>▪️ {product.title} - Precio: ${new Intl.NumberFormat('es-AR').format(Math.trunc(product.price))}</li>})}
                    </ul>
                </div>

                <div className="OrderCard-Payment">
                    <label htmlFor="ul">💲 Pago</label>
                    <hr />
                </div>

                <div className="OrderCard-Payment">
                    <label htmlFor="ul">🚚 Envio</label>
                    <hr />
                </div>

                <div className="OrderCard-Payment">
                    <label htmlFor="ul">📝 Detalles</label>
                    <hr />
                </div>

            </div>
        </div>
    </>
    )
}

export default OrderCard