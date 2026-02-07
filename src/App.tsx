import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './i18n/I18nProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Chatbot from './components/Chatbot';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import Services from './pages/Services';
import PonFtth from './pages/PonFtth';
import MicrowaveNetwork from './pages/MicrowaveNetwork';
import OpticalLongHaul from './pages/OpticalLongHaul';
import WifiNetwork from './pages/WifiNetwork';
import RemotePropertyConnectivity from './pages/RemotePropertyConnectivity';
import EngineeringCommunicationLabs from './pages/EngineeringCommunicationLabs';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
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
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen relative z-[5]">
            <Header />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/services" element={<Services />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/pon-ftth" element={<PonFtth />} />
                <Route path="/microwave-network" element={<MicrowaveNetwork />} />
                <Route path="/optical-long-haul" element={<OpticalLongHaul />} />
                <Route path="/wifi-network" element={<WifiNetwork />} />
                <Route path="/remote-property-connectivity" element={<RemotePropertyConnectivity />} />
                <Route path="/engineering-communication-labs" element={<EngineeringCommunicationLabs />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  );
}
