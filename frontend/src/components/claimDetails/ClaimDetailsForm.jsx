// src/components/claimDetails/ClaimDetailsForm.jsx
import React, { useState, useEffect } from 'react';
import FormField from '../FormField';
import { apiClient, API_ENDPOINTS } from '../../utils/api';

const ClaimDetailsForm = ({ currentClaimDetails, patients, onSave, onClose }) => {
  const [claim, setClaim] = useState(currentClaimDetails || {
    Patient: '',
    ClaimAmount: '',
    ProcedureCode: '',
    DiagnosisCode: '',
    ItemCode: '',
    ServiceDate: ''
  });

  useEffect(() => {
    setClaim(currentClaimDetails || {
      Patient: '',
      ClaimAmount: '',
      ProcedureCode: '',
      DiagnosisCode: '',
      ItemCode: '',
      ServiceDate: ''
    });
  }, [currentClaimDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaim(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        Patient: claim.Patient,
        ClaimAmount: parseFloat(claim.ClaimAmount), // Ensure it's a number
        ProcedureCode: claim.ProcedureCode,
        DiagnosisCode: claim.DiagnosisCode,
        ItemCode: claim.ItemCode,
        ServiceDate: claim.ServiceDate
      };
      if (claim.id) {
        await apiClient(API_ENDPOINTS.claimDetails + `${claim.id}/`, 'PUT', payload);
      } else {
        await apiClient(API_ENDPOINTS.claimDetails, 'POST', payload);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save claim details:', error);
      alert('Failed to save claim details. Check console for details.');
    }
  };

  const patientOptions = patients.map(p => ({ value: p.id, label: p.PatientFullName }));

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <FormField
        label="Patient"
        type="select"
        name="Patient"
        value={claim.Patient}
        onChange={handleChange}
        options={patientOptions}
        required
      />
      <FormField label="Claim Amount" type="number" name="ClaimAmount" value={claim.ClaimAmount} onChange={handleChange} required />
      <FormField label="Procedure Code" name="ProcedureCode" value={claim.ProcedureCode} onChange={handleChange} required />
      <FormField label="Diagnosis Code" name="DiagnosisCode" value={claim.DiagnosisCode} onChange={handleChange} required />
      <FormField label="Item Code" name="ItemCode" value={claim.ItemCode} onChange={handleChange} required />
      <FormField label="Service Date" type="date" name="ServiceDate" value={claim.ServiceDate} onChange={handleChange} required />
      <div className="flex justify-end space-x-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          {claim.id ? 'Update Claim' : 'Add Claim'}
        </button>
      </div>
    </form>
  );
};

export default ClaimDetailsForm;