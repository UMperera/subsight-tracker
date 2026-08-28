import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light-mode' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); 
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        window.location.href = '/dashboard';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Could not connect to the server.');
    }
  };

  return (
    
    <div className={`auth-wrapper animate-page ${theme === 'light-mode' ? 'light-mode' : ''}`}>
      
     <nav className="auth-nav">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a4 4 0 0 0-8 0c0 2.2 1.8 4 4 4h4c2.2 0 4 1.8 4 4a4 4 0 0 1-8 0" /></svg>
          </div>
          <span>SubSight</span>
        </Link>

        {}
        <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Light/Dark Mode">
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </button>
      </nav>

      {}
      <main className="auth-main">
        <div className="auth-glass-card">
          <div className="auth-header">
            <div className="auth-logo-icon" style={{ marginBottom: '10px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a4 4 0 0 0-8 0c0 2.2 1.8 4 4 4h4c2.2 0 4 1.8 4 4a4 4 0 0 1-8 0" /></svg>
            </div>
            <h2>Welcome Back</h2>
            <p>Log in to track your subscriptions</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="email" name="email" className="auth-input" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" className="auth-input" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit" className="auth-btn">Sign In</button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </main>

    </div>
  );
};

export default Login;