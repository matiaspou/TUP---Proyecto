import { ButtonAddToCart } from '../CommonsComponents/ButtonAddToCart'
import './ProductDetails.css'
import securityIcon from "../../assets/security.svg"
import stockIcon from "../../assets/stock.svg"
import deliveryIcon from "../../assets/delivery.svg"

export function ProductDetails (product) {

    return(
    <>  
        <div className="ProductDetails-Conteiner">
        <div className="ProductDetails-Identity">
                <span className='ProductDetails-ID'>ID:{product.product.id}</span>
            </div>
            <span>{product.product.title}</span>
            <hr />
            <div className="ProductDetails-ConteinerSub1">
                <div className="ProductDetails-PriceTotal"><span><h4>Precio:</h4>${product.product.price}</span></div>
                <div className="ProductDetails-PriceInCredit"><span><h4>12 cuotas fijas de</h4> ${(product.product.price/12).toFixed(2)}</span></div>
            </div>
            <hr />
            <div className="ProductDetails-ConteinerSub2">
                <span><img src={securityIcon} />Garantía - 36 meses.</span>
                <span><img src={stockIcon} />Stock disponible.</span>
                <span><img src={deliveryIcon} />Envíos a todo el país.</span>
            </div>
            <div className="ProductDetails-ButtonAddToCart">
                <ButtonAddToCart productId={product.product.id}></ButtonAddToCart>
            </div>
        </div>
    </>
    )
}