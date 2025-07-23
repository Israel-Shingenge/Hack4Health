import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HealthcareProviderPortal from './components/hp_Provider_Portal/hp_Provider_Portal.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HealthcareProviderPortal />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;