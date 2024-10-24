import React, { useEffect, useState } from 'react';
import './LoginAndRegisterPage.css';
import logo from '../assets/DOMinationSystemsLogo.png';
import { useSession } from '../context/SessionContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginAndRegisterPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [PersonaFisica, setPersonaFisica] = useState(true);
  const [nombre, setNombre] = useState(''); 
  const [apellido, setApellido] = useState(''); 
  const [razon_social, setRazon_social] = useState(''); 
  const { login, checkSession, register } = useSession();
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
    if (!isRegister) {
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
    } else {
      const userData = {
        email: email,
        password: password,
        nombre: PersonaFisica ? nombre : null, 
        apellido: PersonaFisica ? apellido : null, 
        id_rol: 1,
        persona_fisica:PersonaFisica? 1 : 0,
        razon_social: !PersonaFisica ? razon_social : null
      };
      const validacion = await register(userData); 
      console.log(validacion);
      if (validacion.success) {
        navigate(`/login`);
      } else {
        console.log(validacion.message);
      }
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
                <label htmlFor="tipo">Tipo de usuario:</label>
                <select 
                  name="tipo" 
                  value={PersonaFisica} 
                  onChange={(e) => setPersonaFisica(e.target.value === 'true')}>
                  <option value="true">Persona Física</option>
                  <option value="false">Persona Jurídica</option>
                </select>
                
                {PersonaFisica ? (
                  <>
                    <label htmlFor="nombre">Nombre:</label>
                    <input name="nombre" type="text" required onChange={(e) => setNombre(e.target.value)} />
                    <label htmlFor="apellido">Apellido:</label>
                    <input name="apellido" type="text" required onChange={(e) => setApellido(e.target.value)} />
                  </>
                ) : (
                  <>
                    <label htmlFor="razon_social">Razón Social:</label>
                    <input name="razon_social" type="text" required onChange={(e) => setRazon_social(e.target.value)} />
                  </>
                )}

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
