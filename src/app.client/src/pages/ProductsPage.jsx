import './ProductsPage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { ProductsDefault } from '../components/ProductsPage/ProductsDefault.jsx'
import { Filters } from '../components/ProductsPage/Filters.jsx'
import { Categories } from '../components/ProductsPage/Categories.jsx'


function ProductsPage() {


  return (
    <>
      <div className="PagesMain">
        <Header/>
        <div className="ProductsPage-Conteiner">
          <div className="ProductsPage-Content">
            <div className="ProductsPage-Nav">
                  <div className="ProductsPage-SubContentTitle"></div>
                  <Categories></Categories>
                  <hr />
                  <Filters></Filters>
            </div>
            <article className='ProductsPage-ProductGrid'>
                <div className="ProductsPage-SubContentTitle"></div>
                <div className="ProductsPage-ProductGridContent">
                  <ProductsDefault/>
                </div>
                
            </article>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsPage
