import {
  Button,
  Link,
  Toolbar,
} from '@fluentui/react-components';
import {
  GridRegular,
  HomeRegular,
  PersonRegular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
} from '@fluentui/react-icons';

interface SiteHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const navigation = [
  { href: '#home', label: 'Home', Icon: HomeRegular },
  { href: '#about', label: 'About', Icon: PersonRegular },
  { href: '#craft', label: 'Our Craft', Icon: GridRegular },
  { href: '#gallery', label: 'Gallery', Icon: GridRegular },
];

export function SiteHeader({ isDark, onToggleTheme }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Toolbar className="site-toolbar">
        <a className="brand-lockup" href="#home" aria-label="DYK Bills Concept Footwear home">
          <img
            className="brand-mark"
            src="/images/FB_IMG_17900787978912189~2.jpg"
            alt=""
            aria-hidden="true"
          />
          <span className="brand-name">DYK Bills Concept Footwear</span>
        </a>
        <Button
          appearance="subtle"
          icon={isDark ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          onClick={onToggleTheme}
        />
      </Toolbar>
      <nav className="section-nav" aria-label="Section navigation">
        {navigation.map(({ href, label, Icon }, index) => (
          <Link
            key={href}
            className={`section-nav-link${index === 0 ? ' section-nav-link--active' : ''}`}
            href={href}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}