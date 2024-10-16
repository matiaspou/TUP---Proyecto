import './ProductsDefault.css'
import products from '../../mocks/products.json';
import { CardProduct } from '../CommonsComponents/CardProduct';

export function ProductsDefault () {
    return(
    <>
    <section className="ProductsDefault-conteiner">
                <div className="ProductsDefault-grid" >
                    {
                    products.map(product => (
                        // eslint-disable-next-line react/jsx-key
                        <CardProduct product={product}></CardProduct>
                    ))}
                </div>
    </section>
    </>
)}