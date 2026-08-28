import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper animate-page">
      
      {}
      <div className="floating-icon icon-chart">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="18" y="3" width="4" height="18"></rect><rect x="10" y="8" width="4" height="13"></rect><rect x="2" y="13" width="4" height="8"></rect></svg>
      </div>
      <div className="floating-icon icon-bell">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </div>
      <div className="floating-icon icon-money">
        {}
        <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      </div>

      {}
      <nav className="landing-nav">
        <div className="landing-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a4 4 0 0 0-8 0c0 2.2 1.8 4 4 4h4c2.2 0 4 1.8 4 4a4 4 0 0 1-8 0" /></svg>
          </div>
          <span>SubSight</span>
        </div>
        {}
        <button className="nav-signin-btn" onClick={() => navigate('/login')}>Sign In</button>
      </nav>

      {}
      <main className="landing-main">
        
        <div className="hero-section">
          <h1 className="hero-title">
            The Smarter Way to Manage <br />
            <span className="hero-gradient">Recurring Payments</span>
          </h1>
          
          <div className="hero-glass-box">
            {}
            <div className="star-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
            </div>
            <p>Track every subscription, spot what's not worth it, and get reminded before you're billed — all from one dashboard.</p>
          </div>

          <button className="cta-btn" onClick={() => navigate('/login')}>
            Start Tracking Now
            {}
            <svg style={{ marginLeft: '8px' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

        <div className="features-row">
          <div className="feature-card">
            {}
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h3>Spot Overlaps</h3>
            <p>Automatically detect redundant services and cancel what you no longer need.</p>
          </div>
          <div className="feature-card">
            {}
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
            </div>
            <h3>Smart Reminders</h3>
            <p>Get notified days before you are billed so you never pay for an unwanted auto-renewal again.</p>
          </div>
          <div className="feature-card">
            {}
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <h3>Expense Analytics</h3>
            <p>Visualize your spending habits by category and see exactly where your money goes.</p>
          </div>
        </div>

      </main>

      {}
     

    </div>
  );
};

export default LandingPage;