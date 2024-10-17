import './CartPage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { Menu } from '../components/CommonsComponents/Menu.jsx'
import { ViewSelectedProducts } from '../components/CommonsComponents/ViewSelectedProducts.jsx'
import { CardProductsInCart } from '../components/CartPage/CardProductsInCart.jsx'
import { useCart } from "../context/CartController.jsx";
import {Checkout} from '../components/CartPage/Checkout.jsx'

function CartPage() {

  const { getProductsInCart } = useCart();

  const productsInCart = getProductsInCart();

  return (
    <>
      <div className="PagesMain">
        <Header/>
        <Menu/>
        <article className="CartPage-Article">
          <div className="CartPage-Conteiner">

            <div className="CartPage-ProductsSection">

              <div className="CartPage-ProductsGrid">
                <h3>Productos en el carrito</h3>
                <hr />
                {productsInCart.map(product => ( <CardProductsInCart product={product}></CardProductsInCart>))}
              </div>

              <div className="CartPage-Checkout">
                <h3>Checkout</h3>
                <hr />
                <Checkout products={productsInCart}></Checkout>
              </div>
              
            </div>

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
