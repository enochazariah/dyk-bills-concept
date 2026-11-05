import { galleryItems } from '../data/gallery';
import type { ApiClient } from './types';
import { getPreviewDataState } from './previewState';

export const mockClient: ApiClient = {
  async listGalleryItems() {
    switch (getPreviewDataState()) {
      case 'loading':
        return new Promise((resolve) => {
          window.setTimeout(() => resolve(galleryItems), 60_000);
        });
      case 'empty':
        return [];
      case 'error':
        throw new Error('The local gallery could not be loaded.');
      case 'data':
        return galleryItems;
    }
  },
};