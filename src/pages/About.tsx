import { Section } from '../components/ui/Section';

export default function About() {
  return (
    <>
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">About SPIROLINK</h1>
          <p className="text-xl text-slate-700 mb-8">
            Coming Soon
          </p>
          <div className="mt-12">
            <p className="text-slate-600 text-lg">
              We're currently working on sharing our story. Stay tuned for more information about our team, mission, and values!
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
