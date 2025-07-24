import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Import actual tab components
import ReceiverClerkTab from './reciever_clerk/reciever.jsx';
import BatchClerkTab from './batch_clerk/batch.jsx';
import PreAssessorTab from './pre-accessor/pre-accessor.jsx';
import ManualAssessorTab from './manual-accessor/manual-accessor.jsx';


const ClaimsDepartmentPortal = () => {
  const [activeTab, setActiveTab] = useState('receiver');
  const navigate = useNavigate();

  const tabs = [
    { id: 'receiver', label: 'Receiver Clerk', component: ReceiverClerkTab },
    { id: 'batch', label: 'Batch Clerk', component: BatchClerkTab },
    { id: 'preassessor', label: 'Pre-Assessor', component: PreAssessorTab },
    { id: 'manual', label: 'Manual Assessor', component: ManualAssessorTab }
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
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Title */}
      <div className="bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Claims Department Portal</h1>
            <p className="text-sm sm:text-base text-gray-600">MetHealth Medical Aid</p>
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
                width: `${100 / tabs.length}%`,
                height: 'calc(100% - 8px)',
                top: '4px',
                left: `${(tabs.findIndex(tab => tab.id === activeTab) * 100) / tabs.length}%`,
                transform: `translateX(4px)`
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

export default ClaimsDepartmentPortal;