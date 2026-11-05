import type { GalleryItem } from '../data/gallery';

export interface ApiClient {
  listGalleryItems(): Promise<GalleryItem[]>;
}