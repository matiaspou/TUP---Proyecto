import './OrderCard.css'
import { useCart } from "../../context/CartController.jsx";
import { useEffect, useState } from 'react';

export function OrderCard({}) {
   
    const { getProductsInCart, getPriceTotalOfCart} = useCart();

    const productsInCart = getProductsInCart();

    const productsPriceTotal = getPriceTotalOfCart();

    const [preferenceId, setPreferenceId] = useState(null);
    const [total, setTotal] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);


    useEffect(() => {
        // Llamada al servidor PHP para obtener el preference_id
        if (productsInCart.length > 0) { // Asegúrate de que haya productos
        fetch('http://localhost/src/TUP---Proyecto/src/app.server/index.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(productsInCart) // Envía los productos al backend
        })
            .then(response => response.json())
            .then(data => {
            if (data.preference_id) {
                setPreferenceId(data.preference_id); // Establece el preferenceId obtenido
                setTotal(data.total); // Establece el total obtenido
            } else {
                console.error('No se recibió preference_id del servidor.');
            }
            })
            .catch(error => console.error('Error al obtener la preferencia:', error));
        }
    }, [productsInCart]);

    useEffect(() => {
        if (preferenceId && !isInitialized) {
        // Inicializa MercadoPago cuando tengas el preferenceId
        const mp = new window.MercadoPago('TEST-afaa4517-9f9d-4b55-a144-24a3c2db89bb', {
            locale: 'es-MX',
        });

        // Limpiar el contenedor antes de crear uno nuevo
        const walletContainer = document.getElementById('wallet_container');
        walletContainer.innerHTML = ''; // Limpia el contenedor

        // Crea un componente de billetera de MercadoPago en el contenedor con id "wallet_container"
        mp.bricks().create("wallet", "wallet_container", {
            initialization: {
            preferenceId: preferenceId, // Usa el preferenceId obtenido del backend
            redirectMode: 'self',
            },
            customization: {
            texts: {
                action: "Pagar",
                valueProp: 'security_safety',
            },
            },
        });

        setIsInitialized(true); // Marca como inicializado
        }
    }, [preferenceId, isInitialized]);

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
                    <div className="OrderCard-PaymentTitle">💲 Pago</div>
                    <hr />
                    <div className="OrderCard-MPButton"><div id="wallet_container"></div> {/* Aquí se mostrará el botón de pago */}</div>
            
                </div>

                <div className="OrderCard-Payment">
                    <div className="OrderCard-PaymentTitle">🚚 Envio</div>
                    <hr />
                </div>

                <div className="OrderCard-Payment">
                <div className="OrderCard-PaymentTitle">📝 Detalles</div>
                    <hr />
                </div>

            </div>
        </div>
    </>
    )
}

export default OrderCard