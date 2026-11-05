import { Divider, Text } from '@fluentui/react-components';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Divider className="footer-divider" />
      <div className="page-width footer-content">
        <Text className="footer-brand">DYK Bills Concept Footwear</Text>
        <div className="footer-meta">
          <Text as="span" className="footer-credit">
            Designed &amp; Developed by{' '}
            <a
              href="https://mylandingpage-alpha.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enoch Azariah
            </a>
          </Text>
          <a href="#home" aria-label="Back to top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}