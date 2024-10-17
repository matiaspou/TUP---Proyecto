import './Checkout.css'


export function Checkout ({products}) {
    return(
    <>
        <div className="Checkout-Conteiner" >
            <div className="Checkout-Box">
                <h3>Envio</h3>
                <hr />
                <form>
                    <div class="Checkout-inputTextBox">
                        <input type="input" class="Checkout-inputText" placeholder="postalCode" name="postalCode" id='postalCode' required />
                        <label for="name" class="Checkout-inputTextLabel">Codigo postal</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="OcaDomicilio" name="methodShipping" value="OcaDomicilio"></input>
                        <label for="OcaDomicilio">OCA Domicilio ${}</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="OcaSucursal" name="methodShipping" value="OcaSucursal"></input>
                        <label for="OcaSucursal">OCA Sucursal ${}</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="retiroAlmacen" name="methodShipping" value="retiroAlmacen" checked></input>
                        <label for="retiroAlmacen">Retiro en almacen ${}</label>
                    </div>
                </form>
            </div>
            <div className="Checkout-Box">
                <h3>Descuento</h3>
                <hr />

                <form>
                    <div class="Checkout-inputTextBox">
                        <input type="input" class="Checkout-inputText" placeholder="discountCode" name="discountCode" id='discountCode' required />
                        <label for="name" class="Checkout-inputTextLabel">Codigo de descuento</label>
                    </div>
                </form>

            </div>
            <div className="Checkout-Box">
                <h3>Pago</h3>
                <hr />
                <form>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="transfer" name="methodPayment" value="transfer" checked ></input>
                        <label for="transfer">Efectivo</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="transfer" name="methodPayment" value="transfer"></input>
                        <label for="transfer">Depósito o Transferencia Bancaria</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="debitCard" name="methodPayment" value="debitCard"></input>
                        <label for="debitCard">Mercadopago - Tarjetas Online, PagoFacil, RapiPago</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input type="radio" id="creditCard" name="methodPayment" value="creditCard"></input>
                        <label for="creditCard">Tarjetas de crédito ¡Hasta 12 cuotas!</label>
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