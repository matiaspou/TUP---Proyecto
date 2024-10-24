import './CardProductsInCart.css'
import { useCart } from "../../context/CartController.jsx";

export function CardProductsInCart ({product, index}) {
   
    const { deleteProductInCart, updateProductQuantity } = useCart();

    
    return(
    <>
        <div className="CardProductsInCart-product" key={index}>
            <div className="CardProductsInCart-contenedorImg">
                <a href={`/product?id=${product.id_producto}`}><img src={product.url_imagen} alt={product.nombre_producto} /></a>
            </div>

            <div className="CardProductsInCart-conteiner2">
                <div className="CardProductsInCart-contenedorTitle">
                    <a href={`/product?id=${product.id_producto}`}><span>{product.nombre_producto}</span></a>
                </div>

                <div className="CardProdcutsInCart-conteinerBottom">
                    <div className="CardProductsInCart-ConteinerButtons">
                        <div className="CardProductsInCart-QuantityButtons">
                            <button className="CardProductsInCart-QuantityButtonMinus" onClick={()=>(product.quantity>1)?updateProductQuantity(product.id_producto,-1):"nada"}>-</button>
                            <span>{product.quantity}</span>
                            <button className="CardProductsInCart-QuantityButtonPlus"onClick={()=>updateProductQuantity(product.id_producto,1)}>+</button>
                        </div>
                        <button className='CardProductsInCart-DeleteButton' onClick={()=>deleteProductInCart(product.id_producto)}>Eliminar</button>
                    </div>
                    <div className="CardProductsInCart-ConteinerPrice">
                        <h3>Subtotal: </h3><span>${new Intl.NumberFormat('es-AR').format(Math.trunc(product.precio*product.quantity))}</span>
                    </div>
                </div>
            </div>
                
        </div>
    </>
    )
}