import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddSubscription() {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState('Entertainment');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      
      await axios.post('/api/subscriptions', 
        { 
          name, 
          cost: Number(cost), 
          category,
          billingCycle: 'monthly',       
          startDate: today,              
          usageLevel: 'daily',          
          nextRenewalDate: nextMonth     
        },
        { 
          headers: { 'x-auth-token': token } 
        }
      );

      
      navigate('/');
    } catch (err) {
      setError('Failed to add subscription. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Add New Subscription</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="Subscription Name (e.g., Spotify)" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />
        
        <input 
          type="number" 
          placeholder="Monthly Cost (e.g., 9.99)" 
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="Entertainment">Entertainment</option>
          <option value="Software">Software</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        
        <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add Subscription
        </button>
      </form>
      
      <br />
      <Link to="/">← Back to Dashboard</Link>
    </div>
  );
}

export default AddSubscription;