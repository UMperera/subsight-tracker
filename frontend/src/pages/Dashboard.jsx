import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        
        const token = localStorage.getItem('token');
        
        
        if (!token) {
          navigate('/login');
          return;
        }

        
        const response = await axios.get('/api/subscriptions', {
          headers: { 'x-auth-token': token }
        });

        
        setSubscriptions(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch subscriptions. Your session may have expired.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchSubscriptions();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>My Subscriptions</h2>
      
      
      <button 
        onClick={() => navigate('/add')} 
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        + Add New Subscription
      </button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {subscriptions.length === 0 ? (
        <p>You have no subscriptions yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {subscriptions.map((sub) => (
            <li key={sub._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem', borderRadius: '8px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{sub.name}</h3>
              <p style={{ margin: '0' }}><strong>Cost:</strong> ${sub.cost} / {sub.billingCycle || 'monthly'}</p>
              <p style={{ margin: '0' }}><strong>Category:</strong> {sub.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;