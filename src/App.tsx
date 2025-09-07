import React from 'react';
import { characters } from './data/characters';
import { detectEmotion } from './utils/emotionDetector';
import Button from './components/ui/Button';
import Card from './components/ui/Card';

function App() {
  // Test emotion detection
  const testEmotion = detectEmotion("Hello! *smiles warmly* How are you today?");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🎭 Roleplay Chat Simulator
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            ✅ Phase 2: UI Components Foundation Complete
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p><span className="font-medium">✅ Vite + React + TypeScript:</span> Configured</p>
              <p><span className="font-medium">✅ Tailwind CSS:</span> Configured with custom animations</p>
              <p><span className="font-medium">✅ Environment Variables:</span> API keys secured</p>
              <p><span className="font-medium">✅ Folder Structure:</span> Organized architecture</p>
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">✅ UI Components:</span> Button, Card with audio support</p>
              <p><span className="font-medium">✅ Character Data:</span> 6 characters with emotions</p>
              <p><span className="font-medium">✅ Emotion Detection:</span> Working (test: "{testEmotion}")</p>
              <p><span className="font-medium">✅ Development Server:</span> Running</p>
            </div>
          </div>
        </div>

        {/* Test UI Components */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            🧪 Testing UI Components
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" withSound={true}>Primary Button</Button>
              <Button variant="secondary" withSound={true}>Secondary Button</Button>
              <Button variant="outline" withSound={true}>Outline Button</Button>
              <Button variant="ghost" withSound={true}>Ghost Button</Button>
              <Button loading={true} withSound={true}>Loading Button</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card hover={true} withSound={true} className="h-32">
                <h3 className="font-semibold mb-2">Hover Card</h3>
                <p className="text-sm text-gray-600">This card has hover effects and sound</p>
              </Card>
              <Card clickable={true} withSound={true} className="h-32">
                <h3 className="font-semibold mb-2">Clickable Card</h3>
                <p className="text-sm text-gray-600">This card is clickable with sound feedback</p>
              </Card>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            🎭 Available Characters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map((character) => (
              <Card
                key={character.id}
                hover={true}
                clickable={true}
                withSound={true}
                className="character-card"
                style={{ borderColor: character.themeColor }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={character.avatar}
                    alt={character.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{character.name}</h3>
                    <p className="text-sm text-gray-600">{character.personality}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{character.description}</p>
                <div className="flex flex-wrap gap-1">
                  {Object.keys(character.emotionalImages).map((emotion) => (
                    <span
                      key={emotion}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>🚀 Phase 2 Complete - UI Components with audio support working!</p>
          <p className="text-sm mt-2">Next: Chat Components → State Management → API Services</p>
        </div>
      </div>
    </div>
  );
}

export default App;
