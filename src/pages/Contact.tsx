import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { useI18n } from '../i18n/I18nProvider';

export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: 'general',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage(t('contactFormErrorRequired') || 'Please fill in all required fields');
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(t('contactFormErrorEmail') || 'Please enter a valid email');
      setStatus('error');
      return;
    }

    try {
      // Use relative path for unified deployment
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', serviceType: 'general' });
      
      // Log success
      console.log('✅ Message sent successfully:', formData);
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('❌ Error sending email:', err);
      setErrorMessage(
        err instanceof Error ? err.message : (t('contactFormErrorSubmit') || 'Failed to send message. Please try again.')
      );
      setStatus('error');
    }
  };

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-40 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-cyan-500/10 pointer-events-none" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-full border border-cyan-400/30 text-sm font-semibold text-cyan-300 mb-6">
              💬 Get in Touch
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent mb-6 text-center">
            {t('contactPageTitle')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto text-center">
            {t('contactPageDescription')}
          </p>
        </div>
      </Section>

      <Section className="bg-white px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Contact Information" subtitle="Multiple ways to reach us" centered={true} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
          {[
            {
              icon: Mail,
              title: 'Email',
              detail: 'contact@nodalwire.com',
              link: 'mailto:contact@nodalwire.com',
              color: 'from-cyan-50'
            },
            {
              icon: Phone,
              title: 'Phone',
              detail: '+1 (617) 680-4300',
              link: 'tel:+15551234567',
              color: 'from-sky-50'
            },
            {
              icon: MapPin,
              title: 'Office',
              detail: '9300 coit RD,APT 214,Plano,TX-75025',
              link: '#',
              color: 'from-cyan-50'
            },
          ].map((contact, i) => (
            <div key={i} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-sky-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className={`relative p-8 bg-gradient-to-br ${contact.color} to-slate-100 rounded-xl border border-slate-200 hover:border-sky-400/50 text-center transition-all duration-300 h-full flex flex-col items-center hover:shadow-md hover:-translate-y-0.5`}>
                <contact.icon className="w-12 h-12 mb-4" style={{ color: '#0C94CE' }} />
                <h3 className="font-bold text-slate-900 mb-2">{contact.title}</h3>
                <a
                  href={contact.link}
                  className="font-medium transition-colors"
                  style={{ color: '#0C94CE' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#0a7aa0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#0C94CE'}
                >
                  {contact.detail}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Send us a Message" subtitle="We'll respond within 24 hours" centered={true} dark={true} />
        <div className="max-w-2xl mx-auto mt-12 md:mt-16">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2.5 tracking-tight">
                  {t('contactFormNameLabel')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all duration-200"
                  placeholder={t('contactFormNamePlaceholder')}
                  required
                  style={{ '--tw-ring-color': '#0C94CE' } as any}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2.5 tracking-tight">
                  {t('contactFormEmailLabel')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all duration-200"
                  placeholder={t('contactFormEmailPlaceholder')}
                  required
                  style={{ '--tw-ring-color': '#0C94CE' } as any}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2.5 tracking-tight">
                {t('contactFormPhoneLabel')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                placeholder={t('contactFormPhonePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-semibold text-white mb-2.5 tracking-tight">
                {t('contactFormServiceLabel')} *
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="general">General Inquiry</option>
                <option value="pon-ftth">PON & FTTH</option>
                <option value="microwave">Microwave Network</option>
                <option value="optical">Optical Long Haul</option>
                <option value="wifi">Wi-Fi Network</option>
                <option value="consultation">Consultation</option>
                <option value="quote">Request Quote</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-white mb-3">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-transparent outline-none resize-none transition-all"
                placeholder={t('contactFormMessagePlaceholder')}
                required
                style={{ '--tw-ring-color': '#0C94CE' } as any}
              ></textarea>
            </div>

            {status === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                {t('contactFormSuccessMessage')}
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg">{errorMessage}</div>
            )}

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full"
              size="lg"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </Section>

      <Section className="bg-white px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Response Commitment" centered={true} />
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">
            We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our office directly.
          </p>
        </div>
      </Section>
    </>
  );
}
