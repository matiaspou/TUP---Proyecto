import './SingleProductPage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { Menu } from '../components/CommonsComponents/Menu.jsx'
import { useEffect, useState } from 'react'
import productsStock from "../mocks/products.json";
import { ProductDetails } from '../components/SingleProductPage/ProductDetails.jsx'
import { ProductCharacteristics } from '../components/SingleProductPage/ProductCharacteristics.jsx'
import { ViewSelectedProducts } from '../components/CommonsComponents/ViewSelectedProducts.jsx'

function SingleProductPage() {

  const [product,setProduct]=useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    
    if (id) {
      var productFound= productsStock.find((product) => product.id == id);
      setProduct(productFound); 
    }
    
  }, [location.search]);

  return (
    <>
      <div className="PagesMain">
        <Header/>
        <Menu/>
        <article className="SingleProductPage-Article">
          <div className="SingleProductPage-Conteiner">
            <Menu/>
            <div className="SingleProductPage-ConteinerTop">
              <img src={product.image}/> 
              <ProductDetails product={product}></ProductDetails>
            </div>
            <ProductCharacteristics product={product}></ProductCharacteristics>
            <ViewSelectedProducts titulo="Productos similiares"></ViewSelectedProducts>
            <Footer></Footer>
          </div>
        </article>
      </div>
    </>
  )
}

export default SingleProductPage
