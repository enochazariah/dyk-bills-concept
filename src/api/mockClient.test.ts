import { afterEach, describe, expect, it } from 'vitest';
import { api } from './index';
import { setPreviewDataState } from './previewState';

afterEach(() => setPreviewDataState('data'));

describe('mock gallery client', () => {
  it('accounts for all 27 supplied images across the gallery, hero, and brand mark', async () => {
    setPreviewDataState('data');
    const items = await api.listGalleryItems();
    const footwearImages = [
      ...items.map((item) => item.image.slice('/images/'.length)),
      'FB_IMG_17901669064044837.jpg',
      'FB_IMG_17900787978912189~2.jpg',
    ];

    expect(items).toHaveLength(25);
    expect(items.every((item) => item.image.startsWith('/images/'))).toBe(true);
    expect(new Set(footwearImages).size).toBe(27);
  });

  it('returns an empty collection in the empty state', async () => {
    setPreviewDataState('empty');

    await expect(api.listGalleryItems()).resolves.toEqual([]);
  });

  it('reports an error in the error state', async () => {
    setPreviewDataState('error');

    await expect(api.listGalleryItems()).rejects.toThrow('local gallery could not be loaded');
  });
});