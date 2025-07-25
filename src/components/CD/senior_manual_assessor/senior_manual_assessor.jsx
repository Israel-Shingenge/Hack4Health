import React, { useState } from 'react';
import { AlertTriangle, Clock, FileText, User, DollarSign, Calendar } from 'lucide-react';

const SeniorManualAssessorTab = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);

  // Sample complex claims requiring senior assessment
  const [complexClaims] = useState([
    {
      id: 'CLM-2024-401',
      patientName: 'Robert Martinez',
      patientId: 'P00007',
      memberNumber: 'MS987654',
      claimAmount: 'R285,000.00',
      priority: 'Critical',
      complexityLevel: 'Very High',
      assignedDate: '2024-01-20',
      timeLimit: '48 hours',
      remainingTime: '18 hours',
      diagnosisCode: 'C78.7',
      diagnosisDescription: 'Secondary malignant neoplasm of liver and intrahepatic bile duct',
      doctorName: 'Dr. Michael Rodriguez',
      practiceName: 'Oncology Specialists Institute',
      medicalAidPlan: 'Discovery Health Medical Scheme - Executive',
      serviceDate: '2024-01-15',
      reviewReason: 'Experimental cancer treatment protocol, high-cost oncology procedures',
      previousClaims: 5,
      totalYearAmount: 'R1,250,000.00',
      benefitLimit: 'R2,000,000.00',
      documentsCount: 15,
      requiredApprovals: ['Medical Director', 'Oncology Specialist Review'],
      riskLevel: 'High',
      status: 'Under Review'
    },
    {
      id: 'CLM-2024-402',
      patientName: 'Jennifer Thompson',
      patientId: 'P00008',
      memberNumber: 'MS456123',
      claimAmount: 'R450,000.00',
      priority: 'Critical',
      complexityLevel: 'Very High',
      assignedDate: '2024-01-19',
      timeLimit: '72 hours',
      remainingTime: '28 hours',
      diagnosisCode: 'Q20.4',
      diagnosisDescription: 'Double outlet right ventricle',
      doctorName: 'Dr. Sarah Kim',
      practiceName: 'Pediatric Cardiac Surgery Center',
      medicalAidPlan: 'Medihelp Medical Scheme - Prime Plus',
      serviceDate: '2024-01-12',
      reviewReason: 'Complex pediatric cardiac surgery, multiple procedures, international specialist consultation',
      previousClaims: 2,
      totalYearAmount: 'R850,000.00',
      benefitLimit: 'R1,500,000.00',
      documentsCount: 22,
      requiredApprovals: ['Medical Director', 'Pediatric Cardiac Specialist', 'International Review'],
      riskLevel: 'Critical',
      status: 'Pending Specialist Review'
    },
    {
      id: 'CLM-2024-403',
      patientName: 'David Chen',
      patientId: 'P00009',
      memberNumber: 'MS789456',
      claimAmount: 'R125,000.00',
      priority: 'High',
      complexityLevel: 'High',
      assignedDate: '2024-01-21',
      timeLimit: '24 hours',
      remainingTime: '8 hours',
      diagnosisCode: 'G93.1',
      diagnosisDescription: 'Anoxic brain damage, not elsewhere classified',
      doctorName: 'Dr. Lisa Park',
      practiceName: 'Neurological Rehabilitation Institute',
      medicalAidPlan: 'GEMS Medical Scheme - Emerald Executive',
      serviceDate: '2024-01-18',
      reviewReason: 'Long-term neurological rehabilitation, disputed medical necessity',
      previousClaims: 8,
      totalYearAmount: 'R675,000.00',
      benefitLimit: 'R800,000.00',
      documentsCount: 12,
      requiredApprovals: ['Medical Director', 'Neurologist Review'],
      riskLevel: 'Medium',
      status: 'Medical Review Required'
    }
  ]);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTimeColor = (remaining) => {
    const hours = parseInt(remaining);
    if (hours <= 8) return 'text-red-600';
    if (hours <= 24) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900">Senior Manual Assessor</h2>
        </div>
        <p className="text-gray-600">High-complexity and critical claims requiring senior medical review</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Critical Cases</p>
              <p className="text-2xl font-bold text-red-700">{complexClaims.filter(c => c.priority === 'Critical').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">High Priority</p>
              <p className="text-2xl font-bold text-orange-700">{complexClaims.filter(c => c.priority === 'High').length}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Value</p>
              <p className="text-2xl font-bold text-blue-700">R860K</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Avg. Review Time</p>
              <p className="text-2xl font-bold text-green-700">32h</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Claims List */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Assigned Complex Claims</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {complexClaims.map((claim) => (
            <div
              key={claim.id}
              className={`p-6 hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer ${
                selectedClaim?.id === claim.id ? 'bg-blue-50/50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => setSelectedClaim(claim)}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Main Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="text-lg font-semibold text-gray-900">{claim.id}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(claim.priority)}`}>
                      {claim.priority} Priority
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(claim.riskLevel)}`}>
                      {claim.riskLevel} Risk
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{claim.patientName}</p>
                      <p className="text-gray-600">ID: {claim.patientId}</p>
                      <p className="text-gray-600">Member: {claim.memberNumber}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Medical Details</p>
                      <p className="text-gray-600">{claim.diagnosisCode}</p>
                      <p className="text-gray-600 text-xs">{claim.diagnosisDescription}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Provider</p>
                      <p className="text-gray-600">{claim.doctorName}</p>
                      <p className="text-gray-600 text-xs">{claim.practiceName}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Review Reason:</span> {claim.reviewReason}
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-600">Documents:</span>
                      <span className="ml-1 font-medium">{claim.documentsCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Previous Claims:</span>
                      <span className="ml-1 font-medium">{claim.previousClaims}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">YTD Total:</span>
                      <span className="ml-1 font-medium">{claim.totalYearAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Amount & Timeline */}
                <div className="lg:text-right space-y-2">
                  <div className="text-2xl font-bold text-gray-900">{claim.claimAmount}</div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-600">Time Limit:</span>
                      <span className="ml-1 font-medium">{claim.timeLimit}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Remaining:</span>
                      <span className={`ml-1 font-medium ${getTimeColor(claim.remainingTime)}`}>
                        {claim.remainingTime}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Assigned: {claim.assignedDate}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-blue-600 font-medium">{claim.status}</span>
                  </div>
                </div>
              </div>

              {/* Required Approvals */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-600 font-medium">Required Approvals:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {claim.requiredApprovals.map((approval, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {approval}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Review Panel */}
      {selectedClaim && (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Detailed Review - {selectedClaim.id}
            </h3>
            <button
              onClick={() => setSelectedClaim(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Review Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senior Assessment Notes
                </label>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter detailed senior assessment notes, risk analysis, and recommendations..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Decision
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select final decision</option>
                  <option>Approve Full Amount</option>
                  <option>Approve Partial Amount</option>
                  <option>Deny - Medical Necessity</option>
                  <option>Deny - Benefit Exclusion</option>
                  <option>Escalate to Medical Director</option>
                  <option>Request Additional Specialist Review</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approved Amount (if applicable)
                </label>
                <input
                  type="text"
                  placeholder="R 0.00"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Claim Summary */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Benefit Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Limit:</span>
                    <span className="font-medium">{selectedClaim.benefitLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Used YTD:</span>
                    <span className="font-medium">{selectedClaim.totalYearAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-medium text-green-600">
                      R{(parseFloat(selectedClaim.benefitLimit.replace(/[R,]/g, '')) - 
                         parseFloat(selectedClaim.totalYearAmount.replace(/[R,]/g, ''))).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">This Claim:</span>
                    <span className="font-medium">{selectedClaim.claimAmount}</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">Risk Factors</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• High-cost experimental treatment</li>
                  <li>• Multiple previous claims this year</li>
                  <li>• Approaching annual benefit limit</li>
                  <li>• Requires specialist approval</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t">
            <button className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Request More Information
            </button>
            <button className="px-6 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
              Consult Medical Director
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Submit Final Decision
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeniorManualAssessorTab;
