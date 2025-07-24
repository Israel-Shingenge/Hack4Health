import React from 'react';

const PreAssessorTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 rounded-full bg-green-500 mr-3 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Pre-Assessment Queue</h2>
      </div>
      <p className="text-gray-600 mb-6">Automated validation with manual review for flagged claims</p>

      {/* First Claim */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">CLM-2024-201</h3>
            <p className="text-gray-600">Alice Brown • Specialty Clinic</p>
          </div>
          <div className="text-2xl font-bold text-gray-900">$890.00</div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Automated Validation Results:</h4>
          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Eligibility: Passed</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Coverage: Passed</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">Limits: Warning</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Review Flags:</h4>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              High Amount
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Prior Auth Missing
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Review Details
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Approve
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Reject
          </button>
          <button className="px-4 py-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
            Send to Manual Review
          </button>
        </div>
      </div>

      {/* Second Claim */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">CLM-2024-202</h3>
            <p className="text-gray-600">David Wilson • Family Practice</p>
          </div>
          <div className="text-2xl font-bold text-gray-900">$240.00</div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Automated Validation Results:</h4>
          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Eligibility: Passed</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Coverage: Passed</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Limits: Passed</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Review Flags:</h4>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Duplicate Service
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Review Details
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Approve
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Reject
          </button>
          <button className="px-4 py-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
            Send to Manual Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreAssessorTab;