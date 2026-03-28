import { describe, expect, test } from 'vitest';
import { isValidThemePreference } from './theme.models';

describe('theme models', () => {
  describe('isValidThemePreference', () => {
    test('valid theme preferences are either "light", "dark" or "system"', () => {
      expect(isValidThemePreference('light')).toBe(true);
      expect(isValidThemePreference('dark')).toBe(true);
      expect(isValidThemePreference('system')).toBe(true);

      expect(isValidThemePreference('invalid')).toBe(false);
      expect(isValidThemePreference(123)).toBe(false);
      expect(isValidThemePreference(null)).toBe(false);
      expect(isValidThemePreference(undefined)).toBe(false);
      expect(isValidThemePreference({})).toBe(false);
    });
  });
});
