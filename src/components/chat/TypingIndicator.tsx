import React from 'react';
import Avatar from '../ui/Avatar';

interface TypingIndicatorProps {
  characterName?: string;
  characterAvatar?: string;
  characterId?: string;
  withSound?: boolean;
  className?: string;
  themeColor?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  characterName = 'AI',
  characterAvatar,
  characterId,
  withSound = true,
  className = '',
  themeColor = '#3b82f6'
}) => {
  const [dots, setDots] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);

  // Animate dots
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Show/hide animation
  React.useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Play typing sound
  React.useEffect(() => {
    if (!withSound) return;
    
    const playTypingSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Character-specific typing sounds
        const characterFrequencies: Record<string, number> = {
          gandalf: 220, // Low, mystical
          sherlock: 440, // Analytical
          robot: 880, // High, mechanical
          knight: 330, // Noble
          alien: 660, // Cosmic
          sorceress: 550 // Magical
        };
        
        const frequency = characterFrequencies[characterId || ''] || 400;
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'square'; // More mechanical sound for typing
        
        gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
      } catch (error) {
        console.warn('Audio not supported:', error);
      }
    };

    const interval = setInterval(playTypingSound, 300);
    return () => clearInterval(interval);
  }, [withSound, characterId]);

  return (
    <div className={`flex justify-start mb-4 ${className}`}>
      <div className="flex items-end space-x-2">
        {/* Character Avatar */}
        <Avatar
          src={characterAvatar || '/default-avatar.png'}
          alt={characterName}
          size="sm"
          characterId={characterId}
          className="flex-shrink-0"
        />
        
        {/* Typing bubble */}
        <div 
          className={`
            bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm
            transition-all duration-300
            ${isVisible ? 'animate-bounce-in' : 'opacity-0 scale-95'}
          `}
          style={{ borderColor: themeColor + '40' }}
        >
          <div className="flex items-center space-x-2">
            {/* Animated dots */}
            <div className="flex space-x-1">
              <div 
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                style={{ 
                  animationDelay: '0ms',
                  backgroundColor: themeColor + '80'
                }} 
              />
              <div 
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                style={{ 
                  animationDelay: '150ms',
                  backgroundColor: themeColor + '80'
                }} 
              />
              <div 
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                style={{ 
                  animationDelay: '300ms',
                  backgroundColor: themeColor + '80'
                }} 
              />
            </div>
            
            {/* Typing text */}
            <span className="text-sm text-gray-500">
              {characterName} is typing{dots}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Character-specific typing indicators
export const CharacterTypingIndicator: React.FC<{
  characterId: string;
  characterName: string;
  characterAvatar?: string;
  withSound?: boolean;
  className?: string;
}> = ({ characterId, characterName, characterAvatar, withSound = true, className = '' }) => {
  const characterThemes: Record<string, string> = {
    gandalf: '#f59e0b',
    sherlock: '#3b82f6',
    robot: '#64748b',
    knight: '#ea580c',
    alien: '#22c55e',
    sorceress: '#a855f7'
  };

  const characterTypingTexts: Record<string, string> = {
    gandalf: 'Gandalf is pondering...',
    sherlock: 'Sherlock is analyzing...',
    robot: 'Processing data...',
    knight: 'Sir Galahad is considering...',
    alien: 'Zyx is grooving...',
    sorceress: 'Luna is casting...'
  };

  return (
    <TypingIndicator
      characterName={characterTypingTexts[characterId] || `${characterName} is thinking...`}
      characterAvatar={characterAvatar}
      characterId={characterId}
      withSound={withSound}
      themeColor={characterThemes[characterId] || '#3b82f6'}
      className={className}
    />
  );
};

// Simple typing indicator without avatar
export const SimpleTypingIndicator: React.FC<{
  text?: string;
  withSound?: boolean;
  className?: string;
}> = ({ text = 'typing...', withSound = true, className = '' }) => {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Play typing sound
  React.useEffect(() => {
    if (!withSound) return;
    
    const playTypingSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
      } catch (error) {
        console.warn('Audio not supported:', error);
      }
    };

    const interval = setInterval(playTypingSound, 300);
    return () => clearInterval(interval);
  }, [withSound]);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm text-gray-500">
        {text}{dots}
      </span>
    </div>
  );
};

export default TypingIndicator;
