import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';
import '../pages/Auth.css'; 

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is SubSight Tracker?",
      answer: "SubSight is a smart subscription management tool that helps you track your recurring expenses, alerts you about overlapping services, and sends you email reminders before your card is charged."
    },
    {
      question: "How do email reminders work?",
      answer: "When you add a subscription, simply leave the 'Email Reminders' toggle on. Our automated background system will send you a summary email 1 to 3 days before your subscription renews, giving you enough time to cancel if needed."
    },
    {
      question: "Can I add a custom subscription not listed in the directory?",
      answer: "Absolutely! The directory is just for quick-adding popular services. You can manually add any subscription (like your local gym, a Patreon, or a custom software tool) by clicking '+ Add Subscription' in your dashboard."
    },
    {
      question: "What is 'Overlap Detection'?",
      answer: "Our smart alerts analyze your subscription categories. If it notices you are paying for multiple active services in the same category (e.g., Netflix, Hulu, and Prime Video all under 'Entertainment'), it will warn you so you can cut redundant costs."
    },
    {
      question: "Is my data secure?",
      answer: "Yes. Your data is strictly isolated to your account. Our multi-tenant database architecture ensures that no other users can see your subscriptions, financial data, or email address."
    }
  ];

  return (
    <div className="faq-wrapper">
      <nav className="auth-nav">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a4 4 0 0 0-8 0c0 2.2 1.8 4 4 4h4c2.2 0 4 1.8 4 4a4 4 0 0 1-8 0" /></svg>
          </div>
          <span>SubSight</span>
        </Link>
        <Link to="/login" className="btn-secondary" style={{ textDecoration: 'none', padding: '8px 16px', borderRadius: '8px' }}>Sign In</Link>
      </nav>

      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about managing your subscriptions smarter.</p>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;