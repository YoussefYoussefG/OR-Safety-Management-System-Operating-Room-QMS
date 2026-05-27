# SafeOR: Operating Room Quality Management System (QMS)

**Course:** SBES270 - Medical Standards and Accreditation  
**Department:** Biomedical and Data Engineering, Cairo University  
**Topic:** Health and Safety in Operating Rooms  

## 📋 Project Overview
SafeOR is an interactive Quality Management System designed to digitize and monitor safety standards within operating rooms. This project fulfills the final requirement for the SBES270 course, aiming to:
* Clearly present QMS processes and standards for operating room safety.
* Utilize visual tools and dashboards to showcase process implementation.
* Demonstrate the resolution of specific challenges encountered during QMS application.
* Provide an intuitive interface for exploring procedures and monitoring reports.

## ✨ Key Features
* **Secure Authentication:** JWT-based login, signup, and session management for medical staff.
* **Doctor Profiles:** Personalized accounts for medical staff allowing specialty designation and custom avatar uploads.
* **Incident Reporting & Notifications:** Real-time logging of incidents (e.g., equipment failures, protocol breaches) with automated in-app notifications tied directly to the reporting user.
* **Live Dashboard:** Interactive charts and statistics (simulated live air-quality and compliance metrics).
* **Standards Viewer:** Browse, search, and review SOPs (Standard Operating Procedures) dynamically.

## 🛠 Technologies Used
* **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide React
* **Backend:** Python, Django, Django REST Framework (DRF), SimpleJWT
* **Database:** SQLite (Configured default)
* **API Communication:** Axios

## 🚀 Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone <YOUR_REPO_LINK_HERE>
cd <YOUR_REPO_NAME>
```

### 2. Backend Setup
Set up the Django API and install dependencies.
```bash
# Navigate to backend folder
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run Database Migrations
python manage.py makemigrations
python manage.py migrate

# (Optional) Create a superuser for admin access
python manage.py createsuperuser

# Start the Backend Server
python manage.py runserver
```

### 3. Frontend Setup
Set up the React application in a new terminal window.
```bash
# Ensure you are back in the project root directory
cd ..

# Install Node dependencies
npm install

# Start the Development Server
npm run dev
```

### 4. Running Both Simultaneously
You can also use the included shell scripts to start both services concurrently:
* **Linux/Mac:** `bash start_project.sh`
* **Windows:** `start_project.bat`

---
*Note: Make sure to upload media (avatars) using the frontend interface. Media files are securely handled and served by Django's `MEDIA_ROOT` configuration.*
