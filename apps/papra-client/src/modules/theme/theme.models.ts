import type { ThemePreference } from './theme.types';
import { THEME_PREFERENCES } from './theme.constants';

export function isValidThemePreference(value: unknown): value is ThemePreference {
  return (
    value === THEME_PREFERENCES.LIGHT
    || value === THEME_PREFERENCES.DARK
    || value === THEME_PREFERENCES.SYSTEM
  );
}
