import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LanguageSelection } from './components/LanguageSelection';
import { ChatInterface } from './components/ChatInterface';
import { TraitScoring } from './components/TraitScoring';
import { GrowthSimulation } from './components/GrowthSimulation';
import { RWARegistry } from './components/RWARegistry';

type Screen = 'landing' | 'language' | 'chat' | 'traits' | 'simulation' | 'registry';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    navigateToScreen('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {currentScreen === 'landing' && (
        <LandingPage onNavigate={navigateToScreen} />
      )}
      {currentScreen === 'language' && (
        <LanguageSelection onLanguageSelect={handleLanguageSelect} />
      )}
      {currentScreen === 'chat' && (
        <ChatInterface 
          language={selectedLanguage} 
          onNavigate={navigateToScreen}
        />
      )}
      {currentScreen === 'traits' && (
        <TraitScoring onNavigate={navigateToScreen} />
      )}
      {currentScreen === 'simulation' && (
        <GrowthSimulation onNavigate={navigateToScreen} />
      )}
      {currentScreen === 'registry' && (
        <RWARegistry onNavigate={navigateToScreen} />
      )}
    </div>
  );
}
