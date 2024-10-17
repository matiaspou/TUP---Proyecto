import './Header.css'
import logo from '../../assets/DOMinationSystemsLogo.png';
import cartCircle from '../../assets/cart-circle.svg';
import { useCart } from "../../context/CartController.jsx";

export const Header = () => {

    const { getQuantityProductsInCart } = useCart();
    const cartNumber = getQuantityProductsInCart();
    if (cartNumber > 0)
    {
        const divQuantityProductsInCart = document.getElementById('QuantityProductsInCart'); 
        divQuantityProductsInCart.className= 'ShowQuantityProductsInCart';
    }

    return(
    <>
    <header>
        <div className="logo">
            <a href="/"><img src={logo} alt='Logo de DOMination System'/></a>
        </div>

        <input type="text" className="search-bar" placeholder="Buscar productos..."></input>

        <div className="header-right">
            <a href="/Cart" className="cart">
                <div className="cartIcon">
                    <div className="cartImage">🛒</div>
                    <div className="HideQuantityProductsInCart" id='QuantityProductsInCart'>
                        <div className='QuantityProductsInCart-circle' ><img src={cartCircle} alt=""  /></div>
                        <div className={(cartNumber>9) ? 'QuantityProductsInCart-number2' : 'QuantityProductsInCart-number'}>{cartNumber}</div>
                    </div>
                </div>

                <div className="cartTitle">Carrito</div>
            </a >
            

        <div className="profile">👤 Perfil</div>
        </div>

    </header>
    </>
    )
}