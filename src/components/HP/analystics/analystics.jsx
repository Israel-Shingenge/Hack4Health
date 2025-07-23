import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function HealthcarePortal() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Page</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content - Analytics Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Claims This Month */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Claims This Month</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">142</div>
            <div className="text-sm text-green-600">+12% from last month</div>
          </div>

          {/* Approval Rate */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Approval Rate</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">94%</div>
            <div className="text-sm text-green-600">+2% from last month</div>
          </div>

          {/* Avg Processing Time */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Avg Processing Time</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">1.8 days</div>
            <div className="text-sm text-green-600">-0.5 days improvement</div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Revenue</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">$28,450</div>
            <div className="text-sm text-green-600">+8% from last month</div>
          </div>
        </div>
      </div>
    </div>
  );
}