SMARTCITY – SMART COMPLAINT MANAGEMENT SYSTEM

1. REQUIREMENTS
----------------
Make sure the following are installed:

• Node.js
• npm
• MongoDB
• VS Code
• Web Browser (Chrome recommended)


2. OPEN THE PROJECT
--------------------
Open the SmartCity project folder in VS Code.

Example:

cd SCMSC


3. START THE BACKEND SERVER
----------------------------

Open a terminal and run:

cd server

Install dependencies (first time only):

npm install

Start the backend:

npm start

If your project uses nodemon/dev script, use:

npm run dev

Backend will run on:

http://localhost:4000


4. START THE FRONTEND
----------------------

Open a NEW terminal.

Go back to the main project folder:

cd SCMSC

Then enter the frontend folder:

cd client

Install dependencies (first time only):

npm install

Start the frontend:

npm run dev

The frontend will usually run on:

http://localhost:5173


5. OPEN THE WEBSITE
--------------------

Open Chrome and visit:

http://localhost:5173


6. CITIZEN SIGNUP
-----------------

• Open the Signup page.
• Enter your name.
• Enter your email.
• Enter your password.
• Enter other required details.
• Click "Sign Up".

After successful registration, login using your account.


7. CITIZEN LOGIN
----------------

Open:

http://localhost:5173/login

Enter:

• Email
• Password

Click "Login".

After successful login, the citizen can access the profile/dashboard.


8. REPORT A COMPLAINT
----------------------

After logging in:

1. Open "Report Complaint".
2. Enter Complaint Title.
3. Select Complaint Category.
4. Enter Description.
5. Enter Location.
6. Click "Submit Complaint".

The complaint will be stored in MongoDB.


9. VIEW MY COMPLAINTS
----------------------

Open:

"My Complaints"

The citizen can view complaints submitted from their account.

Complaint information includes:

• Complaint ID
• Title
• Category
• Location
• Date
• Status


10. TRACK A COMPLAINT
---------------------

Open:

"Track Complaint"

Enter/select the complaint information to check its current status.

Possible statuses:

• Pending
• In Progress
• Resolved
• Rejected


11. ADMIN LOGIN
---------------

Open:

http://localhost:5173/admin-login

Admin credentials:

Email:
admin@smartcity.com

Password:
Admin@123


12. ADMIN DASHBOARD
-------------------

After admin login:

Admin can access:

• Dashboard
• Complaints

Dashboard displays:

• Total Complaints
• Pending Complaints
• In Progress Complaints
• Resolved Complaints
• Rejected Complaints


13. MANAGE COMPLAINTS
---------------------

Open:

Admin Dashboard → Complaints

Admin can:

• View all complaints
• Search complaints
• Filter complaints
• View complaint details
• Update complaint status
• Add admin remarks
• Assign officer/department
• View uploaded complaint images


14. LOGOUT
----------

Citizen:

Profile → Logout

Admin:

Admin Dashboard → Admin Logout


15. IMPORTANT
-------------

Both servers must be running at the same time.

Terminal 1 – Backend:

cd server
npm start

Terminal 2 – Frontend:

cd client
npm run dev


16. PROJECT URLS
----------------

Frontend:
http://localhost:5173

Backend:
http://localhost:4000

Citizen Login:
http://localhost:5173/login

Citizen Signup:
http://localhost:5173/signup

Report Complaint:
http://localhost:5173/report-complaint

My Complaints:
http://localhost:5173/my-complaints

Admin Login:
http://localhost:5173/admin-login

Admin Dashboard:
http://localhost:5173/admin-dashboard


17. BASIC WORKFLOW
------------------

Citizen
   ↓
Signup
   ↓
Login
   ↓
Report Complaint
   ↓
Complaint Stored in MongoDB
   ↓
Admin Reviews Complaint
   ↓
Admin Updates Status
   ↓
Citizen Tracks Complaint
   ↓
Complaint Resolved