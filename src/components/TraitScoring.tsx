import { ArrowLeft, TrendingUp, Droplet, Shield, Sprout, ArrowRight } from 'lucide-react';

type Screen = 'landing' | 'language' | 'chat' | 'traits' | 'simulation' | 'registry';

interface TraitScoringProps {
  onNavigate: (screen: Screen) => void;
}

const traits = [
  {
    id: 'drought',
    name: 'Drought Resistance',
    icon: Droplet,
    score: 85,
    level: 'Excellent',
    color: 'from-blue-500 to-cyan-500',
    description: 'High tolerance to water scarcity',
  },
  {
    id: 'growth',
    name: 'Growth Rate',
    icon: TrendingUp,
    score: 72,
    level: 'Good',
    color: 'from-emerald-500 to-green-500',
    description: 'Above average maturation speed',
  },
  {
    id: 'disease',
    name: 'Disease Tolerance',
    icon: Shield,
    score: 91,
    level: 'Excellent',
    color: 'from-purple-500 to-pink-500',
    description: 'Strong resistance to common pathogens',
  },
  {
    id: 'yield',
    name: 'Yield Potential',
    icon: Sprout,
    score: 78,
    level: 'Good',
    color: 'from-orange-500 to-red-500',
    description: 'High productivity per hectare',
  },
];

export function TraitScoring({ onNavigate }: TraitScoringProps) {
  return (
    <div className="min-h-screen px-6 py-8 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('chat')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Chat</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl text-slate-900 mb-3">
                Trait Scoring Results
              </h1>
              <p className="text-xl text-slate-600">
                Analysis for Maize Hybrid ZM-401
              </p>
            </div>
            <div className="px-5 py-2.5 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full text-sm">
              92% Overall Score
            </div>
          </div>
        </div>

        {/* Trait Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {traits.map((trait) => {
            const Icon = trait.icon;
            return (
              <div
                key={trait.id}
                className="group bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-200/50 p-6 hover:border-emerald-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${trait.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">{trait.name}</h3>
                      <p className="text-sm text-slate-500">{trait.level}</p>
                    </div>
                  </div>
                  <div className="text-2xl text-slate-900">{trait.score}%</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${trait.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${trait.score}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-slate-600">{trait.description}</p>
              </div>
            );
          })}
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl border-2 border-emerald-200/50 p-8 mb-8">
          <h3 className="text-2xl text-slate-900 mb-3">
            Key Insights
          </h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-slate-700">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>This hybrid shows exceptional disease resistance, making it ideal for high-humidity regions</span>
            </li>
            <li className="flex items-start gap-3 text-slate-700">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Drought resistance scores are excellent - suitable for rain-fed agriculture</span>
            </li>
            <li className="flex items-start gap-3 text-slate-700">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Expected maturation in 95-105 days under optimal conditions</span>
            </li>
          </ul>

          <button
            onClick={() => onNavigate('simulation')}
            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
          >
            <span>Run Growth Simulation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Additional Actions */}
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200/50 text-slate-700 hover:border-emerald-300 transition-all">
            Download Report
          </button>
          <button className="px-6 py-3 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200/50 text-slate-700 hover:border-emerald-300 transition-all">
            Compare with Others
          </button>
          <button className="px-6 py-3 bg-white/80 backdrop-blur-md rounded-xl border border-slate-200/50 text-slate-700 hover:border-emerald-300 transition-all">
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
}
