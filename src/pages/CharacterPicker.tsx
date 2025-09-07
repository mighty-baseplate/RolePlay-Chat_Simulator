import React, { useState } from 'react';
import { characters, Character } from '../data/characters';
import CharacterGrid from '../components/character/CharacterGrid';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CharacterPicker: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const navigate = useNavigate();

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleStartChat = () => {
    if (selectedCharacter) {
      navigate(`/chat/${selectedCharacter.id}`);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-gray-800">
                🎭 Character Selection
              </h1>
            </div>
            
            {selectedCharacter && (
              <Button
                onClick={handleStartChat}
                variant="primary"
                size="lg"
                withSound={true}
                className="flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Start Chat with {selectedCharacter.name}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <CharacterGrid
          characters={characters}
          selectedCharacterId={selectedCharacter?.id}
          onCharacterSelect={handleCharacterSelect}
          withSound={true}
          showEmotionPreviews={true}
        />
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>🎭 Roleplay Chat Simulator - Choose your character and start an immersive conversation!</p>
            <p className="mt-1">Each character has unique personality, voice, and emotional responses.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPicker;
