import React, { useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS, apiClient } from '../../utils/api';

const APIConnectionTest = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async (testName, testFunction) => {
    setTestResults(prev => ({ ...prev, [testName]: { status: 'running', message: 'Testing...' } }));
    
    try {
      const result = await testFunction();
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { status: 'success', message: 'Success!', data: result } 
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { status: 'error', message: error.message, data: null } 
      }));
    }
  };

  const testBasicConnection = async () => {
    // Test basic connection to the server
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    return `Server is reachable at ${API_BASE_URL}`;
  };

  const testPatientsEndpoint = async () => {
    // Test the patients endpoint
    const result = await apiClient(API_ENDPOINTS.patients, 'GET');
    return `Patients endpoint working. Found ${Array.isArray(result) ? result.length : 'unknown'} patients`;
  };

  const testClaimDetailsEndpoint = async () => {
    // Test the claim-details endpoint
    const result = await apiClient(API_ENDPOINTS.claimDetails, 'GET');
    return `Claim details endpoint working. Found ${Array.isArray(result) ? result.length : 'unknown'} claims`;
  };

  const testListPatients = async () => {
    // Test listing patients from the database
    const result = await apiClient(API_ENDPOINTS.patients, 'GET');
    
    console.log('Raw API Response:', result);
    
    // Handle paginated response (Django REST framework style)
    let patientsArray = result;
    if (result && typeof result === 'object' && result.results) {
      patientsArray = result.results;
    }
    
    if (!Array.isArray(patientsArray)) {
      return `API returned: ${JSON.stringify(result)}. Expected array or paginated response.`;
    }
    
    if (patientsArray.length === 0) {
      return 'No patients found in database';
    }
    
    // Get first 2 patients
    const patientsToShow = patientsArray.slice(0, 2);
    const patientList = patientsToShow.map((patient, index) => 
      `${index + 1}. ${patient.PatientFullName || patient.name || 'Unnamed Patient'} (ID: ${patient.id || 'No ID'})`
    ).join('\n');
    
    return `Found ${patientsArray.length} total patients. First 2:\n${patientList}`;
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setTestResults({});

    console.log('=== API CONNECTION TEST START ===');
    console.log('Testing API Base URL:', API_BASE_URL);
    console.log('Testing endpoints:', API_ENDPOINTS);

    await runTest('basicConnection', testBasicConnection);
    await runTest('patientsEndpoint', testPatientsEndpoint);
    await runTest('claimDetailsEndpoint', testClaimDetailsEndpoint);
    await runTest('listPatients', testListPatients);

    setIsLoading(false);
    console.log('=== API CONNECTION TEST END ===');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'running': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'running': return '⏳';
      default: return '⭕';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">API Connection Test</h2>
      <p className="text-gray-600 mb-6">
        Testing connection to backend server at: <strong>{API_BASE_URL}</strong>
      </p>

      <button 
        onClick={runAllTests}
        disabled={isLoading}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Running Tests...' : 'Run Connection Tests'}
      </button>

      <div className="space-y-4">
        <div className="test-result">
          <h3 className="font-semibold mb-2">1. Basic Server Connection</h3>
          <div className={`p-3 rounded border ${testResults.basicConnection ? 'bg-gray-50' : 'bg-gray-100'}`}>
            <span className="mr-2">{getStatusIcon(testResults.basicConnection?.status)}</span>
            <span className={getStatusColor(testResults.basicConnection?.status)}>
              {testResults.basicConnection?.message || 'Not tested yet'}
            </span>
          </div>
        </div>

        <div className="test-result">
          <h3 className="font-semibold mb-2">2. Patients Endpoint (GET)</h3>
          <div className={`p-3 rounded border ${testResults.patientsEndpoint ? 'bg-gray-50' : 'bg-gray-100'}`}>
            <span className="mr-2">{getStatusIcon(testResults.patientsEndpoint?.status)}</span>
            <span className={getStatusColor(testResults.patientsEndpoint?.status)}>
              {testResults.patientsEndpoint?.message || 'Not tested yet'}
            </span>
          </div>
        </div>

        <div className="test-result">
          <h3 className="font-semibold mb-2">3. Claim Details Endpoint (GET)</h3>
          <div className={`p-3 rounded border ${testResults.claimDetailsEndpoint ? 'bg-gray-50' : 'bg-gray-100'}`}>
            <span className="mr-2">{getStatusIcon(testResults.claimDetailsEndpoint?.status)}</span>
            <span className={getStatusColor(testResults.claimDetailsEndpoint?.status)}>
              {testResults.claimDetailsEndpoint?.message || 'Not tested yet'}
            </span>
          </div>
        </div>

        <div className="test-result">
          <h3 className="font-semibold mb-2">4. List Database Patients</h3>
          <div className={`p-3 rounded border ${testResults.listPatients ? 'bg-gray-50' : 'bg-gray-100'}`}>
            <span className="mr-2">{getStatusIcon(testResults.listPatients?.status)}</span>
            <span className={getStatusColor(testResults.listPatients?.status)}>
              {testResults.listPatients?.message || 'Not tested yet'}
            </span>
          </div>
        </div>
      </div>

      {Object.keys(testResults).length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Detailed Results (Check Browser Console)</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64">
            {JSON.stringify(testResults, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h4 className="font-semibold text-yellow-800">Troubleshooting Tips:</h4>
        <ul className="text-yellow-700 text-sm mt-2 space-y-1">
          <li>• If all tests fail: Check if the backend server is running</li>
          <li>• If connection fails: Check network/firewall (school wifi might block certain ports)</li>
          <li>• If endpoints fail: Check if the API endpoints are correct</li>
          <li>• If no patients shown: Check if there are patients in your database</li>
        </ul>
      </div>
    </div>
  );
};

export default APIConnectionTest;
