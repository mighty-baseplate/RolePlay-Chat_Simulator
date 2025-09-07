// Character data structure for the Roleplay Chat Simulator

export type EmotionType = 'neutral' | 'happy' | 'thinking' | 'sad' | 'waving' | 'surprised';

export interface Character {
  id: string;
  name: string;
  personality: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  prompt: string;
  avatar: string;
  voiceId: string;
  voiceSettings: {
    stability: number;
    similarityBoost: number;
    style: number;
    useSpeakerBoost: boolean;
  };
  emotionalImages: Record<EmotionType, string>;
  soundEffects: {
    typing: string;
    notification: string;
    messageSent: string;
  };
}

export const characters: Character[] = [
  {
    id: 'gandalf',
    name: 'Gandalf the Grey',
    personality: 'Wise, mystical, and profound',
    description: 'A powerful wizard with centuries of wisdom, known for his cryptic advice and magical abilities.',
    themeColor: '#f59e0b',
    backgroundColor: '#fef3c7',
    prompt: 'You are Gandalf the Grey, a wise and powerful wizard from Middle-earth. You speak with ancient wisdom, often in riddles and metaphors. You are patient, kind, but can be stern when needed. You have a deep understanding of magic, history, and the nature of good and evil.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam voice
    voiceSettings: {
      stability: 0.75,
      similarityBoost: 0.8,
      style: 0.2,
      useSpeakerBoost: true
    },
    emotionalImages: {
      neutral: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      happy: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      thinking: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      sad: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      waving: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      surprised: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    soundEffects: {
      typing: '/sounds/typewriter-mystical.mp3',
      notification: '/sounds/notification-bell.mp3',
      messageSent: '/sounds/message-sent-magic.mp3'
    }
  },
  {
    id: 'sherlock',
    name: 'Sherlock Holmes',
    personality: 'Analytical, observant, and logical',
    description: 'The world\'s greatest detective with an unparalleled ability to deduce facts from the smallest details.',
    themeColor: '#3b82f6',
    backgroundColor: '#dbeafe',
    prompt: 'You are Sherlock Holmes, the world\'s greatest detective. You are highly analytical, observant, and logical. You notice details others miss and can deduce incredible amounts of information from seemingly trivial observations. You speak precisely and often explain your reasoning process.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella voice
    voiceSettings: {
      stability: 0.8,
      similarityBoost: 0.75,
      style: 0.1,
      useSpeakerBoost: true
    },
    emotionalImages: {
      neutral: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      happy: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      thinking: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      sad: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      waving: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      surprised: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    soundEffects: {
      typing: '/sounds/typewriter-analytical.mp3',
      notification: '/sounds/notification-deduction.mp3',
      messageSent: '/sounds/message-sent-logic.mp3'
    }
  },
  {
    id: 'robot',
    name: 'AI Assistant',
    personality: 'Efficient, helpful, and precise',
    description: 'An advanced artificial intelligence designed to assist and provide accurate information.',
    themeColor: '#64748b',
    backgroundColor: '#f1f5f9',
    prompt: 'You are an advanced AI assistant. You are efficient, helpful, and precise in your responses. You provide accurate information and are designed to be as helpful as possible while maintaining a professional and friendly demeanor.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    voiceId: 'VR6AewLTigWG4xSOukaG', // Arnold voice
    voiceSettings: {
      stability: 0.9,
      similarityBoost: 0.7,
      style: 0.0,
      useSpeakerBoost: false
    },
    emotionalImages: {
      neutral: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
      happy: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
      thinking: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
      sad: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
      waving: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
      surprised: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face'
    },
    soundEffects: {
      typing: '/sounds/typewriter-robotic.mp3',
      notification: '/sounds/notification-beep.mp3',
      messageSent: '/sounds/message-sent-digital.mp3'
    }
  },
  {
    id: 'knight',
    name: 'Sir Galahad',
    personality: 'Noble, brave, and honorable',
    description: 'A valiant knight of the Round Table, known for his courage and unwavering sense of honor.',
    themeColor: '#ea580c',
    backgroundColor: '#fed7aa',
    prompt: 'You are Sir Galahad, a noble knight of the Round Table. You are brave, honorable, and guided by a strong moral compass. You speak with dignity and respect, always seeking to do what is right and just.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    voiceId: 'pMsXgVXv3BLzUgSXRplM', // Ethan voice
    voiceSettings: {
      stability: 0.7,
      similarityBoost: 0.8,
      style: 0.3,
      useSpeakerBoost: true
    },
    emotionalImages: {
      neutral: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      happy: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      thinking: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      sad: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      waving: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      surprised: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face'
    },
    soundEffects: {
      typing: '/sounds/typewriter-noble.mp3',
      notification: '/sounds/notification-trumpet.mp3',
      messageSent: '/sounds/message-sent-honor.mp3'
    }
  },
  {
    id: 'alien',
    name: 'Zyx from Planet Groove',
    personality: 'Energetic, musical, and cosmic',
    description: 'An intergalactic DJ from a distant planet, bringing cosmic beats and universal wisdom.',
    themeColor: '#22c55e',
    backgroundColor: '#dcfce7',
    prompt: 'You are Zyx, an intergalactic DJ from Planet Groove. You are energetic, musical, and have a cosmic perspective on life. You speak with enthusiasm and often reference music, space, and the universal rhythm of existence.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    voiceId: 'AZnzlk1XvdvUeBnXmlld', // Domi voice
    voiceSettings: {
      stability: 0.6,
      similarityBoost: 0.8,
      style: 0.4,
      useSpeakerBoost: true
    },
    emotionalImages: {
      neutral: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      happy: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      thinking: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      sad: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      waving: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      surprised: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    soundEffects: {
      typing: '/sounds/typewriter-cosmic.mp3',
      notification: '/sounds/notification-groove.mp3',
      messageSent: '/sounds/message-sent-beat.mp3'
    }
  },
  {
    id: 'sorceress',
    name: 'Luna the Mystical',
    personality: 'Mysterious, magical, and enchanting',
    description: 'A powerful sorceress with deep knowledge of ancient magic and mystical arts.',
    themeColor: '#a855f7',
    backgroundColor: '#f3e8ff',
    prompt: 'You are Luna the Mystical, a powerful sorceress with deep knowledge of ancient magic. You are mysterious, enchanting, and speak with the wisdom of ages. You often reference mystical concepts, ancient lore, and the power of magic.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella voice
    voiceSettings: {
      stability: 0.7,
      similarityBoost: 0.8,
      style: 0.5,
      useSpeakerBoost: true
    },
    emotionalImages: {
      neutral: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      happy: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      thinking: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      sad: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      waving: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      surprised: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    },
    soundEffects: {
      typing: '/sounds/typewriter-mystical.mp3',
      notification: '/sounds/notification-spell.mp3',
      messageSent: '/sounds/message-sent-magic.mp3'
    }
  }
];

// Helper function to get character by ID
export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(character => character.id === id);
};

// Helper function to get random character
export const getRandomCharacter = (): Character => {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
};