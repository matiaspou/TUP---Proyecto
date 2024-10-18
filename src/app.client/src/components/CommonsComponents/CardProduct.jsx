import './CardProduct.css'
import { ButtonAddToCart } from './ButtonAddToCart.jsx';

export function CardProduct ({product}) {
    

    return(
    <>
        <div className="CardProduct-product" >
            <div className="CardProduct-contenedorImg">
                <a href={`/product?id=${product.id}`}><img src={product.image} alt={product.title} /></a>
            </div>
            <div className="CardProduct-contenedorTitle">
                <a href={`/product?id=${product.id}`}><span>{product.title}</span></a>
            </div>
            <div className="CardProduct-contenedorBottom">
                <span>${new Intl.NumberFormat('es-AR').format(Math.trunc(product.price))}</span>
                <ButtonAddToCart productId={product.id}></ButtonAddToCart>
            </div>
        </div>
    </>
    )
}