# NMAMIT HyperGrid Backend Setup Guide

This guide will help you set up and run the backend server for the HyperGrid project.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (version 14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - Verify npm: `npm --version`

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

## Installation Steps

### Step 1: Install Dependencies

Open your terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages:
- `express` - Web framework
- `cors` - Cross-Origin Resource Sharing
- `bcryptjs` - Password hashing
- `sqlite3` - Database
- `dotenv` - Environment variables

### Step 2: Environment Setup

1. Create a `.env` file in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. The `.env` file should contain:
   ```
   PORT=3000
   ```

   You can change the port if needed.

### Step 3: Start the Server

#### Option A: Production Mode
```bash
npm start
```

#### Option B: Development Mode (with auto-restart)
```bash
npm run dev
```

**Note:** For development mode, you need `nodemon` installed globally:
```bash
npm install -g nodemon
```

Or use it locally:
```bash
npx nodemon server.js
```

### Step 4: Verify Server is Running

You should see:
```
🚀 HyperGrid Backend Server running on http://localhost:3000
📊 API endpoints available at http://localhost:3000/api
Connected to SQLite database
Users table ready
Events table ready
Event registrations table ready
```

## API Endpoints

### 1. Health Check
- **URL:** `GET /api/health`
- **Response:**
  ```json
  {
    "status": "ok",
    "message": "HyperGrid Backend is running"
  }
  ```

### 2. User Signup
- **URL:** `POST /api/signup`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@nmamit.in",
    "password": "password123",
    "role": "student"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@nmamit.in",
      "role": "student"
    }
  }
  ```
- **Error Responses:**
  - `400` - Validation error
  - `409` - User already exists
  - `500` - Server error

### 3. User Login
- **URL:** `POST /api/login`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "john@nmamit.in",
    "password": "password123"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@nmamit.in",
      "role": "student"
    }
  }
  ```
- **Error Responses:**
  - `400` - Missing fields
  - `401` - Invalid credentials
  - `500` - Server error

### 4. Get User by Email
- **URL:** `GET /api/user/:email`
- **Example:** `GET /api/user/john@nmamit.in`
- **Success Response (200):**
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@nmamit.in",
      "role": "student",
      "created_at": "2024-01-01 12:00:00"
    }
  }
  ```

## Database

The backend uses **SQLite** database, which creates a `database.db` file automatically in the project root.

### Database Schema

#### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role (student/admin)
- `created_at` - Registration timestamp

#### Events Table
- `id` - Primary key
- `name` - Event name
- `type` - Event type
- `description` - Event description
- `date` - Event date
- `location` - Event location
- `link` - Registration link (optional)
- `created_at` - Creation timestamp

#### Event Registrations Table
- `id` - Primary key
- `event_id` - Foreign key to events
- `user_email` - User's email
- `registered_at` - Registration timestamp

## Testing the API

You can test the API using:

1. **Postman** - https://www.postman.com/
2. **curl** command:
   ```bash
   # Health check
   curl http://localhost:3000/api/health

   # Signup
   curl -X POST http://localhost:3000/api/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@nmamit.in","password":"test1234","role":"student"}'

   # Login
   curl -X POST http://localhost:3000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@nmamit.in","password":"test1234"}'
   ```

3. **Browser** - Visit `http://localhost:3000/api/health`

## Frontend Integration

To connect your frontend to this backend, update the `script.js` file to make API calls instead of using localStorage.

### Example Frontend Code:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';

async function signup(name, email, password, role) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role })
    });
    return await response.json();
}

async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });
    return await response.json();
}
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
1. Change the port in `.env` file
2. Or kill the process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -ti:3000 | xargs kill
   ```

### Database Errors
- Delete `database.db` file and restart the server
- The database will be recreated automatically

### Module Not Found
- Run `npm install` again
- Make sure you're in the correct directory

## Security Notes

- Passwords are hashed using bcrypt before storage
- Only @nmamit.in emails are accepted
- SQL injection protection via parameterized queries
- CORS enabled for cross-origin requests

## Next Steps

1. Update frontend to use API endpoints
2. Add authentication tokens (JWT) for session management
3. Add more API endpoints for events management
4. Deploy to a cloud service (Heroku, Railway, etc.)

## Support

If you encounter any issues, check:
1. Node.js version (should be 14+)
2. All dependencies installed
3. Port is not in use
4. Database file permissions

