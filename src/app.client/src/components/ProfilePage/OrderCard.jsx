import './OrderCard.css';
import { useEffect, useState } from 'react';
import { useSession } from '../../context/SessionContext.jsx';

export function OrderCard({ order }) {
    const { user } = useSession();
    const [products, setProducts] = useState([]);


    useEffect(() => {
        if (order) {
            setProducts(order.productos);
        }
    }, [order]);

    console.log(order);

    return (
        <div className="OrderCard-Container">
            <div className="OrderCard-Header">🔷 ID Pedido: {order.id_pedido} - Fecha de Creación: {new Date(order.fecha_pedido).toLocaleDateString()} - Estado: {order.estado_general}</div>
            <div className="OrderCard-Content">
                <div className="OrderCard-ProductsDetails">
                    <label htmlFor="ul">📦 Productos</label>
                    <hr />
                    <ul>
                        {products && products.map((product, index) => (
                            (product.id_producto !== 10000 && product.id_producto !== 10001) ? (
                                <li key={index}>▪️ {product.nombre_producto} - Cantidad: {product.cantidad} - Precio: ${new Intl.NumberFormat('es-AR').format(Math.trunc(product.precio_unitario * product.cantidad))}</li>
                            ) : (
                                <li key={index}>▪️ {product.nombre_producto} - Precio: ${new Intl.NumberFormat('es-AR').format(Math.trunc(product.precio_unitario))}</li>
                            )
                        ))}
                    </ul>
                </div>

                <div className="OrderCard-Box">
                    <div className="OrderCard-BoxTitle">💲 Pago</div>
                    <hr />
                    <span>▪️ Subtotal productos: ${order.forma_de_pago}</span>
                    <span>▪️ Precio de envio: ${order.forma_de_pago}</span>
                    <span>▪️ Descuento: ${order.forma_de_pago}</span>
                    <span>▪️ Importe a abonar: ${new Intl.NumberFormat('es-AR').format(Math.trunc(order.precio_total))}</span>
                    {(order.forma_de_pago === "Efectivo") ? (
                        <span>Por favor, acérquese a las oficinas para realizar el pago y continuar con el envío del pedido.</span>
                    ) : (order.forma_de_pago === "Transferencia Bancaria") ? (
                        <>
                            <span>Por favor, realice la transferencia bancaria a la siguiente cuenta con los siguientes datos:</span>
                            <span>  Número de cuenta: 0006168-5 028-3</span>
                            <span> CUIT: 30-67561413-5</span>
                            <span> Razón Social: DOMINATION SYSTEM SRL</span>
                            <span> CBU: 0070048370000006368535</span>
                        </>
                    ) : (
                        <a href={`/payment?id=${order.id_pedido}`}>Realizar pago</a>
                    )}
                    <span>Estado de pago: {order.estado_pago} 🕞</span>
                </div>

                <div className="OrderCard-Box">
                    <div className="OrderCard-BoxTitle">🚚 Envío</div>
                    <hr />
                    <span>▪️ Metodo de envío: {order.metodo_de_entrega}</span>
                </div>

                <div className="OrderCard-BoxAction">
                    <div className="OrderCard-BoxTitle">🧐 Acciones</div>
                    <hr />
                    <button>Ver factura 📄</button>
                    <button>Editar pedido 📝</button>
                    <button>Cancelar pedido ❌</button>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
