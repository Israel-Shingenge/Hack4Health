import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, X, Settings } from 'lucide-react';

const ClaimTrackingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);

  // Realistic medical claims data based on Django models
  const [claims] = useState([
    {
      id: 'CLM-2024-001',
      patient: 'John Smith',
      patientId: 'P00001',
      amount: 'R3,245.00',
      status: 'Processing',
      statusType: 'processing',
      progress: 85,
      description: 'Pre-Authorization Review',
      serviceDate: '2024-01-15',
      diagnosisCode: 'Z00.00',
      diagnosisDescription: 'General adult medical examination without abnormal findings',
      doctorName: 'Dr. Sarah Wilson',
      practiceName: 'Family Health Practice',
      medicalAidPlan: 'Discovery Health Medical Scheme - Essential Smart',
      submittedDate: '2024-01-16',
      lastUpdated: '2024-01-18',
      claimType: 'Consultation',
      priority: 'Standard'
    },
    {
      id: 'CLM-2024-002',
      patient: 'Sarah Johnson',
      patientId: 'P00002',
      amount: 'R2,450.00',
      status: 'Approved',
      statusType: 'approved',
      progress: 100,
      description: 'Payment Processed',
      serviceDate: '2024-01-12',
      diagnosisCode: 'M79.1',
      diagnosisDescription: 'Myalgia - muscle pain and stiffness',
      doctorName: 'Dr. Michael Chen',
      practiceName: 'Sports Medicine Centre',
      medicalAidPlan: 'Momentum Health - Ingwe Option',
      submittedDate: '2024-01-13',
      lastUpdated: '2024-01-19',
      claimType: 'Physiotherapy',
      priority: 'Standard',
      paymentDate: '2024-01-19',
      referenceNumber: 'REF-2024-002'
    },
    {
      id: 'CLM-2024-003',
      patient: 'James Doe',
      patientId: 'P00003',
      amount: 'R3,300.00',
      status: 'Pending',
      statusType: 'pending',
      progress: 60,
      description: 'Awaiting Medical Records',
      serviceDate: '2024-01-14',
      diagnosisCode: 'H52.4',
      diagnosisDescription: 'Presbyopia - age-related focusing difficulty',
      doctorName: 'Dr. Amanda Roberts',
      practiceName: 'Clear Vision Optometry',
      medicalAidPlan: 'Bonitas Medical Fund - BonCap',
      submittedDate: '2024-01-15',
      lastUpdated: '2024-01-17',
      claimType: 'Optometry',
      priority: 'Standard',
      pendingReason: 'Additional documentation required'
    },
    {
      id: 'CLM-2024-004',
      patient: 'Maria Garcia',
      patientId: 'P00004',
      amount: 'R99,000.00',
      status: 'Rejected',
      statusType: 'rejected',
      progress: 0,
      description: 'Pre-authorization Declined',
      serviceDate: '2024-01-10',
      diagnosisCode: 'M17.1',
      diagnosisDescription: 'Bilateral primary osteoarthritis of knee',
      doctorName: 'Dr. Robert Thompson',
      practiceName: 'Orthopedic Surgery Institute',
      medicalAidPlan: 'Medihelp Medical Scheme - Necesse',
      submittedDate: '2024-01-11',
      lastUpdated: '2024-01-16',
      claimType: 'Surgery',
      priority: 'High',
      rejectionReason: 'Procedure not covered under current benefit option',
      appealDeadline: '2024-02-16'
    },
    {
      id: 'CLM-2024-005',
      patient: 'David Wilson',
      patientId: 'P00005',
      amount: 'R1,850.00',
      status: 'Processing',
      statusType: 'processing',
      progress: 45,
      description: 'Claims Assessment',
      serviceDate: '2024-01-18',
      diagnosisCode: 'J06.9',
      diagnosisDescription: 'Acute upper respiratory infection, unspecified',
      doctorName: 'Dr. Lisa Park',
      practiceName: 'Gateway Family Clinic',
      medicalAidPlan: 'GEMS Medical Scheme - Emerald Value',
      submittedDate: '2024-01-19',
      lastUpdated: '2024-01-20',
      claimType: 'General Practice',
      priority: 'Standard'
    },
    {
      id: 'CLM-2024-006',
      patient: 'Emily Davis',
      patientId: 'P00006',
      amount: 'R15,750.00',
      status: 'Approved',
      statusType: 'approved',
      progress: 100,
      description: 'Payment Processed',
      serviceDate: '2024-01-08',
      diagnosisCode: 'O80.1',
      diagnosisDescription: 'Spontaneous vertex delivery',
      doctorName: 'Dr. Jennifer Adams',
      practiceName: 'Maternity Care Hospital',
      medicalAidPlan: 'Discovery Health Medical Scheme - Executive',
      submittedDate: '2024-01-09',
      lastUpdated: '2024-01-17',
      claimType: 'Maternity',
      priority: 'High',
      paymentDate: '2024-01-17',
      referenceNumber: 'REF-2024-006',
      hospitalAdmission: true
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
    claim.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.diagnosisCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.practiceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.medicalAidPlan.toLowerCase().includes(searchQuery.toLowerCase())
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
                placeholder="Search by claim ID, patient name, patient ID, diagnosis code, doctor, or practice"
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
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:bg-white/90 transition-all duration-300 group cursor-pointer"
                onClick={() => {
                  // Future: Open detailed view modal
                  console.log('Opening detailed view for:', claim.id);
                }}
              >
                <div className="flex flex-col gap-4">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{claim.id}</h3>
                      <span className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(claim.statusType)} w-fit`}>
                        {claim.status}
                      </span>
                      {claim.priority === 'High' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 w-fit">
                          High Priority
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{claim.amount}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{claim.claimType}</p>
                    </div>
                  </div>

                  {/* Patient & Service Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">{claim.patient}</p>
                      <p className="text-gray-600">Patient ID: {claim.patientId}</p>
                      <p className="text-gray-600">{claim.medicalAidPlan}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Service Details</p>
                      <p className="text-gray-600">Date: {claim.serviceDate}</p>
                      <p className="text-gray-600">Doctor: {claim.doctorName}</p>
                      <p className="text-gray-600">Practice: {claim.practiceName}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Diagnosis</p>
                      <p className="text-gray-600">Code: {claim.diagnosisCode}</p>
                      <p className="text-gray-600 text-xs leading-relaxed">{claim.diagnosisDescription}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Progress: {claim.description}</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{claim.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(claim.statusType)}`}
                        style={{ width: `${claim.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Status-specific Information */}
                  {claim.statusType === 'approved' && claim.paymentDate && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        <span className="font-semibold">Payment Processed:</span> {claim.paymentDate}
                        {claim.referenceNumber && <span className="ml-2">| Ref: {claim.referenceNumber}</span>}
                      </p>
                    </div>
                  )}

                  {claim.statusType === 'rejected' && claim.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800">
                        <span className="font-semibold">Rejection Reason:</span> {claim.rejectionReason}
                      </p>
                      {claim.appealDeadline && (
                        <p className="text-sm text-red-600 mt-1">
                          <span className="font-semibold">Appeal Deadline:</span> {claim.appealDeadline}
                        </p>
                      )}
                    </div>
                  )}

                  {claim.statusType === 'pending' && claim.pendingReason && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        <span className="font-semibold">Pending:</span> {claim.pendingReason}
                      </p>
                    </div>
                  )}

                  {/* Timeline Info */}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 border-t pt-3">
                    <span>Submitted: {claim.submittedDate}</span>
                    <span>Last Updated: {claim.lastUpdated}</span>
                    {claim.hospitalAdmission && <span className="text-blue-600 font-medium">Hospital Admission</span>}
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