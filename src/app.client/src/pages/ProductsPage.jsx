import './ProductsPage.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { ProductsDefault } from '../components/ProductsPage/ProductsDefault.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { Menu } from '../components/CommonsComponents/Menu.jsx'
import { Categories } from '../components/ProductsPage/Categories.jsx'


function ProductsPage() {
//falta agregar una vista de productos nuevos e imagenes tipo poster

  return (
    <>
      <div className="ProductsPage-Main">
        <Header/>
        <Menu/>
        <div className="ProductsPage-Nav">
              <Categories></Categories>
        </div>
        <div className="ProductsPage-Content">
          <article className='ProductsPage-ProductGrid'>
              <ProductsDefault/>
          </article>
        </div>
        
      </div>
    </>
  )
}

export default ProductsPage
