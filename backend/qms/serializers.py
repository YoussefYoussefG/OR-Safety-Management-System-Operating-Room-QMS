from rest_framework import serializers
from .models import Standard, Incident

class StandardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Standard
        fields = '__all__'

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = '__all__'
