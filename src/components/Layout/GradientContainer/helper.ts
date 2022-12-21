import { ThemeName } from '##/assets/themes';
import { Language } from '##/types/common';

export const themeColorsMap: Record<ThemeName, string[]> = {
  ssoLight: ['#8264fc', '#ad56fa', '#f7f9fb', '#1c1d1f'],
  ssoDark: ['#1c1d1f', '#f7f9fb', '#ad56fa', '#8264fc'],
};

type LanguageItem = {
  label: string;
  language: Language;
};

export const languages: Array<LanguageItem> = [
  {
    label: 'Русский',
    language: Language.RU,
  },
  {
    label: 'English',
    language: Language.EN,
  },
];
