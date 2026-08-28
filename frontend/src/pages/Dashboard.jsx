import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate(); 

  const [userName, setUserName] = useState('User');
  const [greeting, setGreeting] = useState('Good morning');
  
  
  const [showOverlapAlert, setShowOverlapAlert] = useState(false);
  const [overlapData, setOverlapData] = useState(null);
  const [showRatingAlert, setShowRatingAlert] = useState(false);
  const [lowRatingCount, setLowRatingCount] = useState(0);
  const [mySubscriptions, setMySubscriptions] = useState([]);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  
  useEffect(() => {
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else if (hour < 20) setGreeting('Good evening');
    else setGreeting('Good night');

    
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }

    
    const fetchRealData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return; 

        const res = await fetch('http://localhost:5000/api/subscriptions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setMySubscriptions(data); 

          
          const categoryCounts = {};
          let maxCount = 0;
          let overlapCat = null;

          data.forEach(sub => {
            const rawCat = sub.category ? sub.category.trim() : 'Other';
            const safeCat = rawCat.toUpperCase();
            categoryCounts[safeCat] = (categoryCounts[safeCat] || 0) + 1;
            if (categoryCounts[safeCat] > 1 && categoryCounts[safeCat] > maxCount) {
              maxCount = categoryCounts[safeCat];
              overlapCat = rawCat; 
            }
          });

          if (maxCount > 1 && overlapCat) {
            setOverlapData({ category: overlapCat, count: maxCount });
            setShowOverlapAlert(true);
          } else {
            setShowOverlapAlert(false);
          }

          
          const lowRatedSubs = data.filter(sub => sub.rating && Number(sub.rating) <= 2);
          if (lowRatedSubs.length > 0) {
            setLowRatingCount(lowRatedSubs.length);
            setShowRatingAlert(true);
          } else {
            setShowRatingAlert(false);
          }
        }
      } catch (error) {
        console.error("Error fetching real subscriptions:", error);
      }
    };

    fetchRealData();
  }, []); 
  const getTimeIcon = () => {
    if (greeting.includes('morning')) {
      return (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 0px 8px rgba(245, 158, 11, 0.5))' }}>
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      );
    } else if (greeting.includes('afternoon')) {
      return (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 0px 8px rgba(249, 115, 22, 0.5))' }}>
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      );
    } else {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 0px 10px rgba(168, 85, 247, 0.6))' }}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      );
    }
  };

  const getBrandIcon = (name) => {
    const cleanName = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const knownDomains = {
      fb: 'facebook.com', facebook: 'facebook.com',
      insta: 'instagram.com', instagram: 'instagram.com',
      netflix: 'netflix.com', spotify: 'spotify.com', amazon: 'amazon.com', aws: 'amazon.com',
      prime: 'primevideo.com', disney: 'disneyplus.com', youtube: 'youtube.com',
      google: 'google.com', apple: 'apple.com', hulu: 'hulu.com', adobe: 'adobe.com',
      chatgpt: 'openai.com', canva: 'canva.com', notion: 'notion.so', github: 'github.com',
      dropbox: 'dropbox.com', slack: 'slack.com', zoom: 'zoom.us', hbo: 'max.com',
      microsoft: 'microsoft.com', playstation: 'playstation.com', xbox: 'xbox.com',
      tiktok: 'tiktok.com'
    };

    for (const [key, domain] of Object.entries(knownDomains)) {
      if (cleanName.includes(key)) return `https://icon.horse/icon/${domain}`;
    }
    if (cleanName.length > 1) {
      return `https://icon.horse/icon/${cleanName}.com`;
    }
    return null; 
  };

  const getFallbackColor = (name) => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
    const charCode = name ? name.charCodeAt(0) : 0;
    return colors[charCode % colors.length];
  }

  const getTagColor = (cat) => {
    const lowerCat = (cat || '').toLowerCase();
    if (lowerCat === 'entertainment') return 'purple';
    if (lowerCat === 'health') return 'green';
    if (lowerCat === 'software') return 'blue';
    if (lowerCat === 'music') return 'orange';
    if (lowerCat === 'productivity') return 'pink';
    return 'gray';
  };

  const calculateChartData = (subs) => {
    const categoryColors = {
      'Entertainment': '#6366f1',
      'Software': '#3b82f6',
      'Productivity': '#ec4899',
      'Music': '#f59e0b',
      'Health': '#10b981',
      'Design': '#8b5cf6',
      'Utilities': '#0ea5e9'
    };

    const grouped = {};
    let total = 0;

    subs.forEach(sub => {
      const price = parseFloat(sub.cost || 0);
      const rawCat = sub.category || 'Other';
      const category = rawCat.charAt(0).toUpperCase() + rawCat.slice(1).toLowerCase();
      
      total += price;
      if (!grouped[category]) {
        grouped[category] = { name: category, value: 0, color: categoryColors[category] || '#94a3b8' };
      }
      grouped[category].value += price;
    });

    const chartData = Object.values(grouped).map(item => ({
      ...item,
      value: parseFloat(item.value.toFixed(2)),
      percent: total > 0 ? Math.round((item.value / total) * 100) : 0
    })).sort((a, b) => b.value - a.value);

    return { totalSpend: total.toFixed(2), chartData };
  };

  const { totalSpend, chartData } = calculateChartData(mySubscriptions);

  return (
    <div className="dash-modern-layout">
      <Sidebar />
      <main className="dash-main animate-page">
        <header className="dash-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '5px' }}>
              <h1 className="dash-greeting" style={{ margin: 0 }}>{greeting}, {userName}!</h1>
              {getTimeIcon()}
            </div>
            <p className="dash-subtitle">Here's what's happening with your subscriptions today.</p>
          </div>
          <div className="dash-header-actions">
            <Link to="/add" className="btn-primary">+ Add Subscription</Link>
          </div>
        </header>

        {showRatingAlert && (
          <div className="dash-alert-banner">
            <div className="alert-icon">⭐</div>
            <div className="alert-text">
              <h4>Low Rated Subscriptions Detected</h4>
              <p>You have <strong>{lowRatingCount} subscription(s)</strong> rated 2 stars or below. Consider reviewing them to save money.</p>
            </div>
            <Link to="/all" className="alert-btn" style={{ textDecoration: 'none' }}>Review Now</Link>
            <button className="close-alert-btn" onClick={() => setShowRatingAlert(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        )}

        {showOverlapAlert && overlapData && (
          <div className="dash-alert-banner">
            <div className="alert-icon">⚠️</div>
            <div className="alert-text">
              <h4>Potential Overlap Detected</h4>
              <p>You have <strong>{overlapData.count} active subscriptions</strong> in the <strong>{overlapData.category}</strong> category. You might be paying for redundant services.</p>
            </div>
            <Link to="/all" className="alert-btn" style={{ textDecoration: 'none' }}>View Details</Link>
            <button className="close-alert-btn" onClick={() => setShowOverlapAlert(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        )}

        <div className="stats-row">
          <div className="stat-card glass-panel interactive-glass">
            <div className="stat-info">
              <p className="stat-label">AVERAGE MONTHLY SPEND</p>
              <h2 className="stat-value price-value">${totalSpend}</h2>
              <span className="stat-badge green">↑ Active</span>
            </div>
            <div className="stat-icon-wrapper blue">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="18" y="3" width="4" height="18"></rect><rect x="10" y="8" width="4" height="13"></rect><rect x="2" y="13" width="4" height="8"></rect></svg>
            </div>
          </div>
          <div className="stat-card glass-panel interactive-glass">
            <div className="stat-info">
              <p className="stat-label">ESTIMATED YEARLY SPEND</p>
              <h2 className="stat-value price-value">${(parseFloat(totalSpend) * 12).toFixed(2)}</h2>
              <span className="stat-badge gray">estimated total</span>
            </div>
            <div className="stat-icon-wrapper purple">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
          </div>
          <div className="stat-card glass-panel interactive-glass">
            <div className="stat-info">
              <p className="stat-label">ACTIVE SUBSCRIPTIONS</p>
              <h2 className="stat-value">{mySubscriptions.length}</h2>
              <span className="stat-badge gray">across {chartData.length} categories</span>
            </div>
            <div className="stat-icon-wrapper light-blue">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
          </div>
        </div>

        <div className="dash-bottom-row">
          <div className="dash-chart-card glass-panel interactive-glass">
            <h3>Spending by Category</h3>
            
            <div className="chart-layout-split">
              <div className="chart-container" style={{ width: '220px', height: '220px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} innerRadius={75} outerRadius={105} paddingAngle={8} dataKey="value" stroke="none" cornerRadius={10}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="chart-center-text">
                  <p>Total Spend</p>
                  <h4 className="price-value">${totalSpend}</h4>
                </div>
              </div>

              <div className="chart-legend-list">
                {chartData.length > 0 ? chartData.map((item, index) => (
                  <div className="legend-row" key={index}>
                    <div className="legend-name-group">
                      <span className="color-dot" style={{ backgroundColor: item.color }}></span>
                      <span className="legend-name">{item.name}</span>
                    </div>
                    <div className="legend-stats-group">
                      <span className="legend-price">${item.value.toFixed(2)}</span>
                      <span className="legend-percent">{item.percent}%</span>
                    </div>
                  </div>
                )) : <p style={{color: '#94a3b8'}}>No data to display yet.</p>}
              </div>
            </div>
          </div>

          <div className="dash-list-card glass-panel interactive-glass">
            <h3>Upcoming Renewals</h3>
            
            <div className="renewal-list">
              {mySubscriptions.length > 0 ? mySubscriptions.slice(0, 4).map((sub, idx) => {
                const subName = sub.name;
                const price = parseFloat(sub.cost || 0).toFixed(2);
                const displayDate = sub.nextRenewalDate ? new Date(sub.nextRenewalDate).toLocaleDateString() : "No Date";
                const brandIcon = getBrandIcon(subName);
                const categoryText = sub.category ? sub.category.charAt(0).toUpperCase() + sub.category.slice(1).toLowerCase() : 'Other';
                
                return (
                  <div className="renewal-item" key={idx}>
                    <div className="renewal-logo" style={{ padding: brandIcon ? '6px' : '0', backgroundColor: brandIcon ? 'transparent' : getFallbackColor(subName) }}>
                      {brandIcon ? (
                        <img src={brandIcon} alt={subName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontFamily: 'inherit' }}>{subName ? subName.charAt(0).toUpperCase() : '?'}</span>
                      )}
                    </div>
                    
                    <div className="renewal-details">
                      <h4>{subName}</h4>
                      <p>Renews: {displayDate}</p>
                    </div>
                    
                    <span className={`tag ${getTagColor(sub.category)}`}>{categoryText}</span>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: '15px' }}>
                      <div className="renewal-price price-value" style={{marginLeft: 0}}>${price}</div>
                      {sub.rating && <div className="rating-stars" style={{fontSize: '0.75rem', fontWeight: 'bold', marginTop: '2px'}}>⭐ {sub.rating}/5</div>}
                    </div>
                  </div>
                )
              }) : <p style={{color: '#94a3b8'}}>No active subscriptions found.</p>}
            </div>
            
            {mySubscriptions.length > 0 && (
              <div className="view-all-link-container">
                <Link to="/all" className="view-all-link">View all renewals →</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;