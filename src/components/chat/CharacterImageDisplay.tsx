import React from 'react';
import { Character, EmotionType } from '../../data/characters';

interface CharacterImageDisplayProps {
  character: Character;
  currentEmotion: EmotionType;
  position?: 'bottom-left' | 'bottom-right';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  withSound?: boolean;
  onClick?: () => void;
  clickable?: boolean;
}

const CharacterImageDisplay: React.FC<CharacterImageDisplayProps> = ({
  character,
  currentEmotion,
  position = 'bottom-right',
  size = 'medium',
  className = '',
  withSound = true,
  onClick,
  clickable = false
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(character.emotionalImages[currentEmotion]);

  // Show/hide animation
  React.useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Handle emotion changes with smooth transitions
  React.useEffect(() => {
    const newImage = character.emotionalImages[currentEmotion];
    if (newImage !== currentImage) {
      // Fade out current image
      setCurrentImage('');
      
      // Fade in new image after a short delay
      setTimeout(() => {
        setCurrentImage(newImage);
      }, 150);
    }
  }, [currentEmotion, character.emotionalImages, currentImage]);

  // Play emotion sound
  const playEmotionSound = (emotion: EmotionType) => {
    if (!withSound) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Character-specific base frequency
      const characterFrequencies: Record<string, number> = {
        gandalf: 220,
        sherlock: 440,
        robot: 880,
        knight: 330,
        alien: 660,
        sorceress: 550
      };
      
      const baseFreq = characterFrequencies[character.id] || 440;
      
      // Emotion-specific frequency modulation
      const emotionModifiers: Record<EmotionType, number> = {
        neutral: 1.0,
        happy: 1.2,
        thinking: 0.8,
        sad: 0.7,
        waving: 1.1,
        surprised: 1.5
      };
      
      const frequency = baseFreq * (emotionModifiers[emotion] || 1.0);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  };

  // Play sound when emotion changes
  React.useEffect(() => {
    if (currentEmotion !== 'neutral') {
      playEmotionSound(currentEmotion);
    }
  }, [currentEmotion]);

  // Size classes
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  // Position classes
  const positionClasses = {
    'bottom-left': 'fixed bottom-4 left-4',
    'bottom-right': 'fixed bottom-4 right-4'
  };

  // Interactive styles
  const interactiveStyles = clickable 
    ? 'cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' 
    : '';

  const handleClick = () => {
    if (clickable) {
      onClick?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className={`
        ${positionClasses[position]} z-20
        transition-all duration-300
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${interactiveStyles}
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={clickable ? 'button' : 'img'}
      tabIndex={clickable ? 0 : undefined}
      aria-label={`${character.name} - ${currentEmotion} emotion`}
    >
      <div className={`${sizeClasses[size]} relative`}>
        {/* Character image */}
        <img
          src={currentImage}
          alt={`${character.name} - ${currentEmotion}`}
          className={`
            w-full h-full object-cover rounded-full shadow-lg border-4 border-white
            transition-all duration-300
            ${currentImage ? 'opacity-100' : 'opacity-0'}
          `}
          loading="lazy"
        />
        
        {/* Theme glow effect */}
        <div 
          className="absolute inset-0 rounded-full shadow-inner transition-all duration-300"
          style={{
            boxShadow: `inset 0 0 20px ${character.themeColor}40`
          }}
        />
        
        {/* Emotion indicator ring */}
        {currentEmotion !== 'neutral' && (
          <div 
            className="absolute inset-0 rounded-full border-4 animate-pulse"
            style={{
              borderColor: character.themeColor,
              animationDuration: '2s'
            }}
          />
        )}
        
        {/* Character name tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {character.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black border-t-opacity-75" />
        </div>
        
        {/* Emotion label */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-xs px-2 py-1 rounded-full shadow-md border">
          {currentEmotion}
        </div>
      </div>
    </div>
  );
};

// Auto-reset to neutral component
export const AutoResetCharacterImage: React.FC<CharacterImageDisplayProps & {
  resetDelay?: number;
}> = ({ resetDelay = 3000, ...props }) => {
  const [displayEmotion, setDisplayEmotion] = React.useState<EmotionType>('neutral');
  const resetTimeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    // Update emotion immediately
    setDisplayEmotion(props.currentEmotion);
    
    // Clear existing timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    
    // Set new timeout to reset to neutral
    if (props.currentEmotion !== 'neutral') {
      resetTimeoutRef.current = setTimeout(() => {
        setDisplayEmotion('neutral');
      }, resetDelay);
    }
    
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [props.currentEmotion, resetDelay]);

  return (
    <CharacterImageDisplay
      {...props}
      currentEmotion={displayEmotion}
    />
  );
};

export default CharacterImageDisplay;
