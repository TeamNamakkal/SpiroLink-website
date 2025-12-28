import { Sparkles } from 'lucide-react';

interface StayTunedProps {
  title?: string;
  subtitle?: string;
}

export default function StayTuned({
  title = 'Stay Tuned',
  subtitle = 'This section is under development. Something great is coming soon!',
}: StayTunedProps) {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="text-center bg-white rounded-2xl shadow-lg px-10 py-12 max-w-xl animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          {title}
        </h2>

        <p className="text-slate-600 text-lg">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
