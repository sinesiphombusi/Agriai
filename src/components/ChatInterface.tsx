import { Send, Mic, Menu, BarChart3, TrendingUp, Database, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

type Screen = 'landing' | 'language' | 'chat' | 'traits' | 'simulation' | 'registry';

interface ChatInterfaceProps {
  language: string;
  onNavigate: (screen: Screen) => void;
}

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

const tools = [
  {
    id: 'traits',
    name: 'Trait Scoring',
    icon: BarChart3,
    description: 'Analyze crop characteristics',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'simulation',
    name: 'Crop Simulation',
    icon: TrendingUp,
    description: 'Predict growth patterns',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 'registry',
    name: 'RWA Registry',
    icon: Database,
    description: 'Register your harvest',
    color: 'from-blue-500 to-cyan-500',
  },
];

export function ChatInterface({ language, onNavigate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: `Hello! I'm your AI farming assistant. How can I help you today?${language ? ` (Speaking in ${language})` : ''}`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: 'I can help you with that! Would you like me to analyze crop traits, run a growth simulation, or help you register your harvest?',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1000);
  };

  const handleToolClick = (toolId: string) => {
    if (toolId === 'traits') onNavigate('traits');
    if (toolId === 'simulation') onNavigate('simulation');
    if (toolId === 'registry') onNavigate('registry');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <div className={`hidden md:flex md:w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/50 flex-col transition-all duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-slate-200/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900">AgriAI</span>
          </div>
          {language && (
            <p className="text-sm text-slate-500 mt-2">Language: {language}</p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-sm text-slate-500 mb-4">AI Tools</h3>
          <div className="space-y-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className="w-full group p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-slate-900 mb-0.5">{tool.name}</h4>
                      <p className="text-sm text-slate-500">{tool.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors md:hidden"
              >
                <Menu className="w-5 h-5 text-slate-700" />
              </button>
              <div>
                <h2 className="text-slate-900">AI Assistant</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-slate-500">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('landing')}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg px-5 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-br-md'
                    : 'bg-white/80 backdrop-blur-md border border-slate-200/50 text-slate-900 rounded-bl-md'
                }`}
              >
                <p className="leading-relaxed">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tool Cards - Mobile */}
        <div className="md:hidden px-6 pb-4 overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className="flex-shrink-0 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/50 hover:border-emerald-300 transition-all"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-slate-900 whitespace-nowrap">{tool.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-xl border-t border-slate-200/50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about farming..."
                  className="w-full px-5 py-4 pr-14 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-400 transition-colors"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-emerald-500 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="w-80 h-full bg-white/95 backdrop-blur-xl">
            <div className="p-6 border-b border-slate-200/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-900">AgriAI</span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-sm text-slate-500 mb-4">AI Tools</h3>
              <div className="space-y-3">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        handleToolClick(tool.id);
                        setIsSidebarOpen(false);
                      }}
                      className="w-full group p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200/50 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-slate-900 mb-0.5">{tool.name}</h4>
                          <p className="text-sm text-slate-500">{tool.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
