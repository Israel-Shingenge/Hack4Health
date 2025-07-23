import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './hp_provider_portal.css';
// Import your existing ClaimSubmissionForm component
import ClaimSubmissionForm from './claims/claims_form.jsx';

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
    { id: 'submit', label: 'Claims', component: ClaimSubmissionForm },
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

      {/* Navigation Tabs - replaced with custom navbar */}
      <div className="nav">
        <div className="container" style={{ position: 'relative' }}>
          {tabs.map((tab, idx) => (
            <div
              key={tab.id}
              className={`btn${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              style={{
                color: activeTab === tab.id ? '#0074d9' : undefined,
                fontWeight: activeTab === tab.id ? 'bold' : undefined,
                borderBottom: activeTab === tab.id ? '2px solid #0074d9' : '2px solid transparent',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </div>
          ))}
          <svg
            className="outline"
            overflow="visible"
            width="400"
            height="60"
            viewBox="0 0 400 60"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', left: 0, top: 0, zIndex: -1 }}
          >
            <rect
              className="rect"
              pathLength="100"
              x="0"
              y="0"
              width="400"
              height="60"
              fill="transparent"
              strokeWidth="5"
            ></rect>
          </svg>
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