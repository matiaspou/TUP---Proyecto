import './ProfilePage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'


function ProfilePage() {


  return (
    <>
      <div className="PagesMain">
        <Header/>
        
        <article className="ProfilePage-Article">
          <div className="ProfilePage-Conteiner">
            <div className="ProfilePage-Header"></div>
              <div className="ProfilePage-Box1">
              <table className='ProfilePage-Table'>
                <thead>
                  <th>ID </th>
                  <th>Fecha de realizacion</th>
                  <th>Monto</th>
                  <th>Estado Pago</th>
                  <th>Estado Envio</th>
                  <th>Acciones</th>
                </thead>
                <tbody>
                  <tr>
                    <td>dada</td>
                    <td>dada</td>
                    <td>dada</td>
                    <td>dada</td>
                    <td>dada</td>
                    <td>dada</td>
                  </tr>
                  
                </tbody>
              </table>
              </div>
          </div>
          <Footer></Footer>
        </article>
      </div>
    </>
  )
}

export default ProfilePage
