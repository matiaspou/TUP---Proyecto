import './ProfilePage.css'
import './Pages.css'
import { Header } from '../components/CommonsComponents/Header.jsx'
import { Footer } from '../components/CommonsComponents/Footer.jsx'
import { OrderCard } from '../components/ProfilePage/OrderCard.jsx'
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from "../context/SessionContext.jsx";

function ProfilePage() {

  const navigate = useNavigate();
  const location = useLocation();

  const { user, checkSession } = useSession(); 

  useEffect(() => { 
    const response = checkSession(); 
    if (!response.success) { 
      navigate('/'); 
    }
  }, [location.search, navigate, user]);


  return (
    <> 
    {user ? 
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
      : navigate('/')
    } 
    </>
  )
}

export default ProfilePage
