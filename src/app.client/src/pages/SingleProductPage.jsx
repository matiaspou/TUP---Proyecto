import './SingleProductPage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { useEffect, useState } from 'react'
import productsStock from "../mocks/products.json";
import { ProductDetails } from '../components/SingleProductPage/ProductDetails.jsx'
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
        <article className="SingleProductPage-Article">
          <div className="SingleProductPage-Conteiner">
            <div className="SingleProductPage-ConteinerTop">
              <div className="SingleProductPage-TitleView">Detalles del producto</div>

              <div className="SingleProductPage-DetailsProduct">
                <div className="SingleProductPage-ImgProduct"><img src={product.image}/></div>
                <ProductDetails product={product}></ProductDetails>
              </div>
              
            </div>
            <ViewSelectedProducts titulo="Productos similiares"></ViewSelectedProducts>
            <Footer></Footer>
          </div>
        </article>
      </div>
    </>
  )
}

export default SingleProductPage
