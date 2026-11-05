import { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogSurface,
  DialogTitle,
  Text,
} from '@fluentui/react-components';
import {
  ChevronLeftRegular,
  ChevronRightRegular,
  DismissRegular,
} from '@fluentui/react-icons';
import type { GalleryItem } from '../data/gallery';

interface AccessibleLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function AccessibleLightbox({ item, onClose, onNext, onPrevious }: AccessibleLightboxProps) {
  useEffect(() => {
    if (!item) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        onNext();
      } else if (event.key === 'ArrowLeft') {
        onPrevious();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onNext, onPrevious]);

  return (
    <Dialog
      open={item !== null}
      modalType="modal"
      onOpenChange={(_, data) => {
        if (!data.open) {
          onClose();
        }
      }}
    >
      <DialogSurface className="lightbox-surface">
        {item && (
          <DialogBody className="lightbox-body">
            <div className="lightbox-heading">
              <DialogTitle className="lightbox-title">{item.caption}</DialogTitle>
              <Button
                appearance="subtle"
                icon={<DismissRegular />}
                aria-label="Close image preview"
                onClick={onClose}
              />
            </div>
            <div className="lightbox-media">
              <Button
                appearance="subtle"
                icon={<ChevronLeftRegular />}
                aria-label="Previous image"
                onClick={onPrevious}
              />
              <img src={item.image} alt={item.alt} />
              <Button
                appearance="subtle"
                icon={<ChevronRightRegular />}
                aria-label="Next image"
                onClick={onNext}
              />
            </div>
            <Text as="p" className="lightbox-caption">{item.alt}</Text>
          </DialogBody>
        )}
      </DialogSurface>
    </Dialog>
  );
}