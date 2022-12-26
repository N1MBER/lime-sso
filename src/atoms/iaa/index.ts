import { atom } from '@reatom/core';
import { IaaAction } from '##/types/iaa';

export const iaaActionAtom = atom<IaaAction>('authentication');
