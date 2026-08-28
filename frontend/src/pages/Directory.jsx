import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Directory.css';


const getBrandIcon = (domain) => `https://icon.horse/icon/${domain}`;


const getTagColor = (cat) => {
  const lowerCat = (cat || '').toLowerCase();
  if (lowerCat === 'entertainment') return 'purple';
  if (lowerCat === 'health') return 'green';
  if (lowerCat === 'software') return 'blue';
  if (lowerCat === 'music') return 'orange';
  if (lowerCat === 'productivity') return 'pink';
  return 'gray';
};

const presetSubscriptions = [
  { name: 'Netflix', category: 'Entertainment', cost: 15.49, billingCycle: 'Monthly', domain: 'netflix.com' },
  { name: 'Amazon Prime', category: 'Entertainment', cost: 14.99, billingCycle: 'Monthly', domain: 'amazon.com' },
  { name: 'Disney+', category: 'Entertainment', cost: 7.99, billingCycle: 'Monthly', domain: 'disneyplus.com' },
  { name: 'Spotify Premium', category: 'Music', cost: 10.99, billingCycle: 'Monthly', domain: 'spotify.com' },
  { name: 'Apple Music', category: 'Music', cost: 10.99, billingCycle: 'Monthly', domain: 'apple.com' },
  { name: 'ChatGPT Plus', category: 'Productivity', cost: 20.00, billingCycle: 'Monthly', domain: 'openai.com' },
  { name: 'Notion', category: 'Productivity', cost: 8.00, billingCycle: 'Monthly', domain: 'notion.so' },
  { name: 'Canva Pro', category: 'Productivity', cost: 14.99, billingCycle: 'Monthly', domain: 'canva.com' },
  { name: 'PlayStation Plus', category: 'Gaming', cost: 9.99, billingCycle: 'Monthly', domain: 'playstation.com' }
];

const Directory = () => {
  const navigate = useNavigate();

  const handleSmartAdd = (preset) => {
  
    navigate('/add', { 
      state: { 
        name: preset.name, 
        cost: preset.cost, 
        category: preset.category,
        billingCycle: preset.billingCycle
      } 
    });
  };

  return (
    <div className="directory-page">
      <Sidebar />
      <main className="directory-main animate-page">
        <div className="directory-container">
          
          <div className="directory-header">
            <h2>Popular Subscriptions</h2>
            <p>Browse standard pricing. Click to pre-fill your tracker instantly.</p>
          </div>

          <div className="presets-grid">
            {presetSubscriptions.map((preset, index) => (
              <div key={index} className="preset-card">
                <div className="preset-info">
                  <div className="preset-icon">
                    <img src={getBrandIcon(preset.domain)} alt={preset.name} />
                  </div>
                  <div className="preset-details">
                    <h3>{preset.name}</h3>
                    <span className={`tag ${getTagColor(preset.category)}`}>
                      {preset.category}
                    </span>
                  </div>
                </div>
                
                <div className="preset-price price-value">
                  ${preset.cost.toFixed(2)} <span className="meta-cycle">/mo</span>
                </div>
                
                <button 
                  className="quick-add-btn" 
                  onClick={() => handleSmartAdd(preset)}
                >
                  + Add to Tracker
                </button>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Directory;