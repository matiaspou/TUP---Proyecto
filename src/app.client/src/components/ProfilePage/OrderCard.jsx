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
            if (JSON.stringify(userOrders) !== JSON.stringify(filteredOrders)) {
                setFilteredOrders(userOrders);
            }
        }
    }, [user, filteredOrders]);  

    return (
    <>
        {filteredOrders.map(order =>
        <div className="OrderCard-Conteiner" key={order.id}>
            <div className="OrderCard-Header">🔷 ID Pedido: {order.id} - Fecha de Creacion: 19/10/24 - Estado: Pendiente de pago</div>
            <div className="OrderCard-Content">
                <div className="OrderCard-ProductsDetails">
                    <label htmlFor="ul">📦 Productos</label>
                    <hr />
                    <ul>
                    {order.products.map((product, index) => (
                        (product.id != 10000 && product.id != 10001) ?
                        <li key={index}>▪️ {product.title} -  Cantidad: {product.quantity} - Precio: ${new Intl.NumberFormat('es-AR').format(Math.trunc(product.price*product.quantity))}</li>
                        : <li key={index}>▪️ {product.title} - Precio: ${new Intl.NumberFormat('es-AR').format(Math.trunc(product.price))}</li>
                    ))}
                    </ul>
                </div>

                <div className="OrderCard-Box">
                    <div className="OrderCard-BoxTitle">💲 Pago</div>
                    <hr />
                    <span>▪️ Forma de pago: {order.paymentMethod}</span>
                    <span>▪️ Precio final: ${new Intl.NumberFormat('es-AR').format(Math.trunc(order.priceTotal))}</span>
                    {(order.paymentMethod== "Efectivo")? <span>Por favor, acerquese a las oficinas para realizar el pago y continuar con el envio del pedido </span> :  (order.paymentMethod== "Transferencia Bancaria")? <><span>Por favor, realiace la transferencia bancaria a la siguiente cuenta con los siguientes datos:</span>< span>  Número de cuenta: 0006168-5 028-3  </span> <span>CUIT: 30-67561413-5</span> < span>  Razón Social: DOMINATION SYSTEM SRL  </span> <span>CBU: 0070048370000006368535</span> </> : <a href={`/payment?id=${order.id}`}>Realizar pago</a>  }

                    <span>Estado de pago : Pendiente 🕞</span>
                    
                </div>

                <div className="OrderCard-Box">
                    <div className="OrderCard-BoxTitle">🚚 Envio</div>
                    <hr />
                    <span>▪️ Forma de envio: {order.shippingMethod}</span>
                </div>

                <div className="OrderCard-Box">
                    <div className="OrderCard-BoxTitle">🧐 Acciones</div>
                    <hr />
                    <button>Ver factura 📄</button>
                    <button>Editar pedido📝</button>
                    <button>Cancelar pedido ❌</button>
                </div>
            </div>
        </div>
        )}
    </>
    )
}

export default OrderCard;
