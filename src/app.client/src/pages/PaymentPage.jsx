import React, { useState, useEffect } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Payment from 'payment';
import mockCreditCards from "../mocks/creditsCard.json";
import { useNavigate, useLocation } from 'react-router-dom';
import "./PaymentPage.css";

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value) {
  if (!value) return value;

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`;
      break;
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === 'amex' ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);
  return clearValue.length >= 3 ? `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}` : clearValue;
}

export function formatFormData(data) {
  return Object.keys(data).map(d => `${d}: ${data[d]}`);
}

function PaymentPage() {
  const location = useLocation();
  const [Order, setOrder] = useState(null);

  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  // Cargar datos del mock
  useEffect(() => {
    if (mockCreditCards.length > 0) {
      const firstCard = mockCreditCards[0];
      setState(prevState => ({
        ...prevState,
        number: firstCard.number,
        name: firstCard.name,
        expiry: firstCard.expiry,
        cvc: firstCard.cvc,
      }));
    }
  }, []);

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState(prevState => ({ ...prevState, issuer }));
    }
  };

  const handleInputFocus = (e) => {
    setState(prevState => ({
      ...prevState,
      focused: e.target.name,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      e.target.value = formatCreditCardNumber(value);
    } else if (name === "expiry") {
      e.target.value = formatExpirationDate(value);
    } else if (name === "cvc") {
      e.target.value = formatCVC(value, null, state);
    }

    setState(prevState => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setState(prevState => ({
      ...prevState,
      formData,
    }));
    e.target.reset();
  };

  const { name, number, expiry, cvc, focused, issuer, formData } = state;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    if (id) {
      setOrder(Orders.find(order => Number(order.id) === Number(id))); 
    }
  }, [location.search]);

  return (
    <div className="PaymentPage-Layout">
      <div className="PaymentPage-ButtonBack"><a href="./profile">⬅️ Volver</a></div>
      <div className="PaymentPage-Container">
        <div className="PaymentPage-OrderDetails">
          <div className="PaymentPage-ProductsBox">
                <h3>📃 Detalle del pedido</h3>
              <hr />
          </div>
          <div className="PaymentPage-ProductsBox">
                <h4>🔎 Informacion</h4>
              <hr />
              <ul>
                {Order ? (
                      <>
                        <li>🏷️ Id del pedido: {Order.id}</li>
                        <li>🪪 Id cliente: {Order.idClient}</li>
                        <li>✉️ Email del cliente: {Order.client}</li>
                        <li>🚚 Metodo de entrega: {Order.shippingMethod}</li>
                      </>
                ) : (
                  <p>No se encontró el pedido.</p>
                )}
              </ul>
          </div>
          <div className="PaymentPage-ProductsBox">
            <h4>📦 Productos</h4> 
            <hr />
            <ul>
              {Order ? (
                    Order.products.map((product, index) => (
                        (product.id != 10000 && product.id != 10001) ?
                        <li key={index}>▪️ {product.title} -  Cantidad: {product.quantity} - Precio: ${new Intl.NumberFormat('es-AR').format(Math.trunc(product.price*product.quantity))}</li>
                        : <li key={index}>▪️ {product.title} - Precio: ${new Intl.NumberFormat('es-AR').format(Math.trunc(product.price))}</li>
                  ))
              ) : (
                <p>No se encontró el pedido.</p>
              )}
            </ul>
          </div>
          <div className="PaymentPage-ProductsBox">
            <hr />
              {Order ? 
              <>
                <h3>💸 Total a pagar: ${new Intl.NumberFormat('es-AR').format(Math.trunc(Order.priceTotal))}</h3>
                <hr />
              </> 
              : (
                <p>No se encontró el pedido.</p>
            )}
          </div>
          
        </div>
        <div className="PaymentPage-CardContainer">
        <div className="PaymentPage-ProductsBox">
                <h3>💳 Pago</h3>
              <hr />
          </div>
          <Card number={number} name={name} expiry={expiry} cvc={cvc} focused={focused} callback={handleCallback} />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="tel" name="number" className="form-control" placeholder="Numero de la tarjeta" pattern="[\d| ]{16,22}" required onChange={handleInputChange} onFocus={handleInputFocus} />
            </div>
            <div className="form-group">
              <input type="text" name="name" className="form-control" placeholder="Nombre completo" required onChange={handleInputChange} onFocus={handleInputFocus} />
            </div>
            <div className="col-6">
              <input type="tel" name="expiry" className="form-control" placeholder="Fecha vencimiento" required onChange={handleInputChange} onFocus={handleInputFocus} />
            </div>
            <div className="col-6">
              <input type="tel" name="cvc" className="form-control" placeholder="CVC" pattern="\d{3,4}" required onChange={handleInputChange} onFocus={handleInputFocus} />
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button className="btn btn-primary btn-block" >Pagar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
