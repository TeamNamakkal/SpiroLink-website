import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';

export default function Projects() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-indigo-500/10 pointer-events-none" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-6 bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Our Projects</h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Transforming telecommunications infrastructure with innovative network solutions
          </p>
          <div className="mt-16">
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              Exciting projects coming soon. We're building innovative network solutions for major telecom providers and enterprises.
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
