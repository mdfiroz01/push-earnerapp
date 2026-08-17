# Premium Investment & Task Web Application

A full-featured Glassmorphism UI Investment & Task Earning Application constructed with **HTML5, CSS3, Vanilla JavaScript**, and powered exclusively by **Firebase Authentication** and **Firebase Realtime Database**.

---

## ⚡ Features Included

### 📱 User Application
- **Auth System:** Login, Signup, Remember Me, Forgot Password, Verification handling.
- **Glassmorphism Mobile-First Dashboard:** Custom dark blue & purple styling with animated glowing cards.
- **Dynamic Notices & Slider Banners:** Live scrolling marquee and homepage image banners updated real-time by Admin.
- **VIP Investment Plans System:** Buy VIP Levels (1 through 5) using account balance.
- **Daily Tasks System:** Tasks filter based on active VIP status. Complete interactive timers to earn rewards automatically.
- **Deposit & Withdraw System:** Supports bKash, Nagad, and Rocket methods. Direct image URL references for proof screenshots.
- **Referral Team Center:** Automated referral code generation, invite links, and user connection mapping.
- **Transaction History:** Live log of task rewards, referral commissions, plan purchases, deposits, and payouts.
- **Profile Management:** Dynamic avatar, user metadata updates, and self password resetting.

### 🛡️ Admin Panel (`admin.html`)
- Restricted access strictly tied to `admin@gmail.com`.
- Realtime system statistics (Total Users, Pending Withdrawals, Deposits, System Volume).
- User Controls: Manual balance updates, Account suspensions/blocking.
- Deposit Approvals: One-click status toggling that auto-credits user balance.
- Withdrawal Approvals: Live management with balance revert protection on rejections.
- Interactive Creators: VIP Plan builder, Task creator, Announcement notice writer, and Image banner manager.
- Payment Setup: Edit live bKash, Nagad, and Rocket wallet recipient numbers.

---

## 🛠️ Setup Instructions

### 1. Firebase Project Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Enable **Authentication** in the sidebar:
   - Go to *Build > Authentication > Sign-in method*.
   - Enable **Email/Password**.
4. Enable **Realtime Database**:
   - Go to *Build > Realtime Database > Create Database*.
   - Choose your preferred location and start in **Locked Mode**.
5. Update Security Rules:
   - Paste the contents of `database.rules.json` into the *Realtime Database > Rules* tab and hit **Publish**.

### 2. Configure Code Credentials
1. Go to *Project Settings > General > Your apps* in the Firebase console.
2. Select **Web App (`</>`)** and register your app.
3. Copy the `firebaseConfig` object details.
4. Open `firebase.js` in your codebase and fill in your details:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
