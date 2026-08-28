import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Profile.css';

const Profile = () => {
  
  const [user, setUser] = useState({
    name: 'Upani',
    email: 'subsighttracker@gmail.com'
  });

  useEffect(() => {
    
    const storedName = localStorage.getItem('userName') || 'Upani';
    const storedEmail = localStorage.getItem('userEmail') || 'subsighttracker@gmail.com';
    setUser({ name: storedName, email: storedEmail });
  }, []);

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="profile-page">
      <Sidebar />
      <main className="profile-main animate-page">
        <div className="profile-container">

          {}
          <div className="profile-header">
            <h2>My Profile</h2>
            <p>Manage your account credentials.</p>
          </div>

          {}
          <div className="profile-card glass-panel">
            
            {}
            <div className="profile-card-left">
              <div className="profile-avatar-large">
                {getInitial(user.name)}
              </div>
              <div className="profile-titles">
                <h3>{user.name}</h3>
                <span className="badge-active">Active Member</span>
              </div>
            </div>

            {}
            <div className="profile-card-right">
              <div className="info-group">
                <label>FULL NAME</label>
                <p>{user.name}</p>
              </div>
              <div className="info-group">
                <label>EMAIL ADDRESS</label>
                <p>{user.email}</p>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;