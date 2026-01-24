import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PRIMARY_COLOR = '#0EA5E9';

export default function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Welcome, {user?.email || 'User'}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Profile</h2>
          
          <div className="space-y-6">
            {/* Email Section */}
            <div className="border-b border-gray-200 pb-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Email Address</p>
              <p className="text-lg text-gray-900">{user?.email || 'Not available'}</p>
            </div>

            {/* User ID Section */}
            <div className="border-b border-gray-200 pb-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">User ID</p>
              <p className="text-lg text-gray-900 font-mono text-sm">{user?.uid?.slice(0, 24) || 'Not available'}...</p>
            </div>

            {/* Account Status */}
            <div className="pb-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Account Status</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm font-semibold text-green-700">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
