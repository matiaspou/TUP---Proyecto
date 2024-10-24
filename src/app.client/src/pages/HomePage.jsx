import './HomePage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { FeaturedCategories } from '../components/HomePage/FeaturedCategories.jsx'
import { ViewSelectedProducts } from '../components/CommonsComponents/ViewSelectedProducts.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import banner from "../assets/banners/pbaabril2024.jpg"
import banner2 from "../assets/banners/gaming-pcs-banner_ICUE-CERTIFIED.webp"
import banner3 from "../assets/banners/banner_still.jpg"
import banner4 from "../assets/banners/geforce-ada-4090-background-image-spec2-bb300_300-l.jpg"
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSession } from '../context/SessionContext.jsx'

function HomePage() {


  return (
    <>
      <div className="PagesMain">
        <Header/>
        
        <article className="HomePage-Article">
          <div className="HomePage-Conteiner">
            <img className="HomePage-Banner" src={banner3} alt="" />
            <ViewSelectedProducts titulo="Productos destacados"/>
            <img className="HomePage-Banner" src={banner} alt="" />
            <FeaturedCategories/>
            <img className="HomePage-Banner" src={banner4}  alt="" />
            <ViewSelectedProducts titulo="Productos agregados recientemente"/>
            <img className="HomePage-Banner" src={banner2}  alt="" />
            <Footer></Footer>
          </div>
        </article>
      </div>
    </>
  )
}

export default HomePage
