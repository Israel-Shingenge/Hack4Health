export const API_BASE_URL = 'http://localhost:8000/api/'; 

export const API_ENDPOINTS = {
  patients: 'patients/',
  medicalAids: 'medical-aids/',
  patientMedicalAids: 'patient-medical-aids/',
  medicalHistory: 'medical-history/',
  claimDetails: 'claim-details/',
};

export const apiClient = async (endpointPath, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}${endpointPath}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(url, config);

    const text = await response.text();

    // Check if content-type is JSON and parse accordingly
    const contentType = response.headers.get('content-type');
    const data = contentType && contentType.includes('application/json') ? JSON.parse(text) : null;

    if (!response.ok) {
      console.error('API Error Response:', data || text);
      throw new Error(data?.detail || `HTTP error! Status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};
