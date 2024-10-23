import './ViewSelectedProducts.css'
import { useEffect, useRef, useState } from 'react';
import { CardProduct } from './CardProduct';

export function ViewSelectedProducts ({titulo}) {
    const carouselRef = useRef();
    const [products, setProducts] = useState(null);

    useEffect(() => {
    
        fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/ProductsController.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'getSelectedProducts'})
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data.result); 
        })
        .catch((error) => console.log('Error en fetch:', error));
    }, []);
    

    if(!products) { return null} 

    const scrollLeft = () => {
        const carousel = carouselRef.current;
        if (carousel.scrollLeft === 0) {
            // Si estamos en el principio, volvemos al final
            carousel.scrollLeft = carousel.scrollWidth;
        } else {
            carousel.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        const carousel = carouselRef.current;
        if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
            // Si estamos en el final, volvemos al principio
            carousel.scrollLeft = 0;
        } else {
            carousel.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    return(
            <>
            <section className="ViewSelectedProducts-Conteiner">
                <div className="ViewSelectedProducts-Header">
                        <h2>{titulo}</h2>
                        <div className="ViewSelectedProducts-carrouselButtons">
                            <button className="ViewSelectedProducts-scroll-button left" onClick={scrollLeft}>
                                &lt;
                            </button>
                            <hr />
                            <button className="ViewSelectedProducts-scroll-button right" onClick={scrollRight}>
                                &gt;
                            </button>
                        </div>
                </div>
                <div className="ViewSelectedProducts-productGrid" ref={carouselRef}>
                {
                    products.map((product, index) => (
                        <CardProduct key={index} product={product}></CardProduct>
                    ))}
                </div>
            </section>
            </>

)}