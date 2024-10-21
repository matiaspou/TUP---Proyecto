import { useState } from 'react';
import './Checkout.css'
import discountCodes from "../../mocks/discounts.json"

export function Checkout ({products}) {

    const [errorMessagePostalCode, setErrorMessagePostalCode] = useState("");
    const [priceShipping, setPriceShipping] = useState("");

    const [errorMessageDiscountCode, setErrorMessageDiscountCode] = useState("");
    const [discountByCode, setDiscountByCode] = useState(0);

    const postalCodeValidationKeyUp = (event) =>{
        const codeValue = event.target.value;

        if (!(codeValue>1000 && codeValue<1987) || isNaN(codeValue)) {
            setErrorMessagePostalCode("Ingrese un CP valido.");
            setPriceShipping("");
        } else {
           setErrorMessagePostalCode(""); 
            setPriceShipping({Sucursal:"4764", Domicilio:"6492"});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        
      };

    const handleSubmitDiscount = (event) => {
        event.preventDefault(); 
        const discountCode = event.target.elements.discountCode.value;
        
        const discount = discountCodes.find(code => code.code === discountCode);

        if (!discount) {
            setErrorMessageDiscountCode("Ingrese un código válido.");
            setDiscountByCode(0);
        } else {
            setErrorMessageDiscountCode(""); 
            setDiscountByCode(discount.discount);
        }

    }; 


    return(
    <>
        <div className="Checkout-Conteiner" >
            <div className="Checkout-Box">
                    <h3>Metodo de entrega</h3>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="Checkout-inputTextBox">
                        <div className="Checkout-inputTextSubBox">
                            <input type="input" className="Checkout-inputText" placeholder="postalCode" name="postalCode" id='postalCode' required min="1000" max="2000" onKeyUp={postalCodeValidationKeyUp} />
                            <label htmlFor="name" className="Checkout-inputTextLabel">Codigo postal</label>
                        </div>
                        <span className="Checkout-inputTextError">{errorMessagePostalCode}</span>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="retiroAlmacen" name="methodShipping" value="retiroAlmacen" checked={priceShipping === "" } readOnly={priceShipping === "" }></input>
                        <label htmlFor="retiroAlmacen">Retiro en almacen $0</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="OcaDomicilio" name="methodShipping" value="OcaDomicilio" disabled={priceShipping === ""}></input>
                        <label htmlFor="OcaDomicilio">OCA Domicilio ${priceShipping.Domicilio}</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="OcaSucursal" name="methodShipping" value="OcaSucursal" disabled={priceShipping === ""} ></input>
                        <label htmlFor="OcaSucursal">OCA Sucursal ${priceShipping.Sucursal}</label>
                    </div>
                    
                </form>
            </div>
            <div className="Checkout-Box">
                <h3>Descuento</h3>
                <hr />

                <form onSubmit={handleSubmitDiscount}>
                    <div className="Checkout-inputTextBox">
                        <div className="Checkout-inputTextSubBox">
                            <input type="input" className="Checkout-inputText" placeholder="discountCode" name="discountCode" id='discountCode' required />
                            <label htmlFor="name" className="Checkout-inputTextLabel">Codigo de descuento</label>
                        </div>
                        <span className="Checkout-inputTextError">{errorMessageDiscountCode}</span>
                        <span className={(discountByCode>0) ? "Checkout-inputTextDiscount" : "Checkout-inputTextDiscountHidden" }>Tiene un descuento de {discountByCode}% 😏🥳</span>
                    </div>
                </form>

            </div>
            <div className="Checkout-Box">
                <h3>Metodo de pago</h3>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="cash" name="methodPayment" value="cash" defaultChecked ></input>
                        <label htmlFor="transfer">Efectivo</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="debitCard" name="methodPayment" value="debitCard"></input>
                        <label htmlFor="debitCard">Mercadopago - Tarjetas Online, PagoFacil, RapiPago</label>
                    </div>
                </form>
            </div>
            <div className="Checkout-Buttons">
               <button>Completar compra</button>
            </div>
        </div>
    </>
    )
}