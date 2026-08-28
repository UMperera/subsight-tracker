import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('user@example.com');
  
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || localStorage.getItem('name');
    const storedEmail = localStorage.getItem('userEmail') || localStorage.getItem('email');
    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);

    if (localStorage.getItem('theme') === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

 const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    
    navigate('/login', { replace: true }); 
  
  };

  return (
    <aside className="dash-sidebar">
      <div className="dash-brand">
        <div className="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white', width: '18px' }}><path d="M16 8a4 4 0 0 0-8 0c0 2.2 1.8 4 4 4h4c2.2 0 4 1.8 4 4a4 4 0 0 1-8 0" /></svg>
        </div>
        <div className="brand-text">
          <span className="brand-subsight" style={{ fontSize: '1.4rem' }}>SubSight</span>
        </div>
      </div>

      <nav className="dash-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Dashboard
        </NavLink>
        <NavLink to="/all" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          My Subscriptions
        </NavLink>
        <NavLink to="/calculator" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Calculator
        </NavLink>
        <NavLink to="/directory" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
          Directory
        </NavLink>
      </nav>

      <div className="sidebar-spacer"></div>

      <div className="sidebar-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '20px' }}>
        
        <button onClick={toggleTheme} className="nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'inherit', fontSize: '0.95rem' }}>
          {isDarkMode ? (
            <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> Light Mode</>
          ) : (
            <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Dark Mode</>
          )}
        </button>

        <button onClick={handleLogout} className="nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'inherit', fontSize: '0.95rem', color: '#ef4444' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Logout
        </button>
      </div>

      <NavLink to="/profile" className="dash-user-profile" style={{ textDecoration: 'none' }}>
        <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-email" style={{ wordBreak: 'break-all' }}>{userEmail}</span>
        </div>
      </NavLink>
    </aside>
  );
};

export default Sidebar;