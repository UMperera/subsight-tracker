import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Could not connect to the server.');
    }
  };

  return (
    <div className="auth-wrapper animate-page">
      
      {}
      <nav className="auth-nav">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a4 4 0 0 0-8 0c0 2.2 1.8 4 4 4h4c2.2 0 4 1.8 4 4a4 4 0 0 1-8 0" /></svg>
          </div>
          <span>SubSight</span>
        </Link>
      </nav>

      {}
      <main className="auth-main">
        <div className="auth-glass-card">
          
          <div className="auth-header">
            <div className="auth-logo-icon" style={{ marginBottom: '10px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a4 4 0 0 0-8 0c0 2.2 1.8 4 4 4h4c2.2 0 4 1.8 4 4a4 4 0 0 1-8 0" /></svg>
            </div>
            <h2>Create Account</h2>
            <p>Join SubSight to manage your expenses</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              className="auth-input" 
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              className="auth-input" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <input 
              type="password" 
              name="password"
              className="auth-input" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <button type="submit" className="auth-btn">Sign Up</button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </main>

      {}
      
    </div>
  );
};

export default Register;