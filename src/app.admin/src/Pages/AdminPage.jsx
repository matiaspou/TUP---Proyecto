import './AdminPage.css'
import { ControlDashboard } from '../components/ControlDashboard.jsx'
import { Header } from '../components/Header.jsx'

function AdminPage() {
  return (
    <>
      <div className="AdminPage-Layout">
        <Header/>
        <ControlDashboard></ControlDashboard>
      </div>
    </>
  )
}

export default AdminPage
