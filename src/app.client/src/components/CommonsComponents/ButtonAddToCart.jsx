import './ButtonAddToCart.css'
import cart from '../../assets/cart.svg';
import box from '../../assets/box-cart.svg';
import { useCart } from "../../context/CartController.jsx";

export function ButtonAddToCart ({productId}) {
    
    const animacionCarrito = (event) =>{
        const buttonId = event.target.id;
        const buttonClicked = document.getElementById(buttonId)
        buttonClicked.className = 'cart-button clicked';
    }

    const { addToCart, checkIdInCart } = useCart();
    
    const handleAddToCart = (event) => {
        addToCart(event.target.id); 
    };

    return(
    <>
        <button onClick={(event) => { animacionCarrito(event); handleAddToCart(event); }} className={checkIdInCart(productId) ? "cart-button clicked" : "cart-button"}id={productId} >
            <span className="add-to-cart">Add to cart</span>
            <span className="added">Added</span>
            <img src={cart} className="fa-shopping-cart"></img>
            <img src={box} className="fa-box"></img>
        </button>
    </>
    )
}