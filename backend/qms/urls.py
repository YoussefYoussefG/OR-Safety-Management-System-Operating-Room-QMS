from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StandardViewSet, IncidentViewSet, dashboard_stats

router = DefaultRouter()
router.register(r'standards', StandardViewSet)
router.register(r'incidents', IncidentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/stats/', dashboard_stats, name='dashboard-stats'),
]
