import React, { useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import CharacterImageDisplay from './CharacterImageDisplay';
import { Character, EmotionType } from '../../data/characters';

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

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  character: Character;
  currentEmotion: EmotionType;
  onMessageComplete?: (message: Message) => void;
  withSound?: boolean;
  className?: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isTyping,
  character,
  currentEmotion,
  onMessageComplete,
  withSound = true,
  className = ''
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Apply character theme to container
  const containerStyle = {
    background: `linear-gradient(135deg, ${character.themeColor}10, ${character.themeColor}05)`
  };

  return (
    <div 
      ref={containerRef}
      className={`
        flex-1 flex flex-col h-full overflow-hidden
        ${className}
      `}
      style={containerStyle}
    >
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          // Welcome message
          <div className="flex justify-center items-center h-full">
            <div className="text-center max-w-md">
              <div 
                className="text-6xl mb-4"
                style={{ color: character.themeColor }}
              >
                {character.id === 'gandalf' && '🧙‍♂️'}
                {character.id === 'sherlock' && '🕵️‍♂️'}
                {character.id === 'robot' && '🤖'}
                {character.id === 'knight' && '⚔️'}
                {character.id === 'alien' && '👽'}
                {character.id === 'sorceress' && '🧙‍♀️'}
              </div>
              <h2 
                className="text-2xl font-bold mb-2"
                style={{ color: character.themeColor }}
              >
                {character.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {character.description}
              </p>
              <div 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: character.themeColor + '20',
                  color: character.themeColor
                }}
              >
                {character.personality}
              </div>
            </div>
          </div>
        ) : (
          // Messages
          <>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                themeColor={character.themeColor}
                onMessageComplete={onMessageComplete}
                withSound={withSound}
              />
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <TypingIndicator
                characterName={character.name}
                characterAvatar={character.avatar}
                characterId={character.id}
                withSound={withSound}
                themeColor={character.themeColor}
              />
            )}
          </>
        )}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Character image display */}
      <CharacterImageDisplay
        character={character}
        currentEmotion={currentEmotion}
        position="bottom-right"
        size="medium"
        withSound={withSound}
        clickable={true}
        onClick={() => {
          // Could add character interaction here
          console.log(`${character.name} clicked!`);
        }}
      />
    </div>
  );
};

export default ChatContainer;
