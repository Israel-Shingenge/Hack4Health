import { Building2, Users, TrendingUp, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-700 mb-6">
            Automated Claim Processing System
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Streamline medical claim processing with intelligent automation, validation, and 
            workflow optimization for healthcare providers and claims departments.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Healthcare Provider Portal */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <Building2 className="w-8 h-8 text-gray-600 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-1">Healthcare Provider Portal</h2>
                <p className="text-gray-500">For hospitals and medical practices</p>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                Claim Submission
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                Real-time Validation
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                Status Tracking
              </span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Submit claims, track processing status, receive instant validation 
              feedback, and manage patient eligibility checks.
            </p>

            <button
              className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              onClick={() => navigate('/hp-portal')}
            >
              Access Provider Portal
            </button>
          </div>

          {/* Claims Department Portal */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-gray-600 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-1">Claims Department Portal</h2>
                <p className="text-gray-500">For medical aid administrators</p>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                Batch Processing
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                Manual Review
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                Analytics
              </span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Process claims efficiently with role-based workflows for receivers, batch 
              clerks, pre-accessors, and manual accessors.
            </p>

            <button
              className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              onClick={() => navigate('/cd-portal')}
            >
              Access Claims Portal
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Processing Time */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">Processing Time</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-4xl font-bold text-gray-700 mb-2">2.3 hrs</div>
            <p className="text-gray-500">Average claim processing time</p>
          </div>

          {/* Auto-Approval Rate */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">Auto-Approval Rate</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-4xl font-bold text-gray-700 mb-2">87%</div>
            <p className="text-gray-500">Claims processed automatically</p>
          </div>

          {/* Active Claims */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700">Active Claims</h3>
              <Users2 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-4xl font-bold text-gray-700 mb-2">1,247</div>
            <p className="text-gray-500">Currently in processing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
