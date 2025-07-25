import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const ReceivedClaimsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample received claims data - this would come from your Django API
  const [receivedClaims] = useState([
    {
      id: 'CLM-2024-001',
      patientName: 'John Smith',
      patientId: 'P00001',
      memberNumber: 'MS123456',
      submissionDate: '2024-01-20',
      claimAmount: 'R3,245.00',
      status: 'Processing',
      statusType: 'processing',
      priority: 'Standard',
      diagnosisCode: 'Z00.00',
      diagnosisDescription: 'General adult medical examination',
      doctorName: 'Dr. Sarah Wilson',
      practiceName: 'Family Health Practice',
      medicalAidPlan: 'Discovery Health Medical Scheme - Essential Smart',
      serviceDate: '2024-01-15',
      submittedBy: 'HP Portal',
      documentCount: 3,
      estimatedProcessingDays: 5,
      currentStage: 'Pre-Assessment'
    },
    {
      id: 'CLM-2024-002',
      patientName: 'Sarah Johnson',
      patientId: 'P00002',
      memberNumber: 'MS789012',
      submissionDate: '2024-01-19',
      claimAmount: 'R2,450.00',
      status: 'Approved',
      statusType: 'approved',
      priority: 'Standard',
      diagnosisCode: 'M79.1',
      diagnosisDescription: 'Myalgia - muscle pain and stiffness',
      doctorName: 'Dr. Michael Chen',
      practiceName: 'Sports Medicine Centre',
      medicalAidPlan: 'Momentum Health - Ingwe Option',
      serviceDate: '2024-01-12',
      submittedBy: 'Email Submission',
      documentCount: 2,
      processedDate: '2024-01-19',
      currentStage: 'Completed'
    },
    {
      id: 'CLM-2024-003',
      patientName: 'James Doe',
      patientId: 'P00003',
      memberNumber: 'MS345678',
      submissionDate: '2024-01-18',
      claimAmount: 'R3,300.00',
      status: 'Pending Documentation',
      statusType: 'pending',
      priority: 'Standard',
      diagnosisCode: 'H52.4',
      diagnosisDescription: 'Presbyopia - age-related focusing difficulty',
      doctorName: 'Dr. Amanda Roberts',
      practiceName: 'Clear Vision Optometry',
      medicalAidPlan: 'Bonitas Medical Fund - BonCap',
      serviceDate: '2024-01-14',
      submittedBy: 'Fax Submission',
      documentCount: 1,
      estimatedProcessingDays: 3,
      currentStage: 'Documentation Review',
      pendingReason: 'Missing prescription details'
    },
    {
      id: 'CLM-2024-004',
      patientName: 'Maria Garcia',
      patientId: 'P00004',
      memberNumber: 'MS901234',
      submissionDate: '2024-01-17',
      claimAmount: 'R99,000.00',
      status: 'Rejected',
      statusType: 'rejected',
      priority: 'High',
      diagnosisCode: 'M17.1',
      diagnosisDescription: 'Bilateral primary osteoarthritis of knee',
      doctorName: 'Dr. Robert Thompson',
      practiceName: 'Orthopedic Surgery Institute',
      medicalAidPlan: 'Medihelp Medical Scheme - Necesse',
      serviceDate: '2024-01-10',
      submittedBy: 'HP Portal',
      documentCount: 5,
      processedDate: '2024-01-18',
      currentStage: 'Completed',
      rejectionReason: 'Procedure not covered under current benefit option'
    },
    {
      id: 'CLM-2024-005',
      patientName: 'David Wilson',
      patientId: 'P00005',
      memberNumber: 'MS567890',
      submissionDate: '2024-01-21',
      claimAmount: 'R1,850.00',
      status: 'Processing',
      statusType: 'processing',
      priority: 'Standard',
      diagnosisCode: 'J06.9',
      diagnosisDescription: 'Acute upper respiratory infection',
      doctorName: 'Dr. Lisa Park',
      practiceName: 'Gateway Family Clinic',
      medicalAidPlan: 'GEMS Medical Scheme - Emerald Value',
      serviceDate: '2024-01-18',
      submittedBy: 'HP Portal',
      documentCount: 2,
      estimatedProcessingDays: 4,
      currentStage: 'Initial Review'
    },
    {
      id: 'CLM-2024-006',
      patientName: 'Emily Davis',
      patientId: 'P00006',
      memberNumber: 'MS123789',
      submissionDate: '2024-01-16',
      claimAmount: 'R15,750.00',
      status: 'Approved',
      statusType: 'approved',
      priority: 'High',
      diagnosisCode: 'O80.1',
      diagnosisDescription: 'Spontaneous vertex delivery',
      doctorName: 'Dr. Jennifer Adams',
      practiceName: 'Maternity Care Hospital',
      medicalAidPlan: 'Discovery Health Medical Scheme - Executive',
      serviceDate: '2024-01-08',
      submittedBy: 'Hospital System',
      documentCount: 8,
      processedDate: '2024-01-17',
      currentStage: 'Completed',
      isMaternity: true
    }
  ]);

  const getStatusIcon = (statusType) => {
    switch (statusType) {
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (statusType) => {
    switch (statusType) {
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'High' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white';
  };

  // Filter claims based on search query and status
  const filteredClaims = receivedClaims.filter(claim => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.memberNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.practiceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || claim.statusType === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClaims = filteredClaims.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (claimId) => {
    console.log('Viewing details for claim:', claimId);
    // Future: Open detailed claim view
  };

  const handleDownloadDocuments = (claimId) => {
    console.log('Downloading documents for claim:', claimId);
    // Future: Download claim documents
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Received Claims</h2>
        <p className="text-gray-600">Monitor and manage all incoming claims submissions</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by claim ID, patient name, member number, doctor, or practice"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{receivedClaims.filter(c => c.statusType === 'processing').length}</div>
            <div className="text-sm text-blue-700">Processing</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{receivedClaims.filter(c => c.statusType === 'approved').length}</div>
            <div className="text-sm text-green-700">Approved</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{receivedClaims.filter(c => c.statusType === 'pending').length}</div>
            <div className="text-sm text-yellow-700">Pending</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{receivedClaims.filter(c => c.statusType === 'rejected').length}</div>
            <div className="text-sm text-red-700">Rejected</div>
          </div>
        </div>
      </div>

      {/* Claims List */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Details</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Info</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Details</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{claim.id}</div>
                      <div className="text-sm text-gray-500">Submitted: {claim.submissionDate}</div>
                      <div className="text-sm text-gray-500">Via: {claim.submittedBy}</div>
                      <div className="flex items-center gap-2">
                        {claim.priority === 'High' && (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(claim.priority)}`}>
                            High Priority
                          </span>
                        )}
                        <span className="text-xs text-gray-500">{claim.documentCount} docs</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{claim.patientName}</div>
                      <div className="text-sm text-gray-500">ID: {claim.patientId}</div>
                      <div className="text-sm text-gray-500">Member: {claim.memberNumber}</div>
                      <div className="text-xs text-gray-500">{claim.medicalAidPlan}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-900">{claim.doctorName}</div>
                      <div className="text-sm text-gray-500">{claim.practiceName}</div>
                      <div className="text-sm text-gray-500">Service: {claim.serviceDate}</div>
                      <div className="text-xs text-gray-500">{claim.diagnosisCode} - {claim.diagnosisDescription}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(claim.statusType)}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim.statusType)}`}>
                          {claim.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{claim.currentStage}</div>
                      {claim.estimatedProcessingDays && (
                        <div className="text-xs text-blue-600">Est. {claim.estimatedProcessingDays} days</div>
                      )}
                      {claim.pendingReason && (
                        <div className="text-xs text-yellow-600">{claim.pendingReason}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-gray-900">{claim.claimAmount}</div>
                    {claim.isMaternity && (
                      <div className="text-xs text-purple-600 font-medium">Maternity Claim</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(claim.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadDocuments(claim.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        title="Download Documents"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50/80 px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredClaims.length)} of {filteredClaims.length} claims
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm bg-blue-50 border border-blue-200 rounded-lg">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceivedClaimsTab;
