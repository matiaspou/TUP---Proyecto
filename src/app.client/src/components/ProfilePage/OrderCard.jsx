import './OrderCard.css';
import { useEffect, useState } from 'react';
import orders from "../../mocks/orders.json";
import { useSession } from '../../context/SessionContext.jsx';

export function OrderCard() {
    const { user } = useSession(); 
    const [filteredOrders, setFilteredOrders] = useState([]); 

    useEffect(() => {
        if (user) { 
            const userOrders = orders.filter(order => order.client === user.email); 
            setFilteredOrders(userOrders);
        }
    }, [user]);  

    return (
    <>
        {filteredOrders.map(order =>
        <div className="OrderCard-Conteiner">
            <div className="OrderCard-Header">🔷 ID Pedido: {order.id} - Fecha de Creacion: 19/10/24 - Estado: Pendiente de pago</div>
            <div className="OrderCard-Content">
                
                <div className="OrderCard-ProductsDetails">
                    <label htmlFor="ul">📦 Productos</label>
                    <hr />
                    <ul>
                    {order.products.map(product => (
                        <li key={product.id}>▪️ {product.title} - Cantidad: {product.quantity} - Precio: ${new Intl.NumberFormat('es-AR').format(Math.trunc(product.price*product.quantity))}</li>
                    ))}
                    </ul>
                </div>

                <div className="OrderCard-Box">
                    <div className="OrderCard-BoxTitle">💲 Pago</div>
                    <hr />
                    <span>▪️ Forma de pago: {order.paymentMethod}</span>
                    <div className="OrderCard-MPButton">
                        {getMPButton(order.products)}
                        <div id="wallet_container"></div> {/* Aquí se mostrará el botón de pago */}
                    </div>
            
                </div>

                <div className="OrderCard-Box">
                    <div className="OrderCard-BoxTitle">🚚 Envio</div>
                    <hr />
                    <span>▪️ Forma de envio: {order.shippingMethod}</span>
                </div>

                <div className="OrderCard-Box">
                <div className="OrderCard-BoxTitle">📝 Detalles</div>
                    <hr />
                    <button>Ver factura 📄</button>
                    <button>Cancelar pedido ❌</button>
                </div>
            </div>
        </div>
        )}
    </>
    )
}

export default OrderCard;
