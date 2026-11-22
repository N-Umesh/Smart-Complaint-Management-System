# Smart Complaint Management System 🏙️

A smart civic complaint management platform where users can register complaints about issues like potholes, garbage, or water leaks, and track their resolution. Built using the MERN stack with Tailwind CSS and Cloudinary integration.

A MERN-based Smart Complaint Management System that allows citizens to report civic issues and administrators to manage and update complaints.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 📬 Complaint Submission with image & location
- 🗂️ Complaint tracking and status updates
- 🧑‍💼 Role-based dashboards (Citizen, Admin/Officer)
- ☁️ Image upload using Cloudinary
- ✉️ Email notification system (nodemailer)

---

## 📦 Tech Stack

- Frontend: React, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express.js, MongoDB, Cloudinary
- Auth: JWT + Cookies
- Dev Tools: Vite, Postman, Toastify

---

## Admin Dashboard:

http://localhost:5173/admin-dashboard

If the admin account needs to be created or updated:
    -cd SCMSC/server
    -node createAdmin.js

Admin Account:
    Email: admin@smartcity.com
    Password: Admin@123
    Role: admin

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/yourusername/your-repo-name
cd your-repo-name

cd client
npm install

cd server
npm install

npm start

npm run dev

