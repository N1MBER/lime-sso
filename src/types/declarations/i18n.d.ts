import 'react-i18next';

declare module 'react-i18next' {
  export interface Resources {
    ru: typeof import('../../../public/locales/ru/translation.json');
    en: typeof import('../../../public/locales/en/translation.json');
  }
}
