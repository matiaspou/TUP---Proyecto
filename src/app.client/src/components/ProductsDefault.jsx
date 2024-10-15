import './ProductsDefault.css'
import products from '../mocks/products.json';
import React, { useRef } from 'react';
import { CardProduct } from './CardProduct';

export function ProductsDefault () {
    return(
    <>
    <section class="ProductsDefault-conteiner">
                <div class="ProductsDefault-grid" >
                    {
                    products.map(product => (
                        <CardProduct product={product}></CardProduct>
                    ))}
                </div>
    </section>
    </>
)}