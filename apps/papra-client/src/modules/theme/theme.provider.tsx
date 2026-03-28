import type { ParentComponent } from 'solid-js';
import type { Theme, ThemePreference } from './theme.types';
import { createContext, createSignal, useContext } from 'solid-js';
import { DEFAULT_THEME_PREFERENCE, THEME_ATTRIBUTE, THEME_STORAGE_KEY } from './theme.constants';
import { isValidThemePreference } from './theme.models';

const themeContext = createContext<{
  getTheme: () => Theme;
  getThemePreference: () => ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
}>();

export function useTheme() {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getThemeFromPreference(preference: ThemePreference): Theme {
  if (preference === 'system') {
    return getSystemTheme();
  }

  return preference;
}

export const ThemeProvider: ParentComponent = (props) => {
  const getInitialThemePreference = (): ThemePreference => {
    const storedPreference = localStorage.getItem(THEME_STORAGE_KEY);

    if (isValidThemePreference(storedPreference)) {
      return storedPreference;
    }

    return DEFAULT_THEME_PREFERENCE;
  };

  const [getLocalThemePreference, setLocalThemePreference] = createSignal<ThemePreference>(getInitialThemePreference());

  const getTheme = () => getThemeFromPreference(getLocalThemePreference());

  const setThemePreference = (newPreference: ThemePreference) => {
    setLocalThemePreference(newPreference);

    const theme = getThemeFromPreference(newPreference);

    localStorage.setItem(THEME_STORAGE_KEY, newPreference);
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  };

  return (
    <themeContext.Provider
      value={{
        getTheme,
        getThemePreference: getLocalThemePreference,
        setThemePreference,
      }}
    >
      {props.children}
    </themeContext.Provider>
  );
};
