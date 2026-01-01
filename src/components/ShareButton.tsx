import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link2, X } from 'lucide-react';

export function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const pageTitle = typeof document !== 'undefined' ? document.title : 'SPIROLINK';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(currentUrl)}`,
  };

  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(currentUrl);
      setIsOpen(false);
      return;
    }

    const url = shareLinks[platform as keyof typeof shareLinks];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200"
        aria-label="Share"
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-slate-200 z-50 min-w-max">
          <div className="p-2">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 mb-2">
              <span className="font-semibold text-slate-900">Share on</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => handleShare('facebook')}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded transition"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="text-slate-700">Facebook</span>
            </button>

            <button
              onClick={() => handleShare('twitter')}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded transition"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
              <span className="text-slate-700">Twitter</span>
            </button>

            <button
              onClick={() => handleShare('linkedin')}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded transition"
            >
              <Linkedin className="w-5 h-5 text-blue-700" />
              <span className="text-slate-700">LinkedIn</span>
            </button>

            <button
              onClick={() => handleShare('email')}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded transition"
            >
              <Mail className="w-5 h-5 text-slate-600" />
              <span className="text-slate-700">Email</span>
            </button>

            <div className="border-t border-slate-200 my-2"></div>

            <button
              onClick={() => handleShare('copy')}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded transition"
            >
              <Link2 className="w-5 h-5 text-slate-600" />
              <span className="text-slate-700">Copy Link</span>
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
