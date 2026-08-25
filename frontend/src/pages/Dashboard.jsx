import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

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

  const categoryData = Object.entries(summary.categoryTotals).map(([key, value]) => ({
    name: key,
    value: Number(value)
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];


  const monthly = Number(summary.totalMonthlyCost);
  const yearly = monthly * 12;
  const fiveYear = monthly * 12 * 5;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Your Dashboard</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        
        {}
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', flex: '1 1 20%' }}>
          <h3>Monthly</h3>
          <p style={{ fontSize: '1.75rem', margin: 0 }}>
            ${monthly.toFixed(2)}
          </p>
        </div>

        {}
        <div style={{ padding: '1rem', border: '1px solid #ffeeba', backgroundColor: '#fff3cd', borderRadius: '8px', flex: '1 1 20%' }}>
          <h3 style={{ color: '#856404' }}>1-Year Cost</h3>
          <p style={{ fontSize: '1.75rem', margin: 0, color: '#856404', fontWeight: 'bold' }}>
            ${yearly.toFixed(2)}
          </p>
        </div>

        {}
        <div style={{ padding: '1rem', border: '1px solid #f5c6cb', backgroundColor: '#f8d7da', borderRadius: '8px', flex: '1 1 20%' }}>
          <h3 style={{ color: '#721c24' }}>5-Year Cost</h3>
          <p style={{ fontSize: '1.75rem', margin: 0, color: '#721c24', fontWeight: 'bold' }}>
            ${fiveYear.toFixed(2)}
          </p>
        </div>

        {}
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', flex: '1 1 20%' }}>
          <h3>Active Subs</h3>
          <p style={{ fontSize: '1.75rem', margin: 0 }}>
            {summary.activeCount}
          </p>
        </div>

      </div>

      <h3>Spending by Category</h3>
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        {categoryData.length === 0 ? (
          <p>No categories to display yet.</p>
        ) : (
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
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