import './ProductsPage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { ProductsDefault } from '../components/ProductsPage/ProductsDefault.jsx'
import { Filters } from '../components/ProductsPage/Filters.jsx'
import { Menu } from '../components/CommonsComponents/Menu.jsx'
import { Categories } from '../components/ProductsPage/Categories.jsx'


function ProductsPage() {
//falta agregar una vista de productos nuevos e imagenes tipo poster

  return (
    <>
      <div className="PagesMain">
        <Header/>
        <div className="ProductsPage-Conteiner">
          <Menu/>
          <div className="ProductsPage-Content">
            <div className="ProductsPage-Nav">
                  <Categories></Categories>
                  <Filters></Filters>
            </div>
            <article className='ProductsPage-ProductGrid'>
                <ProductsDefault/>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsPage
