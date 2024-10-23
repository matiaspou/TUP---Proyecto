import './ButtonAddToCart.css';
import cart from '../../assets/cart.svg';
import box from '../../assets/box-cart.svg';
import { useCart } from "../../context/CartController.jsx";
import { useRef } from 'react';

export function ButtonAddToCart({ productId }) {
    const { addToCart, checkIdInCart } = useCart();
    const buttonRef = useRef(null);

    const animacionCarrito = () => {
        if (buttonRef.current) {
            buttonRef.current.className = 'cart-button clicked';
        }
    };

    const handleAddToCart = (event) => {
        addToCart(productId); 
    };

    return (
        <>
            <button
                onClick={(event) => {
                    animacionCarrito();
                    handleAddToCart(event);
                }}
                className={checkIdInCart(productId) ? "cart-button clicked" : "cart-button"}
                id={productId}
                ref={buttonRef} 
            >
                <span className="add-to-cart">Add to cart</span>
                <span className="added">Added</span>
                <img src={cart} className="fa-shopping-cart" alt="Cart" />
                <img src={box} className="fa-box" alt="Box" />
            </button>
        </>
    );
}
