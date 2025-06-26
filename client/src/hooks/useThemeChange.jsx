import { useEffect, useState } from 'react';

// Custom hook for managing theme changes and CSS variables
export const useThemeChange = () => {
  const [themeVars, setThemeVars] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const updateTheme = () => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const vars = {
      cardBg: computedStyle.getPropertyValue('--card-bg').trim(),
      textPrimary: computedStyle.getPropertyValue('--text-primary').trim(),
      borderColor: computedStyle.getPropertyValue('--border-color').trim(),
    };
    
    setThemeVars(vars);
  };

  useEffect(() => {
    // Wait for theme to be applied before reading values
    const timer = setTimeout(() => {
      updateTheme();
      setLoaded(true);
    }, 100);

    // Update theme when data-theme attribute changes
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return { ...themeVars, loaded };
};
