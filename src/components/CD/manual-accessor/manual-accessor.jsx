import React from 'react';



const ManualAssessorTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 rounded-full bg-blue-500 mr-3 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
      </div>
      <p className="text-gray-600 mb-6">Complex claims requiring detailed manual assessment</p>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">CLM-2024-301</h3>
            <p className="text-gray-600">Emma Johnson • Regional Hospital</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-gray-900">$12,450.00</div>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">High Priority</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Review Reason</h4>
            <p className="text-gray-600 mb-4">Multiple procedures, experimental treatment</p>
            
            <h4 className="font-medium text-gray-900 mb-2">Complexity Level</h4>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">High</span>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Time Assigned</h4>
              <p className="text-gray-600">2 hours ago</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Review Notes</h4>
            <textarea 
              className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter detailed review notes..."
            />
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Decision</h4>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select decision</option>
                <option>Approve</option>
                <option>Deny</option>
                <option>Request Additional Information</option>
                <option>Partial Approval</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            View Full Claim Details
          </button>
          <button className="px-6 py-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100">
            Contact Provider
          </button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Submit Decision
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ManualAssessorTab;