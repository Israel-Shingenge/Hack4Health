from rest_framework import serializers
from .models import Patient, MedicalAid, PatientMedicalAid, MedicalHistory, ClaimDetails, HealthcareProvider, DoctorsDetails, DisciplineCode, PracticeCode

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__' # Expose all fields from the Patient model

class MedicalAidSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalAid
        fields = '__all__' # Expose all fields from the MedicalAid model

class PatientMedicalAidSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientMedicalAid
        fields = '__all__' # Expose all fields from the PatientMedicalAid model

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = '__all__' # Expose all fields from the MedicalHistory model

class ClaimDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClaimDetails
        fields = '__all__' # Expose all fields from the ClaimDetails model

class HealthcareProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthcareProvider
        fields = '__all__' # Expose all fields from the HealthcareProvider model

class DoctorsDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorsDetails
        fields = '__all__' # Expose all fields from the DoctorsDetails model

class DisciplineCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisciplineCode
        fields = '__all__' # Expose all fields from the DisciplineCode model

class PracticeCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeCode
        fields = '__all__' # Expose all fields from the practiceCode model








    
