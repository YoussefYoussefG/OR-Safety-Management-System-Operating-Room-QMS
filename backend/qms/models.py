from django.db import models
import uuid

class Standard(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    content = models.TextField(help_text="Detailed rich text or checklist content")
    version = models.CharField(max_length=20, default="1.0")
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.version})"

class Incident(models.Model):
    SEVERITY_CHOICES = [
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
        ('CRITICAL', 'Critical'),
    ]

    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('INVESTIGATING', 'Investigating'),
        ('RESOLVED', 'Resolved'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=100) 
    description = models.TextField()
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES, default='LOW')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OPEN')
    reported_at = models.DateTimeField(auto_now_add=True)
    
    
    reported_by = models.CharField(max_length=100, default="Anonymous")

    def __str__(self):
        return f"{self.type} - {self.severity} ({self.status})"
