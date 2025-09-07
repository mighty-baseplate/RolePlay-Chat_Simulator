import React from 'react';
import { Character, EmotionType } from '../../data/characters';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';

interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  onClick?: (character: Character) => void;
  withSound?: boolean;
  className?: string;
  showEmotionPreview?: boolean;
  currentEmotion?: EmotionType;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSelected = false,
  onClick,
  withSound = true,
  className = '',
  showEmotionPreview = true,
  currentEmotion = 'neutral'
}) => {
  const handleClick = () => {
    onClick?.(character);
  };

  // Get emotion preview images
  const getEmotionPreviews = () => {
    if (!showEmotionPreview) return null;
    
    const emotions: EmotionType[] = ['happy', 'thinking', 'waving'];
    return emotions.map((emotion) => (
      <div
        key={emotion}
        className={`w-6 h-6 rounded-full border-2 border-white shadow-sm transition-all duration-200 ${
          currentEmotion === emotion ? 'ring-2 ring-blue-400' : ''
        }`}
        style={{
          backgroundImage: `url(${character.emotionalImages[emotion]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        title={emotion}
      />
    ));
  };

  return (
    <Card
      clickable={true}
      onClick={handleClick}
      withSound={withSound}
      hover={true}
      className={`
        relative overflow-hidden transition-all duration-300
        ${isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''}
        ${className}
      `}
      style={{
        borderColor: isSelected ? character.themeColor : undefined,
        background: isSelected 
          ? `linear-gradient(135deg, ${character.themeColor}10, ${character.themeColor}05)`
          : undefined
      }}
    >
      {/* Character Avatar */}
      <div className="flex items-center space-x-4 mb-4">
        <Avatar
          src={character.avatar}
          alt={character.name}
          size="lg"
          emotion={currentEmotion}
          characterId={character.id}
          withSound={false}
        />
        <div className="flex-1">
          <h3 
            className="text-xl font-bold mb-1"
            style={{ color: character.themeColor }}
          >
            {character.name}
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            {character.personality}
          </p>
        </div>
      </div>

      {/* Character Description */}
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        {character.description}
      </p>

      {/* Emotion Previews */}
      {showEmotionPreview && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2 font-medium">Emotional States:</p>
          <div className="flex space-x-2">
            {getEmotionPreviews()}
          </div>
        </div>
      )}

      {/* Character Theme Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: character.themeColor }}
          />
          <span className="text-xs text-gray-500">Theme</span>
        </div>
        
        {/* Selection Indicator */}
        {isSelected && (
          <div className="flex items-center space-x-1 text-blue-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium">Selected</span>
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
    </Card>
  );
};

export default CharacterCard;
