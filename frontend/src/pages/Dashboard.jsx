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

        console.log('Fetching dashboard summary...');

        const res = await axios.get(
          'http://localhost:5000/api/subscriptions/summary',
          {
            headers: {
              'x-auth-token': token || ''
            }
          }
        );

        console.log('Dashboard summary:', res.data);

        setSummary(res.data);

      } catch (err) {

        console.error(
          'Failed to fetch summary:',
          err
        );

        setError(
          'Failed to load dashboard data.'
        );

      } finally {

        setLoading(false);

      }
    };


    fetchSummary();

  }, []);


  if (loading) {

    return (
      <div
        style={{
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        <h2>Your Dashboard</h2>
        <p>Loading...</p>
      </div>
    );

  }


  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >

      <h2>Your Dashboard</h2>


      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}


      {/* =========================================
          SUMMARY CARDS
      ========================================= */}

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >

        {/* Monthly Cost */}

        <div
          style={{
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            flex: 1
          }}
        >

          <h3>Total Monthly Cost</h3>

          <p
            style={{
              fontSize: '2rem',
              margin: 0
            }}
          >
            $
            {Number(
              summary.totalMonthlyCost
            ).toFixed(2)}
          </p>

        </div>


        {/* Active Subscriptions */}

        <div
          style={{
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            flex: 1
          }}
        >

          <h3>Active Subscriptions</h3>

          <p
            style={{
              fontSize: '2rem',
              margin: 0
            }}
          >
            {summary.activeCount}
          </p>

        </div>

      </div>


      {/* =========================================
          SPENDING BY CATEGORY
      ========================================= */}

      <h3>Spending by Category</h3>

      <div
        style={{
          marginBottom: '2rem',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      >

        {Object.keys(
          summary.categoryTotals
        ).length === 0 ? (

          <p>
            No categories to display yet.
          </p>

        ) : (

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}
          >

            {Object.entries(
              summary.categoryTotals
            ).map(([category, total]) => (

              <li
                key={category}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #eee'
                }}
              >

                <span>
                  {category}
                </span>

                <strong>
                  ${Number(total).toFixed(2)}
                </strong>

              </li>

            ))}

          </ul>

        )}

      </div>


      {/* =========================================
          UPCOMING RENEWALS
      ========================================= */}

      <h3>
        Upcoming Renewals (Next 30 Days)
      </h3>


      {summary.upcomingRenewals.length === 0 ? (

        <p>
          No upcoming renewals in the next 30 days.
        </p>

      ) : (

        <ul
          style={{
            listStyle: 'none',
            padding: 0
          }}
        >

          {summary.upcomingRenewals.map(
            (sub) => (

              <li
                key={sub._id}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid #eee',
                  marginBottom: '0.5rem'
                }}
              >

                <strong>
                  {sub.name}
                </strong>

                {' - '}

                ${Number(sub.cost).toFixed(2)}

                {' '}

                <span>
                  (Renews:{' '}
                  {new Date(
                    sub.nextRenewalDate
                  ).toLocaleDateString()}
                  )
                </span>

              </li>

            )
          )}

        </ul>

      )}


      {/* =========================================
          ADD BUTTON
      ========================================= */}

      <Link
        to="/add"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        + Add New Subscription
      </Link>

    </div>
  );
}

export default Dashboard;