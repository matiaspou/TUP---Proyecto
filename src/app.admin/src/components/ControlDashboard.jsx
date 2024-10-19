import './ControlDashboard.css'
import { useState } from 'react';
import Users from './Views/Users.jsx'; 
import Products from './Views/Products.jsx';

export const ControlDashboard = () => {

    const [selectedSection, setSelectedSection] = useState('Users');

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
                return <Users />;
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
                    <div className="ControlDashboard-HeaderButtons">
                        <button className={selectedSection === 'Products' ? 'selected' : ''} onClick={() => sectionSelected('Products')}>📦 Productos </button>
                        <hr />
                        <button className={selectedSection === 'Users' ? 'selected' : ''} onClick={() => sectionSelected('Users')}>👥 Usuarios</button>
                        <hr />
                        <button className={selectedSection === 'Orders' ? 'selected' : ''} onClick={() => sectionSelected('Orders')}> 🧾 Pedidos </button>
                        <hr />
                        <button className={selectedSection === 'Statistics' ? 'selected' : ''} onClick={() => sectionSelected('Statistics')}> 📊 Estadísticas </button>
                    </div>
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