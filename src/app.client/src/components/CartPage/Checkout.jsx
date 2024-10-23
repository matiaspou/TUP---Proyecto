import { useState, useEffect } from 'react';
import './Checkout.css';
import discountCodes from "../../mocks/discounts.json";
import orders from "../../mocks/orders.json";
import { useSession } from '../../context/SessionContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

export function Checkout ({products}) {

    const [errorMessagePostalCode, setErrorMessagePostalCode] = useState("");
    const [priceShipping, setPriceShipping] = useState("");

    const [errorMessageDiscountCode, setErrorMessageDiscountCode] = useState("");
    const [discountByCode, setDiscountByCode] = useState(0);

    const [postalCode, setPostalCode] = useState("");
    const [shippingMethod, setShippingMethod] = useState("Retiro en Almacen");
    const [paymentMethod, setPaymentMethod] = useState("Efectivo");

    const { user, checkSession, logout } = useSession(); 

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => { 
        checkSession();
    },[location.search]);

    const postalCodeValidationKeyUp = (event) =>{
        const codeValue = event.target.value;
        setPostalCode(codeValue);

        if (!(codeValue > 1000 && codeValue < 1987) || isNaN(codeValue)) {
            setErrorMessagePostalCode("Ingrese un CP válido.");
            setPriceShipping("");
        } else {
            setErrorMessagePostalCode(""); 
            setPriceShipping({Sucursal: "4764", Domicilio: "6492"});
        }
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

    const completarCompra = () => {
        if (!user) {
            navigate("/login");
        } else {
            const cart = JSON.parse(localStorage.getItem("productsInCart"));

            let priceShippingFinal;

            if (shippingMethod === "Envio OCA a Domicilio") {
                priceShippingFinal = "6492";
            } else if (shippingMethod === "Envio OCA a Sucursal") {
                priceShippingFinal = "4764";
            } else {
                priceShippingFinal = "0";
            }

            let priceTotal = parseInt(cart.reduce((total, product) => total + product.price, 0)); 

            priceTotal += parseInt(priceShippingFinal);

            priceTotal *= (1 - (parseInt(discountByCode) / 100)); 



            cart.push({"title":shippingMethod,
                "price": priceShippingFinal,
                "id":10001
            }, {"title": "Descuento",
                "price": discountByCode,
                "id":10000
            })
            
            // Datos de los inputs recogidos
            const dataCompra = {
                postalCode,
                shippingMethod,
                paymentMethod,
                discount: discountByCode,
                products: cart,
                id:1,
                client: user.email,
                priceTotal:  priceTotal
            };

            //console.log("Datos de la compra:", dataCompra);

            localStorage.removeItem("productsInCart");

            orders.push(dataCompra);

            navigate("/profile")

            console.log(orders);
            
        }
    };

    return (
    <>
        <div className="Checkout-Conteiner">
            <div className="Checkout-Box">
                <h3>Método de entrega</h3>
                <hr />
                <form>
                    <div className="Checkout-inputTextBox">
                        <div className="Checkout-inputTextSubBox">
                            <input
                                type="input"
                                className="Checkout-inputText"
                                placeholder="postalCode"
                                name="postalCode"
                                id='postalCode'
                                required
                                min="1000"
                                max="2000"
                                onKeyUp={postalCodeValidationKeyUp}
                            />
                            <label htmlFor="name" className="Checkout-inputTextLabel">Código postal</label>
                        </div>
                        <span className="Checkout-inputTextError">{errorMessagePostalCode}</span>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input
                            type="radio"
                            id="retiroAlmacen"
                            name="methodShipping"
                            value="retiroAlmacen"
                            checked={shippingMethod === "Retiro en Almacen"}
                            onChange={() => setShippingMethod("Retiro en Almacen")}
                        />
                        <label htmlFor="retiroAlmacen">Retiro en almacén $0</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input
                            type="radio"
                            id="OcaDomicilio"
                            name="methodShipping"
                            value="OcaDomicilio"
                            disabled={priceShipping === ""}
                            checked={shippingMethod === "Envio OCA a Domicilio"}
                            onChange={() => setShippingMethod("Envio OCA a Domicilio")}
                        />
                        <label htmlFor="OcaDomicilio">OCA Domicilio ${priceShipping.Domicilio}</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input
                            type="radio"
                            id="OcaSucursal"
                            name="methodShipping"
                            value="OcaSucursal"
                            disabled={priceShipping === ""}
                            checked={shippingMethod === "Retiro en Sucursal OCA"}
                            onChange={() => setShippingMethod("Retiro en Sucursal OCA")}
                        />
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
                            <input
                                type="input"
                                className="Checkout-inputText"
                                placeholder="discountCode"
                                name="discountCode"
                                id='discountCode'
                                required
                            />
                            <label htmlFor="name" className="Checkout-inputTextLabel">Código de descuento</label>
                        </div>
                        <span className="Checkout-inputTextError">{errorMessageDiscountCode}</span>
                        <span className={(discountByCode > 0) ? "Checkout-inputTextDiscount" : "Checkout-inputTextDiscountHidden"}>Tiene un descuento de {discountByCode}% 😏🥳</span>
                    </div>
                </form>
            </div>

            <div className="Checkout-Box">
                <h3>Método de pago</h3>
                <hr />
                <form>
                    <div className='Checkout-inputRadio'>
                        <input
                            type="radio"
                            id="cash"
                            name="methodPayment"
                            value="cash"
                            checked={paymentMethod === "Efectivo"}
                            onChange={() => setPaymentMethod("Efectivo")}
                        />
                        <label htmlFor="cash">Efectivo</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input
                            type="radio"
                            id="transfer"
                            name="methodPayment"
                            value="transfer"
                            checked={paymentMethod === "Transferencia Bancaria"}
                            onChange={() => setPaymentMethod("Transferencia Bancaria")}
                        />
                        <label htmlFor="transfer">Transferencia Bancaria</label>
                    </div>
                    <div className='Checkout-inputRadio'>
                        <input
                            type="radio"
                            id="creditCard"
                            name="methodPayment"
                            value="creditCard"
                            checked={paymentMethod === "Tarjeta de Credito"}
                            onChange={() => setPaymentMethod("Tarjeta de Credito")}
                        />
                        <label htmlFor="creditCard">Tarjeta de Credito</label>
                    </div>
                </form>
            </div>

            <div className="Checkout-Buttons">
                <button onClick={completarCompra}>
                    {user ? "Completar compra" : "Inicie sesión para completar compra"}
                </button>
            </div>
        </div>
    </>
    );
}
