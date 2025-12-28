import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';

export default function Projects() {
  return (
    <>
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Our Portfolio</h1>
          <p className="text-xl text-slate-700 mb-8">
            Coming Soon
          </p>
          <div className="mt-12">
            <p className="text-slate-600 text-lg mb-8">
              We're working on showcasing our latest projects. Our portfolio will be updated soon with detailed case studies and examples of our work!
            </p>
            <Link to="/contact">
              <Button>Discuss Your Project</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
