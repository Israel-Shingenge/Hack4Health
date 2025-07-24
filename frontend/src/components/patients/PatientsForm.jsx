import React, { useState, useEffect, useRef } from 'react';
import FormField from '../FormField';
import { API_BASE_URL, API_ENDPOINTS } from '../../utils/api';

const PatientForm = ({ currentPatient, onSave, onClose }) => {
  const [patient, setPatient] = useState(currentPatient || {
    PatientID: '',
    PatientFullName: '',
    DateOfBirth: '',
    PatientEmail: '',
    PatientPhone: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    setPatient(currentPatient || {
      PatientID: '',
      PatientFullName: '',
      DateOfBirth: '',
      PatientEmail: '',
      PatientPhone: '',
    });
    setSearchResults([]);
    setShowDropdown(false);
  }, [currentPatient]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePatientIdChange = (e) => {
    const id = e.target.value;
    setPatient((prev) => ({ ...prev, PatientID: id }));

    if (searchTimeout) clearTimeout(searchTimeout);

    if (id.length === 0) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setSearchTimeout(
      setTimeout(async () => {
        try {
          const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.patients}?PatientID__icontains=${id}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setSearchResults(data);
          setShowDropdown(true);
        } catch (error) {
          console.error('Error fetching patient search results:', error);
          setSearchResults([]);
          setShowDropdown(false);
        }
      }, 300) // debounce 300ms
    );
  };

  const handleSelectPatient = (selectedPatient) => {
    setPatient({
      PatientID: selectedPatient.PatientID,
      PatientFullName: selectedPatient.PatientFullName,
      DateOfBirth: selectedPatient.DateOfBirth,
      PatientEmail: selectedPatient.PatientEmail,
      PatientPhone: selectedPatient.PatientPhone,
    });
    setShowDropdown(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Determine if updating or creating new patient
      const method = currentPatient ? 'PUT' : 'POST';
      const endpoint = currentPatient ? `${API_ENDPOINTS.patients}${currentPatient.id}/` : API_ENDPOINTS.patients;

      await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      });
      onSave();
    } catch (error) {
      console.error('Failed to save patient:', error);
      alert('Failed to save patient, check console for details.');
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="relative">
          <FormField
            label="Patient ID"
            name="PatientID"
            value={patient.PatientID}
            onChange={handlePatientIdChange}
            placeholder="Type Patient ID"
            autoComplete="off"
            required
          />
          {showDropdown && searchResults.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-300 rounded-md w-full max-h-48 overflow-auto shadow-lg mt-1">
              {searchResults.map((p) => (
                <li
                  key={p.id}
                  onClick={() => handleSelectPatient(p)}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                >
                  {p.PatientID} — {p.PatientFullName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <FormField
          label="Full Name"
          name="PatientFullName"
          value={patient.PatientFullName}
          onChange={handleFieldChange}
          required
        />
        <FormField
          label="Date of Birth"
          type="date"
          name="DateOfBirth"
          value={patient.DateOfBirth}
          onChange={handleFieldChange}
          required
        />
        <FormField
          label="Email"
          type="email"
          name="PatientEmail"
          value={patient.PatientEmail}
          onChange={handleFieldChange}
          required
        />
        <FormField
          label="Phone"
          name="PatientPhone"
          value={patient.PatientPhone}
          onChange={handleFieldChange}
          required
        />

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
            {currentPatient ? 'Update Patient' : 'Add New Patient'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
