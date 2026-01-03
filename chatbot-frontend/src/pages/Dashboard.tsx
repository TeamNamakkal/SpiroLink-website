import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logout, getUserProfile } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      loadUserProfile();
    }
  }, [user, loading]);

  const loadUserProfile = async () => {
    try {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User size={32} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome, {userProfile?.name || user.email}!
              </h2>
              <p className="text-gray-600">
                You are successfully logged in to SpiroLink
              </p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* User Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-900 font-semibold">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">User ID</label>
                <p className="text-gray-900 font-semibold text-sm break-all">{user.uid}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-gray-900 font-semibold">{userProfile?.name || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-gray-900 font-semibold">{userProfile?.phone || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-gray-700">Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-800">
                  ✓ Active
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="text-gray-700">Role</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-800">
                  {userProfile?.role || 'User'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Member Since</span>
                <span className="text-gray-900 font-semibold">
                  {userProfile?.createdAt 
                    ? new Date(userProfile.createdAt.toDate()).toLocaleDateString() 
                    : 'Today'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/"
              className="p-4 text-center border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-gray-700 font-medium"
            >
              Home
            </a>
            <a
              href="/services"
              className="p-4 text-center border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-gray-700 font-medium"
            >
              Services
            </a>
            <a
              href="/resources"
              className="p-4 text-center border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-gray-700 font-medium"
            >
              Resources
            </a>
            <a
              href="/contact"
              className="p-4 text-center border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-gray-700 font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
