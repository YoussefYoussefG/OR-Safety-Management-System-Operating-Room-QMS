from rest_framework import viewsets, filters, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Standard, Incident, Notification, OperationLog
from .serializers import (
    StandardSerializer, IncidentSerializer, 
    UserSerializer, RegisterSerializer, NotificationSerializer,
    OperationLogSerializer
)

class OperationLogViewSet(viewsets.ModelViewSet):
    queryset = OperationLog.objects.all().order_by('-recorded_at')
    serializer_class = OperationLogSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        log = serializer.save(user=self.request.user)
        # Create notification for successful log
        Notification.objects.create(
            user=self.request.user,
            title="Checklist Logged",
            message=f"You successfully logged an operation checklist with {log.completion_rate}% completion."
        )

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class CurrentUserView(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_object(self):
        return self.request.user

class NotificationViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

class StandardViewSet(viewsets.ModelViewSet):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'version']
    search_fields = ['title', 'content']
    ordering_fields = ['last_updated', 'title']

class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all().order_by('-reported_at')
    serializer_class = IncidentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['severity', 'status', 'type']
    search_fields = ['description', 'reported_by', 'type']
    ordering_fields = ['reported_at', 'severity']

    def perform_create(self, serializer):
        incident = serializer.save()
        if self.request.user.is_authenticated:
            # Create a notification for the person reporting
            Notification.objects.create(
                user=self.request.user,
                title="Incident Reported",
                message=f"You successfully reported a {incident.severity} severity incident ({incident.type})."
            )

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

    # Add average completion rate from Operation Logs
    operation_logs = OperationLog.objects.all()
    avg_completion = 100
    if operation_logs.exists():
        avg_completion = sum(log.completion_rate for log in operation_logs) / operation_logs.count()
        # Combine the scores
        compliance_score = (compliance_score + avg_completion) / 2
    
    return Response({
        "compliance_score": round(compliance_score, 1),
        "total_incidents": total_incidents,
        "open_incidents": open_incidents,
        "total_operations": operation_logs.count(),
        "system_status": "Healthy" if open_incidents == 0 else "Attention Needed"
    })
