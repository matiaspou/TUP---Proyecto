import './HomePage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { MainCategoriasDestacados } from '../components/HomePage/MainCategoriasDestacados.jsx'
import { ViewSelectedProducts } from '../components/HomePage/ViewSelectedProducts.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { Menu } from '../components/CommonsComponents/Menu.jsx'

function HomePage() {
//falta agregar una vista de productos nuevos e imagenes tipo poster

  return (
    <>
      <div className="PagesMain">
        <Header/>
        <Menu/>
        <article className="HomePage-Article">
          <div className="HomePage-Conteiner">
            <ViewSelectedProducts titulo="Productos destacados"/>
            <MainCategoriasDestacados/>
            <ViewSelectedProducts titulo="Productos agregados recientemente"/>
            <Footer></Footer>
          </div>
        </article>
      </div>
    </>
  )
}

export default HomePage
