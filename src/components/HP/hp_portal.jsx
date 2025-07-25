import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Import tab files
import ClaimSubmissionForm from './claims/claims_form.jsx';
import ClaimTrackingPage from './track_claims/track_claims.jsx';
import CheckEligibilityPage from './egibility_check/egilbility_tab.jsx';
import AnalyticsPage from './analystics/analystics.jsx';
import APIConnectionTest from '../test/APIConnectionTest.jsx';

const HealthcareProviderPortal = () => {
  const [activeTab, setActiveTab] = useState('eligibility');
  const navigate = useNavigate();

  const tabs = [
    { id: 'eligibility', label: 'Check Eligibility', component: CheckEligibilityPage },
    { id: 'submit', label: 'Claims', component: ClaimSubmissionForm },
    { id: 'track', label: 'Track Claims', component: ClaimTrackingPage },
    { id: 'analytics', label: 'Analytics', component: AnalyticsPage },
    { id: 'test', label: 'API Test', component: APIConnectionTest }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Portal Title */}
      <div className="bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
               <button
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">Home</span>
              </button>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Healthcare Provider Portal</h1>
            <p className="text-sm sm:text-base text-gray-600">MetHealth Medical Center</p>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="bg-white/60 backdrop-blur-sm pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200/80 backdrop-blur-sm rounded-full p-1 flex overflow-x-auto relative hide-scrollbar">
            {/* Animated background pill */}
            <div 
              className="absolute bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
              style={{
                width: `calc(${100 / tabs.length}% - 8px)`,
                height: 'calc(100% - 8px)',
                top: '4px',
                left: `calc(${(tabs.findIndex(tab => tab.id === activeTab) * 100) / tabs.length}% + 4px)`,
              }}
            />
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex-1 min-w-max px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 relative z-10 ${
                  activeTab === tab.id ? 'text-gray-900' : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => handleTabChange(tab.id)}
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