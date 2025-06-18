# 🩺 DocNow – Doctor Appointment Booking System

DocNow is a full-stack web application for seamless doctor appointment booking. It provides two separate panels for:
- 👤 **Patients** – Book appointments, view doctors, manage bookings
- 👨‍⚕️ **Doctors/Admins** – Manage profile, availability, appointments

---

## 🚀 Live Demo

| Panel           | URL                                                                 |
|----------------|----------------------------------------------------------------------|
| Patient Panel  | [https://docnowfrontend.vercel.app](https://docnowfrontend.vercel.app) |
| Admin Panel    | [https://docnowadmin-doctorpannel.vercel.app](https://docnowadmin-doctorpannel.vercel.app) |
| Backend API    | [https://docnow-z4x7.onrender.com](https://docnow-z4x7.onrender.com) |

---

## 📦 Tech Stack

### Frontend
- React.js (with Hooks & Context API)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js + Express.js
- MongoDB (Atlas)
- JWT for Authentication
- Cloudinary for Image Uploads


---

## ✨ Features

### Patient Panel
- Browse available doctors
- Book appointments by time slots
- Cancel/reschedule appointments
- View history of bookings

### Doctor/Admin Panel
- Login with credentials
- Manage doctor profile & availability
- View and cancel appointments
- Profile image upload with Cloudinary
- Dashboard with analytics

---

## 🗂 Folder Structure

```
DocNow/
├── backend/     → Node.js backend (Express, MongoDB)
├── frontend/    → React app for Patients
├── admin/       → React app for Doctor/Admin
```

---

## ⚙️ Environment Variables

### 🔐 Backend `.env`

Create a `.env` file inside `backend/` with:

providing the admin_email and AdminPassword and one doctor's Email and password to explore the project guys enjoy  

```
ADMIN_EMAIL=admin@docnow.com
ADMIN_PASSWORD=your_admin_password
DOCTOR_EMAIL = arush@docnow.com
DOCTOR_PASSWORD = arushpatil
```

### 🌐 Frontend `.env` (in `frontend/` and `admin/` folders)

```
REACT_APP_BASE_URL=https://docnow-z4x7.onrender.com
```

>  `.env` files are added directly in **Vercel** and **Render** dashboards for deployment, not pushed to GitHub.

---

## 💻 Local Development

### 1️⃣ Clone Repository

```bash
git clone https://github.com/kharaneAnand/DocNow.git
cd DocNow
```

### 2️⃣ Run Backend

```bash
cd backend
npm install
npm run server
```

### 3️⃣ Run Frontend

```bash
cd ../frontend
npm install
npm start
```

### 4️⃣ Run Admin Panel

```bash
cd ../admin
npm install
npm start
```

---

## 🌍 Deployment

### 🚀 Backend (Render)
- Hosted via [Render](https://render.com)
- Connected GitHub Repo
- Added environment variables in Render dashboard
- Start command: `npm start`
- Live URL: `https://docnow-z4x7.onrender.com`

### 🌐 Frontend & Admin (Vercel)
- Hosted via [Vercel](https://vercel.com)
- Created 2 projects:
  - `frontend/` → Patient UI
  - `admin/` → Doctor/Admin UI
- Added `.env` (REACT_APP_BASE_URL) manually in Vercel settings
- Automatic deployment on push to GitHub

---

## 🔐 Security Notes
- `.env` files are not committed to GitHub
- All credentials are stored in Vercel/Render Environment settings

---

## 🧠 Inspiration

DocNow was created as a **learning project** to explore the full MERN stack, Cloudinary integration, Razorpay payments, and full authentication system with React Context + JWT.

---

## 📬 Contact

**Anand Kharane**  
📍 India  
📧 [anandkharane@email.com](mailto:anandkharane@email.com)

---

## ⭐️ Show your support

If you like this project, please consider giving it a ⭐️ on GitHub or sharing it with others!

