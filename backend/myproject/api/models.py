from django.db import models

class MemberType(models.TextChoices):
    MAIN = 'MAIN', 'Main Member'
    DEPENDENT = 'DEP', 'Dependent'

class MedicalAid(models.Model):
   
    MedicalAidID = models.CharField(max_length=10, unique=True, editable=False)
    MedicalAidName = models.CharField(max_length=100)
    MedicalAidContactNumber = models.CharField(max_length=15, blank=True, null=True)
    MedicalAidEmail = models.EmailField(max_length=254, blank=True, null=True)
    City = models.CharField(max_length=50, blank=True, null=True)
    PostalCode = models.CharField(max_length=10, blank=True, null=True)

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
    
class HealthcareProvider(models.Model):
    providerName = models.CharField(max_length=100)
    providerContactNumber = models.CharField(max_length=15, blank=True, null=True)
    providerEmail = models.EmailField(max_length=254, blank=True, null=True)
    practiceNumber = models.CharField(max_length=20, unique=True)
    practiceAddress = models.TextField(blank=True, null=True)
    disciplineCode = models.CharField(max_length=10, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    postalCode = models.CharField(max_length=10, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.ProviderID:
            last_id_num = HealthcareProvider.objects.all().count() + 1
            self.ProviderID = f"HP{last_id_num:05d}" 
        super().save(*args, **kwargs)

    def __str__(self):
        return self.ProviderName
    
class DoctorsDetails(models.Model):
    healthcare_provider = models.ForeignKey(HealthcareProvider, on_delete=models.CASCADE, related_name='doctors')
    doctorName = models.CharField(max_length=100)
    doctorContactNumber = models.CharField(max_length=15, blank=True, null=True)
    doctorEmail = models.EmailField(max_length=254, blank=True, null=True)
    doctorSpecialization = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.doctorName} ({self.healthcare_provider.providerName})"
    
class DisciplineCode(models.Model):
    code = models.CharField(max_length=10, unique=True)
    description = models.CharField(max_length=100)
    disciplineName = models.CharField(max_length=100, blank=True, null=True)
    category = models.CharField(max_length=50, blank=True, null=True)
    authirisation = models.BooleanField(default=False)
    claimLimits = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    

    def __str__(self):
        return f"{self.code} - {self.description}"
    
class PracticeCode(models.Model):
    practiceNumber = models.CharField(max_length=20, unique=True)
    practiceName = models.CharField(max_length=100)
    practiceType = models.CharField(max_length=50, blank=True, null=True)
    providerName = models.CharField(max_length=100, blank=True, null=True)
    practiceAddress = models.TextField(blank=True, null=True)
    practiceContactNumber = models.CharField(max_length=15, blank=True, null=True)
    practiceEmail = models.EmailField(max_length=254, blank=True, null=True)
    disciplineCode = models.ForeignKey(DisciplineCode, on_delete=models.CASCADE, related_name='practice_codes', blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    postalCode = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.practiceNumber} - {self.description}"
    

    

    




        
