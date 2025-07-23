import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './hp_provider_portal.css';
// Import your existing ClaimSubmissionForm component
// import ClaimSubmissionForm from './ClaimSubmissionForm';

// For demo purposes, I'll create a simple placeholder
const ClaimSubmissionForm = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">+ New Claim Submission</h2>
      <p className="text-gray-600 mb-6">Submit a new medical claim with automatic validation and eligibility checking</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Patient Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
              <input type="text" placeholder="Enter patient ID" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input type="text" placeholder="Enter patient name" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Claim Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Date</label>
              <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Procedure Code</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>Select procedure</option>
                <option>99213 - Office Visit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Claim Amount</label>
              <input type="number" placeholder="0.00" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">✓ Real-time Validation</h4>
        <div className="flex flex-wrap gap-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">✓ Patient Eligible</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">✓ Procedure Covered</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">! Prior Auth Required</span>
        </div>
      </div>
      
      <button className="w-full mt-6 bg-slate-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-slate-700 transition-colors">
        Submit Claim for Processing
      </button>
    </div>
  );
};

// Placeholder components for other tabs
const TrackClaimsPage = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Track Claims</h2>
    <p className="text-gray-600">Track your submitted claims and their status.</p>
    <div className="mt-8 p-8 bg-gray-50 rounded-lg text-center">
      <p className="text-gray-500">Track Claims functionality coming soon...</p>
    </div>
  </div>
);

const CheckEligibilityPage = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Check Eligibility</h2>
    <p className="text-gray-600">Verify patient eligibility and coverage information.</p>
    <div className="mt-8 p-8 bg-gray-50 rounded-lg text-center">
      <p className="text-gray-500">Eligibility checking functionality coming soon...</p>
    </div>
  </div>
);

const AnalyticsPage = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h2>
    <p className="text-gray-600">View analytics and reports for your claims.</p>
    <div className="mt-8 p-8 bg-gray-50 rounded-lg text-center">
      <p className="text-gray-500">Analytics dashboard coming soon...</p>
    </div>
  </div>
);

const HealthcareProviderPortal = () => {
  const [activeTab, setActiveTab] = useState('submit');

  const tabs = [
    { id: 'submit', label: 'Submit Claim', component: ClaimSubmissionForm },
    { id: 'track', label: 'Track Claims', component: TrackClaimsPage },
    { id: 'eligibility', label: 'Check Eligibility', component: CheckEligibilityPage },
    { id: 'analytics', label: 'Analytics', component: AnalyticsPage }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderActiveComponent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    const Component = activeTabData?.component;
    return Component ? <Component /> : null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Healthcare Provider Portal</h1>
            <p className="mt-1 text-gray-600">Riverside Medical Center</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative py-4 px-1 text-sm font-medium whitespace-nowrap transition-all duration-200 ease-in-out ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-all duration-300 ease-in-out">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default HealthcareProviderPortal;