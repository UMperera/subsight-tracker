import React from 'react';

const Support = () => {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Support Center</h1>
      <p style={{ lineHeight: '1.6', color: '#64748b' }}>
        Need help with your account? We are here for you! 
        <br /><br />
        If you are experiencing issues adding a subscription, missing an email alert, or have a feature request, please reach out to our development team.
      </p>
      
      {}
      <div className="card" style={{ marginTop: '30px', display: 'inline-block' }}>
        <span style={{ fontWeight: '500' }}>Email us at: </span> 
        <a href="mailto:support@subsighttracker.com" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', marginLeft: '5px' }}>
          support@subsighttracker.com
        </a>
      </div>
    </div>
  );
};

export default Support;