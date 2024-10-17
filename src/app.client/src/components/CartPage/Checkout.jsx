import './Checkout.css'


export function Checkout ({products}) {
    return(
    <>
        <div className="Checkout-Conteiner" >
            <div className="Checkout-Box">
                    <h3>Envio</h3>
                <hr />
                <form>
                    <div className="Checkout-inputTextBox">
                        <div className="Checkout-inputTextSubBox">
                            <input type="input" className="Checkout-inputText" placeholder="postalCode" name="postalCode" id='postalCode' required />
                            <label htmlFor="name" className="Checkout-inputTextLabel">Codigo postal</label>
                        </div>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="OcaDomicilio" name="methodShipping" value="OcaDomicilio"></input>
                        <label htmlFor="OcaDomicilio">OCA Domicilio ${}</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="OcaSucursal" name="methodShipping" value="OcaSucursal"></input>
                        <label htmlFor="OcaSucursal">OCA Sucursal ${}</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="retiroAlmacen" name="methodShipping" value="retiroAlmacen" defaultChecked></input>
                        <label htmlFor="retiroAlmacen">Retiro en almacen ${}</label>
                    </div>
                </form>
            </div>
            <div className="Checkout-Box">
                <h3>Descuento</h3>
                <hr />

                <form>
                    <div className="Checkout-inputTextBox">
                        <div className="Checkout-inputTextSubBox">
                            <input type="input" className="Checkout-inputText" placeholder="discountCode" name="discountCode" id='discountCode' required />
                            <label htmlFor="name" className="Checkout-inputTextLabel">Codigo de descuento</label>
                        </div>
                    </div>
                </form>

            </div>
            <div className="Checkout-Box">
                <h3>Pago</h3>
                <hr />
                <form>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="cash" name="methodPayment" value="cash" defaultChecked ></input>
                        <label htmlFor="transfer">Efectivo</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="transfer" name="methodPayment" value="transfer"></input>
                        <label htmlFor="transfer">Depósito o Transferencia Bancaria</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="debitCard" name="methodPayment" value="debitCard"></input>
                        <label htmlFor="debitCard">Mercadopago - Tarjetas Online, PagoFacil, RapiPago</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="creditCard" name="methodPayment" value="creditCard"></input>
                        <label htmlFor="creditCard">Tarjetas de crédito ¡Hasta 12 cuotas!</label>
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