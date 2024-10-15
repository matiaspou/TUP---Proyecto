import './HomePage.css'
import { Header } from '../components/Header.jsx'
import { MainCategoriasDestacados } from '../components/HomePage/MainCategoriasDestacados.jsx'
import { ViewSelectedProducts } from '../components/HomePage/ViewSelectedProducts.jsx'
import { Footer } from '../components/Footer.jsx'
import { Menu } from '../components/Menu.jsx'

function HomePage() {
//falta agregar una vista de productos nuevos e imagenes tipo poster

  return (
    <>
      <div className="mainHome">
        <Header/>
        <Menu/>
        <article className="articleHome">
            <ViewSelectedProducts titulo="Productos destacados"/>
            <MainCategoriasDestacados/>
            <ViewSelectedProducts titulo="Productos agregados recientemente"/>
            <Footer></Footer>
        </article>
      </div>
    </>
  )
}

export default HomePage
