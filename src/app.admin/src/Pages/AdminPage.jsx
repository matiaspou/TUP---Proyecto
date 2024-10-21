import './AdminPage.css';
import { ControlDashboard } from '../components/ControlDashboard.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from "../context/SessionContext.jsx";

function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSession(); 

  useEffect(() => { 

    if (!user) {
      navigate('/login');
    }
  }, [location.search]);

  return (
    <div className="AdminPage-Layout">
      {user ? <ControlDashboard /> : null}
    </div>
  );
}

export default AdminPage;
