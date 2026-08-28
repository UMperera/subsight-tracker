import React from 'react';

const Privacy = () => {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Privacy Policy</h1>
      <p style={{ lineHeight: '1.6', color: 'var(--text-muted, #64748b)' }}>
        Your privacy is critically important to us. SubSight Tracker only stores the data necessary to provide you with our subscription tracking services. We do not sell your personal data to third parties, and we use industry-standard encryption to protect your information. We will never ask for your actual credit card numbers or bank login details.
      </p>
    </div>
  );
};

export default Privacy;