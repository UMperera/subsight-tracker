import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './AddSubscription.css';

const AddSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const prefillData = location.state || {};

  
  const [formData, setFormData] = useState({
    name: prefillData.name || '',
    cost: prefillData.cost || '',
    billingCycle: prefillData.billingCycle || 'Monthly',
    category: prefillData.category || 'Entertainment',
    nextRenewalDate: '',
    rating: 3,
    reminders: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending data to backend:', formData);

    try {
      const BACKEND_API_URL = 'http://localhost:5000/api/subscriptions';
      const token = localStorage.getItem('token');

      const response = await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Backend response:', result);
        navigate('/dashboard'); 
      } else {
        const errorData = await response.json();
        console.error('Failed to save subscription:', errorData.message || 'Unknown error');
        alert(`Error: ${errorData.message || 'Failed to save subscription. Please try again.'}`);
      }
    } catch (error) {
      console.error('Network or Server Error:', error);
      alert('Could not connect to the server. Please ensure your backend is running.');
    }
  };

  
  const ratingProgress = ((formData.rating - 1) / 4) * 100;

  return (
    <div className="add-page">
      <Sidebar />
      <main className="add-main animate-page">
        
        <div className="add-container glass-panel">
          
          <div className="add-header">
            <h1>Add New <span className="gradient-text">Subscription</span></h1>
            <p>Track a new recurring expense.</p>
          </div>

          <form onSubmit={handleSubmit} className="add-form">
            
            <div className="form-group full-width">
              <label>Service Name</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                placeholder="e.g., Netflix, Spotify, AWS"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Cost ($)</label>
                <input 
                    type="number" 
                    name="cost"
                    step="0.01"
                    min="0"
                    className="form-input" 
                    placeholder="0.00"
                    value={formData.cost}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label>Billing Cycle</label>
                <div className="select-wrapper">
                  <select name="billingCycle" className="form-input" value={formData.billingCycle} onChange={handleChange}>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Category</label>
                <div className="select-wrapper">
                  <select name="category" className="form-input" value={formData.category} onChange={handleChange}>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Music">Music</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Gaming">Gaming</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Next Renewal Date</label>
                <input 
                    type="date" 
                    name="nextRenewalDate"
                    className="form-input" 
                    value={formData.nextRenewalDate}
                    onChange={handleChange}
                    required
                />
              </div>
            </div>

            <div className="form-group full-width slider-section">
              <div className="slider-header">
                <label>Value Rating (1 = Poor, 5 = Essential)</label>
                <span className="rating-badge primary-badge">{formData.rating} Stars</span>
              </div>
              <div className="custom-range-wrapper">
                <input 
                  type="range" 
                  name="rating"
                  min="1" 
                  max="5" 
                  step="1"
                  value={formData.rating} 
                  onChange={handleChange}
                  className="sleek-slider thumb-primary"
                  style={{ background: `linear-gradient(to right, #6366f1 ${ratingProgress}%, rgba(148, 163, 184, 0.2) ${ratingProgress}%)` }}
                />
              </div>
              <div className="slider-scale">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>

            <div className="form-group full-width glass-alert">
              <div className="toggle-text">
                <label>Email Reminders</label>
                <p>Receive alerts 3, 2, and 1 day before this bill is due.</p>
              </div>
              <label className="theme-switch">
                <input 
                  type="checkbox" 
                  name="reminders"
                  checked={formData.reminders} 
                  onChange={handleChange}
                />
                <span className="slider-toggle round"></span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Subscription</button>
              <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
};

export default AddSubscription;