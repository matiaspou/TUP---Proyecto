import './Header.css'
import logo from '../../assets/DOMinationSystemsLogo.png';
import cartCircle from '../../assets/cart-circle.svg';
import { useCart } from "../../context/CartController.jsx";

export const Header = () => {

    const { getAmountProductsInCart } = useCart();
    const cartNumber = getAmountProductsInCart();
    if (cartNumber > 0)
    {
        const divAmountProductsInCart = document.getElementById('AmountProductsInCart'); 
        divAmountProductsInCart.className= 'ShowAmountProductsInCart';
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
                    <div className="HideAmountProductsInCart" id='AmountProductsInCart'>
                        <div className='AmountProductsInCart-circle' ><img src={cartCircle} alt=""  /></div>
                        <div className='AmountProductsInCart-number' >{cartNumber}</div>
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