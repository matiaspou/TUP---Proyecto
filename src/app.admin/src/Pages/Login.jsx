import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/DOMinationSystemsLogo.png';
import { useSession } from '../context/SessionContext.jsx'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const { login, checkSession } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { 
    const response = checkSession(); 
    if (response.success) { 
      navigate('/'); 
    }
  }, [location.search, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };


    const validacion = login(userData);
    console.log(validacion);

    if (validacion.success) {
      navigate(`/`);
    } else {
      console.log(validacion.message);
    }
  };

  return (
    <div className="Login-Container">
      <div className="Login-Box">
        <div className="Login-Header">
          <img src={logo} alt="Logo de DOMination Systems" />
          <span>👤 Inicio de sesión</span>
        </div>
        <div className="Login-Form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <br />
            <input 
              name="email" 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password">Contraseña:</label>
            <br />
            <input 
              name="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <br /><br />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
