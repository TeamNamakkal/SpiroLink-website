import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export default function Services() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              Services Dashboard
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Sign in to access your services dashboard
            </p>
            
            <div className="space-y-4">
              <Link to="/signin" className="block">
                <button className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg">
                  Sign In
                </button>
              </Link>
              <Link to="/signup" className="block">
                <button className="w-full px-6 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold rounded-lg transition-all">
                  Create Account
                </button>
              </Link>
              <Link to="/" className="block">
                <button className="w-full px-6 py-3 text-gray-700 hover:bg-gray-100 font-semibold rounded-lg transition-all">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome, {user?.email?.split('@')[0]}!
              </h1>
              <p className="text-gray-600">
                Services Dashboard
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>

          <div className="border-t pt-6">
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-semibold">User ID:</span> {user?.uid?.slice(0, 16)}...
            </p>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🏠</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Go Home</h3>
                  <p className="text-gray-600 text-sm">Return to home page</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/contact">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📧</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
                  <p className="text-gray-600 text-sm">Get in touch with our team</p>
                </div>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <div className="flex items-center gap-4">
              <div className="text-3xl">⚙️</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Settings</h3>
                <p className="text-gray-600 text-sm">Coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-2">👋 Welcome</h3>
            <p className="text-blue-800">
              You are now logged in to your services dashboard. Use the navigation above to access different features.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-bold text-green-900 mb-2">✓ Status</h3>
            <p className="text-green-800">
              Your account is active and ready to use. All services are available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
