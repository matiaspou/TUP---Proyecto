import './Login.css'
import logo from '../assets/DOMinationSystemsLogo.png';

function Login() {
  return (
    <>
      <div className="Login-Container">
        <div className="Login-Box">
          <div className="Login-Header">
              <img src={logo} alt='Logo de DOMination System'/>
              <span>Inicio de sesion</span>
          </div>
          <div className="Login-Form">
            <form action="">
              <label htmlFor="">Nombre de usuario:</label>
              <br />
              <input name="" type="text" />
              <br />
              <label htmlFor="">Contraseña:</label>
              <br />
              <input name="" type="text" />
              <br /><br />
              <button>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
