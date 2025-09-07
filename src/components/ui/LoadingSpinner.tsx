import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  text?: string;
  className?: string;
  characterId?: string;
  withSound?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  className = '',
  characterId,
  withSound = false
}) => {
  // Character-specific loading sounds
  const playLoadingSound = () => {
    if (!withSound) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Character-specific frequencies
      const characterFrequencies: Record<string, number> = {
        gandalf: 220, // Low, mystical
        sherlock: 440, // Analytical
        robot: 880, // High, mechanical
        knight: 330, // Noble
        alien: 660, // Cosmic
        sorceress: 550 // Magical
      };
      
      const frequency = characterFrequencies[characterId || ''] || 440;
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  };

  // Play sound on mount if enabled
  React.useEffect(() => {
    if (withSound) {
      const interval = setInterval(playLoadingSound, 1000); // Play every second
      return () => clearInterval(interval);
    }
  }, [withSound, characterId]);

  // Size styles
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  // Color styles
  const colorStyles = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    gray: 'text-gray-400'
  };
  
  // Text size styles
  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const spinnerClasses = `
    animate-spin
    ${sizeStyles[size]}
    ${colorStyles[color]}
    ${className}
  `.trim();

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <svg
        className={spinnerClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      
      {text && (
        <p className={`${textSizeStyles[size]} ${colorStyles[color]} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Character-specific loading spinner
export const CharacterLoadingSpinner: React.FC<{
  characterId: string;
  characterName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withSound?: boolean;
}> = ({ characterId, characterName, size = 'md', withSound = true }) => {
  const characterColors: Record<string, string> = {
    gandalf: 'text-yellow-600',
    sherlock: 'text-blue-600',
    robot: 'text-gray-600',
    knight: 'text-orange-600',
    alien: 'text-green-600',
    sorceress: 'text-purple-600'
  };

  const characterTexts: Record<string, string> = {
    gandalf: 'Gandalf is thinking...',
    sherlock: 'Sherlock is analyzing...',
    robot: 'Processing data...',
    knight: 'Sir Galahad is considering...',
    alien: 'Zyx is grooving...',
    sorceress: 'Luna is casting...'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className={`${characterColors[characterId] || 'text-gray-600'}`}>
        <LoadingSpinner 
          size={size} 
          color="primary" 
          characterId={characterId}
          withSound={withSound}
        />
      </div>
      <p className={`text-sm ${characterColors[characterId] || 'text-gray-600'} font-medium`}>
        {characterTexts[characterId] || `${characterName} is thinking...`}
      </p>
    </div>
  );
};

// Typing indicator with dots animation
export const TypingIndicator: React.FC<{
  characterName?: string;
  withSound?: boolean;
  className?: string;
}> = ({ characterName = 'AI', withSound = true, className = '' }) => {
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
        oscillator.type = 'square'; // More mechanical sound
        
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
        {characterName} is typing{dots}
      </span>
    </div>
  );
};

export default LoadingSpinner;
