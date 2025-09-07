import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { characters, getCharacterById, Character } from '../data/characters';
import { EmotionType, detectEmotion } from '../data/characters';
import ChatContainer from '../components/chat/ChatContainer';
import ChatInput from '../components/chat/ChatInput';
import Button from '../components/ui/Button';

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

const ChatInterface: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('neutral');

  // Load character data
  useEffect(() => {
    if (characterId) {
      const foundCharacter = getCharacterById(characterId);
      if (foundCharacter) {
        setCharacter(foundCharacter);
        // Add welcome message
        const welcomeMessage: Message = {
          id: 'welcome',
          text: `Hello! I'm ${foundCharacter.name}. ${foundCharacter.description} How can I help you today?`,
          sender: 'ai',
          timestamp: new Date(),
          avatar: foundCharacter.avatar,
          emotion: 'waving',
          characterId: foundCharacter.id,
          characterName: foundCharacter.name
        };
        setMessages([welcomeMessage]);
        setCurrentEmotion('waving');
      } else {
        navigate('/characters');
      }
    }
  }, [characterId, navigate]);

  const handleSendMessage = async (messageText: string) => {
    if (!character) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response (for now)
    setTimeout(() => {
      const responses = [
        "That's very interesting! *nods thoughtfully*",
        "I see what you mean. *smiles warmly*",
        "Fascinating! *leans forward with interest*",
        "Ah, I understand now. *strokes beard*",
        "That's a wonderful question! *eyes light up*"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const detectedEmotion = detectEmotion(randomResponse);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
        avatar: character.avatar,
        emotion: detectedEmotion,
        characterId: character.id,
        characterName: character.name
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentEmotion(detectedEmotion);
      setIsTyping(false);
    }, 2000);
  };

  const handleMessageComplete = (message: Message) => {
    // Handle message completion (e.g., reset emotion after delay)
    if (message.sender === 'ai' && message.emotion !== 'neutral') {
      setTimeout(() => {
        setCurrentEmotion('neutral');
      }, 3000);
    }
  };

  const handleBackToCharacters = () => {
    navigate('/characters');
  };

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading character...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToCharacters}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Characters</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-3">
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{character.name}</h1>
                  <p className="text-sm text-gray-600">{character.personality}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: character.themeColor }}
              />
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <ChatContainer
          messages={messages}
          isTyping={isTyping}
          character={character}
          currentEmotion={currentEmotion}
          onMessageComplete={handleMessageComplete}
          withSound={true}
          className="flex-1"
        />
        
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          placeholder={`Message ${character.name}...`}
          withSound={true}
          characterName={character.name}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
