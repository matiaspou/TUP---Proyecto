import './Header.css'
import logo from '../assets/DOMinationSystemsLogo.png';

export function Header () {
    return(
    <>
    <header>
        <div class="logo">
            <a href="/"><img src={logo} alt='Logo de DOMination System'/></a></div>
        <input type="text" class="search-bar" placeholder="Buscar productos..."></input>
        <div class="header-right">
        <div class="cart">🛒 Carrito</div>
        <div class="profile">👤 Perfil</div>
        </div>
    </header>
    </>
    )
}