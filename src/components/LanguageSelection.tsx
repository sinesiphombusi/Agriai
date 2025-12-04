import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
}

const languages = [
  {
    id: 'xhosa',
    name: 'isiXhosa',
    nativeName: 'isiXhosa',
    flag: '🇿🇦',
    description: 'South Africa',
  },
  {
    id: 'swahili',
    name: 'Kiswahili',
    nativeName: 'Kiswahili',
    flag: '🇰🇪',
    description: 'East Africa',
  },
  {
    id: 'pidgin',
    name: 'Nigerian Pidgin',
    nativeName: 'Naija Pidgin',
    flag: '🇳🇬',
    description: 'Nigeria',
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇦🇴',
    description: 'Angola, Mozambique',
  },
];

export function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-emerald-200/50 mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-slate-700 text-sm">Choose Your Language</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl text-slate-900 mb-4">
            Speak in Your Language
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select your preferred language to get started with your AI farming companion
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => onLanguageSelect(lang.name)}
              onMouseEnter={() => setHoveredLang(lang.id)}
              onMouseLeave={() => setHoveredLang(null)}
              className="group relative p-8 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-200/50 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 text-left"
            >
              {/* Selection Indicator */}
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                hoveredLang === lang.id
                  ? 'border-emerald-500 bg-emerald-500'
                  : 'border-slate-300 bg-white'
              }`}>
                {hoveredLang === lang.id && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Flag */}
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {lang.flag}
              </div>

              {/* Language Name */}
              <h3 className="text-2xl text-slate-900 mb-1">
                {lang.name}
              </h3>
              <p className="text-slate-600">
                {lang.nativeName}
              </p>
              
              {/* Description */}
              <div className="mt-4 pt-4 border-t border-slate-200/50">
                <p className="text-sm text-slate-500">
                  {lang.description}
                </p>
              </div>

              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            More languages coming soon • Powered by AI
          </p>
        </div>
      </div>
    </div>
  );
}
