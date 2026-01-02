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
      {/* START: PON & FTTH MODULE - RESOURCES PAGE */}
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Resources & Tools</h1>
          <p className="text-xl text-slate-700">
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
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloadItems.map((item: DownloadItem) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                <button
                  onClick={() => handleDownloadClick(item)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>
      {/* END: PON & FTTH MODULE - RESOURCES PAGE */}

      {/* Email Gate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Download File</h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-slate-600 mb-6">
              Enter your email to download <span className="font-semibold">{selectedFile?.title}</span>
            </p>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
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
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {emailError && (
                <p className="text-red-600 text-sm mt-2">{emailError}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmDownload}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Download
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

            <p className="text-slate-500 text-xs mt-4 text-center">
              We respect your privacy. Your email will only be used to track resource downloads and send occasional updates.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
