import React, { useEffect, useState } from 'react';
import './LoginAndRegisterPage.css';
import logo from '../assets/DOMinationSystemsLogo.png';
import { useSession } from '../context/SessionContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginAndRegisterPage() {
  const [isRegister, setIsRegister] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    const validacion = await login(userData);
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
          <img src={logo} alt='Logo de DOMination System' />
          <span id='formTitle'>{isRegister ? '👤 Registro' : '👤 Inicio de sesión'}</span>
        </div>
        <div className="Login-Form">
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <label htmlFor="nombre">Nombre:</label>
                <input name="nombre" type="text" required />
                <label htmlFor="apellido">Apellido:</label>
                <input name="apellido" type="text" required />
                <label htmlFor="email">Correo electrónico:</label>
                <input name="email" type="email" required onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Contraseña:</label>
                <input name="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                <input name="confirmPassword" type="password" required />
              </>
            )}
            {!isRegister && (
              <>
                <label htmlFor="email">Email:</label>
                <input name="email" type="email" required onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Contraseña:</label>
                <input name="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </>
            )}
        
            <button type="submit">{isRegister ? 'Registrar' : 'Enviar'}</button>
          </form>
          <button onClick={() => setIsRegister(!isRegister)} id='ButtonToggle'>
            {isRegister ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default LoginAndRegisterPage;
