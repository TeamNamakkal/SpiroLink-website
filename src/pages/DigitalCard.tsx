import { Mail, Phone, MapPin, Globe, Download } from 'lucide-react';

export default function DigitalCard() {
  const forceDownloadVCF = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const vcfUrl = "/assets/surendran-natarajan-nodalwire.vcf";
      const response = await fetch(vcfUrl, { cache: "no-store" });
      if (!response.ok) {
        alert("Contact file not found.");
        return;
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "surendran-natarajan-nodalwire.vcf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      alert("Unable to download contact.");
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-slate-100 py-12 px-4 flex items-center justify-center min-h-[calc(100vh-72px)]">
      <div className="w-full max-w-2xl">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-500"></div>

          {/* Card Content */}
          <div className="px-8 py-12 relative">
            {/* Logo/Avatar Area */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold -mt-16 shadow-lg">
                SN
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="text-4xl font-bold text-center text-slate-900 mb-2">
              Surendran Natarajan
            </h1>
            <p className="text-xl text-center text-blue-600 font-semibold mb-1">
              Founder | Principal Consultant
            </p>
            <p className="text-center text-slate-600 mb-8">
              NodalWire LLC
            </p>

            {/* Tagline */}
            <div className="text-center mb-8 pb-8 border-b border-slate-200">
              <p className="text-slate-700 italic">
                Intelligent Network Solutions
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 mb-8">
              {/* Email */}
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <a
                    href="mailto:n.surendran@nodalwire.com"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    n.surendran@nodalwire.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <a
                    href="tel:+16176804300"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    +1 617 680 4300
                  </a>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-600">Website</p>
                  <a
                    href="https://nodalwire.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    nodalwire.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-600">Location</p>
                  <p className="text-slate-900 font-medium">Plano, Texas, USA</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Add to Contacts Button */}
              <button
                onClick={forceDownloadVCF}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
                Add to Contacts
              </button>

              {/* Email Button */}
              <a
                href="mailto:n.surendran@nodalwire.com"
                className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                Email Me
              </a>
            </div>

            {/* Gmail Fallback (Mobile) */}
            <div className="mt-4 text-center">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=n.surendran@nodalwire.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Email via Gmail
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-8 py-6 text-center text-sm text-slate-600 border-t border-slate-200">
            <p>NodalWire LLC • Intelligent Network Solutions</p>
            <p className="mt-2">Scan QR code to share this contact</p>
          </div>
        </div>

        {/* QR Code Note */}
        <div className="text-center mt-12">
          <p className="text-slate-600 text-sm">
            Point your phone's camera at a QR code to add this contact instantly
          </p>
        </div>
      </div>
    </div>
  );
}
