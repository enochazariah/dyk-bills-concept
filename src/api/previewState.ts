export type PreviewDataState = 'data' | 'loading' | 'empty' | 'error';

const validStates: readonly PreviewDataState[] = ['data', 'loading', 'empty', 'error'];
const listeners = new Set<() => void>();

function parseState(value: string | null): PreviewDataState | null {
  return validStates.find((state) => state === value) ?? null;
}

function initialState(): PreviewDataState {
  if (import.meta.env.PROD) {
    return 'data';
  }

  if (typeof window === 'undefined') {
    return 'data';
  }

  const queryState = parseState(new URLSearchParams(window.location.search).get('previewState'));
  if (queryState) {
    return queryState;
  }

  try {
    return parseState(window.localStorage.getItem('previewState')) ?? 'data';
  } catch {
    return 'data';
  }
}

let currentState = initialState();

export function getPreviewDataState(): PreviewDataState {
  return import.meta.env.PROD ? 'data' : currentState;
}

export function setPreviewDataState(state: PreviewDataState): void {
  if (import.meta.env.PROD) {
    return;
  }

  currentState = state;
  try {
    window.localStorage.setItem('previewState', state);
  } catch {
    // The in-memory state remains available when storage is disabled.
  }
  listeners.forEach((listener) => listener());
}

export function subscribePreviewDataState(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}