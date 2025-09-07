import React from 'react';
import Avatar from '../ui/Avatar';
import { formatTimestamp } from '../../utils/helpers';
import { EmotionType } from '../../data/characters';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  avatar?: string;
  emotion?: EmotionType;
  characterId?: string;
  characterName?: string;
}

interface ChatBubbleProps {
  message: Message;
  isTyping?: boolean;
  themeColor?: string;
  onMessageComplete?: (message: Message) => void;
  withSound?: boolean;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isTyping = false,
  themeColor = '#3b82f6',
  onMessageComplete,
  withSound = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState('');
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Typewriter effect for AI messages
  React.useEffect(() => {
    if (message.sender === 'ai' && !isTyping) {
      setIsVisible(true);
      setIsAnimating(true);
      
      const fullText = message.text;
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsAnimating(false);
          onMessageComplete?.(message);
        }
      }, 30); // 30ms per character for smooth typing
      
      return () => clearInterval(typeInterval);
    } else if (message.sender === 'user') {
      setIsVisible(true);
      setDisplayedText(message.text);
    }
  }, [message, isTyping, onMessageComplete]);

  // Play sound when message appears
  React.useEffect(() => {
    if (isVisible && withSound && !isAnimating) {
      const playMessageSound = () => {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Different sounds for user vs AI
          const frequency = message.sender === 'user' ? 600 : 400;
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
          console.warn('Audio not supported:', error);
        }
      };
      
      playMessageSound();
    }
  }, [isVisible, withSound, isAnimating, message.sender]);

  // Clean display text (remove asterisks but keep content)
  const cleanText = (text: string) => {
    return text.replace(/\*(.*?)\*/g, '$1');
  };

  // Highlight asterisk-wrapped content
  const formatText = (text: string) => {
    return text.split(/(\*.*?\*)/g).map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <span 
            key={index} 
            className="font-semibold text-blue-600 bg-blue-50 px-1 rounded"
            style={{ color: themeColor }}
          >
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  const isUser = message.sender === 'user';
  const bubbleClasses = `
    max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm transition-all duration-300
    ${isUser 
      ? 'bg-blue-500 text-white ml-auto' 
      : 'bg-white text-gray-800 border border-gray-200'
    }
    ${isVisible ? 'animate-bounce-in' : 'opacity-0 scale-95'}
    ${className}
  `.trim();

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {!isUser && (
          <Avatar
            src={message.avatar || '/default-avatar.png'}
            alt={message.characterName || 'AI Character'}
            size="sm"
            emotion={message.emotion}
            characterId={message.characterId}
            className="flex-shrink-0"
          />
        )}
        
        {/* Message bubble */}
        <div className="flex flex-col">
          <div 
            className={bubbleClasses}
            style={!isUser ? { borderColor: themeColor + '40' } : {}}
          >
            {isTyping ? (
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-gray-500">typing...</span>
              </div>
            ) : (
              <div className="text-sm leading-relaxed">
                {formatText(displayedText)}
                {isAnimating && (
                  <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
                )}
              </div>
            )}
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
        
        {/* User avatar */}
        {isUser && (
          <Avatar
            src="/user-avatar.png"
            alt="You"
            size="sm"
            className="flex-shrink-0"
          />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
