# Complete Setup Instructions for NMAMIT HyperGrid

This document provides step-by-step instructions to set up and run both the frontend and backend of the HyperGrid project.

## 📋 Prerequisites

1. **Node.js** (version 14 or higher)
   - Download: https://nodejs.org/
   - Verify: Open terminal and run `node --version` and `npm --version`

2. **A code editor** (VS Code recommended)
   - Download: https://code.visualstudio.com/

## 🚀 Quick Start Guide

### Step 1: Install Backend Dependencies

1. Open terminal/command prompt in the project folder
2. Run:
   ```bash
   npm install
   ```
   This installs:
   - Express (web server)
   - SQLite3 (database)
   - bcryptjs (password hashing)
   - CORS (cross-origin requests)
   - dotenv (environment variables)

### Step 2: Create Environment File

1. Create a file named `.env` in the project root
2. Add this content:
   ```
   PORT=3000
   ```

### Step 3: Start the Backend Server

Run one of these commands:

**Option A - Production Mode:**
```bash
npm start
```

**Option B - Development Mode (auto-restarts on changes):**
```bash
npm run dev
```

You should see:
```
🚀 HyperGrid Backend Server running on http://localhost:3000
📊 API endpoints available at http://localhost:3000/api
Connected to SQLite database
Users table ready
Events table ready
Event registrations table ready
```

**Keep this terminal window open!** The server needs to keep running.

### Step 4: Open the Frontend

1. Open `index.html` in your web browser
   - Right-click `index.html` → Open with → Your browser
   - Or drag and drop `index.html` into your browser

2. The frontend will automatically connect to the backend at `http://localhost:3000`

## 🔧 How It Works

### Backend Architecture

```
┌─────────────────┐
│   Frontend      │
│  (index.html)   │
└────────┬────────┘
         │ HTTP Requests
         │ (POST/GET)
         ▼
┌─────────────────┐
│  Express Server │
│  (server.js)     │
│  Port: 3000      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SQLite Database │
│  (database.db)   │
└─────────────────┘
```

### Data Flow

1. **Signup Process:**
   - User fills signup form → Frontend sends data to `/api/signup`
   - Backend validates email, hashes password
   - Backend stores user in SQLite database
   - Backend returns success message

2. **Login Process:**
   - User fills login form → Frontend sends credentials to `/api/login`
   - Backend checks email in database
   - Backend verifies password hash
   - Backend returns user data (without password)

3. **Data Storage:**
   - User data stored in `database.db` (SQLite file)
   - Passwords are hashed (never stored in plain text)
   - All data persists between server restarts

### File Structure

```
Mini project/
├── index.html          # Frontend HTML
├── script.js          # Frontend JavaScript (updated to use API)
├── style.css          # Frontend styles
├── server.js          # Backend server
├── package.json       # Node.js dependencies
├── .env              # Environment variables
├── database.db       # SQLite database (created automatically)
└── README_BACKEND.md # Detailed backend documentation
```

## 🧪 Testing the Setup

### Test 1: Backend Health Check

1. Open browser
2. Visit: `http://localhost:3000/api/health`
3. You should see: `{"status":"ok","message":"HyperGrid Backend is running"}`

### Test 2: Create an Account

1. Open `index.html` in browser
2. Click "Sign Up" button
3. Fill the form:
   - Name: Test User
   - Email: test@nmamit.in
   - Password: test1234
   - Role: Student
4. Click "Register Access Badge"
5. You should see success message

### Test 3: Login

1. Use the credentials from Test 2
2. Click "Login" button
3. Enter email and password
4. Click "Enter HyperGrid"
5. You should be logged in and see the portal

## 🔍 Troubleshooting

### Problem: "Cannot connect to backend"

**Solution:**
1. Make sure backend server is running (check terminal)
2. Check if port 3000 is available
3. Verify `.env` file exists with `PORT=3000`
4. Try restarting the server

### Problem: "Module not found"

**Solution:**
```bash
npm install
```

### Problem: "Port 3000 already in use"

**Solution:**
1. Change port in `.env` file to `PORT=3001`
2. Update `API_BASE_URL` in `script.js` to `http://localhost:3001/api`
3. Restart server

### Problem: "Database error"

**Solution:**
1. Delete `database.db` file
2. Restart server (database will be recreated)

### Problem: Frontend not connecting

**Solution:**
1. Check browser console (F12) for errors
2. Verify `USE_BACKEND = true` in `script.js`
3. Make sure backend is running
4. Check CORS settings if accessing from different origin

## 🔐 Security Features

- ✅ Passwords are hashed (bcrypt)
- ✅ Only @nmamit.in emails accepted
- ✅ SQL injection protection
- ✅ Input validation
- ✅ CORS enabled for security

## 📊 Database Management

### View Database

You can use SQLite browser tools:
- **DB Browser for SQLite**: https://sqlitebrowser.org/
- Or use command line: `sqlite3 database.db`

### Reset Database

1. Stop the server (Ctrl+C)
2. Delete `database.db` file
3. Restart server
4. Database will be recreated with empty tables

## 🚀 Deployment (Optional)

To deploy to production:

1. **Backend:**
   - Deploy to Heroku, Railway, or similar
   - Update `API_BASE_URL` in frontend to production URL

2. **Frontend:**
   - Deploy to Netlify, Vercel, or GitHub Pages
   - Update API URL to match backend

## 📝 API Endpoints Reference

- `GET /api/health` - Check server status
- `POST /api/signup` - Register new user
- `POST /api/login` - User login
- `GET /api/user/:email` - Get user by email

## 🆘 Need Help?

1. Check `README_BACKEND.md` for detailed API documentation
2. Check browser console (F12) for frontend errors
3. Check terminal for backend errors
4. Verify all prerequisites are installed

## ✅ Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created
- [ ] Backend server running
- [ ] Frontend opens in browser
- [ ] Can create account
- [ ] Can login
- [ ] Database file created

---

**Happy Coding! 🎉**

