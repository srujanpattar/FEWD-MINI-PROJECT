# 🚀 HyperGrid – NMAMIT Academic Vault

HyperGrid is a futuristic, all-in-one academic platform built for NMAMIT students.  
It centralizes every semester’s learning resources, enables real-time senior–junior collaboration, tracks attendance, and surfaces campus events — all through a clean, modern interface.

This project solves the messy, scattered experience of searching for notes, events, files, or guidance by creating a seamless academic ecosystem.

---

## 🔹 Features

### 📁 Semester Vault
- Access all 8 semesters with curated subject material packs.
- One-tap download for notes, question banks, and study bundles.
- Dynamic course lineup powered by an admin panel.

### 🔗 Peerline (Senior–Junior Bridge)
- A real-time interaction space to exchange tips, shortcuts, clarifications.
- Switch between senior and junior personas to simulate conversations.

### 📊 Attendance Tracker
- Calculate your attendance percentage instantly.
- Simple two-input interface with responsive UI.

### 🎯 Events & Hackathons Hub
- Browse campus hackathons, workshops, competitions, and seminars.
- Admins can add, edit, or delete events with ease.

### 🛠️ Admin Console
- Add/Rename/Remove semesters.
- Add/Remove/Rename courses dynamically.
- Manage academic structure without touching code.

---

## 🔹 Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **Framer Motion** (if used for animations)
- **Lucide Icons / Custom SVGs**

### Backend
- **Node.js + Express.js**
- REST APIs for authentication, vault access, admin changes.

### Database
- **MongoDB** (Flexible schema + fast document queries)

### Authentication
- Institution-verified NMAMIT email login.

### Deployment
- Cloud hosting (Render / Vercel / Netlify + backend hosting)
- Image + file storage depending on deployment architecture.

---

## 🔹 Scalability

HyperGrid is designed for:
- Thousands of concurrent student logins.
- Dynamic addition of semesters, courses, and events.
- Modular resource packs without touching the core system.
- Lightweight UI rendering even on low-end student devices.

The system architecture is fully capable of scaling to multiple institutions with minimal changes.

---

## 🔹 How It Works

### Student Flow
1. Sign up using NMAMIT email → authentication.
2. Dashboard loads all semesters with subject tiles.
3. Tap a subject → instant download of curated material.
4. Use Peerline for guidance + attendance tracker for academics.
5. Discover events and opportunities directly on the portal.

### Admin Flow
1. Login as “Admin Level”.
2. Add or modify semesters, courses, and event listings.
3. Manage the academic vault in real-time.

---

## 🔹 Screenshots

> Add the images from the `/screenshots` folder (recommended).

---

## 🔹 Installation

```bash
# Clone repo
git clone https://github.com/your-username/hypergrid.git
cd hypergrid

# Install dependencies
npm install

# Start development server
npm run dev
