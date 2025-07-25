// export const API_BASE_URL = process.env.REACT_APP_H4H_POST_API || 'http://localhost:8000/api';

// WHEN HOSTING USING A SHARED NETWORK
// export const API_BASE_URL = process.env.REACT_APP_H4H_POST_API || 'http://10.250.39.25:8000/api';

//Connecting to django on a different network using ngrok
export const API_BASE_URL = process.env.REACT_APP_H4H_POST_API || 'https://ac4737f74e4a.ngrok-free.app/api';

// N8N Webhook endpoint - replace with your actual n8n webhook URL
export const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || 'https://warm-lion-0.hooks.n8n.cloud/webhook-test/90218907-159b-4296-84b7-0c9e82f44a15';


// API Endpoints for different models
export const API_ENDPOINTS = {
  patients: 'patients/',
  medicalAids: 'medical-aids/',
  patientMedicalAids: 'patient-medical-aids/',
  medicalHistory: 'medical-history/',
  claimDetails: 'claim-details/',
};

export const apiClient = async (endpointPath, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}/${endpointPath}`;
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
    const responseData = contentType && contentType.includes('application/json') ? JSON.parse(text) : null;

    if (!response.ok) {
      console.error('API Error Response:', responseData || text);
      throw new Error(responseData?.detail || `HTTP error! Status: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Function to send data to n8n webhook
export const sendToN8nWebhook = async (data) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const config = {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(N8N_WEBHOOK_URL, config);

    if (!response.ok) {
      throw new Error(`N8N Webhook error! Status: ${response.status}`);
    }

    // N8N webhooks might return different content types
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('N8N Webhook Error:', error.message);
    throw error;
  }
};

// Helper function to send to both endpoints (Django API + N8N)
export const sendToBothEndpoints = async (endpointPath, data) => {
  try {
    // Send to Django API first
    const apiResponse = await apiClient(endpointPath, 'POST', data);
    
    // Then send to N8N webhook
    const n8nResponse = await sendToN8nWebhook({
      endpoint: endpointPath,
      data: data,
      apiResponse: apiResponse,
      timestamp: new Date().toISOString()
    });
    
    return {
      api: apiResponse,
      n8n: n8nResponse
    };
  } catch (error) {
    console.error('Error sending to both endpoints:', error);
    throw error;
  }
};
