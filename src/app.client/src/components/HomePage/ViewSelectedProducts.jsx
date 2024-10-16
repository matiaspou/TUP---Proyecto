import './ViewSelectedProducts.css'
import products from '../../mocks/products.json';
import { useRef } from 'react';
import { CardProduct } from '../CommonsComponents/CardProduct';

export function ViewSelectedProducts ({titulo}) {
    const carouselRef = useRef();

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
    <section className="ViewSelectedProducts-conteiner">
        <div className="ViewSelectedProducts-headerProduct">
                <h2>{titulo}</h2>
                <div className="ViewSelectedProducts-carrouselButtons">
                    <button className="ViewSelectedProducts-scroll-button left" onClick={scrollLeft}>
                        &lt;
                    </button>
                    <button className="ViewSelectedProducts-scroll-button right" onClick={scrollRight}>
                        &gt;
                    </button>
                </div>
        </div>
        <div className="ViewSelectedProducts-productGrid" ref={carouselRef}>
        {
            products.map(product => (
                <CardProduct product={product} key={product.id}></CardProduct>
            ))}
        </div>
        
    </section>
    </>
)}