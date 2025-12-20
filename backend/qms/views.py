from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Standard, Incident
from .serializers import StandardSerializer, IncidentSerializer

class StandardViewSet(viewsets.ModelViewSet):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all().order_by('-reported_at')
    serializer_class = IncidentSerializer

@api_view(['GET'])
def dashboard_stats(request):
    """
    Returns aggregated stats for the dashboard.
    """
    total_incidents = Incident.objects.count()
    open_incidents = Incident.objects.filter(status='OPEN').count()
    
    # Simple logic for compliance score
    # Base 100, minus 5 for every open incident, clamped at 0
    compliance_score = max(0, 100 - (open_incidents * 5))
    
    return Response({
        "compliance_score": compliance_score,
        "total_incidents": total_incidents,
        "open_incidents": open_incidents,
        "system_status": "Healthy" if open_incidents == 0 else "Attention Needed"
    })
