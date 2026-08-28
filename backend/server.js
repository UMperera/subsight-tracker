const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Subscription = require('./models/Subscription');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

cron.schedule('0 8 * * *', async () => {
  console.log('⏰ Running background check for upcoming renewals...');
  try {
    
    const subscriptions = await Subscription.find({ 
      status: 'active', 
      remindersEnabled: { $ne: false } 
    }).populate('userId', 'name email'); 
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    
    const upcoming = subscriptions.filter(sub => {
      
      if (!sub.userId) return false; 

      if (sub.acknowledgedDate && new Date(sub.acknowledgedDate).getTime() === new Date(sub.nextRenewalDate).getTime()) {
        return false; 
      }
      
      const renewalDate = new Date(sub.nextRenewalDate);
      renewalDate.setHours(0, 0, 0, 0);
      const diffTime = renewalDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      return diffDays <= 3 && diffDays > 0; 
    });

    if (upcoming.length === 0) {
      console.log('✅ No subscriptions require reminder emails today.');
      return; 
    }


    const userEmails = {};
    upcoming.forEach(sub => {
      const email = sub.userId.email;
      if (!userEmails[email]) {
        userEmails[email] = { name: sub.userId.name, subs: [] };
      }
      userEmails[email].subs.push(sub);
    });

  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    
    for (const [email, userData] of Object.entries(userEmails)) {
      let itemsHTML = '';
      
      userData.subs.forEach((sub) => {
        const ackLink = `http://localhost:5000/api/subscriptions/acknowledge/${sub._id}`;
        
        const renewalDate = new Date(sub.nextRenewalDate);
        renewalDate.setHours(0, 0, 0, 0);
        const diffDays = Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        itemsHTML += `
          <div style="border-bottom: 1px solid #e5e7eb; padding: 12px 0;">
            <p style="margin: 0 0 4px 0; font-size: 1.05rem;"><strong>${sub.name}</strong></p>
            <p style="margin: 0 0 8px 0; color: #4b5569; font-size: 0.95rem;">
              Renews in <strong>${diffDays} day(s)</strong> — <strong>$${Number(sub.cost).toFixed(2)}</strong>
            </p>
            <a href="${ackLink}" style="color: #2563eb; font-size: 0.85rem; text-decoration: underline;">Pause reminders for this bill</a>
          </div>
        `;
      });

      const emailHTML = `
        <div style="font-family: Arial, sans-serif; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-top: 0;">Hi ${userData.name},</h2>
          <p>You have <strong>${userData.subs.length}</strong> subscription(s) scheduled to renew soon:</p>
          
          ${itemsHTML}

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 0.85rem; color: #6b7280; margin-bottom: 0;">Please review your account to ensure these services are still required.</p>
        </div>
      `;

      
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email, 
        subject: `Action Required: ${userData.subs.length} subscription(s) renewing soon`,
        html: emailHTML 
      });
      
      console.log(`✉️ Reminder email sent successfully to: ${email}`);
    }

  } catch (error) {
    console.error('❌ Error in automated cron job:', error.message);
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log('Automated email scheduler is ACTIVE.');
});