import './CartPage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { ViewSelectedProducts } from '../components/CommonsComponents/ViewSelectedProducts.jsx'
import { CardProductsInCart } from '../components/CartPage/CardProductsInCart.jsx'
import { useCart } from "../context/CartController.jsx";
import {Checkout} from '../components/CartPage/Checkout.jsx'

function CartPage() {

  const { getProductsInCart, getPriceTotalOfCart } = useCart();

  const productsInCart = getProductsInCart();

  return (
    <>
      <div className="PagesMain">
        <Header/>
        
        <article className="CartPage-Article">
          <div className="CartPage-Conteiner">
            {productsInCart.length != 0 ? (
            <div className="CartPage-ProductsSection">

              <div className="CartPage-ProductsGrid">

                <div className="CartPage-ProductsTitle">
                  <h3>Productos en el carrito</h3>
                </div>

                
                  <div className="CartPage-ProductsContent">
                    {productsInCart.map((product, index) => ( <CardProductsInCart product={product} key={index}></CardProductsInCart>))}

                    <hr />

                    <div className="CartPage-ProductsPriceTotal">
                      <h3>Total:</h3> 
                      <span>${new Intl.NumberFormat('es-AR').format(Math.trunc(getPriceTotalOfCart()))}</span>
                    </div>
                  </div>
                
            </div>

              <div className="CartPage-Checkout">
                  <div className="CartPage-CheckoutTitle">
                    <h3>Checkout</h3>
                  </div>
                  <div className="CartPage-CheckoutContent">
                    <Checkout products={productsInCart}></Checkout>
                  </div>
              </div>

            </div>

            ) : (
              <div className="CartPage-ProductsEmpty">
                <span>No hay elementos en el carrito 😔</span>
                <span>Agregá alguno... 😏😉</span>
                <a href="/products"><button>VER PRODUCTOS</button></a>
              </div>
              )
              }
            <div className="CartPage-SelectedProducts">
              <ViewSelectedProducts titulo="Productos destacados"></ViewSelectedProducts>
            </div>

            <Footer></Footer>
          </div>
        </article>
      </div>
    </>
  )
}

export default CartPage
