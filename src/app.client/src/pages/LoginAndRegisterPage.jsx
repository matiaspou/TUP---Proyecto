import React, { useEffect, useState } from 'react';
import './LoginAndRegisterPage.css';
import logo from '../assets/DOMinationSystemsLogo.png';
import { useSession } from '../context/SessionContext.jsx'; 
import { useNavigate, useLocation } from 'react-router-dom';

function LoginAndRegisterPage() {
  const [isRegister, setIsRegister] = useState(false);

  const formToggle = () => {
    setIsRegister(!isRegister); 
  };

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
    <>
      <div className="Login-Container">
        <div className="Login-Box">
          <div className="Login-Header">
            <img src={logo} alt='Logo de DOMination System' />
            <span id='formTitle'>{isRegister ? '👤 Registro' : '👤 Inicio de sesión'}</span>
          </div>
          <div className="Login-Form">
            <form onSubmit={handleSubmit}>

              {isRegister && (
                <>
                  <label htmlFor="nombre">Nombre:</label>
                  <br />
                  <input name="nombre" type="text" required />
                  <br />
                  <label htmlFor="apellido">Apellido:</label>
                  <br />
                  <input name="apellido" type="text" required />
                  <br />
                  <label htmlFor="email">Correo electrónico:</label>
                  <br />
                  <input name="email" type="email" required />
                  <br />
                  <label htmlFor="password">Contraseña:</label>
                  <br />
                  <input name="password" type="password" required />
                  <br />
                  <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                  <br />
                  <input name="confirmPassword" type="password" required />
                  <br /><br />
                </>
              )}
              {!isRegister && (
                <>
                  <label htmlFor="email">Email:</label>
                  <br />
                  <input name="email" type="text" required  onChange={(e) => setEmail(e.target.value)} />
                  <br />
                  <label htmlFor="password">Contraseña:</label>
                  <br />
                  <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}  required />
                  <br /><br />
                </>
              )}
              <button type="submit">{isRegister ? 'Registrar' : 'Enviar'}</button>
            </form>
            <button onClick={formToggle} id='ButtonToggle'>
              {isRegister ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginAndRegisterPage;
