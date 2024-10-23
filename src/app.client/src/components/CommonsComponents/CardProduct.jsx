import './CardProduct.css'
import { ButtonAddToCart } from './ButtonAddToCart.jsx';

export function CardProduct ({product}) {
    
    return(
    <>
        <div className="CardProduct-product" >
            <div className="CardProduct-contenedorImg">
                <a href={`/product?id=${product.id_producto}`}><img src={product.url_imagen} alt={product.nombre_producto} /></a>
            </div>
            <div className="CardProduct-contenedorTitle">
                <a href={`/product?id=${product.id_producto}`}><span>{product.nombre_producto}</span></a>
            </div>
            <div className="CardProduct-contenedorBottom">
                <span>${new Intl.NumberFormat('es-AR').format(Math.trunc(product.precio))}</span>
                <ButtonAddToCart productId={product.id_producto}></ButtonAddToCart>
            </div>
        </div>
    </>
    )
}