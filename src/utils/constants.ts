// Application constants for the Roleplay Chat Simulator

// API Configuration
export const API_CONFIG = {
  GEMINI: {
    BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
    MODEL: 'gemini-1.5-flash',
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7,
    TOP_P: 0.8,
    TOP_K: 40
  },
  ELEVENLABS: {
    BASE_URL: 'https://api.elevenlabs.io/v1',
    MAX_TEXT_LENGTH: 5000,
    DEFAULT_VOICE_SETTINGS: {
      stability: 0.75,
      similarityBoost: 0.75,
      style: 0.0,
      useSpeakerBoost: true
    }
  }
};

// Audio Configuration
export const AUDIO_CONFIG = {
  TYPING_SOUND: {
    FREQUENCY: 800,
    DURATION: 0.05,
    TYPE: 'square' as OscillatorType
  },
  NOTIFICATION_SOUND: {
    FREQUENCY: 600,
    DURATION: 0.1,
    TYPE: 'sine' as OscillatorType
  },
  MESSAGE_SOUND: {
    FREQUENCY: 400,
    DURATION: 0.1,
    TYPE: 'sine' as OscillatorType
  },
  VOLUME: {
    DEFAULT: 0.1,
    MAX: 1.0,
    MIN: 0.0
  }
};

// UI Configuration
export const UI_CONFIG = {
  ANIMATION: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500
    },
    EASING: {
      EASE_OUT: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      EASE_IN: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      EASE_IN_OUT: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
    }
  },
  TYPING: {
    SPEED: 30, // ms per character
    CURSOR_BLINK: 500 // ms
  },
  SCROLL: {
    BEHAVIOR: 'smooth' as ScrollBehavior,
    OFFSET: 20
  }
};

// Character Configuration
export const CHARACTER_CONFIG = {
  EMOTION_RESET_DELAY: 3000, // ms
  IMAGE_TRANSITION_DURATION: 300, // ms
  VOICE_CACHE_DURATION: 300000, // 5 minutes
  MAX_MESSAGE_LENGTH: 1000
};

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: '#3b82f6',
    SECONDARY: '#64748b',
    SUCCESS: '#22c55e',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    INFO: '#06b6d4'
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px'
  }
};

// Error Messages
export const ERROR_MESSAGES = {
  API: {
    GEMINI_FAILED: 'Failed to get response from AI. Please try again.',
    ELEVENLABS_FAILED: 'Text-to-speech is temporarily unavailable.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    RATE_LIMIT: 'Too many requests. Please wait a moment.',
    INVALID_KEY: 'Invalid API key. Please check your configuration.'
  },
  AUDIO: {
    NOT_SUPPORTED: 'Audio is not supported in your browser.',
    PERMISSION_DENIED: 'Audio permission denied.',
    LOAD_FAILED: 'Failed to load audio file.'
  },
  GENERAL: {
    UNKNOWN_ERROR: 'An unexpected error occurred.',
    INVALID_INPUT: 'Invalid input provided.',
    FILE_TOO_LARGE: 'File is too large.'
  }
};

// Success Messages
export const SUCCESS_MESSAGES = {
  MESSAGE_SENT: 'Message sent successfully',
  AUDIO_ENABLED: 'Audio enabled',
  AUDIO_DISABLED: 'Audio disabled',
  SETTINGS_SAVED: 'Settings saved successfully'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  SELECTED_CHARACTER: 'roleplay_chat_selected_character',
  AUDIO_ENABLED: 'roleplay_chat_audio_enabled',
  VOLUME_LEVEL: 'roleplay_chat_volume_level',
  THEME_PREFERENCES: 'roleplay_chat_theme_preferences',
  CHAT_HISTORY: 'roleplay_chat_history',
  USER_PREFERENCES: 'roleplay_chat_user_preferences'
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  CHARACTER_PICKER: '/characters',
  CHAT: '/chat/:characterId',
  SETTINGS: '/settings',
  ABOUT: '/about'
};

// Feature Flags
export const FEATURES = {
  AUDIO_ENABLED: true,
  TTS_ENABLED: true,
  EMOTION_DETECTION: true,
  CHARACTER_IMAGES: true,
  SOUND_EFFECTS: true,
  MOBILE_OPTIMIZED: true,
  ACCESSIBILITY: true
};

// Development Configuration
export const DEV_CONFIG = {
  DEBUG_MODE: import.meta.env.DEV,
  LOG_LEVEL: import.meta.env.DEV ? 'debug' : 'error',
  MOCK_APIS: false,
  ENABLE_PERFORMANCE_MONITORING: true
};