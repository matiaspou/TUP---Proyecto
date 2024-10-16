import './ProductsPage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { ProductsDefault } from '../components/ProductsPage/ProductsDefault.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { Menu } from '../components/CommonsComponents/Menu.jsx'
import { Nav } from '../components/ProductsPage/Nav/Nav.jsx'

function ProductsPage() {
//falta agregar una vista de productos nuevos e imagenes tipo poster

  return (
    <>
      <div className="PagesMain">
        <Header/>
        <Menu/>
        <article className='ProductsPage-Article'>
            <Nav></Nav>
            <ProductsDefault/>
            <Footer></Footer>
        </article>
        
      </div>
    </>
  )
}

export default ProductsPage
