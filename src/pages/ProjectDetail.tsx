import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// Mock project data matching the Projects page
const mockProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform Redesign',
    description: 'Modern, scalable e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics.',
    problem_statement: 'The client\'s legacy e-commerce platform was slow, outdated, and losing customers to competitors.',
    solution: 'We built a modern, responsive platform using React and Node.js with advanced features including real-time inventory, secure payments, and comprehensive analytics.',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'AWS'],
  },
  {
    id: '2',
    title: 'FinTech Dashboard',
    description: 'Real-time financial analytics dashboard with advanced data visualization, portfolio tracking, and risk management tools.',
    problem_statement: 'Manual portfolio tracking and lack of real-time insights were hindering investment decisions.',
    solution: 'Created an interactive dashboard with D3.js visualizations, real-time data feeds, and machine learning-powered recommendations.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    technologies: ['TypeScript', 'D3.js', 'AWS', 'Machine Learning', 'Python', 'PostgreSQL'],
  },
  {
    id: '3',
    title: 'Healthcare Mobile App',
    description: 'Patient management system with secure data handling, appointment scheduling, and HIPAA compliance features.',
    problem_statement: 'Healthcare providers needed a modern system for patient management with strict compliance requirements.',
    solution: 'Developed a React Native app with end-to-end encryption, HIPAA-compliant architecture, and seamless appointment management.',
    image_url: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&h=400&fit=crop',
    technologies: ['React Native', 'Firebase', 'Python', 'TensorFlow', 'OAuth 2.0'],
  },
  {
    id: '4',
    title: 'AI-Powered Content Platform',
    description: 'Content management system with AI-powered recommendations, SEO optimization, and multi-language support.',
    problem_statement: 'Managing diverse content and optimizing it for search engines was time-consuming and inconsistent.',
    solution: 'Built a Next.js-based CMS with integrated AI for content recommendations, automatic SEO optimization, and multi-language support.',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=400&fit=crop',
    technologies: ['Next.js', 'OpenAI', 'Supabase', 'Algolia', 'Vercel'],
  },
  {
    id: '5',
    title: 'Supply Chain Management System',
    description: 'Real-time supply chain visibility platform with IoT integration, predictive analytics, and automated reporting.',
    problem_statement: 'Lack of real-time visibility into supply chain operations caused inefficiencies and delays.',
    solution: 'Implemented an IoT-integrated platform with Kubernetes orchestration, real-time tracking, and predictive analytics.',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
    technologies: ['Go', 'Kubernetes', 'MongoDB', 'GraphQL', 'IoT sensors'],
  },
  {
    id: '6',
    title: 'Smart Home Control App',
    description: 'IoT application for smart home automation with voice control, energy management, and predictive features.',
    problem_statement: 'Users wanted a unified interface to control multiple smart home devices with intelligent automation.',
    solution: 'Created a Flutter app with voice control integration, machine learning for predictive automation, and real-time energy monitoring.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    technologies: ['Flutter', 'AWS IoT', 'Alexa Integration', 'Machine Learning'],
  },
];

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <Section className="min-h-screen py-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Project Not Found</h1>
        <p className="text-slate-600 mb-6">The project you're looking for doesn't exist.</p>
        <Link to="/projects">
          <Button>Back to Projects</Button>
        </Link>
      </Section>
    );
  }

  return (
    <>
      <Section className="bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <Link to="/projects" className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 font-medium">
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>
        <h1 className="text-5xl font-bold text-slate-900 mb-4">{project.title}</h1>
      </Section>

      <Section className="bg-white py-12">
        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Project Overview</h2>
            <p className="text-lg text-slate-700 mb-8">{project.description}</p>

            <Card className="mb-8">
              <CardContent>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">The Challenge</h3>
                <p className="text-slate-700">{project.problem_statement}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Solution</h3>
                <p className="text-slate-700">{project.solution}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Project Details</h3>

                {project.technologies.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link to="/contact" className="w-full block">
                  <Button variant="outline" className="w-full">
                    Interested in Similar Work?
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Let's discuss how we can bring your vision to life.
          </p>
          <Link to="/contact">
            <Button size="lg">Get In Touch</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
