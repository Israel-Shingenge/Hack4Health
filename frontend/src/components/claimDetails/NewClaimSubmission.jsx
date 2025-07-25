import React, { useState, useEffect } from 'react';
import FormField from '../FormField';
import { apiClient, API_ENDPOINTS, API_BASE_URL } from '../../utils/api';

const NewClaimSubmission = ({ onSave, onClose }) => {
  const [patientData, setPatientData] = useState({
    id: null,
    PatientID: '',
    PatientFullName: '',
    DateOfBirth: '',
    PatientEmail: '',
    PatientPhone: '',
    MedicalAidMemberID: '',
    PatientAccountNumber: '',
    PatientAddress: '',
    MedicalAidPlanName: '',
  });

  const [claimData, setClaimData] = useState({
    PracticeName: '',
    PracticeAddress: '',
    DoctorsName: '',
    EmergencyCase: false,
    DiagnosisCode: '',
    DiagnosisDescription: '',
    ServiceDate: new Date().toISOString().split('T')[0],
    ClaimAmount: '0.00',
    AdditionalNotes: '',
  });

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isPatientFound, setIsPatientFound] = useState(false);
  const [loadingPatient, setLoadingPatient] = useState(false);

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));

    if (name === 'PatientID') {
      setIsPatientFound(false);
      setPatientData((prev) => ({
        ...prev,
        PatientFullName: '',
        DateOfBirth: '',
        PatientEmail: '',
        PatientPhone: '',
        MedicalAidMemberID: '',
        PatientAccountNumber: '',
        PatientAddress: '',
        MedicalAidPlanName: '',
        id: null,
      }));

      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      if (value.length > 0) {
        setLoadingPatient(true);
        setSearchTimeout(
          setTimeout(async () => {
            try {
              const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.patients}?PatientID=${value}`);
              const data = await response.json();
              if (data && data.length > 0) {
                const foundPatient = data[0];
                setPatientData(foundPatient);
                setIsPatientFound(true);
              } else {
                console.log(`Patient with ID ${value} not found.`);
                setIsPatientFound(false);
              }
            } catch (error) {
              console.error('Error searching for patient by ID:', error);
              setIsPatientFound(false);
            } finally {
              setLoadingPatient(false);
            }
          }, 500)
        );
      } else {
        setLoadingPatient(false);
      }
    }
  };

  const handleClaimChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClaimData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let patientId = patientData.id;

      if (!isPatientFound) {
        const { PatientID, ...newPatient } = patientData;
        const createdPatient = await apiClient(API_ENDPOINTS.patients, 'POST', newPatient);
        patientId = createdPatient.id;
      } else {
        await apiClient(`${API_ENDPOINTS.patients}${patientData.id}/`, 'PUT', patientData);
      }

      const claimPayload = {
        Patient: patientId,
        PracticeName: claimData.PracticeName,
        PracticeAddress: claimData.PracticeAddress,
        DoctorsName: claimData.DoctorsName,
        EmergencyCase: claimData.EmergencyCase,
        DiagnosisCode: claimData.DiagnosisCode,
        DiagnosisDescription: claimData.DiagnosisDescription,
        ServiceDate: claimData.ServiceDate,
        ClaimAmount: parseFloat(claimData.ClaimAmount),
        AdditionalNotes: claimData.AdditionalNotes,
      };

      await apiClient(API_ENDPOINTS.claimDetails, 'POST', claimPayload);
      onSave();
    } catch (error) {
      console.error('Failed to submit claim:', error);
      alert('Failed to submit claim. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Patient Information</h3>

          <FormField
            label="Patient ID"
            name="PatientID"
            value={patientData.PatientID}
            onChange={handlePatientChange}
            placeholder="Search or enter Patient ID"
          />
          {loadingPatient && <p className="text-sm text-blue-500">Searching...</p>}
          {isPatientFound && <p className="text-sm text-green-600">Patient found. Info loaded.</p>}
          {!isPatientFound && patientData.PatientID && !loadingPatient && (
            <p className="text-sm text-orange-500">Patient not found. Enter new details.</p>
          )}

          <FormField label="Full Name" name="PatientFullName" value={patientData.PatientFullName} onChange={handlePatientChange} required />
          <FormField label="Date of Birth" type="date" name="DateOfBirth" value={patientData.DateOfBirth} onChange={handlePatientChange} required />
          <FormField label="Email" type="email" name="PatientEmail" value={patientData.PatientEmail} onChange={handlePatientChange} />
          <FormField label="Phone" name="PatientPhone" value={patientData.PatientPhone} onChange={handlePatientChange} />
          <FormField label="Medical Aid Member ID" name="MedicalAidMemberID" value={patientData.MedicalAidMemberID} onChange={handlePatientChange} required />
          <FormField label="Account Number" name="PatientAccountNumber" value={patientData.PatientAccountNumber} onChange={handlePatientChange} required />
          <FormField label="Address" type="textarea" name="PatientAddress" value={patientData.PatientAddress} onChange={handlePatientChange} required />
          <FormField label="Plan Name" name="MedicalAidPlanName" value={patientData.MedicalAidPlanName} onChange={handlePatientChange} required />
        </div>

        {/* Claim Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Claim Details</h3>

          <FormField label="Practice Name" name="PracticeName" value={claimData.PracticeName} onChange={handleClaimChange} />
          <FormField label="Practice Address" name="PracticeAddress" value={claimData.PracticeAddress} onChange={handleClaimChange} />
          <FormField label="Doctor's Name" name="DoctorsName" value={claimData.DoctorsName} onChange={handleClaimChange} />
          <FormField label="Emergency Case" type="checkbox" name="EmergencyCase" checked={claimData.EmergencyCase} onChange={handleClaimChange} />
          <FormField label="Diagnosis Code" name="DiagnosisCode" value={claimData.DiagnosisCode} onChange={handleClaimChange} />
          <FormField label="Diagnosis Description" type="textarea" name="DiagnosisDescription" value={claimData.DiagnosisDescription} onChange={handleClaimChange} />
          <FormField label="Service Date" type="date" name="ServiceDate" value={claimData.ServiceDate} onChange={handleClaimChange} />
          <FormField label="Claim Amount" type="number" name="ClaimAmount" value={claimData.ClaimAmount} onChange={handleClaimChange} />
          <FormField label="Additional Notes" type="textarea" name="AdditionalNotes" value={claimData.AdditionalNotes} onChange={handleClaimChange} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-6 border-t pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Submit Claim
        </button>
      </div>
    </form>
  );
};

export default NewClaimSubmission;
