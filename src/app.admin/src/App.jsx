import AdminPage from './Pages/AdminPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
        <Router>
            <Routes>
              <Route path="/" element={<AdminPage/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App