import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './SubscriptionsList.css';

const getBrandIcon = (name) => {
  const cleanName = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const knownDomains = {
    fb: 'facebook.com', facebook: 'facebook.com',
    insta: 'instagram.com', instagram: 'instagram.com',
    netflix: 'netflix.com', spotify: 'spotify.com', amazon: 'amazon.com', aws: 'amazon.com',
    prime: 'primevideo.com', disney: 'disneyplus.com', youtube: 'youtube.com',
    google: 'google.com', apple: 'apple.com', hulu: 'hulu.com', adobe: 'adobe.com',
    chatgpt: 'openai.com', canva: 'canva.com', notion: 'notion.so', github: 'github.com',
    dropbox: 'dropbox.com', slack: 'slack.com', zoom: 'zoom.us', hbo: 'max.com',
    microsoft: 'microsoft.com', playstation: 'playstation.com', xbox: 'xbox.com',
    tiktok: 'tiktok.com'
  };

  for (const [key, domain] of Object.entries(knownDomains)) {
    if (cleanName.includes(key)) return `https://icon.horse/icon/${domain}`;
  }
  if (cleanName.length > 1) {
    return `https://icon.horse/icon/${cleanName}.com`;
  }
  return null; 
};

const getFallbackColor = (name) => {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
  const charCode = name ? name.charCodeAt(0) : 0;
  return colors[charCode % colors.length];
};


const getTagColor = (cat) => {
  const lowerCat = (cat || '').toLowerCase();
  if (lowerCat === 'entertainment') return 'purple';
  if (lowerCat === 'health') return 'green';
  if (lowerCat === 'software') return 'blue';
  if (lowerCat === 'music') return 'orange';
  if (lowerCat === 'productivity') return 'pink';
  return 'gray';
};

const SubscriptionsList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/subscriptions', {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setSubscriptions(response.data);
    } catch (err) {
      setError('Failed to load subscriptions.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/subscriptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
    } catch (err) {
      alert('Failed to delete subscription.');
    }
  };

  if (loading) {
    return (
      <div className="list-page">
        <Sidebar />
        <main className="list-main animate-page">
          <div className="list-loading">Loading your subscriptions...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="list-page">
      <Sidebar />
      <main className="list-main animate-page">
        <div className="list-container">
          <div className="list-header">
            <div>
              <h2>All Subscriptions</h2>
              <p>Manage and delete your current recurring expenses.</p>
            </div>
            <button className="btn-primary" onClick={() => navigate('/add')}>
              + Add New
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {subscriptions.length === 0 && !error ? (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <h3>No Subscriptions Found</h3>
              <p>You don't have any active subscriptions yet.</p>
              <button className="btn-primary" onClick={() => navigate('/add')}>
                + Add Your First Subscription
              </button>
            </div>
          ) : (
            <div className="subscriptions-wrapper">
              {subscriptions.map((sub) => {
                const brandIcon = getBrandIcon(sub.name);
                const categoryText = sub.category ? sub.category.charAt(0).toUpperCase() + sub.category.slice(1).toLowerCase() : 'Other';
                
                return (
                  <div key={sub._id} className="sub-card">
                    <div className="sub-main-info">
                      <div className="sub-avatar" style={{ padding: brandIcon ? '6px' : '0', backgroundColor: brandIcon ? 'transparent' : getFallbackColor(sub.name) }}>
                        {brandIcon ? (
                          <img src={brandIcon} alt={sub.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                          <span style={{color: 'white', fontFamily: 'inherit'}}>{sub.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="sub-details">
                        <h3>{sub.name}</h3>
                        {}
                        <span className={`tag ${getTagColor(sub.category)}`}>{categoryText}</span>
                      </div>
                    </div>
                    
                    <div className="sub-meta">
                      <div className="meta-item">
                        <span className="meta-label">Cost</span>
                        <span className="meta-value price-value">${Number(sub.cost).toFixed(2)} <span className="meta-cycle">/ {sub.billingCycle}</span></span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Renews On</span>
                        <span className="meta-value">{new Date(sub.nextRenewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Rating</span>
                        <span className="meta-value rating-stars">⭐ {sub.rating}/5</span>
                      </div>
                    </div>

                    <div className="sub-actions">
                      <button className="delete-btn" onClick={() => handleDelete(sub._id, sub.name)} title="Delete Subscription">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SubscriptionsList;