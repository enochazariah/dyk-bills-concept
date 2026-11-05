import { Text } from '@fluentui/react-components';
import { GridRegular } from '@fluentui/react-icons';

export function CraftSection() {
  return (
    <section id="craft" className="page-width text-section" aria-labelledby="craft-title">
      <div className="section-heading">
        <GridRegular aria-hidden="true" />
        <Text as="h2" id="craft-title" className="section-title">Our Craft</Text>
        <span className="section-note">Visible details</span>
      </div>
      <Text as="p" className="section-copy">
        Across the photographs, visible details include lacing, stitching, and a range of sole profiles.
      </Text>
    </section>
  );
}