import React, { useState } from 'react';
import { ArrowLeft, Inbox, Search, Eye } from 'lucide-react';

export default function ReceiverClerkTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const claims = [
    {
      id: 'CLM-2024-104',
      patient: 'Jane Doe',
      provider: 'City Medical Center',
      service: 'Emergency Visit',
      amount: '$320.00',
      priority: 'Urgent',
      timeAgo: '2 mins ago'
    },
    {
      id: 'CLM-2024-105',
      patient: 'Robert Kim',
      provider: 'Wellness Clinic',
      service: 'Routine Checkup',
      amount: '$150.00',
      priority: 'Standard',
      timeAgo: '15 mins ago'
    },
    {
      id: 'CLM-2024-106',
      patient: 'Maria Garcia',
      provider: 'Specialty Care',
      service: 'Specialist Consultation',
      amount: '$680.00',
      priority: 'Standard',
      timeAgo: '1 hour ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="flex items-center text-gray-600 hover:text-gray-900 mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Claims Department Portal</h1>
                <p className="text-sm text-gray-500">MedAid Administrative Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 border-blue-500 text-blue-600 whitespace-nowrap font-medium">
              Receiver Clerk
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
              Batch Clerk
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
              Pre-Accessor
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap">
              Manual Accessor
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Section Header */}
          <div className="flex items-center mb-6">
            <Inbox className="w-6 h-6 text-gray-600 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Incoming Claims Queue</h2>
              <p className="text-sm text-gray-600">Review and categorize newly received claims</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search claims..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Filter by priority</option>
              <option value="urgent">Urgent</option>
              <option value="standard">Standard</option>
            </select>
          </div>

          {/* Claims List */}
          <div className="space-y-4">
            {claims.map((claim) => (
              <div key={claim.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">{claim.id}</h3>
                      <span className="font-medium text-gray-900">{claim.patient}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        claim.priority === 'Urgent' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {claim.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span>{claim.provider}</span>
                      <span>{claim.service}</span>
                      <span className="text-gray-500">{claim.timeAgo}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-gray-900">{claim.amount}</span>
                    <button className="flex items-center px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </button>
                    <button className="px-4 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-800">
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}