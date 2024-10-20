import AdminPage from './Pages/AdminPage';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
        <Router>
            <Routes>
              <Route path="/" element={<AdminPage/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App