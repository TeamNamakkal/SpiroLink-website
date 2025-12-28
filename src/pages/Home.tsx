import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Section, SectionHeading } from '../components/ui/Section';
import StayTuned from '../components/StayTuned';

export default function Home() {

  return (
    <>
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Innovative & Sustainable Digital Solutions
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              GreenFluxion transforms your vision into powerful digital products. We build modern,
              scalable solutions that drive growth and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/projects">
                <Button>
                  View Our Work <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Get In Touch</Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <StayTuned title="Stay Tuned" subtitle="This dashboard is under development." />
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          title="Why Choose GreenFluxion"
          subtitle="Stay Tuned"
          centered={true}
        />
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg mb-6">We're preparing more information about our unique advantages. Check back soon!</p>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading title="Featured Projects" subtitle="Coming Soon" centered={true} />
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg mb-6">We're working on some amazing projects. Check back soon!</p>
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Upcoming Soon"
          centered={true}
        />
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg mb-6">Client testimonials coming soon!</p>
        </div>
      </Section>

      <Section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-32">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Ideas?</h2>
          <p className="text-xl mb-12 text-green-50">
            Let's build something amazing together. Get in touch today.
          </p>
          <Link to="/contact">
            <Button className="text-green-600 hover:bg-gray-50 shadow-lg hover:shadow-xl px-8 py-4 text-lg font-semibold">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
