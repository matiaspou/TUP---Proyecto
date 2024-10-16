import { ButtonAddToCart } from '../CommonsComponents/ButtonAddToCart'
import './ProductDetails.css'

export function ProductDetails (product) {
    return(
    <>
        {console.log(product)}
        
        <div className="ProductDetails-Conteiner">
            <span>{product.product.title}</span>
            <div className="ProductDetails-ConteinerSub1">
                <span>${product.product.price}</span>
                <ButtonAddToCart></ButtonAddToCart>
            </div>
        </div>
    </>
    )
}