# 💸 SubSight

**SubSight** is a modern, full-stack SaaS dashboard designed to help users track recurring expenses, detect overlapping services, and receive automated email reminders before they are billed. 

Say goodbye to forgotten free trials and redundant streaming services!

## ✨ Key Features

* 🔒 **Multi-Tenant Architecture:** Secure, isolated user data utilizing JWT authentication and React route protection.
* ⚙️ **Automated Cron Jobs:** A backend Node-cron scheduler automatically scans the MongoDB database daily and emails users customized reminders 1-3 days before a bill is due using Nodemailer.
* 🧠 **Smart Alerts:** Intelligent algorithms detect overlapping subscriptions within the same category and flag low-rated subscriptions.
* 🧮 **Real-Time Financial Calculator:** Dynamic React state management instantly projects cumulative spending and calculates "wasted" money over 1, 3, and 5-year periods.
* 📊 **Dynamic Analytics:** Real-time data visualization and expense tracking built with Recharts.
* 🎨 **Glassmorphism UI:** Custom, fully responsive interface with seamless state management for Light/Dark mode transitions.

## 🛠️ Tech Stack

**Frontend:** React.js, Recharts, CSS3 (Glassmorphism)
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Tools:** Node-Cron, Nodemailer, JWT, Bcryptjs

## 🚀 Getting Started

1. Clone the repository and run `npm install` in both `frontend` and `backend` directories.
2. Create a `.env` file in the backend with `MONGODB_URI`, `JWT_SECRET`, `EMAIL_USER`, and `EMAIL_PASS`.
3. Run `npm run dev` in both folders to start the local servers.

## 🤝 Contact & Connect
Designed and developed by **Movinya**. 
Feel free to reach out on LinkedIn if you have any questions or want to discuss full-stack development!