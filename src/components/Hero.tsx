import {
  Button,
  Card,
  CardPreview,
  Text,
} from '@fluentui/react-components';
import { GridRegular } from '@fluentui/react-icons';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="home" className="page-width hero-section" aria-labelledby="hero-title">
      <Card appearance="filled-alternative" className="hero-card">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p className="eyebrow"><span aria-hidden="true" /> DYK Bills Concept Footwear</p>
          <Text as="h1" id="hero-title" className="hero-title">
            DYK Bills Concept Footwear
          </Text>
          <Text as="p" className="hero-description">
            Crafted for daily wear, from lace-up ankle boots to sandals and loafers.
          </Text>
          <div className="hero-actions">
            <Button
              as="a"
              href="#gallery"
              appearance="primary"
              icon={<GridRegular />}
              iconPosition="before"
            >
              View Gallery
            </Button>
          </div>
        </motion.div>
        <CardPreview className="hero-media">
          <img
            src="/images/FB_IMG_17901669064044837.jpg"
            alt="Black lace-up ankle boots with thick soles, worn as a pair"
            fetchPriority="high"
          />
        </CardPreview>
      </Card>
    </section>
  );
}