// src/components/patientMedicalAids/PatientMedicalAidForm.jsx
import React, { useState, useEffect } from 'react';
import FormField from '../FormField';
import { apiClient, API_ENDPOINTS } from '../../utils/api';
import { MEMBER_TYPE_CHOICES } from '../../constants/memberTypes';

const PatientMedicalAidForm = ({ currentPatientMedicalAid, patients, medicalAids, onSave, onClose }) => {
  const [pma, setPma] = useState(currentPatientMedicalAid || {
    patient: '',
    medical_aid: '',
    member_type: MEMBER_TYPE_CHOICES[1].value, // Default to Dependent
    policy_number: ''
  });

  useEffect(() => {
    setPma(currentPatientMedicalAid || {
      patient: '',
      medical_aid: '',
      member_type: MEMBER_TYPE_CHOICES[1].value,
      policy_number: ''
    });
  }, [currentPatientMedicalAid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPma(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        patient: pma.patient,
        medical_aid: pma.medical_aid,
        member_type: pma.member_type,
        policy_number: pma.policy_number
      };
      if (pma.id) {
        await apiClient(API_ENDPOINTS.patientMedicalAids + `${pma.id}/`, 'PUT', payload);
      } else {
        await apiClient(API_ENDPOINTS.patientMedicalAids, 'POST', payload);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save patient medical aid link:', error);
      alert('Failed to save link. Check console for details. (Duplicate link or invalid IDs?)');
    }
  };

  const patientOptions = patients.map(p => ({ value: p.id, label: p.PatientFullName }));
  const medicalAidOptions = medicalAids.map(ma => ({ value: ma.id, label: ma.MedicalAidName }));

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <FormField
        label="Patient"
        type="select"
        name="patient"
        value={pma.patient}
        onChange={handleChange}
        options={patientOptions}
        required
      />
      <FormField
        label="Medical Aid"
        type="select"
        name="medical_aid"
        value={pma.medical_aid}
        onChange={handleChange}
        options={medicalAidOptions}
        required
      />
      <FormField
        label="Member Type"
        type="select"
        name="member_type"
        value={pma.member_type}
        onChange={handleChange}
        options={MEMBER_TYPE_CHOICES}
        required
      />
      <FormField label="Policy Number" name="policy_number" value={pma.policy_number} onChange={handleChange} />
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
          {pma.id ? 'Update Link' : 'Add Link'}
        </button>
      </div>
    </form>
  );
};

export default PatientMedicalAidForm;