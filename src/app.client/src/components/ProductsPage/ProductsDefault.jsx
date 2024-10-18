import './ProductsDefault.css'
import products from '../../mocks/products.json';
import { CardProduct } from '../CommonsComponents/CardProduct';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ProductsDefault () {
    const location = useLocation();
    const [categoryApplicated, setCategoryApplicated] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const cate = queryParams.get('cate');
        if (cate) {
            setCategoryApplicated(cate); 
        }
    }, [location.search]);

    return(
    <>
    <section className="ProductsDefault-conteiner">
                <div className="ProductsDefault-grid" >
                    {(categoryApplicated!=0) ?
                    products.map(product => (
                        categoryApplicated == product.category_id ? (
                            <CardProduct key={product.id} product={product} />
                        ) : null
                    )) : products.map(product => (
                            <CardProduct key={product.id} product={product} />
                    ))
                    }
                </div>
    </section>
    </>
)}