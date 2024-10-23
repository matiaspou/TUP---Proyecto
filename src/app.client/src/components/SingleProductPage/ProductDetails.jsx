import { useEffect, useState } from 'react';
import { ButtonAddToCart } from '../CommonsComponents/ButtonAddToCart';
import './ProductDetails.css';
import securityIcon from "../../assets/security.svg";
import stockIcon from "../../assets/stock.svg";
import deliveryIcon from "../../assets/delivery.svg";

export function ProductDetails({ product }) {

    const [category, setCategory] = useState(null);
    const id_categoria = Number(product.id_categoria);

    const getCategoryByID = async (id_categoria) => {
        try {
            const response = await fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/CategoriesController.php", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'getCategoryByID', id: id_categoria })
            });
    
            const data = await response.json();
            console.log('Response from getCategoryByID:', data);
    
            return data.result;
    
        } catch (error) {
            console.log('Error en fetch:', error);
            return null; 
        }
    };
    

    useEffect(() => {
        const fetchCategory = async () => {
            const categoryData = await getCategoryByID(id_categoria);
            setCategory(categoryData);
        };

        fetchCategory();
    }, []);

    return (
        <>  
            <div className="ProductDetails-Conteiner">
                <div className="ProductDetails-Identity">
                    <span className='ProductDetails-ID'>{category ? category.nombre_categoria : 'Cargando...'}</span>
                    <span className='ProductDetails-ID'>ID: {product.id_producto}</span>
                </div>
                <span>{product.nombre_producto}</span>
                <hr />
                <div className="ProductDetails-ConteinerSub1">
                    <div className="ProductDetails-PriceTotal">
                        <span>
                            <h4>Precio:</h4>${new Intl.NumberFormat('es-AR').format(Math.trunc(product.precio))}
                        </span>
                    </div>
                    <div className="ProductDetails-PriceInCredit">
                        <span>
                            <h4>12 cuotas fijas de</h4>${new Intl.NumberFormat('es-AR').format(Math.trunc(product.precio / 12))}
                        </span>
                    </div>
                </div>
                <hr />
                <div className="ProductDetails-ConteinerSub2">
                    <span><img className="ProductDetails-IconBeneficts" src={securityIcon} />Garantía - 36 meses.</span>
                    <span><img className="ProductDetails-IconBeneficts" src={stockIcon} />Stock disponible.</span>
                    <span><img className="ProductDetails-IconBeneficts" src={deliveryIcon} />Envíos a todo el país.</span>
                </div>
                <div className="ProductDetails-ButtonAddToCart">
                    <ButtonAddToCart productId={product.id_producto} />
                </div>
            </div>
        </>
    );
}
