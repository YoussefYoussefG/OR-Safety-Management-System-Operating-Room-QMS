import os
import django
import random
from datetime import datetime, timedelta


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'safeor_project.settings')
django.setup()

from qms.models import Standard, Incident

def populate():
    print("Populating database...")

    
    Standard.objects.all().delete()
    Incident.objects.all().delete()

    
    standards_data = [
        {
            "title": "Surgical Hand Antisepsis",
            "category": "Pre-operative",
            "content": """1. Remove rings, watches, and bracelets.
2. Wash hands and arms with antimicrobial soap for 3-5 minutes.
3. Keep hands above elbows.
4. Dry with sterile towel and don sterile gown and gloves."""
        },
        {
            "title": "Safe Surgery Checklist Protocol",
            "category": "Intra-operative",
            "content": """- Sign In: Before induction of anesthesia.
- Time Out: Before skin incision.
- Sign Out: Before patient leaves OR.
Ensure all team members are present and attentive during Time Out."""
        },
        {
            "title": "Sterile Field Maintenance",
            "category": "Intra-operative",
            "content": """- Only sterile items in the sterile field.
- Gowns are sterile in front from chest to level of sterile field.
- Tables are sterile only at table level.
- Conversation should be minimized near the sterile field."""
        },
        {
            "title": "Post-Anesthesia Care Unit (PACU) Handoff",
            "category": "Post-operative",
            "content": """1. Anesthesia provider reports vital signs and complications.
2. Surgeon reports procedure details and specific orders.
3. Nurse confirms line patency and drainage."""
        }
    ]

    for data in standards_data:
        Standard.objects.create(
            title=data["title"],
            category=data["category"],
            content=data["content"],
            version="1.0"
        )
        print(f"Created Standard: {data['title']}")

    
    incidents_data = [
        {
            "type": "Sterility Breach",
            "description": "Scrub nurse glove touched non-sterile light handle during adjustment.",
            "severity": "HIGH",
            "status": "OPEN",
            "reported_by": "Dr. Sarah"
        },
        {
            "type": "Equipment Failure",
            "description": "Cautery machine failing to hold charge.",
            "severity": "MEDIUM",
            "status": "RESOLVED",
            "reported_by": "Nurse John"
        },
        {
            "type": "Documentation Gap",
            "description": "Patient consent form missing signature for anesthesia.",
            "severity": "CRITICAL",
            "status": "INVESTIGATING",
            "reported_by": "Admin"
        }
    ]

    for data in incidents_data:
        Incident.objects.create(
            type=data["type"],
            description=data["description"],
            severity=data["severity"],
            status=data["status"],
            reported_by=data["reported_by"]
        )
        print(f"Created Incident: {data['type']}")

    print("Success! Database populated.")

if __name__ == '__main__':
    populate()
