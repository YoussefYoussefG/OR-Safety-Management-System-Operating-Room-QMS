from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    StandardViewSet, IncidentViewSet, dashboard_stats,
    RegisterView, CurrentUserView, NotificationViewSet,
    OperationLogViewSet
)

router = DefaultRouter()
router.register(r'standards', StandardViewSet)
router.register(r'incidents', IncidentViewSet)
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'operations', OperationLogViewSet, basename='operation')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', CurrentUserView.as_view(), name='auth_me'),
    
    path('', include(router.urls)),
    path('dashboard/stats/', dashboard_stats, name='dashboard-stats'),
]
