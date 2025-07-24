"""
URL configuration for projectdb project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import PatientViewSet, MedicalAidViewSet, PatientMedicalAidViewSet, MedicalHistoryViewSet, ClaimDetailsViewSet, HealthcareProviderViewSet, DoctorsDetailsViewSet, DisciplineCodeViewSet, PracticeCodeViewSet
from api import views

router = routers.DefaultRouter()
router.register(r'patients', PatientViewSet) # Register the 'patients' endpoint
router.register(r'medical-aids', MedicalAidViewSet) # Register the 'medical-aids' endpoint
router.register(r'patient-medical-aids', PatientMedicalAidViewSet) # Register the 'patient-medical-aids' endpoint
router.register(r'medical-history', MedicalHistoryViewSet) # Register the 'medical-history' endpoint
router.register(r'claim-details', ClaimDetailsViewSet) # Register the 'claim-details' endpoint
router.register(r'healthcare-providers', views.HealthcareProviderViewSet) # Register the 'healthcare-providers' endpoint
router.register(r'doctors-details', views.DoctorsDetailsViewSet) # Register the 'doctors-details' endpoint
router.register(r'discipline-codes', views.DisciplineCodeViewSet) # Register the '
router.register(r'practice-codes', views.PracticeCodeViewSet) # Register the 'practice-codes' endpoint

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), # All API endpoints will be under /api/
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')) # Optional: for DRF browsable API login
]

