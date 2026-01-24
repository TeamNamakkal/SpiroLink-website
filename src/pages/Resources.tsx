import { useState } from 'react';
import { Download, X } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  file: string;
  icon: string;
}

const downloadItems: DownloadItem[] = [
  {
    id: '1',
    title: 'PON Technology Guide',
    description: 'Comprehensive guide on Passive Optical Network technology, architecture, and best practices for deployment.',
    file: '/public/assets/downloads/Choosing_the_Right_PON_Technology.txt',
    icon: '📄',
  },
  {
    id: '2',
    title: 'FTTH Network Planning',
    description: 'Essential guide for planning Fiber-to-the-Home networks with cost optimization and coverage analysis.',
    file: '/public/assets/downloads/FTTH_Network_Planning_Best_Practices.txt',
    icon: '🗺️',
  },
  {
    id: '3',
    title: 'FTTH Project Essentials',
    description: 'Step-by-step guide covering all aspects of FTTH project planning, implementation, and management.',
    file: '/public/assets/downloads/FTTH_Project_Planning_Essentials.txt',
    icon: '📋',
  },
  {
    id: '4',
    title: 'Cost Estimation Tool',
    description: 'Practical tools and methodologies for calculating cost per home passed in fiber network deployments.',
    file: '/public/assets/downloads/Cost_Per_Home_Passed_Estimator.txt',
    icon: '💰',
  },
  {
    id: '5',
    title: 'Grant Application Guide',
    description: 'Technical documentation package for preparing government grant applications for broadband infrastructure projects.',
    file: '/public/assets/downloads/Grant_Application_Technical_Documentation.txt',
    icon: '📑',
  },
];

export default function Resources() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState<DownloadItem | null>(null);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleDownloadClick = (item: DownloadItem) => {
    setSelectedFile(item);
    setShowModal(true);
    setEmailError('');
    setEmail('');
  };

  const handleConfirmDownload = () => {
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (selectedFile) {
      console.log('Download tracked:', {
        email: email,
        file: selectedFile.title,
        fileName: selectedFile.file,
        time: new Date().toISOString(),
      });

      const link = document.createElement('a');
      link.href = selectedFile.file;
      link.download = selectedFile.file.split('/').pop() || 'download';
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShowModal(false);
      setEmail('');
      setSelectedFile(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail('');
    setEmailError('');
    setSelectedFile(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirmDownload();
    }
  };

  return (
    <>
      {/* START: Resources Page - Modern Premium Design */}
      <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-40 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-cyan-500/10 pointer-events-none" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-full border border-cyan-400/30 text-sm font-semibold text-cyan-300 mb-6">
            📚 Knowledge & Tools
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Resources & Tools
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Download essential guides, tools, and documentation for broadband infrastructure planning and deployment
          </p>
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading 
          title="Download Resources" 
          subtitle="Essential tools and guides for network planning"
          centered={true}
        />
        <div className="max-w-5xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {downloadItems.map((item: DownloadItem) => (
              <div
                key={item.id}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-cyan-400/50 transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:-translate-y-1">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">{item.description}</p>
                  <button
                    onClick={() => handleDownloadClick(item)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    style={{ backgroundColor: '#0C94CE' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a7aa0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C94CE'}
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* END: PON & FTTH MODULE - RESOURCES PAGE */}

      {/* Email Gate Modal - Premium Design */}
      {showModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/50 to-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-sky-50 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Download Resource</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-slate-600 mb-6 leading-relaxed">
                Enter your email to download <span className="font-bold text-slate-900">{selectedFile?.title}</span>
              </p>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-3"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': '#0C94CE' } as any}
                />
                {emailError && (
                  <p className="text-red-600 text-sm mt-2 font-medium">{emailError}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleConfirmDownload}
                  className="flex-1 text-white font-bold py-3 rounded-lg transition-all shadow-lg"
                  style={{ backgroundColor: '#0C94CE', boxShadow: '0 10px 15px -3px rgba(12, 148, 206, 0.3)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a7aa0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C94CE'}
                >
                  Download Now
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>

              <p className="text-slate-500 text-xs mt-6 text-center leading-relaxed">
                We respect your privacy. Your email will only be used to track resource downloads.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
