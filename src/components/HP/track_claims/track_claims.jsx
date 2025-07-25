import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, X, Settings } from 'lucide-react';

const ClaimTrackingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(2);

  // Sample claims data
  const [claims] = useState([
    {
      id: 'CLM-2024-001',
      patient: 'John Smith',
      amount: 'R3245.00',
      status: 'Processing',
      statusType: 'processing',
      progress: 95,
      description: 'Pre-Assessment'
    },
    {
      id: 'CLM-2024-002',
      patient: 'Sarah Johnson',
      amount: 'R2450.00',
      status: 'Approved',
      statusType: 'approved',
      progress: 100,
      description: 'Completed'
    },
    {
      id: 'CLM-2024-003',
      patient: 'James Doe',
      amount: 'R3300.00',
      status: 'Pending',
      statusType: 'pending',
      progress: 60,
      description: 'Pending'
    },
    {
      id: 'CLM-2024-004',
      patient: 'Sarah Johnson',
      amount: 'R99 000.00',
      status: 'Rejected',
      statusType: 'rejected',
      progress: 0,
      description: 'Rejected'
    }
  ]);

  const getStatusColor = (statusType) => {
    switch (statusType) {
      case 'processing':
        return 'bg-gray-600 text-white';
      case 'approved':
        return 'bg-green-600 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'rejected':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getProgressColor = (statusType) => {
    switch (statusType) {
      case 'processing':
      case 'approved':
      case 'pending':
        return 'bg-teal-500';
      case 'rejected':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const filteredClaims = claims.filter(claim =>
    claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.patient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tab logic
  const tabs = [
    { id: 'submit', label: 'Submit Claim' },
    { id: 'track', label: 'Track Claims' },
    { id: 'eligibility', label: 'Check Eligibility' },
    { id: 'analytics', label: 'Analytics' }
  ];
  const [activeTab, setActiveTab] = useState('track');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Claims Tracking Header */}
          <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200/50">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Claim Tracking</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-6">Monitor the status of submitted claims</p>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by claim ID, patient name, or member ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
              <button className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                <span className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                  Search
                </span>
              </button>
            </div>
  

          {/* Claims List */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {filteredClaims.map((claim, index) => (
              <div
                key={claim.id}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:bg-white/90 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{claim.id}</h3>
                      <span className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(claim.statusType)} w-fit`}>
                        {claim.status}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">{claim.patient}</p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600">Progress</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-900">{claim.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getProgressColor(claim.statusType)}`}
                          style={{ width: `${claim.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2 sm:gap-1 text-right">
                    <div className="order-2 sm:order-1">
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{claim.amount}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{claim.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200/50 bg-gray-50/50">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white rounded-lg transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2">
                <span className="text-sm sm:text-base font-medium text-gray-900">{currentPage}</span>
                <span className="text-sm sm:text-base text-gray-500">of</span>
                <span className="text-sm sm:text-base font-medium text-gray-900">{totalPages}</span>
              </div>

              <button
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white rounded-lg transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/20">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Settings className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimTrackingPage;