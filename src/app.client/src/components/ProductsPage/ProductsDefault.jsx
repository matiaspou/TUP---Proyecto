import './ProductsDefault.css';
import products from '../../mocks/products.json';
import { CardProduct } from '../CommonsComponents/CardProduct';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ProductsDefault() {
    const location = useLocation();
    const [categoryApplicated, setCategoryApplicated] = useState(0); // Inicializado a 0
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const cate = queryParams.get('cate');
        const search = queryParams.get('q');

        if (cate) {
            setCategoryApplicated(Number(cate)); // Convertir el valor de 'cate' a número
        }
        if (search) {
            setSearchQuery(search);
        }
    }, [location.search]);

    return (
        <>
            <div className="ProductsDefault-grid">
                {products
                    .filter(product =>
                        // Si 'cate' es 0, no filtrar por categoría, solo por búsqueda.
                        (categoryApplicated === 0 || product.category_id === categoryApplicated) &&
                        (searchQuery ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                    )
                    .map(product => (
                        <CardProduct key={product.id} product={product} />
                    ))
                }
            </div>
        </>
    );
}
