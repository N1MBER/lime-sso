import { onUpdate } from '@reatom/hooks';
import { reatomString } from '@reatom/primitives';
import Cookies from 'js-cookie';
import { getDelayedDate } from '##/utils/date';

const uuid = Cookies.get('uuid');

export const uuidAtom = reatomString(uuid);

onUpdate(uuidAtom, (ctx, value) => {
  ctx.schedule(() =>
    Cookies.set('uuid', value, { expires: getDelayedDate({ minutes: 15 }) }),
  );
});
