// src/components/claims/NewClaimSubmissionForm.jsx
import React, { useState, useEffect } from 'react';
import FormField from '../FormField';
import { apiClient, API_ENDPOINTS, API_BASE_URL } from '../../utils/api';

// Procedure Code options as seen in the image
const PROCEDURE_CODE_OPTIONS = [
  { value: '0001', label: '0001 - Consultation' },
  { value: '0021', label: '0021 - Urgency' },
  { value: '0030', label: '0030 - Follow-up' }, 
];

const NewClaimSubmissionForm = ({ onSave, onClose }) => {
  // State for Patient Information
  const [patientData, setPatientData] = useState({
    id: null, 
    PatientID: '', 
    PatientFullName: '',
    DateOfBirth: '',
    PatientEmail: '',
    PatientPhone: '',
    MemberID: '', 
    AdditionalNotes: '', 
  });

  const [claimData, setClaimData] = useState({
    ServiceDate: '',
    ProcedureCode: '',
    DiagnosisCode: '',
    ItemCode: '',
    ClaimAmount: '',
  });

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isPatientFound, setIsPatientFound] = useState(false);
  const [loadingPatient, setLoadingPatient] = useState(false);

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));

    if (name === 'PatientID') {
      setIsPatientFound(false); 
      setPatientData(prev => ({ 
        ...prev,
        PatientFullName: '',
        DateOfBirth: '',
        PatientEmail: '',
        PatientPhone: '',
        MemberID: '',
        AdditionalNotes: '',
        id: null 
      }));

      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      if (value.length > 0) {
        setLoadingPatient(true);
        setSearchTimeout(
          setTimeout(async () => {
            try {
              // Search for patient by PatientID
              const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.patients}?PatientID=${value}`);
              if (!response.ok) {
                // If not found, it's ok, user might be adding new patient
                console.log(`Patient with ID ${value} not found.`);
                setIsPatientFound(false);
                setLoadingPatient(false);
                return;
              }
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

  // Handle changes for Claim Details fields
  const handleClaimChange = (e) => {
    const { name, value } = e.target;
    setClaimData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Payload being submitted:', claimData);

        try {
    let patientIdForClaim = patientData.id;

    if (!isPatientFound) {
        const { PatientID, ...newPatientPayload } = patientData;
        const createdPatient = await apiClient(API_ENDPOINTS.patients, 'POST', newPatientPayload);
        patientIdForClaim = createdPatient.id;
    } else {
        await apiClient(API_ENDPOINTS.patients + `${patientData.id}/`, 'PUT', patientData);
    }

    const claimPayload = {
        Patient: patientIdForClaim,
        ClaimAmount: parseFloat(claimData.ClaimAmount),
        ProcedureCode: claimData.ProcedureCode,
        DiagnosisCode: claimData.DiagnosisCode,
        ItemCode: claimData.ItemCode,
        ServiceDate: claimData.ServiceDate,
    };

    const createdClaim = await apiClient(API_ENDPOINTS.claimDetails, 'POST', claimPayload);
    console.log('Created claim response:', createdClaim);

    onSave(); // Close modal and refresh data in App.jsx
    } catch (error) {
    console.error('Failed to submit new claim:', error);
    alert('Failed to submit claim. Check console for details.');
    }
};

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Patient Information</h3>
          <FormField
            label="Patient ID"
            name="PatientID"
            value={patientData.PatientID}
            onChange={handlePatientChange}
            placeholder="Enter patient ID to search or leave blank for new"
            className="mb-2"
          />
          {loadingPatient && <p className="text-sm text-blue-500 mb-4">Searching for patient...</p>}
          {isPatientFound && !loadingPatient && (
            <p className="text-sm text-green-600 mb-4">Patient found! Fields pre-filled.</p>
          )}
          {!isPatientFound && !loadingPatient && patientData.PatientID && (
             <p className="text-sm text-orange-500 mb-4">Patient not found. Entering new patient details.</p>
          )}

          <FormField label="Patient Name" name="PatientFullName" value={patientData.PatientFullName} onChange={handlePatientChange} required />
          <FormField label="Date of Birth" type="date" name="DateOfBirth" value={patientData.DateOfBirth} onChange={handlePatientChange} required />
          <FormField label="Email Address" type="email" name="PatientEmail" value={patientData.PatientEmail} onChange={handlePatientChange} required />
          <FormField label="Phone Number" name="PatientPhone" value={patientData.PatientPhone} onChange={handlePatientChange} required />
          <FormField label="Member ID" name="MemberID" value={patientData.MemberID} onChange={handlePatientChange} />
          <FormField label="Additional Notes" type="textarea" name="AdditionalNotes" value={patientData.AdditionalNotes} onChange={handlePatientChange} />
        </div>

        {/* Claim Details Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Claim Details</h3>
          <FormField label="Service Date" type="date" name="ServiceDate" value={claimData.ServiceDate} onChange={handleClaimChange} required />
          <FormField
            label="Procedure Code"
            type="select"
            name="ProcedureCode"
            value={claimData.ProcedureCode}
            onChange={handleClaimChange}
            options={PROCEDURE_CODE_OPTIONS}
            required
          />
          <FormField label="Diagnosis Code (ICD-10)" name="DiagnosisCode" value={claimData.DiagnosisCode} onChange={handleClaimChange} required />
          <FormField label="Item Codes" name="ItemCode" value={claimData.ItemCode} onChange={handleClaimChange} />
          <FormField label="Claim Amount" type="number" name="ClaimAmount" value={claimData.ClaimAmount} onChange={handleClaimChange} required />
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-6 border-t pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200 shadow-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Submit Claim
        </button>
      </div>
    </form>
  );
};

export default NewClaimSubmissionForm;
