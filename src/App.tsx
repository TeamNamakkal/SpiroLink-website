import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n/I18nProvider';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Chatbot from './components/Chatbot';
import NetworkBackground from './components/NetworkBackground';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import Services from './pages/Services';
import PonFtth from './pages/PonFtth';
import MicrowaveNetwork from './pages/MicrowaveNetwork';
import OpticalLongHaul from './pages/OpticalLongHaul';
import WifiNetwork from './pages/WifiNetwork';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter>
          <NetworkBackground />
          <div className="flex flex-col min-h-screen relative z-[5]">
            <Header />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pon-ftth" element={<PonFtth />} />
                <Route path="/microwave-network" element={<MicrowaveNetwork />} />
                <Route path="/optical-long-haul" element={<OpticalLongHaul />} />
                <Route path="/wifi-network" element={<WifiNetwork />} />
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
