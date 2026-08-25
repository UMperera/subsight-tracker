import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddSubscription() {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    category: 'Entertainment',
    billingCycle: 'monthly',
    nextRenewalDate: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (submitting) {
      return;
    }

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      console.log('Sending subscription:', formData);

      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/api/subscriptions',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token || ''
          }
        }
      );

      console.log('Subscription added:', response.data);

      setSuccess('Subscription added successfully!');

      setTimeout(() => {
        navigate('/');
      }, 800);

    } catch (err) {
      console.error('Submission error:', err);

      if (err.response) {
        setError(
          err.response.data?.message ||
          'Failed to add subscription.'
        );
      } else if (err.request) {
        setError(
          'Cannot connect to the backend. Make sure the server is running on port 5000.'
        );
      } else {
        setError('Something went wrong.');
      }

      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '500px',
        margin: '0 auto'
      }}
    >
      <h2>Add New Subscription</h2>

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {success && (
        <p style={{ color: 'green' }}>
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '1rem' }}>
          <label>Subscription Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.25rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Cost ($)</label>

          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.25rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.25rem'
            }}
          >
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Billing Cycle</label>

          <select
            name="billingCycle"
            value={formData.billingCycle}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.25rem'
            }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Next Renewal Date</label>

          <input
            type="date"
            name="nextRenewalDate"
            value={formData.nextRenewalDate}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.25rem'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: submitting ? '#999' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {submitting ? 'Adding...' : 'Add Subscription'}
        </button>

      </form>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default AddSubscription;