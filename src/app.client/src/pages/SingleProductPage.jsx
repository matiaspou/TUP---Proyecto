import './SingleProductPage.css';
import './Pages.css';
import { Header } from '../components/CommonsComponents/Header.jsx';
import { Footer } from '../components/CommonsComponents/Footer.jsx';
import { useEffect, useState } from 'react';
import { ProductDetails } from '../components/SingleProductPage/ProductDetails.jsx';
import { ViewSelectedProducts } from '../components/CommonsComponents/ViewSelectedProducts.jsx';

function SingleProductPage() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id');

      fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/ProductsController.php", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'getProductById',
            id: id})
      })
      .then(response => response.json())
      .then(data => {
          setProduct(data.result); 
      })
      .catch((error) => console.log('Error en fetch:', error));
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="PagesMain">
        <Header />
        <article className="SingleProductPage-Article">
          <div className="SingleProductPage-Conteiner">
            <div className="SingleProductPage-ConteinerTop">
              <div className="SingleProductPage-TitleView">Detalles del producto</div>

              <div className="SingleProductPage-DetailsProduct">
                {product.url_imagen && (
                  <div className="SingleProductPage-ImgProduct">
                    <img src={product.url_imagen} alt={product.nombre_producto} />
                  </div>
                )}
                <ProductDetails product={product} />
              </div>
            </div>
            <ViewSelectedProducts titulo="Productos similares" />
            <Footer />
          </div>
        </article>
      </div>
    </>
  );
}

export default SingleProductPage;
