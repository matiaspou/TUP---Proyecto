import './ProductsPage.css'
import { Header } from '../components/Header.jsx'
import { ProductsDefault } from '../components/ProductsDefault.jsx'
import { Footer } from '../components/Footer.jsx'
import { Menu } from '../components/Menu.jsx'
import { Nav } from '../components/Nav/Nav.jsx'

function ProductsPage() {
//falta agregar una vista de productos nuevos e imagenes tipo poster

  return (
    <>
      <div className="ProductsPage-main">
        <Header/>
        <Menu/>
        <Nav></Nav>
        <article>
            <ProductsDefault/>
        </article>
        <Footer></Footer>
      </div>
    </>
  )
}

export default ProductsPage
