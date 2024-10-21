import React, { useState } from 'react';
import './LoginAndRegisterPage.css';
import logo from '../assets/DOMinationSystemsLogo.png';

function LoginAndRegisterPage() {
  const [isRegister, setIsRegister] = useState(false);

  const formToggle = () => {
    setIsRegister(!isRegister); 
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
            <form action="">

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
                  <input name="email" type="text" required />
                  <br />
                  <label htmlFor="password">Contraseña:</label>
                  <br />
                  <input name="password" type="password" required />
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
