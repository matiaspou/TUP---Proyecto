import './OrderCard.css';
import { useEffect, useState } from 'react';
import orders from "../../mocks/orders.json";
import { useSession } from '../../context/SessionContext.jsx';

export function OrderCard() {
    const { user } = useSession(); 
    const [filteredOrders, setFilteredOrders] = useState([]); 
    const [preferenceId, setPreferenceId] = useState(null);
    const [total, setTotal] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (user) { 
            const userOrders = orders.filter(order => order.client === user.email); 
            setFilteredOrders(userOrders);
        }
    }, [user]);  

    useEffect(() => {
        if (filteredOrders.length > 0) { 
            fetch('http://localhost/src/TUP---Proyecto/src/app.server/index.php', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(filteredOrders.products) 
            })
            .then(response => response.json())
            .then(data => {
                if (data.preference_id) {
                    setPreferenceId(data.preference_id); 
                    setTotal(data.total); 
                } else {
                    console.error('No se recibió preference_id del servidor.');
                }
            })
            .catch(error => console.error('Error al obtener la preferencia:', error));
        }
    }, [filteredOrders]);

    useEffect(() => {
        if (preferenceId && !isInitialized) {

            const mp = new window.MercadoPago('TEST-afaa4517-9f9d-4b55-a144-24a3c2db89bb', {
                locale: 'es-MX',
            });


            const walletContainer = document.getElementById('wallet_container');
            walletContainer.innerHTML = ''; 

            
            mp.bricks().create("wallet", "wallet_container", {
                initialization: {
                preferenceId: preferenceId, 
                redirectMode: 'self',
                },
                customization: {
                texts: {
                    action: "Pagar",
                    valueProp: 'security_safety',
                },
                },
            });

            setIsInitialized(true); 
        }
    }, [preferenceId, isInitialized]);

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
                    {order.products.map(product => (
                        <li key={product.id}>▪️ {product.title} - Precio: ${new Intl.NumberFormat('es-AR').format(Math.trunc(product.price))}</li>
                    ))}
                    </ul>
                </div>

                <div className="OrderCard-Box">
                    <div className="OrderCard-BoxTitle">💲 Pago</div>
                    <hr />
                    <span>▪️ Forma de pago: {order.paymentMethod}</span>
                    <div className="OrderCard-MPButton">
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
