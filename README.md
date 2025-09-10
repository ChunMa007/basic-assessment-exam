# 🌐 IP Tracker App  

A simple full-stack app that lets users search IP addresses, view geo-location data, and visualize them on an interactive map. The app also keeps a searchable history and provides a lightweight login system with protected routes.  

---

## 🚀 Features  
- 🔍 Search for an IP address and fetch geo-location details  
- 🗺️ Display the location on an interactive Leaflet map  
- 🕑 Save search history using localStorage  
- ❌ Delete individual or all history entries  
- 🔐 Simple login system with route protection  

---

## 🛠️ Tech Stack  
**Frontend:** React, React Router, Bootstrap, React-Leaflet  
**Backend:** Node.js, Express  
**Others:** dotenv, cors  

---

## ⚙️ Installation & Setup  

### 1. Clone the Repository  
```bash
git clone https://github.com/ChunMa007/basic-assessment-exam.git
cd basic-assessment-exam
```

### 2. Backend Setup
#### Install Dependencies
```bash
cd backend
npm install
```

Create a .env file inside backend/:
```bash
PORT=8000
```

Start the backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd assessment-exam
npm install
```

Create a .env file inside assessment-exam/:
```bash
VITE_API_URL=http://localhost:8000
```

Start the frontend:
```bash
npm run dev
```

#### Backend runs on http://localhost:8000
#### Frontend runs on http://localhost:5173 (default for Vite)

### 📂 Project Structure
```bash
basic-assessment-exam/
│
├── backend/          # Express server
│   ├── server.js     
│   ├── user.js       
│   ├── .env.example  
│   └── package.json  
│
├── assessment-exam/         # React app
│   ├── src/          
│   ├── public/       
│   └── package.json  
│
└── README.md         # Project documentation
```
