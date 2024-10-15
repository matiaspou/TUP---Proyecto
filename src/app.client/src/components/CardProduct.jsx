import './CardProduct.css'
import cart from '../assets/cart.svg';
import box from '../assets/box-cart.svg';

export function CardProduct ({product}) {
    
    const animacionCarrito = (event) =>{
        const buttonId = event.target.id; 
        const buttonClicked = document.getElementById(buttonId)
        buttonClicked.className = 'cart-button clicked';

    }

    return(
    <>
        <div class="CardProduct-product">
                            <div className="CardProduct-contenedorImg">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="CardProduct-contenedorTitle">
                                <h3>{product.title}</h3>
                            </div>
                            <div className="CardProduct-contenedorBottom">
                                <p>${product.price}</p>

                                <button onClick={(event) => animacionCarrito(event)}  class="cart-button" id={`cart${product.id}`}>
                                    <span class="add-to-cart">Add to cart</span>
                                    <span class="added">Added</span>
                                    <img src={cart} class="fa-shopping-cart"></img>
                                    <img src={box} class="fa-box"></img>
                                </button> 
                            </div>    
        </div>
    </>
    )
}