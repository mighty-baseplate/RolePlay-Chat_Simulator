import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  withSound?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  clickable = false,
  onClick,
  padding = 'md',
  shadow = 'md',
  border = false,
  rounded = 'lg',
  withSound = true
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
      
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
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

  // Base styles
  const baseStyles = 'bg-white transition-all duration-200';
  
  // Padding styles
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  // Shadow styles
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  // Border styles
  const borderStyles = border ? 'border border-gray-200' : '';
  
  // Rounded styles
  const roundedStyles = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };
  
  // Interactive styles
  const interactiveStyles = clickable 
    ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' 
    : '';
  
  const hoverStyles = hover || clickable 
    ? 'hover:shadow-lg hover:-translate-y-0.5' 
    : '';

  const cardClasses = `
    ${baseStyles}
    ${paddingStyles[padding]}
    ${shadowStyles[shadow]}
    ${borderStyles}
    ${roundedStyles[rounded]}
    ${interactiveStyles}
    ${hoverStyles}
    ${className}
  `.trim();

  const Component = clickable ? 'button' : 'div';

  return (
    <Component
      className={cardClasses}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {children}
    </Component>
  );
};

export default Card;