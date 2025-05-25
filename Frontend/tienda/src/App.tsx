import HomePage from './pages/home/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProfilePage from './pages/profile/ProfilePage';
import RegisterPage from './pages/register/RegisterPage';

import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;