import { Section } from '../components/ui/Section';

export default function Terms() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-6 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">Terms & Conditions</h1>
          <p className="text-base text-slate-300 tracking-tight">Last updated: December 2025</p>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-slate-50 to-white prose prose-slate max-w-none">
        <div className="max-w-4xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Terms</h2>
            <p className="text-slate-700">
              By accessing this website, you are agreeing to be bound by these website Terms and
              Conditions of Use, all applicable laws and regulations, and agree that you are
              responsible for compliance with any applicable local laws.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Use License</h2>
            <p className="text-slate-700 mb-4">
              Permission is granted to temporarily download one copy of the materials (information
              or software) on NODALWIRE's website for personal, non-commercial transitory viewing
              only. This is the grant of a license, not a transfer of title, and under this license
              you may not:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>
                Attempting to decompile, disassemble, or reverse engineer any software contained on
                the website
              </li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>
                Transferring the materials to another person or "mirroring" the materials on any
                other server
              </li>
              <li>Violating any applicable laws or regulations related to access to the Service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Disclaimer</h2>
            <p className="text-slate-700">
              The materials on NODALWIRE's website are provided on an 'as is' basis. NODALWIRE
              makes no warranties, expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of intellectual
              property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Limitations</h2>
            <p className="text-slate-700">
              In no event shall NODALWIRE or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on
              NODALWIRE's website.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Accuracy of Materials</h2>
            <p className="text-slate-700">
              The materials appearing on NODALWIRE's website could include technical,
              typographical, or photographic errors. NODALWIRE does not warrant that any of the
              materials on the website are accurate, complete, or current. NODALWIRE may make
              changes to the materials contained on the website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Links</h2>
            <p className="text-slate-700">
              NODALWIRE has not reviewed all of the sites linked to its website and is not
              responsible for the contents of any such linked site. The inclusion of any link does
              not imply endorsement by NODALWIRE of the site. Use of any such linked website is
              at the user's own risk.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Modifications</h2>
            <p className="text-slate-700">
              NODALWIRE may revise these terms of service for the website at any time without
              notice. By using this website, you are agreeing to be bound by the then current
              version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Governing Law</h2>
            <p className="text-slate-700">
              These terms and conditions are governed by and construed in accordance with the laws
              of the United States of America, and you irrevocably submit to the exclusive
              jurisdiction of the courts in that location.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">9. Contact Information</h2>
            <p className="text-slate-700">
              If you have any questions about these Terms & Conditions, please contact us at
              hello@nodalwire.com
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
