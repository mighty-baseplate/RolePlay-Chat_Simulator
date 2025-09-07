import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square' | 'rounded';
  className?: string;
  fallback?: string;
  onClick?: () => void;
  clickable?: boolean;
  withSound?: boolean;
  emotion?: 'neutral' | 'happy' | 'thinking' | 'sad' | 'waving' | 'surprised';
  characterId?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  shape = 'circle',
  className = '',
  fallback = '?',
  onClick,
  clickable = false,
  withSound = true,
  emotion = 'neutral',
  characterId
}) => {
  // Sound effect handler
  const playSound = () => {
    if (!withSound || !clickable) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  };

  const handleClick = () => {
    if (clickable) {
      playSound();
      onClick?.();
    }
  };

  // Size styles
  const sizeStyles = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };
  
  // Shape styles
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg'
  };
  
  // Base styles
  const baseStyles = 'inline-block object-cover transition-all duration-200';
  
  // Interactive styles
  const interactiveStyles = clickable 
    ? 'cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' 
    : '';

  const avatarClasses = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${shapeStyles[shape]}
    ${interactiveStyles}
    ${className}
  `.trim();

  // Emotion-based styling
  const getEmotionStyles = () => {
    if (!emotion || emotion === 'neutral') return '';
    
    const emotionStyles = {
      happy: 'ring-2 ring-yellow-300 shadow-yellow-200',
      thinking: 'ring-2 ring-blue-300 shadow-blue-200',
      sad: 'ring-2 ring-gray-300 shadow-gray-200',
      waving: 'ring-2 ring-green-300 shadow-green-200',
      surprised: 'ring-2 ring-purple-300 shadow-purple-200'
    };
    
    return emotionStyles[emotion] || '';
  };

  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const Component = clickable ? 'button' : 'div';

  return (
    <Component
      className={`${avatarClasses} ${getEmotionStyles()}`}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={clickable ? `Click to interact with ${alt}` : undefined}
    >
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${shapeStyles[shape]} object-cover`}
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <div 
          className={`
            w-full h-full ${shapeStyles[shape]} 
            bg-gradient-to-br from-gray-200 to-gray-300 
            flex items-center justify-center text-gray-600 font-semibold
            ${size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : 'text-base'}
          `}
          aria-label={`Avatar placeholder for ${alt}`}
        >
          {fallback}
        </div>
      )}
      
      {/* Emotion indicator */}
      {emotion && emotion !== 'neutral' && (
        <div 
          className={`
            absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white
            ${emotion === 'happy' ? 'bg-yellow-400' : 
              emotion === 'thinking' ? 'bg-blue-400' :
              emotion === 'sad' ? 'bg-gray-400' :
              emotion === 'waving' ? 'bg-green-400' :
              emotion === 'surprised' ? 'bg-purple-400' : 'bg-gray-400'}
          `}
          aria-label={`${emotion} emotion`}
        />
      )}
    </Component>
  );
};

export default Avatar;
