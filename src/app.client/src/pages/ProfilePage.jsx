import './ProfilePage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { OrderCard } from '../components/ProfilePage/OrderCard.jsx'

function ProfilePage() {
  return (
    <>
      <div className="PagesMain">
        <Header/>
        
        <article className="ProfilePage-Article">
          <div className="ProfilePage-Conteiner">
            <div className="ProfilePage-Header">Panel de usuario</div>
            <div className="ProfilePage-Content">
              <OrderCard></OrderCard>
            </div>
          </div>
          <Footer></Footer>
        </article>
      </div>
    </>
  )
}

export default ProfilePage
