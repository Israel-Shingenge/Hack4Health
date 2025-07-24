from django.db import models
import secrets

class MemberType(models.TextChoices):
    MAIN = 'MAIN', 'Main Member'
    DEPENDENT = 'DEP', 'Dependent'

class MedicalAid(models.Model):
   
    MedicalAidID = models.CharField(max_length=10, unique=True, editable=False)
    MedicalAidName = models.CharField(max_length=100)
    MedicalAidType = models.CharField(max_length=50) 
    MedicalAidContactNumber = models.CharField(max_length=15, blank=True, null=True)
    MedicalAidEmail = models.EmailField(max_length=254, blank=True, null=True)

    def __str__(self):
        return self.MedicalAidName

class Patient(models.Model):
    PatientID = models.CharField(max_length=11, unique=True) 
    PatientFullName = models.CharField(max_length=100)
    DateOfBirth = models.DateField()
    PatientEmail = models.EmailField(max_length=254, unique=True)
    PatientPhone = models.CharField(max_length=15, unique=True)

    # Use a ManyToManyField through an intermediary model
    medical_aids = models.ManyToManyField(
        MedicalAid,
        through='PatientMedicalAid', # Intermediary model
        related_name='patients'
    )

    def save(self, *args, **kwargs):
        if not self.PatientID:

            last_id_num = Patient.objects.all().count() + 1
            self.PatientID = f"P{last_id_num:05d}" 
        super().save(*args, **kwargs)

    def __str__(self):
        return self.PatientFullName

# Intermediary Model to store the "main member/dependent" status
class PatientMedicalAid(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    medical_aid = models.ForeignKey(MedicalAid, on_delete=models.CASCADE)
    member_type = models.CharField(
        max_length=10,
        choices=MemberType.choices,
        default=MemberType.DEPENDENT
    )
    # You might also want to add the policy number here, as it's specific to THIS patient-medical_aid link
    policy_number = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        unique_together = ('patient', 'medical_aid')

    def __str__(self):
        return f"{self.patient.PatientFullName} - {self.medical_aid.MedicalAidName} ({self.get_member_type_display()})"


class MedicalHistory(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medical_history')
    conditions = models.CharField(max_length=100)
    diagnosisDate = models.DateField()
    treatmentDetails = models.TextField()

    def __str__(self):
        return f"{self.Condition} for {self.Patient.PatientFullName}"

class ClaimDetails(models.Model):
    Patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='claims')
    ClaimAmount = models.DecimalField(max_digits=10, decimal_places=2)
    ProcedureCode = models.CharField(max_length=20)
    DiagnosisCode = models.CharField(max_length=20)
    ItemCode = models.CharField(max_length=20)
    ServiceDate = models.DateField()

    def __str__(self):
        return f"Claim {self.ClaimID} for {self.Patient.PatientFullName}"


        
