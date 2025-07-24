// src/components/medicalAids/MedicalAidForm.jsx
import React, { useState, useEffect } from 'react';
import FormField from '../FormField';
import { apiClient, API_ENDPOINTS } from '../../utils/api';

const MedicalAidForm = ({ currentMedicalAid, onSave, onClose }) => {
  const [medicalAid, setMedicalAid] = useState(currentMedicalAid || {
    MedicalAidName: '',
    MedicalAidType: '',
    MedicalAidContactNumber: '',
    MedicalAidEmail: ''
  });

  useEffect(() => {
    setMedicalAid(currentMedicalAid || {
      MedicalAidName: '',
      MedicalAidType: '',
      MedicalAidContactNumber: '',
      MedicalAidEmail: ''
    });
  }, [currentMedicalAid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicalAid(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (medicalAid.id) {
        await apiClient(API_ENDPOINTS.medicalAids + `${medicalAid.id}/`, 'PUT', medicalAid);
      } else {
        await apiClient(API_ENDPOINTS.medicalAids, 'POST', medicalAid);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save medical aid:', error);
      alert('Failed to save medical aid. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <FormField label="Medical Aid Name" name="MedicalAidName" value={medicalAid.MedicalAidName} onChange={handleChange} required />
      <FormField label="Medical Aid Type" name="MedicalAidType" value={medicalAid.MedicalAidType} onChange={handleChange} required />
      <FormField label="Contact Number" name="MedicalAidContactNumber" value={medicalAid.MedicalAidContactNumber} onChange={handleChange} />
      <FormField label="Email" type="email" name="MedicalAidEmail" value={medicalAid.MedicalAidEmail} onChange={handleChange} />
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
          {medicalAid.id ? 'Update Medical Aid' : 'Add Medical Aid'}
        </button>
      </div>
    </form>
  );
};

export default MedicalAidForm;