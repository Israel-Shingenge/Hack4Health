import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HealthcareProviderPortal from './components/HP/hp_portal.jsx';
import HomePage from './components/home/home.jsx';
import ClaimsDepartmentPortal from './components/CD/cd_portal.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cd-portal" element={<ClaimsDepartmentPortal />} />
        <Route path="/hp-portal" element={<HealthcareProviderPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

