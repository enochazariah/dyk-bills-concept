import { useEffect, useState, useSyncExternalStore } from 'react';
import { FluentProvider } from '@fluentui/react-components';
import { api } from './api';
import {
  getPreviewDataState,
  setPreviewDataState,
  subscribePreviewDataState,
  type PreviewDataState,
} from './api/previewState';
import type { GalleryItem } from './data/gallery';
import { AboutSection } from './components/AboutSection';
import { AccessibleLightbox } from './components/AccessibleLightbox';
import { BrandStatement } from './components/BrandStatement';
import { CraftSection } from './components/CraftSection';
import { DevStateSwitcher } from './components/DevStateSwitcher';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { darkTheme, lightTheme } from './theme';

type ThemeMode = 'light' | 'dark' | 'system';

function initialThemeMode(): ThemeMode {
  try {
    const storedTheme = window.localStorage.getItem('app-theme');
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system';
  } catch {
    return 'system';
  }
}

function systemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function App() {
  const previewState = useSyncExternalStore<PreviewDataState>(
    subscribePreviewDataState,
    getPreviewDataState,
    () => 'data',
  );
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);
  const [systemDark, setSystemDark] = useState(systemPrefersDark);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const isDark = themeMode === 'dark' || (themeMode === 'system' && systemDark);

  useEffect(() => {
    if (themeMode !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    setSystemDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateSystemTheme);
    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, [themeMode]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    api.listGalleryItems()
      .then((galleryItems) => {
        if (active) {
          setItems(galleryItems);
        }
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : 'The local gallery could not be loaded.');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [previewState, retryCount]);

  const selectedItem = selectedIndex === null ? null : items[selectedIndex] ?? null;

  function toggleTheme() {
    const nextMode = isDark ? 'light' : 'dark';
    setThemeMode(nextMode);
    try {
      window.localStorage.setItem('app-theme', nextMode);
    } catch {
      // Theme selection still works for the current page when storage is disabled.
    }
  }

  function changePreviewState(state: PreviewDataState) {
    setPreviewDataState(state);
    setSelectedIndex(null);
  }

  function moveSelection(direction: -1 | 1) {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null || items.length === 0) {
        return currentIndex;
      }
      return (currentIndex + direction + items.length) % items.length;
    });
  }

  return (
    <FluentProvider theme={isDark ? darkTheme : lightTheme}>
      <div className={`site-shell${isDark ? ' theme-dark' : ''}`} data-theme={isDark ? 'dark' : 'light'}>
        <SiteHeader isDark={isDark} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <AboutSection />
          <CraftSection />
          <Gallery
            error={error}
            items={items}
            loading={loading}
            onOpen={setSelectedIndex}
            onRetry={() => setRetryCount((count) => count + 1)}
          />
          <BrandStatement />
        </main>
        <SiteFooter />
        <AccessibleLightbox
          item={selectedItem}
          onClose={() => setSelectedIndex(null)}
          onNext={() => moveSelection(1)}
          onPrevious={() => moveSelection(-1)}
        />
        <DevStateSwitcher selectedState={previewState} onChange={changePreviewState} />
      </div>
    </FluentProvider>
  );
}