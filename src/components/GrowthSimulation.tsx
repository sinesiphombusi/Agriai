import { ArrowLeft, Download, Calendar, Droplets, Sun, Wind } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Screen = 'landing' | 'language' | 'chat' | 'traits' | 'simulation' | 'registry';

interface GrowthSimulationProps {
  onNavigate: (screen: Screen) => void;
}

const growthData = [
  { day: 0, height: 0, biomass: 0 },
  { day: 15, height: 12, biomass: 5 },
  { day: 30, height: 35, biomass: 18 },
  { day: 45, height: 68, biomass: 45 },
  { day: 60, height: 125, biomass: 95 },
  { day: 75, height: 180, biomass: 165 },
  { day: 90, height: 215, biomass: 245 },
  { day: 105, height: 230, biomass: 310 },
];

const environmentalData = [
  { day: 0, rainfall: 45, temperature: 22 },
  { day: 15, rainfall: 38, temperature: 24 },
  { day: 30, rainfall: 52, temperature: 26 },
  { day: 45, rainfall: 48, temperature: 27 },
  { day: 60, rainfall: 35, temperature: 28 },
  { day: 75, rainfall: 28, temperature: 26 },
  { day: 90, rainfall: 32, temperature: 25 },
  { day: 105, rainfall: 40, temperature: 23 },
];

const stages = [
  { name: 'Germination', days: '0-10', status: 'Complete' },
  { name: 'Vegetative', days: '10-45', status: 'Complete' },
  { name: 'Flowering', days: '45-75', status: 'In Progress' },
  { name: 'Maturation', days: '75-105', status: 'Upcoming' },
];

export function GrowthSimulation({ onNavigate }: GrowthSimulationProps) {
  return (
    <div className="min-h-screen px-6 py-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('chat')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Chat</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl text-slate-900 mb-3">
                Growth Simulation
              </h1>
              <p className="text-xl text-slate-600">
                Maize Hybrid ZM-401 • 105-day cycle
              </p>
            </div>
            <button className="group px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2 self-start">
              <Download className="w-5 h-5" />
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* Growth Stages Timeline */}
        <div className="mb-8 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-200/50 p-6">
          <h3 className="text-xl text-slate-900 mb-4">Growth Stages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage, index) => (
              <div
                key={stage.name}
                className={`p-4 rounded-2xl border-2 ${
                  stage.status === 'Complete'
                    ? 'bg-emerald-50 border-emerald-300'
                    : stage.status === 'In Progress'
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      stage.status === 'Complete'
                        ? 'bg-emerald-500 text-white'
                        : stage.status === 'In Progress'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <h4 className="text-slate-900">{stage.name}</h4>
                </div>
                <p className="text-sm text-slate-600 mb-1">Days {stage.days}</p>
                <p className="text-xs text-slate-500">{stage.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Growth Chart */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-200/50 p-6">
            <h3 className="text-xl text-slate-900 mb-4">Plant Growth Trajectory</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBiomass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="height"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorHeight)"
                  name="Height (cm)"
                />
                <Area
                  type="monotone"
                  dataKey="biomass"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBiomass)"
                  name="Biomass (g)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Environmental Conditions */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-200/50 p-6">
            <h3 className="text-xl text-slate-900 mb-4">Environmental Conditions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={environmentalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rainfall"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 4 }}
                  name="Rainfall (mm)"
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', r: 4 }}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-200/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-slate-700">Days to Maturity</h4>
            </div>
            <p className="text-3xl text-slate-900">105</p>
            <p className="text-sm text-slate-600 mt-1">Expected harvest date</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-slate-700">Water Required</h4>
            </div>
            <p className="text-3xl text-slate-900">450mm</p>
            <p className="text-sm text-slate-600 mt-1">Total for full cycle</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-slate-700">Sunlight Hours</h4>
            </div>
            <p className="text-3xl text-slate-900">8-10</p>
            <p className="text-sm text-slate-600 mt-1">Hours per day optimal</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200/50 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-slate-700">Expected Yield</h4>
            </div>
            <p className="text-3xl text-slate-900">6.5t</p>
            <p className="text-sm text-slate-600 mt-1">Per hectare</p>
          </div>
        </div>

        {/* Insights Summary */}
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl border-2 border-slate-200/50 p-8">
          <h3 className="text-2xl text-slate-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-slate-900 mb-2">Optimal Conditions</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                  <span>Plant during early rainy season for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                  <span>Ensure consistent watering during flowering stage (days 45-75)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                  <span>Monitor for pests during vegetative growth period</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 mb-2">Expected Outcomes</h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>First harvest expected in 105 days under optimal conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>Average yield of 6.5 tons per hectare projected</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>95% germination rate with quality seeds</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
