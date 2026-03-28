export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const THEME_PREFERENCES = {
  ...THEMES,
  SYSTEM: 'system',
} as const;

export const THEME_STORAGE_KEY = 'papra_color_mode';
export const DEFAULT_THEME_PREFERENCE = THEME_PREFERENCES.DARK;
export const THEME_ATTRIBUTE = 'data-kb-theme';
