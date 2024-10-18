import { useEffect, useState } from 'react';
import './Checkout.css';

export function Checkout({ products }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [total, setTotal] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Llamada al servidor PHP para obtener el preference_id
    if (products.length > 0) { // Asegúrate de que haya productos
      fetch('http://localhost/TUP---Proyecto/src/app.server/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(products) // Envía los productos al backend
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
  }, [products]);

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

  return (
    <div className="Checkout-Container">
      <div className="Checkout-Box">
        <h3>Envío</h3>
        <hr />
        <form>
          <div className="Checkout-inputTextBox">
            <input 
              type="text" 
              className="Checkout-inputText" 
              placeholder="Código Postal" 
              name="postalCode" 
              id="postalCode" 
              required 
            />
            <label htmlFor="postalCode" className="Checkout-inputTextLabel">Código postal</label>
          </div>
          <div className='Checkout-inputRadio'>
            <input type="radio" id="OcaDomicilio" name="methodShipping" value="OcaDomicilio" />
            <label htmlFor="OcaDomicilio">OCA Domicilio</label>
          </div>
          <div className='Checkout-inputRadio'>
            <input type="radio" id="OcaSucursal" name="methodShipping" value="OcaSucursal" />
            <label htmlFor="OcaSucursal">OCA Sucursal</label>
          </div>
          <div className='Checkout-inputRadio'>
            <input type="radio" id="retiroAlmacen" name="methodShipping" value="retiroAlmacen" defaultChecked />
            <label htmlFor="retiroAlmacen">Retiro en almacén</label>
          </div>
        </form>
      </div>
      <div className="Checkout-Box">
        <h3>Pago</h3>
        <hr />
        <div id="wallet_container"></div> {/* Aquí se mostrará el botón de pago */}
      </div>
      <div className="Checkout-Box">
        <h4>Total: ${total.toFixed(2)}</h4> {/* Muestra el total */}
      </div>
    </div>
  );
}
