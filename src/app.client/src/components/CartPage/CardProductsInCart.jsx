import './CardProductsInCart.css';
import { useCart } from "../../context/CartController.jsx";

export function CardProductsInCart({ product }) {
    // Extraemos las funciones del contexto del carrito
    const { deleteProductInCart, updateProductQuantity } = useCart();

    return (
        <>
            <div className="CardProductsInCart-product">
                <div className="CardProductsInCart-contenedorImg">
                    <a href={`/product?id=${product.id}`}>
                        <img src={product.image} alt={product.title} />
                    </a>
                </div>

                <div className="CardProductsInCart-conteiner2">
                    <div className="CardProductsInCart-contenedorTitle">
                        <a href={`/product?id=${product.id}`}>
                            <span>{product.title}</span>
                        </a>
                    </div>

                    <div className="CardProdcutsInCart-conteinerBottom">
                        <div className="CardProductsInCart-ConteinerButtons">
                            <div className="CardProductsInCart-QuantityButtons">
                                <button
                                    className="CardProductsInCart-QuantityButtonMinus"
                                    onClick={() => updateProductQuantity(product.id, -1)}
                                    disabled={product.quantity === 1} // Deshabilitar si la cantidad es 1
                                >
                                    -
                                </button>
                                <span>{product.quantity}</span>
                                <button
                                    className="CardProductsInCart-QuantityButtonPlus"
                                    onClick={() => updateProductQuantity(product.id, 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className='CardProductsInCart-DeleteButton'
                                onClick={() => deleteProductInCart(product.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                        <div className="CardProductsInCart-ConteinerPrice">
                            <h3>Subtotal: </h3>
                            <span>${(product.price * product.quantity).toFixed(2)}</span> {/* Formatear el subtotal */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
