import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './pages/Dashboard';
import { Chatbot } from './components/Chatbot';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

// Home Page Component
const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">SPIROLINK Chatbot Demo</h1>
        <p className="text-gray-300 mb-8">
          Click the green chat button in the bottom-right corner to start
          chatting with our AI assistant powered by ChatGPT.
        </p>

        {user ? (
          <div className="bg-green-900 rounded-lg p-6 mb-8">
            <p className="text-green-100">
              ✅ Logged in as: <strong>{user.email}</strong>
            </p>
            <a
              href="/dashboard"
              className="mt-4 inline-block px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
            >
              Go to Dashboard
            </a>
          </div>
        ) : (
          <div className="bg-blue-900 rounded-lg p-6 mb-8">
            <p className="text-blue-100 mb-4">You are not logged in</p>
            <div className="space-x-4">
              <a
                href="/signin"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
              >
                Sign Up
              </a>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold">Features</h2>
          <ul className="space-y-2 text-gray-300">
            <li>✅ Real-time chat with ChatGPT</li>
            <li>✅ User Authentication with Firebase</li>
            <li>✅ Secure backend API</li>
            <li>✅ Beautiful modern UI</li>
            <li>✅ Auto-scrolling messages</li>
            <li>✅ Error handling & loading states</li>
            <li>✅ Responsive design</li>
          </ul>
        </div>

        <div className="bg-blue-900 rounded-lg p-6 mt-8 text-sm">
          <h3 className="font-bold mb-2">Backend Status</h3>
          <p className="text-blue-200">
            Backend should be running on http://localhost:5000
          </p>
          <p className="text-blue-200 mt-2">
            Make sure you've added your OpenAI API key to
            <code className="bg-blue-800 px-2 py-1 rounded">
              chatbot-backend/.env
            </code>
          </p>
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
