import { Text } from '@fluentui/react-components';
import { PersonRegular } from '@fluentui/react-icons';

export function AboutSection() {
  return (
    <section id="about" className="page-width text-section" aria-labelledby="about-title">
      <div className="section-heading">
        <PersonRegular aria-hidden="true" />
        <Text as="h2" id="about-title" className="section-title">About</Text>
        <span className="section-note">Brand identity and footwear photographs</span>
      </div>
      <Text as="p" className="section-copy">
        DYK Bills Concept Footwear brings together its brand identity and footwear craftsmanship
        across a range of visible styles.
      </Text>
    </section>
  );
}