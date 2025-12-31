 import { Section } from '../components/ui/Section';

export default function Privacy() {
  return (
    <>
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-lg text-slate-700">Last updated: December 2024</p>
      </Section>

      <Section className="bg-white prose prose-slate max-w-none">
        <div className="max-w-4xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-700 mb-4">
              SPIROLINK ("we", "our", or "us") operates the spirolink.com website (the
              "Service"). This page informs you of our policies regarding the collection, use, and
              disclosure of personal data when you use our Service and the choices you have
              associated with that data.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Information Collection and Use</h2>
            <p className="text-slate-700 mb-4">We collect several different types of information:</p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>
                <strong>Contact Information:</strong> When you submit the contact form, we collect
                your name, email, phone number, and message.
              </li>
              <li>
                <strong>Usage Data:</strong> We may collect information on how the Service is
                accessed and used ("Usage Data").
              </li>
              <li>
                <strong>Cookies and Tracking:</strong> We use cookies and similar tracking
                technologies to track activity on our Service.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Use of Data</h2>
            <p className="text-slate-700 mb-4">SPIROLINK uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer care and support</li>
              <li>To gather analysis or valuable information for improvement</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Security of Data</h2>
            <p className="text-slate-700">
              The security of your data is important to us, but remember that no method of
              transmission over the Internet or method of electronic storage is 100% secure. While
              we strive to use commercially acceptable means to protect your personal data, we
              cannot guarantee its absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Changes to This Privacy Policy</h2>
            <p className="text-slate-700">
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last updated" date
              at the top of this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
            <p className="text-slate-700">
              If you have any questions about this Privacy Policy, please contact us at
              hello@spirolink.com
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
