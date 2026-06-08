/**
 * Theme utilities for PayFlow theme system
 * Provides helper functions for theme-aware styling
 */

import { useTheme } from '../context/ThemeContext';

/**
 * Get DaisyUI button class based on button type
 * @param {string} type - Button type: 'primary', 'secondary', 'accent', 'ghost', 'error', 'success', 'warning'
 * @returns {string} - Tailwind/DaisyUI button classes
 */
export const getButtonClass = (type = 'primary') => {
  const baseClass = 'btn';
  const typeClass = `btn-${type}`;
  return `${baseClass} ${typeClass}`;
};

/**
 * Get responsive grid classes
 * @param {number} cols - Number of columns (1-4)
 * @returns {string} - Tailwind grid classes
 */
export const getGridClass = (cols = 2) => {
  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  return `grid ${colMap[cols] || colMap[2]} gap-4`;
};

/**
 * Get card classes with theme support
 * @param {string} variant - Card variant: 'default', 'primary', 'success', 'warning', 'error'
 * @returns {string} - Tailwind/DaisyUI card classes
 */
export const getCardClass = (variant = 'default') => {
  const variants = {
    default: 'card bg-base-100 shadow-lg',
    primary: 'card bg-primary text-primary-content shadow-lg',
    success: 'card bg-success text-success-content shadow-lg',
    warning: 'card bg-warning text-warning-content shadow-lg',
    error: 'card bg-error text-error-content shadow-lg',
  };
  return variants[variant] || variants.default;
};

/**
 * Custom hook for theme-aware conditional classes
 * @returns {object} - Theme utilities
 */
export const useThemeClasses = () => {
  const { theme } = useTheme();

  return {
    isDark: theme === 'dark' || theme === 'payflow_dark',
    isLight: theme === 'light',
    currentTheme: theme,

    /**
     * Get conditional classes based on current theme
     */
    getConditionalClass: (lightClass, darkClass) => {
      return theme === 'light' ? lightClass : darkClass;
    },

    /**
     * Get text color classes that work with all themes
     */
    textClasses: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      muted: theme === 'light' ? 'text-gray-500' : 'text-gray-400',
      success: 'text-success',
      error: 'text-error',
      warning: 'text-warning',
    },

    /**
     * Get background classes that work with all themes
     */
    bgClasses: {
      primary: 'bg-primary text-primary-content',
      secondary: 'bg-secondary text-secondary-content',
      accent: 'bg-accent text-accent-content',
      base: 'bg-base-100',
      surface: 'bg-base-200',
      hover: 'hover:bg-base-300',
      success: 'bg-success text-success-content',
      error: 'bg-error text-error-content',
      warning: 'bg-warning text-warning-content',
    },

    /**
     * Get border classes
     */
    borderClasses: {
      light: 'border border-base-300',
      medium: 'border-2 border-base-300',
      thick: 'border-4 border-base-300',
    },

    /**
     * Get skeleton/loading classes
     */
    skeletonClasses: 'animate-pulse bg-base-300 rounded',
  };
};

/**
 * Theme color value getters (for Canvas, Charts, etc.)
 */
export const getThemeColors = (theme) => {
  const colorMap = {
    light: {
      primary: '#3B82F6',
      secondary: '#6366F1',
      accent: '#10B981',
      background: '#FFFFFF',
      text: '#000000',
      textMuted: '#666666',
      border: '#E5E5E5',
    },
    dark: {
      primary: '#3B82F6',
      secondary: '#6366F1',
      accent: '#10B981',
      background: '#1A202C',
      text: '#FFFFFF',
      textMuted: '#999999',
      border: '#4A5568',
    },
    payflow_dark: {
      primary: '#6366F1',
      secondary: '#3B82F6',
      accent: '#06B6D4',
      background: '#0F172A',
      text: '#FFFFFF',
      textMuted: '#B0BEC5',
      border: '#2D3E52',
    },
  };
  return colorMap[theme] || colorMap.light;
};

/**
 * Theme switch animation utilities
 */
export const themeTransition = {
  // Add transition class to any element
  className: 'transition-colors duration-300',
  // Apply to specific properties
  style: 'transition: background-color 0.3s ease, color 0.3s ease',
};

/**
 * Pre-configured DaisyUI component classes
 */
export const daisy = {
  // Buttons
  button: 'btn',
  buttonPrimary: 'btn btn-primary',
  buttonSecondary: 'btn btn-secondary',
  buttonAccent: 'btn btn-accent',
  buttonGhost: 'btn btn-ghost',
  buttonSmall: 'btn btn-sm',
  buttonLarge: 'btn btn-lg',

  // Cards
  card: 'card bg-base-100 shadow',
  cardCompact: 'card compact',
  cardNormal: 'card normal',

  // Inputs
  input: 'input input-bordered w-full',
  inputPrimary: 'input input-bordered input-primary w-full',
  select: 'select select-bordered w-full',
  checkbox: 'checkbox',
  radio: 'radio',

  // Alerts
  alert: 'alert',
  alertSuccess: 'alert alert-success',
  alertError: 'alert alert-error',
  alertWarning: 'alert alert-warning',
  alertInfo: 'alert alert-info',

  // Badges
  badge: 'badge',
  badgePrimary: 'badge badge-primary',
  badgeSecondary: 'badge badge-secondary',
  badgeAccent: 'badge badge-accent',

  // Others
  loading: 'loading',
  loadingSpinner: 'loading loading-spinner',
  skeleton: 'skeleton',
};
