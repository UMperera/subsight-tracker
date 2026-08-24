import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [summary, setSummary] = useState({
    totalMonthlyCost: 0,
    activeCount: 0,
    upcomingRenewals: []
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/subscriptions/summary', {
          headers: { 'x-auth-token': token }
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to fetch summary');
      }
    };
    
    fetchSummary();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Your Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
          <h3>Total Monthly Cost</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>${summary.totalMonthlyCost}</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
          <h3>Active Subscriptions</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>{summary.activeCount}</p>
        </div>
      </div>

      <h3>Upcoming Renewals (Next 30 Days)</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {summary.upcomingRenewals.map(sub => (
          <li key={sub._id} style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
            <strong>{sub.name}</strong> - ${sub.cost} (Renews: {new Date(sub.nextRenewalDate).toLocaleDateString()})
          </li>
        ))}
      </ul>

      <Link to="/add" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
        + Add New Subscription
      </Link>
    </div>
  );
}

export default Dashboard;