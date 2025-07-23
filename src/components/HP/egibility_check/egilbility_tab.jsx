import React, { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';

export default function HealthcarePortal() {
  const [memberID, setMemberID] = useState('');
  const [serviceDate, setServiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [showResults, setShowResults] = useState(false);

  const handleCheckEligibility = () => {
    if (memberID && serviceDate) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-gray-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Patient Eligibility Check</h2>
              <p className="text-sm text-gray-600">Verify patient coverage and benefits before service</p>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="memberID" className="block text-sm font-medium text-gray-700 mb-2">
                Medical Aid ID
              </label>
              <input
                type="text"
                id="memberID"
                value={memberID}
                onChange={(e) => setMemberID(e.target.value)}
                placeholder="Enter Medical Aid ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="serviceDate" className="block text-sm font-medium text-gray-700 mb-2">
                Service Date
              </label>
              <input
                type="date"
                id="serviceDate"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleCheckEligibility}
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Check Eligibility
          </button>

          {/* Results */}
          {showResults && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Results</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Coverage Status:</span>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-4">
                      Active
                    </span>
                    <span className="text-gray-600">Co-pay:</span>
                    <span className="font-semibold text-gray-900 ml-2">$25</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Plan Type:</span>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900 mr-4">Comprehensive Medical</span>
                    <span className="text-gray-600">Out-of-pocket Max:</span>
                    <span className="font-semibold text-gray-900 ml-2">$2,500 remaining</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Deductible Met:</span>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900 mr-4">$500 / $1,000</span>
                    <span className="text-gray-600">Prior Auth Required:</span>
                    <span className="font-semibold text-gray-900 ml-2">No</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}