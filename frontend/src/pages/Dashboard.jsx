import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [summary, setSummary] = useState({
    totalMonthlyCost: 0,
    activeCount: 0,
    categoryTotals: {},
    upcomingRenewals: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/subscriptions/summary', {
          headers: {
            'x-auth-token': token || ''
          }
        });
        setSummary(res.data);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2>Your Dashboard</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Your Dashboard</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
          <h3>Total Monthly Cost</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>
            ${Number(summary.totalMonthlyCost).toFixed(2)}
          </p>
        </div>

        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', flex: 1 }}>
          <h3>Active Subscriptions</h3>
          <p style={{ fontSize: '2rem', margin: 0 }}>
            {summary.activeCount}
          </p>
        </div>
      </div>

      <h3>Spending by Category</h3>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        {Object.keys(summary.categoryTotals).length === 0 ? (
          <p>No categories to display yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {Object.entries(summary.categoryTotals).map(([category, total]) => (
              <li key={category} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                <span>{category}</span>
                <strong>${Number(total).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3>Upcoming Renewals (Next 30 Days)</h3>
      {summary.upcomingRenewals.length === 0 ? (
        <p>No upcoming renewals in the next 30 days.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {summary.upcomingRenewals.map((sub) => (
            <li key={sub._id} style={{ padding: '1rem', borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
              <strong>{sub.name}</strong> - ${Number(sub.cost).toFixed(2)} 
              <span> (Renews: {new Date(sub.nextRenewalDate).toLocaleDateString()})</span>
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link to="/add" style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          + Add New Subscription
        </Link>
        <Link to="/all" style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          View All / Delete
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;