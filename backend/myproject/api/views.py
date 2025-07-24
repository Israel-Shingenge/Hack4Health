from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import transaction
from .models import Patient, MedicalAid, PatientMedicalAid, MedicalHistory, ClaimDetails
from .serialiser import (
    PatientSerializer,
    MedicalAidSerializer,
    PatientMedicalAidSerializer,
    MedicalHistorySerializer,
    ClaimDetailsSerializer,
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
                conditions=f"Claim - Procedure: {claim.ProcedureCode}, Diagnosis: {claim.DiagnosisCode}",
                diagnosisDate=claim.ServiceDate,
                treatmentDetails=f"Claim amount: {claim.ClaimAmount}, Item codes: {claim.ItemCode}"
            )

        # Delete old claims after archiving
        existing_claims.delete()

        # Proceed with creating the new claim  
        return super().create(request, *args, **kwargs)

