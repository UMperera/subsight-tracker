import React from 'react';

const Terms = () => {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Terms of Service</h1>
      <p style={{ lineHeight: '1.6', color: 'var(--text-muted, #64748b)' }}>
        By using SubSight Tracker, you agree to our terms of service. This application is provided "as is" to help you estimate and track your recurring expenses. While we strive for accuracy in our calculations and automated email reminders, it is ultimately your responsibility to manage, cancel, or update your actual subscriptions with the respective service providers.
      </p>
    </div>
  );
};

export default Terms;