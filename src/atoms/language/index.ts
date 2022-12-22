import { action, atom } from '@reatom/core';
import { onUpdate } from '@reatom/hooks';
import i18n from 'i18next';
import { Language } from '##/types/common';

export const languageAtom = atom<Language>(Language.RU);

const KEY = 'language';

onUpdate(languageAtom, async (_ctx, value) => {
  await i18n.changeLanguage(value);
  localStorage.setItem(KEY, value);
});
