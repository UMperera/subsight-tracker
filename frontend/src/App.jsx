import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Register from './pages/Register';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import './dark-mode.css';
import FAQ from './pages/FAQ';
import Directory from './pages/Directory';
import Calculator from './pages/Calculator';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AddSubscription from './pages/AddSubscription';
import SubscriptionsList from './pages/SubscriptionsList';
import Profile from './pages/Profile'; 
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <div style={{ flex: '1' }}>
          <Routes>
            {}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} /> {}
            <Route path="/add" element={<AddSubscription />} />
            <Route path="/all" element={<SubscriptionsList />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/directory" element={<Directory />} />
            
            {}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;