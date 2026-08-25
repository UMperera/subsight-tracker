import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const res = await axios.get('http://localhost:5000/api/subscriptions', {
        headers: { 'x-auth-token': token || '' }
      });
      setSubscriptions(res.data);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError('Failed to load subscriptions.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    
    if (!window.confirm('Are you sure you want to delete this subscription?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/subscriptions/${id}`, {
        headers: { 'x-auth-token': token || '' }
      });
      
      // Remove the deleted item from the screen instantly
      setSubscriptions(subscriptions.filter(sub => sub._id !== id));
    } catch (err) {
      console.error('Error deleting subscription:', err);
      alert('Failed to delete. Please try again.');
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>All Subscriptions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {subscriptions.map((sub) => (
            <li 
              key={sub._id} 
              style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc', alignItems: 'center' }}
            >
              <div>
                <strong>{sub.name}</strong> - ${Number(sub.cost).toFixed(2)} / {sub.billingCycle}
                <br />
                <small style={{ color: '#666' }}>Category: {sub.category}</small>
              </div>
              <button
                onClick={() => handleDelete(sub._id)}
                style={{ background: '#dc3545', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Link to="/">← Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default SubscriptionsList;