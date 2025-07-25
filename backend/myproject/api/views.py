from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
from .models import Patient, MedicalAid, PatientMedicalAid, MedicalHistory, ClaimDetails, HealthcareProvider, DoctorsDetails, DisciplineCode, PracticeCode
from .serialiser import (
    PatientSerializer,
    MedicalAidSerializer,
    PatientMedicalAidSerializer,
    MedicalHistorySerializer,
    ClaimDetailsSerializer,
    HealthcareProviderSerializer,
    DoctorsDetailsSerializer,
    DisciplineCodeSerializer,
    PracticeCodeSerializer
)

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        patient_id = self.request.query_params.get('PatientID', None)
        if patient_id:
            queryset = queryset.filter(PatientID=patient_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save()

class MedicalAidViewSet(viewsets.ModelViewSet):
    queryset = MedicalAid.objects.all()
    serializer_class = MedicalAidSerializer

class PatientMedicalAidViewSet(viewsets.ModelViewSet):
    queryset = PatientMedicalAid.objects.all()
    serializer_class = PatientMedicalAidSerializer

class MedicalHistoryViewSet(viewsets.ModelViewSet):
    queryset = MedicalHistory.objects.all()
    serializer_class = MedicalHistorySerializer

class ClaimDetailsViewSet(viewsets.ModelViewSet):
    queryset = ClaimDetails.objects.all()
    serializer_class = ClaimDetailsSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        patient_id = request.data.get('Patient')
        if not patient_id:
            return Response({"detail": "Patient field is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Archive existing claims for this patient into MedicalHistory
        existing_claims = ClaimDetails.objects.filter(Patient_id=patient_id)

        for claim in existing_claims:
            MedicalHistory.objects.create(
                patient_id=patient_id,
                conditions=f"Claim - Diagnosis: {claim.DiagnosisCode}",
                diagnosisDate=claim.ServiceDate,
                treatmentDetails=f"Claim amount: {claim.ClaimAmount}"
            )


        # Delete old claims after archiving
        existing_claims.delete()

        # Proceed with creating the new claim  
        return super().create(request, *args, **kwargs)
    
class HealthcareProviderViewSet(viewsets.ModelViewSet):
    queryset = HealthcareProvider.objects.all()
    serializer_class = HealthcareProviderSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        provider_name = self.request.query_params.get('providerName', None)
        if provider_name:
            queryset = queryset.filter(providerName__icontains=provider_name)
        return queryset

    def perform_create(self, serializer):
        serializer.save()  # Save the new healthcare provider instance

class HealthcareProviderViewSet(viewsets.ModelViewSet):
    queryset = HealthcareProvider.objects.all()
    serializer_class = HealthcareProviderSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        provider_name = self.request.query_params.get('providerName', None)
        if provider_name:
            queryset = queryset.filter(providerName__icontains=provider_name)
        return queryset

    def perform_create(self, serializer):
        serializer.save()  # Save the new healthcare provider instance

    def perform_update(self, serializer):
        serializer.save()

class DoctorsDetailsViewSet(viewsets.ModelViewSet):
    queryset = DoctorsDetails.objects.all()
    serializer_class = DoctorsDetailsSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        doctor_name = self.request.query_params.get('doctorName', None)
        if doctor_name:
            queryset = queryset.filter(doctorName__icontains=doctor_name)
        return queryset

    def perform_create(self, serializer):
        serializer.save()  # Save the new doctor details instance

    def perform_update(self, serializer):
        serializer.save()

class DisciplineCodeViewSet(viewsets.ModelViewSet):
    queryset = DisciplineCode.objects.all()
    serializer_class = DisciplineCodeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        code = self.request.query_params.get('code', None)
        if code:
            queryset = queryset.filter(code__icontains=code)
        return queryset

    def perform_create(self, serializer):
        serializer.save()  # Save the new discipline code instance

    def perform_update(self, serializer):
        serializer.save()

class PracticeCodeViewSet(viewsets.ModelViewSet):
    queryset = PracticeCode.objects.all()
    serializer_class = PracticeCodeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        practice_number = self.request.query_params.get('practiceNumber', None)
        if practice_number:
            queryset = queryset.filter(practiceNumber__icontains=practice_number)
        return queryset

    def perform_create(self, serializer):
        serializer.save()  # Save the new practice code instance

    def perform_update(self, serializer):
        serializer.save()



