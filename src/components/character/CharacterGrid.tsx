import React from 'react';
import { Character, EmotionType } from '../../data/characters';
import CharacterCard from './CharacterCard';

interface CharacterGridProps {
  characters: Character[];
  selectedCharacterId?: string;
  onCharacterSelect?: (character: Character) => void;
  withSound?: boolean;
  className?: string;
  showEmotionPreviews?: boolean;
  currentEmotions?: Record<string, EmotionType>;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  selectedCharacterId,
  onCharacterSelect,
  withSound = true,
  className = '',
  showEmotionPreviews = true,
  currentEmotions = {}
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Grid Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Choose Your Character
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a character to start your roleplay conversation. Each character has unique personality, voice, and emotional responses.
        </p>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedCharacterId === character.id}
            onClick={onCharacterSelect}
            withSound={withSound}
            showEmotionPreview={showEmotionPreviews}
            currentEmotion={currentEmotions[character.id] || 'neutral'}
            className="h-full"
          />
        ))}
      </div>

      {/* Selection Instructions */}
      {!selectedCharacterId && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="text-sm">Click on a character to start chatting</span>
          </div>
        </div>
      )}

      {/* Selected Character Actions */}
      {selectedCharacterId && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Character Selected!</span>
            </div>
            <div className="text-gray-400">|</div>
            <div className="text-sm text-gray-600">
              Ready to start your roleplay conversation
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterGrid;
