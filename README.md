# SafeOR: Operating Room Quality Management System (QMS)

**Course:** SBES270 - Medical Standards and Accreditation 
**Department:** Biomedical and Data Engineering, Cairo University 
**Topic:** Health and Safety in Operating Rooms 

## 📋 Project Overview
SafeOR is an interactive Quality Management System designed to digitize and monitor safety standards within operating rooms. This project fulfills the final requirement for the SBES270 course, aiming to:
* Clearly present QMS processes and standards for operating room safety[cite: 8].
* Utilize visual tools and dashboards to showcase process implementation[cite: 10].
* Demonstrate the resolution of specific challenges encountered during QMS application[cite: 9].
* Provide an intuitive interface for exploring procedures and monitoring reports[cite: 11].

##  Technologies Used
* **Backend:** Python, Django, Django REST Framework
* **Frontend:** TypeScript, React, Vite
* **Database:** SQLite (Default)

##  Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone <YOUR_REPO_LINK_HERE>
cd <YOUR_REPO_NAME>
# Navigate to backend folder
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run Database Migrations
python manage.py migrate

# (Optional) Populate Database if you have a script
# python populate_db.py

# Start the Backend Server
python manage.py runserver

# Ensure you are in the project root directory
# Install Node dependencies
npm install

# Start the Development Server
npm run dev
