import './ProfilePage.css';
import './Pages.css';
import { Header } from '../components/CommonsComponents/Header.jsx';
import { Footer } from '../components/CommonsComponents/Footer.jsx';
import { OrderCard } from '../components/ProfilePage/OrderCard.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from "../context/SessionContext.jsx";

function ProfilePage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);  // Cambiado de null a []

  const { user } = useSession(); 

  const getOrdersByUser = async (id_usuario) => {
    const response = await fetch("http://localhost/src/TUP---Proyecto/src/app.server/controllers/OrdersController.php", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'getOrdersByUser',
        id_usuario: id_usuario
      })
    });

    return await response.json(); 
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const response = await getOrdersByUser(user.id_usuario);
        const fetchedOrders = response.result || [];  // Asignar un array vacío si result es undefined
        
        setOrders(fetchedOrders); 
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      {user ? (
        <div className="PagesMain">
          <Header />
          <article className="ProfilePage-Article">
            <div className="ProfilePage-Container">
              <div className="ProfilePage-Header">Panel de usuario</div>
              <div className="ProfilePage-Content">
                {orders.length > 0 ? (  
                  orders.map(order => (
                    <OrderCard key={order.id_order} order={order} />
                  ))
                ) : (
                  <p>Cargando pedidos...</p>
                )}
              </div>
            </div>
            <Footer />
          </article>
        </div>
      ) : (
        navigate('/')
      )}
    </>
  );
}

export default ProfilePage;
