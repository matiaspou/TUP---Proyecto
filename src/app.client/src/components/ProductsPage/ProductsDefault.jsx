import './ProductsDefault.css';
import { CardProduct } from '../CommonsComponents/CardProduct';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ProductsDefault() {
    const location = useLocation();
    const [categoryApplicated, setCategoryApplicated] = useState(0); 
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState(null);

    useEffect(() => {
    
        fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/ProductsController.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'getAllProducts'})
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data.result); 
        })
        .catch((error) => console.log('Error en fetch:', error));
    }, []);
    

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const cate = queryParams.get('cate');
        const search = queryParams.get('q');

        if (cate) {
            setCategoryApplicated(Number(cate));
        }
        if (search) {
            setSearchQuery(search);
        }
    }, [location.search]);

    if (!products) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="ProductsDefault-grid">
            {products
                .filter(product =>
                    (categoryApplicated === 0 || product.id_categoria === String(categoryApplicated)) && 
                    (searchQuery ? product.nombre_producto.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                )
                .map(product => (
                    <CardProduct key={product.id_producto} product={product} />
                ))
            }
        </div>
    );
}
