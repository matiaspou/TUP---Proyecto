import './ControlDashboard.css'
import { useState } from 'react';
import Users from './Views/Users.jsx'; 
import Products from './Views/Products.jsx';
import Orders from './Views/Orders.jsx';
import logo from '../assets/DOMinationSystemsLogo.png';

export const ControlDashboard = () => {

    const [selectedSection, setSelectedSection] = useState('Products');

    const sectionSelected = (section) => {
        setSelectedSection(section);
        console.log(selectedSection);
    };

    const renderSection = () => {
        switch (selectedSection) {
            case 'Products':
                return <Products />;
            case 'Users':
                return <Users />;
            case 'Orders':
                return <Orders />;
            case 'Statistics':
                return <Users />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="ControlDashboard-Container">
                <div className="ControlDashboard-Header">
                    <a href="/"><img src={logo} alt='Logo de DOMination System'/></a>
                    <div className="ControlDashboard-HeaderButtons">
                        <button className={selectedSection === 'Products' ? 'ControlDashboard-SectionSelected' : ''} onClick={() => sectionSelected('Products')}>📦 Productos </button>
                        <hr />
                        <button className={selectedSection === 'Users' ? 'ControlDashboard-SectionSelected' : ''} onClick={() => sectionSelected('Users')}>👥 Usuarios</button>
                        <hr />
                        <button className={selectedSection === 'Orders' ? 'ControlDashboard-SectionSelected' : ''} onClick={() => sectionSelected('Orders')}> 🧾 Pedidos </button>
                        <hr />
                        <button className={selectedSection === 'Statistics' ? 'ControlDashboard-SectionSelected' : ''} onClick={() => sectionSelected('Statistics')}> 📊 Estadísticas </button>
                    </div>
                    <a>👤 Pepito Jose</a>
                </div>
            
                <div className="ControlDashboard-Content">
                    <div className="ControlDashboard-ContentBox">
                        {renderSection()} 
                    </div>
                </div>
            </div>
        </>
    );
};