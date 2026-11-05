import {
  createDarkTheme,
  createLightTheme,
  type BrandVariants,
  type Theme,
} from '@fluentui/react-components';

const brandStops = [
  '#F4F2EE', '#E9E6DF', '#DCD7CD', '#C7C0B2',
  '#AEA697', '#958D7E', '#7C7466', '#625B4E',
  '#4D473C', '#3C372F', '#302C25', '#211F1B',
  '#1C1A17', '#171613', '#12110F', '#0D0C0B',
] as const;

const brandRamp = Object.fromEntries(
  brandStops.map((color, index) => [(index + 1) * 10, color]),
) as BrandVariants;

export const lightTheme: Theme = {
  ...createLightTheme(brandRamp),
  colorBrandBackground: '#211F1B',
  colorBrandBackgroundHover: '#37342E',
  colorBrandBackgroundPressed: '#171613',
  colorBrandForeground1: '#211F1B',
  colorNeutralBackground1: '#F6F5F1',
  colorNeutralBackground2: '#F0EFEA',
  colorNeutralBackground3: '#E8E6DF',
  colorNeutralForeground1: '#25241F',
  colorNeutralForeground2: '#706F69',
  colorNeutralStroke1: '#D9D6CE',
};

export const darkTheme: Theme = {
  ...createDarkTheme(brandRamp),
  colorBrandBackground: '#B49A5A',
  colorBrandBackgroundHover: '#C4AD72',
  colorBrandBackgroundPressed: '#A08749',
  colorBrandForeground1: '#D5BE84',
  colorNeutralBackground1: '#211F1B',
  colorNeutralBackground2: '#292721',
  colorNeutralBackground3: '#34312A',
  colorNeutralForeground1: '#F6F5F1',
  colorNeutralForeground2: '#C4C0B7',
  colorNeutralStroke1: '#4A463D',
};