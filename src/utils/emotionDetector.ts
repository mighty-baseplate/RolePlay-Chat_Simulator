// Emotion detection and TTS text extraction utilities

import { EmotionType } from '../data/characters';

/**
 * Detect emotion from AI response text
 */
export const detectEmotion = (text: string): EmotionType => {
  const lowerText = text.toLowerCase();
  
  // Happy indicators
  const happyKeywords = [
    'happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'fantastic',
    'smile', 'laugh', 'cheerful', 'delighted', 'pleased', 'thrilled',
    'excellent', 'brilliant', 'awesome', 'perfect', 'love', 'adore'
  ];
  
  // Thinking indicators
  const thinkingKeywords = [
    'think', 'consider', 'ponder', 'reflect', 'analyze', 'examine',
    'wonder', 'question', 'curious', 'investigate', 'study', 'research',
    'hmm', 'let me think', 'interesting', 'fascinating', 'complex'
  ];
  
  // Sad indicators
  const sadKeywords = [
    'sad', 'sorry', 'unfortunate', 'disappointed', 'regret', 'mourn',
    'grief', 'sorrow', 'melancholy', 'depressed', 'down', 'upset',
    'tragic', 'heartbreaking', 'devastated', 'cry', 'tears'
  ];
  
  // Waving indicators
  const wavingKeywords = [
    'hello', 'hi', 'greetings', 'welcome', 'goodbye', 'farewell',
    'see you', 'until next time', 'take care', 'wave', 'gesture'
  ];
  
  // Surprised indicators
  const surprisedKeywords = [
    'wow', 'oh', 'really', 'surprised', 'shocked', 'amazed', 'astonished',
    'incredible', 'unbelievable', 'no way', 'what', 'gasp', 'stunned'
  ];
  
  // Count keyword matches
  const countMatches = (keywords: string[]): number => {
    return keywords.reduce((count, keyword) => {
      return count + (lowerText.includes(keyword) ? 1 : 0);
    }, 0);
  };
  
  const happyCount = countMatches(happyKeywords);
  const thinkingCount = countMatches(thinkingKeywords);
  const sadCount = countMatches(sadKeywords);
  const wavingCount = countMatches(wavingKeywords);
  const surprisedCount = countMatches(surprisedKeywords);
  
  // Return emotion with highest count, default to neutral
  const emotions = [
    { emotion: 'happy' as EmotionType, count: happyCount },
    { emotion: 'thinking' as EmotionType, count: thinkingCount },
    { emotion: 'sad' as EmotionType, count: sadCount },
    { emotion: 'waving' as EmotionType, count: wavingCount },
    { emotion: 'surprised' as EmotionType, count: surprisedCount }
  ];
  
  const maxEmotion = emotions.reduce((max, current) => 
    current.count > max.count ? current : max
  );
  
  // Only return non-neutral if there's a clear match
  return maxEmotion.count > 0 ? maxEmotion.emotion : 'neutral';
};

/**
 * Extract text that should be read by TTS (asterisk-wrapped or short responses)
 */
export const extractTTSText = (text: string): string | null => {
  // Check for asterisk-wrapped content
  const asteriskMatches = text.match(/\*(.*?)\*/g);
  if (asteriskMatches && asteriskMatches.length > 0) {
    // Return all asterisk-wrapped content
    return asteriskMatches
      .map(match => match.slice(1, -1)) // Remove asterisks
      .join(' ');
  }
  
  // Check if response is short enough for TTS (less than 50 words)
  const words = text.trim().split(/\s+/);
  if (words.length <= 50) {
    return text;
  }
  
  // For longer responses, try to find a good excerpt
  const sentences = text.split(/[.!?]+/);
  if (sentences.length > 0) {
    const firstSentence = sentences[0].trim();
    if (firstSentence.length > 0 && firstSentence.length <= 200) {
      return firstSentence;
    }
  }
  
  return null;
};

/**
 * Check if text contains asterisk-wrapped content
 */
export const hasAsteriskContent = (text: string): boolean => {
  return /\*.*?\*/.test(text);
};

/**
 * Get emotion intensity (0-1)
 */
export const getEmotionIntensity = (text: string, emotion: EmotionType): number => {
  const lowerText = text.toLowerCase();
  
  const emotionKeywords: Record<EmotionType, string[]> = {
    neutral: [],
    happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'fantastic', 'smile', 'laugh', 'cheerful'],
    thinking: ['think', 'consider', 'ponder', 'reflect', 'analyze', 'examine', 'wonder', 'question', 'curious'],
    sad: ['sad', 'sorry', 'unfortunate', 'disappointed', 'regret', 'mourn', 'grief', 'sorrow'],
    waving: ['hello', 'hi', 'greetings', 'welcome', 'goodbye', 'farewell', 'see you', 'wave'],
    surprised: ['wow', 'oh', 'really', 'surprised', 'shocked', 'amazed', 'astonished', 'incredible']
  };
  
  const keywords = emotionKeywords[emotion];
  if (keywords.length === 0) return 0;
  
  const matches = keywords.reduce((count, keyword) => {
    return count + (lowerText.includes(keyword) ? 1 : 0);
  }, 0);
  
  return Math.min(matches / keywords.length, 1);
};

/**
 * Get character-appropriate emotion based on personality
 */
export const getCharacterAppropriateEmotion = (
  text: string,
  characterId: string
): EmotionType => {
  const detectedEmotion = detectEmotion(text);
  
  // Character-specific emotion preferences
  const characterEmotions: Record<string, EmotionType[]> = {
    gandalf: ['thinking', 'neutral', 'happy'],
    sherlock: ['thinking', 'neutral', 'surprised'],
    robot: ['neutral', 'thinking', 'happy'],
    knight: ['neutral', 'happy', 'thinking'],
    alien: ['happy', 'surprised', 'waving'],
    sorceress: ['thinking', 'neutral', 'surprised']
  };
  
  const preferredEmotions = characterEmotions[characterId] || ['neutral'];
  
  // If detected emotion is in preferred list, use it
  if (preferredEmotions.includes(detectedEmotion)) {
    return detectedEmotion;
  }
  
  // Otherwise, use the first preferred emotion
  return preferredEmotions[0];
};