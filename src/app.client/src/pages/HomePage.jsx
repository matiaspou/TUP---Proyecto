import './HomePage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { MainCategoriasDestacados } from '../components/HomePage/MainCategoriasDestacados.jsx'
import { ViewSelectedProducts } from '../components/CommonsComponents/ViewSelectedProducts.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { Menu } from '../components/CommonsComponents/Menu.jsx'
import banner from "../assets/banners/2659801-amd-ryzen-ai-7-and-3d-vcache-9-banner.avif"
import banner2 from "../assets/banners/Reward point-Wall Banner-Mobile-1536X640.webp"
import banner3 from "../assets/banners/banner_still.jpg"
import banner4 from "../assets/banners/shop-2080-ti-1070@2x.jpg"

function HomePage() {
//falta agregar una vista de productos nuevos e imagenes tipo poster

  return (
    <>
      <div className="PagesMain">
        <Header/>
        
        <article className="HomePage-Article">
          <div className="HomePage-Conteiner">
            <Menu/>
            <img className="HomePage-Banner" src={banner3} alt="" />
            <ViewSelectedProducts titulo="Productos destacados"/>
            <img className="HomePage-Banner" src={banner2} alt="" />
            <MainCategoriasDestacados/>
            <img className="HomePage-Banner" src={banner}  style={{height:"19rem"}}alt="" />
            <ViewSelectedProducts titulo="Productos agregados recientemente"/>
            <img className="HomePage-Banner" src={banner4} style={{height:"25rem"}} alt="" />
            <Footer></Footer>
          </div>
        </article>
      </div>
    </>
  )
}

export default HomePage
