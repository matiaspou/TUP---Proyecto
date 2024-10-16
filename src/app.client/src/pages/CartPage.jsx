import './CartPage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { Menu } from '../components/CommonsComponents/Menu.jsx'

function CartPage() {
  return (
    <>
      <div className="PagesMain">
        <Header/>
        <Menu/>
        <article className="CartPage-Article">
          <div className="CartPage-Conteiner">
            <div className="CartPage-CartItemsGrid">
              
            </div>
            <Footer></Footer>
          </div>
        </article>
      </div>
    </>
  )
}

export default CartPage
