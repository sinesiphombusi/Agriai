import { Sparkles, Play, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Screen = 'landing' | 'language' | 'chat' | 'traits' | 'simulation' | 'registry';

interface LandingPageProps {
  onNavigate: (screen: Screen) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1751818430533-3e3c7f3f14b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybSUyMGZpZWxkcyUyMGFlcmlhbHxlbnwxfHx8fDE3NjQ1MTI5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Agricultural fields"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-blue-900/70 to-slate-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl">AgriAI</span>
          </div>
          <button 
            onClick={() => onNavigate('language')}
            className="px-6 py-2 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm">Multilingual Agricultural Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight">
              Your Smart
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-blue-300 bg-clip-text text-transparent">
                Farming Companion
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-2xl">
              Empowering African farmers with AI-powered insights in your native language. Get personalized crop guidance, trait analysis, and growth predictions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('language')}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Try Agent</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('chat')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                <span>View Demo</span>
              </button>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="mt-20 flex flex-wrap gap-4">
            {[
              'isiXhosa',
              'Kiswahili',
              'Nigerian Pidgin',
              'Portuguese',
              'Trait Scoring',
              'Growth Simulation',
            ].map((feature) => (
              <div
                key={feature}
                className="px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/70 text-sm"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </div>
  );
}
