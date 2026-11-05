import {
  Button,
  Card,
  CardHeader,
  CardPreview,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Skeleton,
  SkeletonItem,
  Text,
} from '@fluentui/react-components';
import {
  ArrowClockwiseRegular,
  GridRegular,
  ImageRegular,
} from '@fluentui/react-icons';
import { motion } from 'motion/react';
import type { GalleryItem } from '../data/gallery';

interface GalleryProps {
  error: string | null;
  items: GalleryItem[];
  loading: boolean;
  onOpen: (index: number) => void;
  onRetry: () => void;
}

export function Gallery({ error, items, loading, onOpen, onRetry }: GalleryProps) {
  return (
    <section id="gallery" className="page-width gallery-section" aria-labelledby="gallery-title">
      <div className="section-heading gallery-heading">
        <GridRegular aria-hidden="true" />
        <Text as="h2" id="gallery-title" className="section-title">Gallery</Text>
        <span className="section-note">
          {loading ? 'Loading photographs' : `${items.length} footwear photographs`}
        </span>
      </div>

      {loading && (
        <div className="gallery-grid" role="status" aria-label="Loading footwear photographs">
          {Array.from({ length: 6 }, (_, index) => (
            <Card key={index} appearance="outline" className="gallery-card gallery-skeleton">
              <Skeleton>
                <SkeletonItem className="skeleton-image" shape="rectangle" />
                <SkeletonItem className="skeleton-caption" shape="rectangle" />
              </Skeleton>
            </Card>
          ))}
        </div>
      )}

      {!loading && error && (
        <MessageBar intent="error" className="gallery-error">
          <MessageBarBody>
            <MessageBarTitle>Image display unavailable</MessageBarTitle>
            {error}
          </MessageBarBody>
          <Button appearance="secondary" icon={<ArrowClockwiseRegular />} onClick={onRetry}>
            Retry
          </Button>
        </MessageBar>
      )}

      {!loading && !error && items.length === 0 && (
        <Card appearance="outline" className="gallery-empty">
          <ImageRegular className="empty-icon" aria-hidden="true" />
          <Text as="h3" className="empty-title">No photographs to display</Text>
          <Text as="p" className="empty-copy">
            The local gallery is empty in this preview state.
          </Text>
          <Button as="a" href="#home" appearance="primary" icon={<ArrowClockwiseRegular />}>
            Return to top
          </Button>
        </Card>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="gallery-grid">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              className="gallery-entry"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.35, delay: Math.min(index * 0.045, 0.2) }}
              whileHover={{ y: -2 }}
            >
              <Card appearance="outline" className="gallery-card">
                <CardPreview className="gallery-media">
                  <button
                    className="gallery-image-button"
                    type="button"
                    aria-label={`Open image: ${item.caption}`}
                    onClick={() => onOpen(index)}
                  >
                    <img src={item.image} alt={item.alt} loading="lazy" />
                    <span className="image-open-hint" aria-hidden="true">View image</span>
                  </button>
                </CardPreview>
                <CardHeader
                  className="gallery-card-header"
                  header={<Text className="gallery-caption">{item.caption}</Text>}
                />
              </Card>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}