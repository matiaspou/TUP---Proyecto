import './CardProductsInCart.css'


export function CardProductsInCart ({product}) {
    console.log(product);
    return(
    <>
        <div className="CardProductsInCart-product" >
            <div className="CardProductsInCart-contenedorImg">
                <a href={`/product?id=${product.id}`}><img src={product.image} alt={product.title} /></a>
            </div>
            <div className="CardProductsInCart-contenedorTitle">
                <a href={`/product?id=${product.id}`}><span>{product.title}</span></a>
            </div>
            <div className="CardProductsInCart-contenedorBottom">
                <span>${product.price}</span>

            </div>
        </div>
    </>
    )
}