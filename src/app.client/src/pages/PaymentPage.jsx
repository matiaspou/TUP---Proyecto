import React, { useState, useEffect } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Payment from 'payment';
import mockCreditCards from "../mocks/creditsCard.json";

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

  return (
    <div key="Payment">
      <div className="App-payment">
        <Card number={number} name={name} expiry={expiry} cvc={cvc} focused={focused} callback={handleCallback}
        />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="tel" name="number" className="form-control" placeholder="Card Number" pattern="[\d| ]{16,22}" required onChange={handleInputChange} onFocus={handleInputFocus} />
          </div>
          <div className="form-group">
            <input type="text" name="name" className="form-control" placeholder="Name" required onChange={handleInputChange} onFocus={handleInputFocus}/>
          </div>
          <div className="row">
            <div className="col-6">
              <input type="tel" name="expiry" className="form-control" placeholder="Valid Thru" required onChange={handleInputChange} onFocus={handleInputFocus}
              />
            </div>
            <div className="col-6">
              <input type="tel" name="cvc" className="form-control" placeholder="CVC" pattern="\d{3,4}" required onChange={handleInputChange}onFocus={handleInputFocus} />
            </div>
          </div>
          <input type="hidden" name="issuer" value={issuer} />
          <div className="form-actions">
            <button className="btn btn-primary btn-block">PAY</button>
          </div>
        </form>
        {formData && ( <div className="App-highlight"> {formatFormData(formData).map((d, i) => (<div key={i}>{d}</div>))} </div> )}
      </div>
    </div>
  );
}

export default PaymentPage;
