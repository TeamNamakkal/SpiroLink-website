import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Contact() {
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
      setErrorMessage('Please fill in all required fields');
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would send this data to your backend
      console.log('Form data:', formData);

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', serviceType: 'general' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setErrorMessage('Failed to send message. Please try again.');
      setStatus('error');
    }
  };

  return (
    <>
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Get In Touch</h1>
          <p className="text-xl text-slate-700">
            Have a project in mind? We'd love to hear from you. Let's build something amazing
            together.
          </p>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Mail,
              title: 'Email',
              detail: 'hello@spirolink.com',
              link: 'mailto:hello@spirolink.com',
            },
            {
              icon: Phone,
              title: 'Phone',
              detail: '(555) 123-4567',
              link: 'tel:+15551234567',
            },
            {
              icon: MapPin,
              title: 'Office',
              detail: 'Namakkal, Tamil Nadu',
              link: '#',
            },
          ].map((contact, i) => (
            <Card key={i}>
              <CardContent className="text-center">
                <contact.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{contact.title}</h3>
                <a
                  href={contact.link}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {contact.detail}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading title="Send us a Message" centered={true} />
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-slate-900 mb-2">
                Service Type *
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
              >
                <option value="general">General Inquiry</option>
                <option value="pon-ftth">PON & FTTH Network Planning</option>
                <option value="microwave">Microwave Network Design</option>
                <option value="optical">Long-Haul Optical Networks</option>
                <option value="wifi">Enterprise Wi-Fi Network Planning</option>
                <option value="consultation">Technical Consultation</option>
                <option value="quote">Request a Quote</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none resize-none"
                placeholder="Tell us about your project or requirements..."
                required
              ></textarea>
            </div>

            {status === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you! We've received your message and will get back to you soon with a quote or proposal.
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

      <Section className="bg-white">
        <SectionHeading title="Response Time" centered={true} />
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-slate-600 mb-4">
            We typically respond to inquiries within 24 hours during business hours. For urgent
            matters, please call us directly.
          </p>
        </div>
      </Section>
    </>
  );
}
