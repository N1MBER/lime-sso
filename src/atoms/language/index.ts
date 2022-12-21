import { action, atom } from '@reatom/core';
import { onUpdate } from '@reatom/hooks';
import { Language } from '##/types/common';

export const languageAtom = atom<Language>(Language.RU);

const KEY = 'language';

onUpdate(languageAtom, (_ctx, value) => {
  localStorage.setItem(KEY, value);
});
